"use client";

import { Type } from "lucide-react";
import { usePrefs, type FontScale } from "@/lib/prefs";
import { cn } from "@/lib/utils";

const NEXT: Record<FontScale, FontScale> = {
  normal: "large",
  large: "xlarge",
  xlarge: "normal",
};

const LABEL: Record<FontScale, string> = {
  normal: "글씨 크게",
  large: "더 크게",
  xlarge: "원래대로",
};

/** 한 버튼을 계속 누르면 보통 → 크게 → 아주 크게 → 보통 으로 돕니다. */
export function FontScaleToggle({ className }: { className?: string }) {
  const { scale, setScale } = usePrefs();

  return (
    <button
      type="button"
      onClick={() => setScale(NEXT[scale])}
      aria-label={`글씨 크기 바꾸기 (지금: ${
        scale === "normal" ? "보통" : scale === "large" ? "크게" : "아주 크게"
      })`}
      className={cn(
        "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border-2 border-border px-2.5 text-base font-semibold text-foreground hover:bg-muted sm:h-12 sm:gap-2 sm:px-3",
        className,
      )}
    >
      <Type className="size-5" aria-hidden />
      <span>{LABEL[scale]}</span>
    </button>
  );
}
