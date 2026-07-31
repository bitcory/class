import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { PromptCard } from "@/components/prompt/prompt-card";
import { RevealPhoto } from "@/components/prompt/reveal-photo";
import { collectPrompts } from "@/lib/deck-types";
import { weeks } from "@/content/course";

export const metadata: Metadata = {
  title: "프롬프트 모음",
  description:
    "수업에서 쓴 프롬프트를 한 곳에 모았습니다. 복사해서 ChatGPT에 붙여넣기만 하면 됩니다.",
};

export default function PromptsPage() {
  const prompts = collectPrompts(weeks);

  // 슬라이드(주제)별로 묶어서 보여준다.
  const groups = prompts.reduce<
    { week: number; slideId: string; slideTitle: string; items: typeof prompts }[]
  >((acc, p) => {
    const last = acc[acc.length - 1];
    if (last && last.slideId === p.slideId && last.week === p.week) {
      last.items.push(p);
    } else {
      acc.push({
        week: p.week,
        slideId: p.slideId,
        slideTitle: p.slideTitle,
        items: [p],
      });
    }
    return acc;
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8 sm:py-20">
      <p className="inline-flex items-center gap-2 rounded-lg bg-primary/12 px-3 py-1.5 text-base font-bold text-primary">
        <ClipboardList className="size-5" aria-hidden />
        프롬프트 모음
      </p>
      <h1 className="mt-6 text-3xl font-black tracking-tight text-balance sm:text-5xl">
        복사해서 붙여넣기만 하세요
      </h1>
      <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
        수업에서 쓴 문장을 전부 모아 두었습니다. 노란 칸은 눌러서 본인 것으로
        바꾸고, <span className="font-bold text-foreground">복사하기</span>를
        누른 다음 ChatGPT 입력창에 붙여넣으면 됩니다.
      </p>

      {groups.length === 0 && (
        <p className="mt-10 rounded-2xl border-2 border-border bg-muted/50 px-5 py-6 text-lg">
          아직 등록된 프롬프트가 없습니다.
        </p>
      )}

      {groups.map((g) => (
        <section key={`${g.week}-${g.slideId}`} className="mt-14">
          <div className="flex flex-wrap items-center gap-3 border-b-2 border-border pb-4">
            <span className="rounded-lg bg-foreground px-3 py-1 text-base font-bold text-background">
              {g.week}주차
            </span>
            <h2 className="text-2xl font-black tracking-tight">
              {g.slideTitle}
            </h2>
            <Link
              href={`/week/${g.week}#${g.slideId}`}
              className="text-base font-semibold underline underline-offset-4"
            >
              강의에서 보기
            </Link>
          </div>

          {g.items.length === 1 && g.items[0].image ? (
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <RevealPhoto image={g.items[0].image} />
              <PromptCard prompt={g.items[0]} scrollBody />
            </div>
          ) : (
            <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
              {g.items.map((p) => (
                <PromptCard key={p.id} prompt={p} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
