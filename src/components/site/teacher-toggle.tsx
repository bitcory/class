"use client";

import { Presentation } from "lucide-react";
import { usePrefs } from "@/lib/prefs";
import { cn } from "@/lib/utils";

/**
 * 강사 모드가 '켜져 있을 때만' 보이는 끄기 버튼.
 * 수강생 화면(강사 모드 꺼짐)에는 아무것도 렌더되지 않는다.
 * 켜는 것은 오직 비밀 암호 링크(?teacher=<암호>)로만 가능하다.
 */
export function TeacherToggle({ className }: { className?: string }) {
  const { teacher, setTeacher, ready } = usePrefs();

  if (!ready || !teacher) return null;

  return (
    <button
      type="button"
      onClick={() => setTeacher(false)}
      title="강사 모드 끄기"
      className={cn(
        "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border-2 border-primary bg-primary px-2.5 text-base font-semibold text-primary-foreground sm:h-12 sm:px-3",
        className,
      )}
    >
      <Presentation className="size-5" aria-hidden />
      <span>강사 모드 끄기</span>
    </button>
  );
}
