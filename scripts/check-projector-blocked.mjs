import { chromium } from "playwright";

// 전체화면이 '차단된' 환경(임베디드 미리보기 등)에서도 발표 화면 fallback이
// 동작하는지 확인한다. requestFullscreen 을 강제로 실패시킨다.
const base = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = process.env.SHOT_DIR ?? "/tmp/tbclass-shots";

const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// 전체화면 API를 막아 임베디드 환경을 흉내낸다.
await page.addInitScript(() => {
  Element.prototype.requestFullscreen = () =>
    Promise.reject(new Error("blocked"));
});

await page.goto(`${base}/week/1?teacher=1`, { waitUntil: "networkidle" });
await page.waitForTimeout(900);

await page.getByRole("button", { name: /발표 화면/ }).click();
await page.waitForTimeout(700);

const after = await page.evaluate(() => {
  const slide = document.querySelector(".deck-slide");
  const chip = slide.querySelector("span");
  const bar = document.querySelector(".deck-bar").getBoundingClientRect();
  return {
    fullscreen: !!document.fullscreenElement,
    projectorClass: document.documentElement.classList.contains(
      "projector-mode",
    ),
    headerVisible: !!document.querySelector("header")?.offsetHeight,
    barTop: Math.round(bar.top),
    barBottom: Math.round(bar.bottom),
    chipTop: Math.round(chip.getBoundingClientRect().top),
    innerWidth: Math.round(slide.firstElementChild.getBoundingClientRect().width),
    rootFontSize: getComputedStyle(document.documentElement).fontSize,
  };
});

await page.screenshot({ path: `${OUT}/pw-projector-blocked.png` });
await browser.close();

console.log("전체화면 차단 + 발표 화면:", JSON.stringify(after, null, 0));

const problems = [];
if (after.headerVisible) problems.push("헤더가 안 숨겨짐");
if (after.barTop > 1) problems.push(`진행바가 맨 위에 안 붙음 (top=${after.barTop})`);
if (after.chipTop < after.barBottom)
  problems.push(`슬라이드 상단이 가림 (chip=${after.chipTop} < bar=${after.barBottom})`);
if (after.innerWidth < 1000) problems.push(`본문 폭이 안 넓어짐 (${after.innerWidth})`);
if (after.rootFontSize !== "22px") problems.push(`글자 확대 안 됨 (${after.rootFontSize})`);

if (problems.length) {
  console.log(problems.map((p) => `✗ ${p}`).join("\n"));
  process.exit(1);
}
console.log("✓ 전체화면이 막혀도 넓은 발표 화면으로 전환됨");
