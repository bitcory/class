import { chromium } from "playwright";

// 로컬 dev 서버를 띄운 상태에서 실행:
//   SHOT_DIR=/tmp/shots node scripts/check-layout.mjs
// 모바일/데스크톱 화면을 찍고, 가로 넘침·콘솔 오류를 함께 보고한다.

const OUT = process.env.SHOT_DIR ?? "/tmp/tbclass-shots";
const base = process.env.BASE_URL ?? "http://localhost:3000";

const targets = [
  { name: "home", path: "/", vw: 390, vh: 844 },
  { name: "week1", path: "/week/1", vw: 390, vh: 844 },
  { name: "week1-tools", path: "/week/1#tools", vw: 390, vh: 844 },
  { name: "week1-signup", path: "/week/1#signup", vw: 390, vh: 844 },
  { name: "week1-firstchat", path: "/week/1#first-chat", vw: 390, vh: 844 },
  { name: "week1-report", path: "/week/1#report", vw: 390, vh: 844 },
  { name: "prompts", path: "/prompts", vw: 390, vh: 844 },
  { name: "instructor", path: "/instructor", vw: 390, vh: 844 },
  { name: "help", path: "/help", vw: 390, vh: 844 },
  { name: "home-d", path: "/", vw: 1280, vh: 900 },
  { name: "week1-tools-d", path: "/week/1#tools", vw: 1280, vh: 900 },
  { name: "week1-rules-d", path: "/week/1#good-question", vw: 1280, vh: 900 },
  { name: "week1-teacher-d", path: "/week/1?teacher=1#llm", vw: 1280, vh: 900 },
];

const browser = await chromium.launch({ channel: "chrome" });
const report = [];

for (const t of targets) {
  const ctx = await browser.newContext({
    viewport: { width: t.vw, height: t.vh },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(base + t.path, { waitUntil: "networkidle" });
  await page.waitForTimeout(1300);

  const metrics = await page.evaluate(() => {
    const de = document.documentElement;
    const header = document.querySelector("header");
    const overflowing = [];
    for (const el of document.querySelectorAll("body *")) {
      // 가로 스크롤 컨테이너(모바일 내비) 안쪽은 정상이므로 제외
      if (el.closest(".overflow-x-auto")) continue;
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > de.clientWidth + 1 || r.left < -1)) {
        overflowing.push(
          `${el.tagName.toLowerCase()} right=${Math.round(r.right)}`,
        );
      }
    }
    return {
      scrollWidth: de.scrollWidth,
      clientWidth: de.clientWidth,
      scrollY: Math.round(window.scrollY),
      headerHeight: header
        ? Math.round(header.getBoundingClientRect().height)
        : null,
      overflowing: overflowing.slice(0, 6),
    };
  });

  report.push({ name: t.name, ...metrics, errors: errors.slice(0, 3) });
  await page.screenshot({ path: `${OUT}/pw-${t.name}.png` });
  await ctx.close();
}

await browser.close();

for (const r of report) {
  const bad =
    r.scrollWidth > r.clientWidth || r.overflowing.length || r.errors.length;
  console.log(
    `${bad ? "✗" : "✓"} ${r.name.padEnd(18)} scrollW=${r.scrollWidth} clientW=${r.clientWidth} scrollY=${r.scrollY} header=${r.headerHeight}` +
      (r.overflowing.length ? ` overflow=${r.overflowing.join(", ")}` : "") +
      (r.errors.length ? ` errors=${r.errors.join(" | ")}` : ""),
  );
}
