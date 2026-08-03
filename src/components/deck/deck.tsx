"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  House,
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
  const [barHidden, setBarHidden] = useState(false);
  const lastYRef = useRef(0);
  const lockShowRef = useRef(0); // 이 시각(ms)까지는 자동 숨김을 잠근다
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
      // 버튼으로 이동할 때는 진행바를 보여주고, 뒤따르는 자동 스크롤이
      // 진행바를 숨기지 않도록 잠깐 잠근다.
      setBarHidden(false);
      lockShowRef.current = Date.now() + 800;
      el?.scrollIntoView({ behavior, block: "start" });
    },
    [],
  );

  // 발표 화면 빠져나오기 — ESC 키와 화면 위 '나가기' 버튼이 함께 쓴다.
  // 전체화면이 막힌 환경에서는 fullscreenElement 가 비어 있으므로,
  // 전체화면 해제와 상태 해제를 따로 처리해야 확실히 빠져나온다.
  const exitProjector = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
    } catch {
      // 이미 전체화면이 아니면 무시하고 상태만 되돌린다
    }
    setProjector(false);
  }, []);

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

  // 읽을 때 화면을 넓게 쓰도록: 아래로 스크롤하면 진행바를 접어 숨기고,
  // 위로 스크롤하거나 맨 위 근처면 다시 보여준다. (사이트 헤더는 흐름상
  // 스크롤되어 사라지므로, 둘이 합쳐져 깔끔한 강의 화면이 된다.)
  useEffect(() => {
    lastYRef.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY;
        const last = lastYRef.current;
        lastYRef.current = y;
        if (Date.now() < lockShowRef.current) return; // 버튼 이동 직후엔 유지
        if (y < 120) {
          setBarHidden(false);
          return;
        }
        const delta = y - last;
        if (delta > 6) setBarHidden(true); // 아래로 → 숨김
        else if (delta < -6) setBarHidden(false); // 위로 → 표시
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // #슬라이드id 로 들어온 경우, 오프셋을 잰 뒤 다시 정확히 맞춘다.
  useEffect(() => {
    if (offset === 0 || hashFixed.current || !window.location.hash) return;
    hashFixed.current = true;
    const el = document.getElementById(window.location.hash.slice(1));
    if (!el) return;
    // 폰트가 늦게 로드되면 위치가 밀리므로, 폰트 준비 후 한 번 더 맞춘다.
    lockShowRef.current = Date.now() + 1000; // 딥링크 착지 시 진행바 유지
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
        // 목차가 열려 있으면 목차부터, 아니면 발표 화면에서 빠져나온다.
        if (tocOpen) setTocOpen(false);
        else if (projector) exitProjector();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo, total, tocOpen, projector, exitProjector]);

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
      className={cn("bg-background pb-10", projector && "projector")}
    >
      {/*
        발표 화면 나가기 — 진행바는 스크롤하면 접히므로 여기에 따로 둔다.
        평소엔 옅게 있다가 마우스를 올리면 진해져서 강의 화면을 방해하지 않는다.
      */}
      {projector && (
        <button
          type="button"
          onClick={exitProjector}
          className="fixed top-4 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-xl border-2 border-border bg-background/90 px-4 text-base font-bold opacity-45 shadow-md backdrop-blur transition hover:opacity-100 focus-visible:opacity-100"
        >
          <Minimize className="size-5" aria-hidden />
          발표 화면 끄기 (ESC)
        </button>
      )}

      {/* 상단 진행 바 — 헤더 바로 아래에 붙는다 */}
      <div
        ref={barRef}
        className={cn(
          "deck-bar sticky top-0 z-30 border-b-2 border-border bg-background/95 backdrop-blur transition-transform duration-200",
          barHidden && "-translate-y-full",
        )}
      >
        <div className="mx-auto flex w-full max-w-5xl items-center gap-2.5 px-4 py-2.5 sm:gap-3 sm:px-8">
          {/*
            사이트 헤더는 강의 페이지에서 스크롤되어 사라진다.
            돌아갈 길이 없으면 안 되므로 처음 화면 버튼을 여기에 고정해 둔다.
          */}
          <Link
            href="/"
            title="처음 화면으로"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border-2 border-border hover:bg-muted"
          >
            <House className="size-5" aria-hidden />
            <span className="sr-only">처음 화면으로</span>
          </Link>

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
        <div className="mx-auto w-full max-w-5xl px-4 pt-5 sm:px-8 md:px-24">
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

      {/* 좌우 원형 이동 버튼 — 화면 세로 중앙에 고정 */}
      <button
        type="button"
        onClick={() => goTo(Math.max(current - 1, 0))}
        disabled={current === 0}
        aria-label="이전 장"
        className={cn(
          "fixed top-1/2 left-1 z-30 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-border bg-background/85 text-foreground shadow-md backdrop-blur transition hover:bg-muted disabled:pointer-events-none disabled:opacity-0 sm:left-5 sm:size-14",
        )}
      >
        <ChevronLeft className="size-7 sm:size-8" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => goTo(Math.min(current + 1, total - 1))}
        disabled={current >= total - 1}
        aria-label="다음 장"
        className={cn(
          "fixed top-1/2 right-1 z-30 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-0 sm:right-5 sm:size-14",
        )}
      >
        <ChevronRight className="size-7 sm:size-8" aria-hidden />
      </button>

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
