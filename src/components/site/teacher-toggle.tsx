"use client";

import { Presentation } from "lucide-react";
import { usePrefs } from "@/lib/prefs";
import { cn } from "@/lib/utils";

/** 강사 모드 — 켜면 슬라이드에 진행 대본이 붙는다. 수강생 화면에는 흔적이 남지 않는다. */
export function TeacherToggle({ className }: { className?: string }) {
  const { teacher, setTeacher, ready } = usePrefs();

  return (
    <button
      type="button"
      onClick={() => setTeacher(!teacher)}
      aria-pressed={ready ? teacher : undefined}
      title="강사 모드"
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-xl border-2 transition-colors sm:size-12",
        ready && teacher
          ? "border-primary bg-primary text-primary-foreground"
          : "border-transparent text-muted-foreground/50 hover:border-border hover:text-foreground",
        className,
      )}
    >
      <Presentation className="size-5" aria-hidden />
      <span className="sr-only">강사 모드 {teacher ? "끄기" : "켜기"}</span>
    </button>
  );
}
