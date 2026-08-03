import type { Week } from "@/lib/deck-types";
import { week1 } from "./week-1";
import { week2 } from "./week-2";

export const course = {
  name: "생성형 AI 활용 실무",
  subtitle: "4주 과정",
  target: "사회복지 전공 대학원생 · AI 입문",
  promise: "AI는 어렵지 않습니다. 말만 걸 줄 알면 됩니다.",
  prepare: [
    {
      title: "노트북 or 휴대폰",
      desc: "둘 중 편한 것 하나면 충분합니다.",
    },
    {
      title: "구글 계정과 비밀번호",
      desc: "가입할 때 씁니다.\n비밀번호는 미리 적어 오세요.",
    },
    {
      title: "편한 마음",
      desc: "못 따라가도 괜찮습니다. \n저와 함께 하나씩 배워봅니다.",
    },
  ],
};

// 3~4주차는 대본이 나오는 대로 week-3.ts 형태로 추가하면 된다.
const week3: Week = {
  week: 3,
  title: "준비 중입니다",
  summary: "내용이 정해지는 대로 안내드립니다.",
  duration: "3시간 (180분)",
  status: "preparing",
  slides: [],
};

const week4: Week = {
  week: 4,
  title: "준비 중입니다",
  summary: "내용이 정해지는 대로 안내드립니다.",
  duration: "3시간 (180분)",
  status: "preparing",
  slides: [],
};

export const weeks: Week[] = [week1, week2, week3, week4];

export function getWeek(n: number): Week | undefined {
  return weeks.find((w) => w.week === n);
}
