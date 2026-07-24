"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CopyState = "idle" | "copied" | "manual";

/**
 * 클립보드 복사 + 폴백.
 * 1) navigator.clipboard  2) textarea + execCommand  3) "길게 눌러 복사" 안내
 */
export function useCopy(resetMs = 2500) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(
    async (text: string) => {
      const done = (next: CopyState) => {
        setState(next);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setState("idle"), resetMs);
        return next === "copied";
      };

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          return done("copied");
        }
      } catch {
        // 아래 폴백으로 진행
      }

      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-1000px";
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, text.length);
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (ok) return done("copied");
      } catch {
        // 최종 폴백
      }

      return done("manual");
    },
    [resetMs],
  );

  return { state, copy };
}
