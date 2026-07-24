"use client";

import { TeacherNotes } from "@/components/deck/teacher-notes";
import type { Slide, Tone } from "@/lib/deck-types";
import { cn } from "@/lib/utils";

const TONE_LABEL: Record<Tone, string> = {
  concept: "설명",
  practice: "같이 해봐요",
  warning: "꼭 기억하세요",
  done: "정리",
};

const TONE_STYLE: Record<Tone, string> = {
  concept: "bg-tone-concept/10 text-tone-concept",
  practice: "bg-tone-practice/12 text-tone-practice",
  warning: "bg-tone-warning/12 text-tone-warning",
  done: "bg-tone-done/12 text-tone-done",
};

export function SlideFrame({
  slide,
  index,
  total,
  children,
  className,
}: {
  slide: Slide;
  index: number;
  total: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={slide.id}
      data-slide-index={index}
      aria-label={`${index + 1}번째 장: ${slide.nav}`}
      className={cn(
        // 한 화면 = 한 장. 내용은 위에서부터 채워 하단 고정 바에 덜 가리게 한다.
        // 짧은 장은 min-height 로 화면을 채우고, 긴 장은 자연스럽게 늘어난다.
        "deck-slide flex min-h-[calc(100svh-var(--deck-offset,6rem)-5.5rem)] flex-col justify-start border-b-2 border-border py-5 sm:py-6",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-8">
        <div className="mb-4 flex items-center gap-3">
          <span
            className={cn(
              "rounded-lg px-3 py-1 text-base font-bold",
              TONE_STYLE[slide.tone],
            )}
          >
            {TONE_LABEL[slide.tone]}
          </span>
          <span className="text-base font-semibold text-muted-foreground">
            {index + 1} / {total}
          </span>
        </div>

        {children}

        <TeacherNotes notes={slide.notes} />
      </div>
    </section>
  );
}
