"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, ExternalLink, ThumbsDown, ThumbsUp } from "lucide-react";
import { PromptCard } from "@/components/prompt/prompt-card";
import { HighlightText } from "@/components/deck/highlight-text";
import type { Slide } from "@/lib/deck-types";
import { cn } from "@/lib/utils";

type Of<T extends Slide["type"]> = Extract<Slide, { type: T }>;

const H2 = "text-3xl font-black tracking-tight sm:text-5xl";
const LEAD = "text-xl leading-relaxed sm:text-[1.7rem] sm:leading-[1.6]";
const MEASURE = "max-w-3xl";

export function CompareSlide({ slide }: { slide: Of<"compare"> }) {
  return (
    <div>
      <h2 className={H2}>
        <HighlightText text={slide.title} match="4가지" />
      </h2>
      {slide.lead && (
        <p className={`mt-4 ${MEASURE} ${LEAD} text-muted-foreground`}>{slide.lead}</p>
      )}

      {/* 모바일 — 카드 스택 */}
      <div className="mt-6 space-y-4 md:hidden">
        {slide.tools.map((t) => (
          <div key={t.name} className="rounded-2xl border-2 border-border p-5">
            <div className="flex flex-wrap items-center gap-2">
              {t.url ? (
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-2xl font-black tracking-tight text-primary underline decoration-2 underline-offset-4"
                >
                  {t.name}
                  <ExternalLink className="size-5 shrink-0" aria-hidden />
                </a>
              ) : (
                <span className="text-2xl font-black tracking-tight">
                  {t.name}
                </span>
              )}
              {t.note && (
                <span className="rounded-lg bg-primary/12 px-2.5 py-1 text-sm font-bold whitespace-nowrap text-primary">
                  {t.note}
                </span>
              )}
            </div>
            <p className="mt-3 text-lg font-semibold">{t.good}</p>
            <p className="mt-2 text-lg sm:text-xl text-muted-foreground">“{t.say}”</p>
          </div>
        ))}
      </div>

      {/* 데스크톱 — 표 */}
      <div className="mt-6 hidden overflow-hidden rounded-2xl border-2 border-border md:block">
        <table className="w-full text-left">
          <thead className="bg-muted">
            <tr className="text-lg">
              <th className="w-52 px-5 py-3 font-bold">도구</th>
              <th className="px-5 py-3 font-bold">무엇을 잘하나</th>
              <th className="px-5 py-3 font-bold">쉽게 말하면</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-border">
            {slide.tools.map((t) => (
              <tr key={t.name} className="align-top">
                <td className="px-5 py-4">
                  {t.url ? (
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xl font-black tracking-tight text-primary underline decoration-2 underline-offset-4"
                    >
                      {t.name}
                      <ExternalLink className="size-4 shrink-0" aria-hidden />
                    </a>
                  ) : (
                    <span className="text-xl font-black tracking-tight">
                      {t.name}
                    </span>
                  )}
                  {t.note && (
                    <span className="mt-2 inline-block rounded-lg bg-primary/12 px-2.5 py-1 text-sm font-bold whitespace-nowrap text-primary">
                      {t.note}
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-lg font-semibold">{t.good}</td>
                <td className="px-5 py-4 text-lg sm:text-xl text-muted-foreground">
                  “{t.say}”
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StepsSlide({ slide }: { slide: Of<"steps"> }) {
  const key = slide.storageKey ? `tbclass:${slide.storageKey}` : null;
  const [done, setDone] = useState<boolean[]>(() => slide.steps.map(() => false));

  useEffect(() => {
    if (!key) return;
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? "null");
      if (Array.isArray(saved) && saved.length === slide.steps.length)
        setDone(saved.map(Boolean));
    } catch {
      /* 저장된 값이 깨졌으면 무시 */
    }
  }, [key, slide.steps.length]);

  const toggle = (i: number) => {
    setDone((prev) => {
      const next = prev.map((v, idx) => (idx === i ? !v : v));
      if (key) localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };

  return (
    <div>
      <h2 className={H2}>{slide.title}</h2>
      {slide.lead && (
        <p className={`mt-4 ${MEASURE} ${LEAD} text-muted-foreground`}>{slide.lead}</p>
      )}

      <ol className="mt-6 space-y-3">
        {slide.steps.map((s, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={done[i]}
              className={cn(
                "flex w-full gap-4 rounded-2xl border-2 p-5 text-left transition-colors",
                done[i]
                  ? "border-tone-done/50 bg-tone-done/8"
                  : "border-border hover:bg-muted",
              )}
            >
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full text-lg font-black",
                  done[i]
                    ? "bg-tone-done text-white"
                    : "bg-primary text-primary-foreground",
                )}
                aria-hidden
              >
                {done[i] ? <Check className="size-6" /> : i + 1}
              </span>
              <span>
                <span
                  className={cn(
                    "block text-xl font-bold sm:text-2xl",
                    done[i] && "text-muted-foreground line-through",
                  )}
                >
                  {s.label}
                </span>
                {s.detail && (
                  <span className="mt-2 block text-lg sm:text-xl text-muted-foreground">
                    {s.detail}
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <p className="mt-5 text-base text-muted-foreground">
        다 하신 칸은 눌러서 표시해 두세요. 어디까지 했는지 저장됩니다.
      </p>
    </div>
  );
}

export function PromptSlide({ slide }: { slide: Of<"prompt"> }) {
  return (
    <div>
      <h2 className={H2}>{slide.title}</h2>
      {slide.lead && (
        <p className={`mt-4 ${MEASURE} ${LEAD} text-muted-foreground`}>{slide.lead}</p>
      )}
      {/* 카드가 2개 이상이면 넓은 화면에서 2단으로 — 세로로 길어져 하단이
          가려지는 걸 막고, 남는 좌우 공간을 활용한다. */}
      <div
        className={cn(
          "mt-6",
          slide.prompts.length > 1
            ? "grid gap-6 lg:grid-cols-2"
            : "space-y-6",
        )}
      >
        {slide.prompts.map((p) => (
          <PromptCard key={p.id} prompt={p} />
        ))}
      </div>
    </div>
  );
}

export function PhotoPromptSlide({ slide }: { slide: Of<"photo-prompt"> }) {
  return (
    <div>
      <h2 className={H2}>{slide.title}</h2>
      {slide.lead && (
        <p className={`mt-4 ${MEASURE} ${LEAD} text-muted-foreground`}>{slide.lead}</p>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-start">
        <figure className="overflow-hidden rounded-2xl border-2 border-border">
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            width={900}
            height={900}
            className="h-auto w-full object-cover"
          />
          {slide.image.caption && (
            <figcaption className="border-t-2 border-border bg-muted/60 px-4 py-3 text-base font-semibold text-muted-foreground">
              {slide.image.caption}
            </figcaption>
          )}
        </figure>

        <PromptCard prompt={slide.prompt} />
      </div>
    </div>
  );
}

export function RulesSlide({ slide }: { slide: Of<"rules"> }) {
  return (
    <div>
      <h2 className={H2}>{slide.title}</h2>
      {slide.lead && (
        <p className={`mt-4 ${MEASURE} ${LEAD} text-muted-foreground`}>{slide.lead}</p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {slide.rules.map((r) => (
          <div
            key={r.title}
            className="rounded-2xl border-2 border-border p-5"
          >
            <p className="text-xl font-black tracking-tight">{r.title}</p>
            <p className="mt-2 text-lg sm:text-xl text-muted-foreground">{r.desc}</p>
            <p className="mt-4 rounded-xl bg-muted px-3.5 py-3 text-lg font-semibold">
              {r.example}
            </p>
          </div>
        ))}
      </div>

      {slide.versus && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-border bg-muted/40 p-5">
            <p className="flex items-center gap-2 text-lg font-bold text-muted-foreground">
              <ThumbsDown className="size-5" aria-hidden />
              그냥 물어보면
            </p>
            <p className="mt-3 text-xl font-semibold">
              “{slide.versus.before.text}”
            </p>
            <p className="mt-3 text-lg sm:text-xl text-muted-foreground">
              {slide.versus.before.note}
            </p>
          </div>
          <div className="rounded-2xl border-2 border-primary/50 bg-primary/5 p-5">
            <p className="flex items-center gap-2 text-lg font-bold text-primary">
              <ThumbsUp className="size-5" aria-hidden />
              이렇게 물어보면
            </p>
            <p className="mt-3 text-xl font-semibold">
              “{slide.versus.after.text}”
            </p>
            <p className="mt-3 text-lg sm:text-xl text-muted-foreground">
              {slide.versus.after.note}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
