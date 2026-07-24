import { chromium } from "playwright";

// 발표 화면(전체화면) 모드 점검: 헤더가 숨고, 진행바가 화면 맨 위에 붙고,
// 슬라이드 상단이 잘리지 않는지 확인한다.
const base = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = process.env.SHOT_DIR ?? "/tmp/tbclass-shots";

const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto(`${base}/week/1?teacher=1`, { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

const before = await page.evaluate(() => {
  const slide = document.querySelector(".deck-slide");
  return {
    headerVisible: !!document.querySelector("header")?.offsetHeight,
    barTop: Math.round(
      document.querySelector(".deck-bar").getBoundingClientRect().top,
    ),
    slideTop: Math.round(slide.getBoundingClientRect().top),
    deckOffset: getComputedStyle(slide).scrollMarginTop,
  };
});

await page.getByRole("button", { name: /발표 화면/ }).click();
await page.waitForTimeout(900);

const after = await page.evaluate(() => {
  const slide = document.querySelector(".deck-slide");
  const chip = slide.querySelector("span"); // 톤 뱃지 — 슬라이드 최상단 요소
  const bar = document.querySelector(".deck-bar").getBoundingClientRect();
  return {
    fullscreen: !!document.fullscreenElement,
    projectorClass: document.documentElement.classList.contains("projector-mode"),
    headerVisible: !!document.querySelector("header")?.offsetHeight,
    barTop: Math.round(bar.top),
    barBottom: Math.round(bar.bottom),
    chipTop: Math.round(chip.getBoundingClientRect().top),
    deckOffset: getComputedStyle(slide).scrollMarginTop,
    innerWidth: Math.round(
      slide.firstElementChild.getBoundingClientRect().width,
    ),
    rootFontSize: getComputedStyle(document.documentElement).fontSize,
  };
});

await page.screenshot({ path: `${OUT}/pw-projector.png` });

// 발표 화면에서 다음 장으로 이동해도 상단이 잘리지 않는지
await page.getByRole("button", { name: "다음" }).click();
await page.waitForTimeout(900);
const afterNext = await page.evaluate(() => {
  const slides = document.querySelectorAll(".deck-slide");
  const bar = document.querySelector(".deck-bar").getBoundingClientRect();
  const s2 = slides[1].getBoundingClientRect();
  return { barBottom: Math.round(bar.bottom), slide2Top: Math.round(s2.top) };
});
await page.screenshot({ path: `${OUT}/pw-projector-next.png` });

await browser.close();

console.log("일반 화면:", JSON.stringify(before));
console.log("발표 화면:", JSON.stringify(after));
console.log("발표 화면 + 다음:", JSON.stringify(afterNext));

const problems = [];
if (after.headerVisible) problems.push("발표 화면인데 사이트 헤더가 남아 있음");
if (after.barTop !== 0)
  problems.push(`진행바가 맨 위에 안 붙음 (top=${after.barTop})`);
if (after.chipTop < after.barBottom)
  problems.push(
    `슬라이드 상단이 진행바에 가림 (chip=${after.chipTop} < bar=${after.barBottom})`,
  );
if (afterNext.slide2Top < afterNext.barBottom - 1)
  problems.push(
    `다음 장 상단이 진행바에 가림 (slide=${afterNext.slide2Top} < bar=${afterNext.barBottom})`,
  );

if (problems.length) {
  console.log(problems.map((p) => `✗ ${p}`).join("\n"));
  process.exit(1);
}
console.log("✓ 발표 화면 정상");
