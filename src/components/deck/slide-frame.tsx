"use client";

import { TeacherNotes } from "@/components/deck/teacher-notes";
import type { Slide } from "@/lib/deck-types";
import { cn } from "@/lib/utils";

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
      aria-label={`${total}장 중 ${index + 1}번째 장: ${slide.nav}`}
      className={cn(
        // 한 화면 = 한 장. 내용은 위에서부터 채워 하단 고정 바에 덜 가리게 한다.
        // 짧은 장은 min-height 로 화면을 채우고, 긴 장은 자연스럽게 늘어난다.
        "deck-slide flex min-h-[calc(100svh-var(--deck-offset,6rem))] flex-col justify-start border-b-2 border-border py-5 sm:py-6",
        className,
      )}
    >
      {/*
        장 번호(1/16)와 성격 표시(설명·같이 해봐요)는 넣지 않는다.
        번호는 상단 진행바에 있고, 성격은 제목과 색으로 이미 드러난다.
        강의 화면에서는 내용 말고 아무것도 안 보이는 편이 낫다.
      */}
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-12 md:px-24 lg:px-32 xl:px-40">
        {children}

        <TeacherNotes notes={slide.notes} />
      </div>
    </section>
  );
}
