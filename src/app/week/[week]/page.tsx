import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarClock } from "lucide-react";
import { Deck } from "@/components/deck/deck";
import { Button } from "@/components/ui/button";
import { getWeek, weeks } from "@/content/course";

type Params = { params: Promise<{ week: string }> };

export function generateStaticParams() {
  return weeks.map((w) => ({ week: String(w.week) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { week } = await params;
  const found = getWeek(Number(week));
  if (!found) return { title: "강의를 찾을 수 없습니다" };
  return {
    title: `${found.week}주차 · ${found.title}`,
    description: found.summary,
  };
}

export default async function WeekPage({ params }: Params) {
  const { week } = await params;
  const found = getWeek(Number(week));
  if (!found) notFound();

  if (found.status === "preparing" || found.slides.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
        <p className="text-lg font-bold text-primary">{found.week}주차</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          {found.title}
        </h1>
        <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
          {found.summary}
        </p>

        <div className="mt-10 flex items-center gap-3 rounded-2xl border-2 border-border bg-muted/50 px-5 py-5">
          <CalendarClock className="size-6 shrink-0 text-primary" aria-hidden />
          <p className="text-lg font-semibold">
            아직 준비 중입니다. 강의 자료가 올라오면 이 자리에 바로 보입니다.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/week/1">1주차 강의 보기</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/prompts">프롬프트 모음</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <Deck week={found} />;
}
