import { chromium } from "playwright";

// 동작 점검: 복사 버튼, 다음/이전 이동, 목차, 강사 모드, 글씨 크기.
//   node scripts/check-behavior.mjs
const base = process.env.BASE_URL ?? "http://localhost:3000";
const results = [];
const check = (name, ok, extra = "") => results.push({ name, ok, extra });

const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  permissions: ["clipboard-read", "clipboard-write"],
});
const page = await ctx.newPage();

// 1) 프롬프트 복사
await page.goto(`${base}/prompts`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "복사하기" }).first().click();
await page.waitForTimeout(300);
const copied = await page.evaluate(() => navigator.clipboard.readText());
check("복사하기 → 클립보드", copied.includes("대학원생"), copied.slice(0, 40));
check(
  "복사 후 안내 문구",
  await page.getByText("ChatGPT 입력창에 붙여넣고").isVisible(),
);

// 2) 빈칸 수정이 복사 내용에 반영되는지
const firstCard = page.locator('[data-slot="prompt-card"]').first();
await firstCard.locator('input[aria-label="전공 입력칸"]').fill("노인복지");
await firstCard.getByRole("button", { name: /복사/ }).click();
await page.waitForTimeout(300);
const copied2 = await page.evaluate(() => navigator.clipboard.readText());
check("빈칸 수정 반영", copied2.includes("노인복지"), copied2.slice(0, 40));

// 3) 슬라이드 이동
await page.goto(`${base}/week/1`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
const before = await page.evaluate(() => Math.round(scrollY));
await page.getByRole("button", { name: "다음" }).click();
await page.waitForTimeout(900);
const after = await page.evaluate(() => Math.round(scrollY));
check("다음 버튼 이동", after > before, `${before} → ${after}`);
check("진행 표시 갱신", await page.getByText("2/14").isVisible());

// 4) 목차로 점프
await page.getByRole("button", { name: "목차" }).click();
await page.getByRole("button", { name: "가입하기", exact: false }).click();
await page.waitForTimeout(1200);
check("목차 점프", await page.getByText("10/14").isVisible());

// 5) 체크 표시 저장
await page.getByRole("button", { name: /chatgpt.com 에 들어갑니다/ }).click();
await page.waitForTimeout(200);
const saved = await page.evaluate(() =>
  localStorage.getItem("tbclass:week1-signup"),
);
check("따라하기 체크 저장", saved === "[true,false,false,false]", String(saved));

// 6) 강사 모드 — 수강생에겐 숨김, 비밀 암호 링크로만 켜짐
check(
  "강사 노트 기본 숨김",
  !(await page.getByText("강사 노트").first().isVisible()),
);
check(
  "옛 ?teacher=1 은 막힘",
  await page.goto(`${base}/week/1?teacher=1`).then(async () => {
    await page.waitForTimeout(500);
    return !(await page.getByText("강사 노트").first().isVisible());
  }),
);
await page.goto(`${base}/week/1?teacher=ssam2026`);
await page.waitForTimeout(700);
check(
  "비밀 암호 링크로 노트 표시",
  await page.getByText("강사 노트").first().isVisible(),
);
check("암호가 주소창에서 제거됨", !page.url().includes("teacher"));

// 7) 글씨 크기
await page.getByRole("button", { name: /글씨 크기 바꾸기/ }).click();
await page.waitForTimeout(200);
const fs = await page.evaluate(
  () => getComputedStyle(document.documentElement).fontSize,
);
check("글씨 크게", fs === "20px", fs);

await browser.close();

let failed = 0;
for (const r of results) {
  if (!r.ok) failed++;
  console.log(`${r.ok ? "✓" : "✗"} ${r.name}${r.extra ? ` — ${r.extra}` : ""}`);
}
process.exit(failed ? 1 : 0);
