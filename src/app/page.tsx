import Link from "next/link";
import {
  ArrowRight,
  Backpack,
  ClipboardList,
  CircleHelp,
  Play,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { course, weeks } from "@/content/course";

const QUICK = [
  {
    href: "/prompts",
    icon: ClipboardList,
    title: "프롬프트 모음",
    desc: "수업에서 쓴 문장을 한 곳에서 복사하세요.",
  },
  {
    href: "/help",
    icon: CircleHelp,
    title: "도움말",
    desc: "가입이 안 될 때, 화면이 영어일 때.",
  },
  {
    href: "/instructor",
    icon: UserRound,
    title: "강사 소개",
    desc: "어떤 사람이 어떻게 가르치는지.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* 히어로 */}
      <section className="border-b-2 border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
          <p className="inline-flex rounded-lg bg-primary/12 px-3 py-1.5 text-base font-bold text-primary">
            {course.name} · {course.subtitle}
          </p>
          <h1 className="mt-6 text-4xl leading-[1.2] font-black tracking-tight text-balance sm:text-7xl">
            AI, 어렵지 않습니다.
            <br />
            <span className="text-primary">말만 걸 줄 알면</span> 됩니다.
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            컴퓨터를 잘 몰라도 괜찮습니다. 
            <br />
            저와 함께 하나씩 배워보겠습니다.
            <br />
            오늘 이후에 여러분은 AI와 친구가 되리라 확신합니다.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl" className="w-full sm:w-auto">
              <Link href="/week/1">
                <Play aria-hidden />
                1주차 강의 시작하기
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link href="/prompts">프롬프트 모음 보기</Link>
            </Button>
          </div>

          <p className="mt-6 text-base text-muted-foreground">
            {course.target}
          </p>
          <p className="mt-3 text-base text-muted-foreground">
            EBS 특강 · AICREW 아카데미 수강생 342명을 가르치고 있습니다.
          </p>
        </div>
      </section>

      {/* 준비물 */}
      <section className="border-b-2 border-border bg-muted/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8">
          <h2 className="flex items-center gap-3 text-2xl font-black tracking-tight sm:text-3xl">
            <Backpack className="size-7 text-primary" aria-hidden />
            오늘 준비물은 이것뿐입니다
          </h2>
          <ul className="mt-7 grid gap-4 sm:grid-cols-3">
            {course.prepare.map((p, i) => (
              <li
                key={p.title}
                className="rounded-2xl border-2 border-border bg-background p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-foreground text-lg font-black text-background">
                  {i + 1}
                </span>
                <span className="mt-4 block text-xl font-bold">{p.title}</span>
                <span className="mt-1.5 block text-lg whitespace-pre-line text-muted-foreground">
                  {p.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4주 커리큘럼 */}
      <section className="border-b-2 border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            4주 동안 이렇게 배웁니다
          </h2>

          <ul className="mt-8 space-y-4">
            {weeks.map((w) => {
              const ready = w.status === "ready";
              return (
                <li key={w.week}>
                  <Link
                    href={`/week/${w.week}`}
                    className="flex items-start gap-4 rounded-2xl border-2 border-border p-5 transition-colors hover:border-foreground/40 hover:bg-muted/60 sm:p-6"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-lg font-black">
                      {w.week}주
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-xl font-bold tracking-tight sm:text-2xl">
                          {w.title}
                        </span>
                        {ready ? (
                          <span className="rounded-lg bg-primary px-2.5 py-1 text-sm font-bold text-primary-foreground">
                            지금 볼 수 있습니다.
                          </span>
                        ) : (
                          <span className="rounded-lg bg-muted px-2.5 py-1 text-sm font-bold text-muted-foreground">
                            준비 중
                          </span>
                        )}
                      </span>
                      <span className="mt-2 block text-lg text-muted-foreground">
                        {w.summary}
                      </span>
                      <span className="mt-2 block text-base text-muted-foreground">
                        {w.duration}
                      </span>
                    </span>
                    <ArrowRight
                      className="mt-1 size-6 shrink-0 text-muted-foreground"
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 바로가기 */}
      <section>
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            필요할 때 여기로 오세요
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {QUICK.map((q) => (
              <li key={q.href}>
                <Link
                  href={q.href}
                  className="flex h-full flex-col rounded-2xl border-2 border-border p-5 transition-colors hover:border-foreground/40 hover:bg-muted/60"
                >
                  <q.icon className="size-8 text-primary" aria-hidden />
                  <span className="mt-4 text-xl font-bold">{q.title}</span>
                  <span className="mt-2 text-lg text-muted-foreground">
                    {q.desc}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
