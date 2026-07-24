"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  List,
  Maximize,
  Minimize,
  X,
} from "lucide-react";
import { SlideView } from "@/components/deck/slide-view";
import { Button } from "@/components/ui/button";
import { usePrefs } from "@/lib/prefs";
import type { Week } from "@/lib/deck-types";
import { cn } from "@/lib/utils";

export function Deck({ week }: { week: Week }) {
  const slides = week.slides;
  const total = slides.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const hashFixed = useRef(false);
  const [offset, setOffset] = useState(0);
  const [current, setCurrent] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);
  const [resumeAt, setResumeAt] = useState<number | null>(null);
  const [projector, setProjector] = useState(false);
  const { teacher, ready } = usePrefs();

  const storageKey = `tbclass:progress:week-${week.week}`;

  // 이웃 장으로 갈 때만 부드럽게. 목차·이어보기처럼 멀리 뛸 때는 즉시 이동
  // (수천 픽셀을 스르륵 넘기면 어지럽고 오래 걸린다).
  const goTo = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const clamped = Math.max(0, index);
      const el = document.querySelector<HTMLElement>(
        `[data-slide-index="${clamped}"]`,
      );
      el?.scrollIntoView({ behavior, block: "start" });
    },
    [],
  );

  // 현재 슬라이드 추적 — 화면 한가운데를 지나는 장을 '현재'로 본다.
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-slide-index]"),
    );
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.slideIndex,
            );
            setCurrent(index);
            localStorage.setItem(storageKey, String(index));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [storageKey, total]);

  // 발표 화면에서는 사이트 헤더·푸터를 숨겨 화면을 꽉 쓴다.
  useEffect(() => {
    document.documentElement.classList.toggle("projector-mode", projector);
    return () => document.documentElement.classList.remove("projector-mode");
  }, [projector]);

  // 진행바가 top:0 에 고정되므로, 슬라이드가 진행바에 가리지 않도록
  // 진행바 높이만큼만 오프셋으로 잡는다. (헤더는 스크롤되어 사라진다)
  useEffect(() => {
    const measure = () => {
      const bar = barRef.current?.getBoundingClientRect().height ?? 0;
      setOffset(Math.round(bar + 8));
    };
    // 글자 크기가 바뀐 뒤에 재야 하므로 다음 프레임에 측정한다.
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [projector]);

  // #슬라이드id 로 들어온 경우, 오프셋을 잰 뒤 다시 정확히 맞춘다.
  useEffect(() => {
    if (offset === 0 || hashFixed.current || !window.location.hash) return;
    hashFixed.current = true;
    const el = document.getElementById(window.location.hash.slice(1));
    if (!el) return;
    // 폰트가 늦게 로드되면 위치가 밀리므로, 폰트 준비 후 한 번 더 맞춘다.
    const align = () => el.scrollIntoView({ behavior: "auto", block: "start" });
    align();
    document.fonts?.ready.then(align);
    const t = setTimeout(align, 400);
    return () => clearTimeout(t);
  }, [offset]);

  // 이어보기 배너
  useEffect(() => {
    const saved = Number(localStorage.getItem(storageKey) ?? "0");
    if (saved > 0 && saved < total && window.scrollY < 10) setResumeAt(saved);
  }, [storageKey, total]);

  // 키보드 이동 (강사 노트북용)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      )
        return;

      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(Math.min(current + 1, total - 1));
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(Math.max(current - 1, 0));
      } else if (e.key === "Escape") {
        setTocOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo, total]);

  // 덱만 전체화면으로 만들면 문서 스크롤과 어긋나 슬라이드가 잘린다.
  // 문서 전체를 전체화면으로 띄우고, 사이트 헤더는 CSS로 숨긴다.
  const toggleProjector = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setProjector(true);
      } else {
        await document.exitFullscreen();
        setProjector(false);
      }
    } catch {
      // 전체화면이 막힌 환경(iOS 등)에서도 넓은 화면 모드는 쓸 수 있게
      setProjector((v) => !v);
    }
  };

  useEffect(() => {
    const onChange = () => setProjector(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const currentSlide = slides[current];
  const percent = total > 1 ? ((current + 1) / total) * 100 : 100;

  return (
    <div
      ref={containerRef}
      style={
        offset > 0
          ? ({ "--deck-offset": `${offset}px` } as React.CSSProperties)
          : undefined
      }
      className={cn("bg-background pb-28", projector && "projector")}
    >
      {/* 상단 진행 바 — 헤더 바로 아래에 붙는다 */}
      <div
        ref={barRef}
        className="deck-bar sticky top-0 z-30 border-b-2 border-border bg-background/95 backdrop-blur"
      >
        <div className="mx-auto flex w-full max-w-5xl items-center gap-2.5 px-4 py-2.5 sm:gap-3 sm:px-8">
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold">
              {week.week}주차 · {currentSlide?.nav ?? week.title}
            </p>
            <div
              className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={total}
              aria-valuenow={current + 1}
              aria-label="강의 진행률"
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <span className="shrink-0 text-base font-bold text-muted-foreground tabular-nums">
            {current + 1}/{total}
          </span>

          {ready && teacher && currentSlide?.notes?.time && (
            <span className="hidden shrink-0 items-center gap-1.5 rounded-lg bg-accent/10 px-2.5 py-1 text-base font-bold text-accent sm:inline-flex">
              <Clock className="size-4" aria-hidden />
              {currentSlide.notes.time}
            </span>
          )}

          {ready && teacher && (
            <button
              type="button"
              onClick={toggleProjector}
              aria-pressed={projector}
              className={cn(
                "hidden size-11 shrink-0 items-center justify-center rounded-xl border-2 sm:inline-flex",
                projector
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-muted",
              )}
              title={projector ? "발표 화면 끄기" : "발표 화면 (전체화면)"}
            >
              {projector ? (
                <Minimize className="size-5" aria-hidden />
              ) : (
                <Maximize className="size-5" aria-hidden />
              )}
              <span className="sr-only">
                발표 화면 {projector ? "끄기" : "켜기"}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setTocOpen(true)}
            className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border-2 border-border px-3 text-base font-semibold hover:bg-muted"
          >
            <List className="size-5" aria-hidden />
            목차
          </button>
        </div>
      </div>

      {/* 이어보기 */}
      {resumeAt !== null && (
        <div className="mx-auto w-full max-w-5xl px-4 pt-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-primary/40 bg-primary/5 px-5 py-4">
            <p className="text-lg font-semibold">
              지난번 {resumeAt + 1}번째 장까지 보셨어요.
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => {
                  goTo(resumeAt, "auto");
                  setResumeAt(null);
                }}
              >
                이어서 보기
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setResumeAt(null)}
              >
                처음부터
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 슬라이드 */}
      {slides.map((slide, i) => (
        <SlideView key={slide.id} slide={slide} index={i} total={total} />
      ))}

      {/* 하단 이동 바 */}
      <div className="deck-nav fixed inset-x-0 bottom-0 z-30 border-t-2 border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-3 sm:px-8">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => goTo(Math.max(current - 1, 0))}
            disabled={current === 0}
          >
            <ChevronUp aria-hidden />
            이전
          </Button>
          <Button
            size="lg"
            className="flex-[2]"
            onClick={() => goTo(Math.min(current + 1, total - 1))}
            disabled={current >= total - 1}
          >
            다음
            <ChevronDown aria-hidden />
          </Button>
        </div>
      </div>

      {/* 목차 */}
      {tocOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
          <button
            type="button"
            aria-label="목차 닫기"
            className="absolute inset-0"
            onClick={() => setTocOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="강의 목차"
            className="relative max-h-[80svh] w-full max-w-lg overflow-y-auto rounded-t-3xl border-2 border-border bg-background p-5 sm:rounded-3xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xl font-black tracking-tight">목차</p>
              <button
                type="button"
                onClick={() => setTocOpen(false)}
                className="inline-flex size-12 items-center justify-center rounded-xl border-2 border-border hover:bg-muted"
              >
                <X className="size-5" aria-hidden />
                <span className="sr-only">닫기</span>
              </button>
            </div>
            <ul className="space-y-1.5">
              {slides.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setTocOpen(false);
                      setResumeAt(null);
                      requestAnimationFrame(() => goTo(i, "auto"));
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-lg font-semibold",
                      i === current
                        ? "bg-foreground text-background"
                        : "hover:bg-muted",
                    )}
                  >
                    <span className="w-7 shrink-0 tabular-nums opacity-70">
                      {i + 1}
                    </span>
                    {s.nav}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
