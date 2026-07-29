"use client";

import { ArrowRight, Check, CircleAlert, Quote } from "lucide-react";
import type { Slide } from "@/lib/deck-types";

type Of<T extends Slide["type"]> = Extract<Slide, { type: T }>;

// 데스크톱 글씨를 키워 넓어진 본문 폭을 활용한다. 모바일 크기는 유지.
const H1 = "text-3xl font-black tracking-tight sm:text-6xl";
const H2 = "text-3xl font-black tracking-tight sm:text-5xl";
const LEAD = "text-xl leading-relaxed sm:text-[1.7rem] sm:leading-[1.6]";
// 읽는 문단은 너무 넓으면 눈이 피로하므로 폭을 제한한다.
const MEASURE = "max-w-3xl";

export function CoverSlide({ slide }: { slide: Of<"cover"> }) {
  return (
    // 표지는 한 장 전체를 써서 가운데로 모은다. 회차가 가장 크게 보인다.
    // 모바일에서는 좌우 이동 버튼(size-12)에 글자가 가리지 않도록 여백을 준다.
    <div className="flex min-h-[60svh] flex-col items-center justify-center px-11 text-center sm:px-0">
      {slide.label && (
        <p className="text-6xl font-black tracking-tight text-primary sm:text-8xl">
          {slide.label}
        </p>
      )}
      <h1 className={`mt-4 text-balance ${H1}`}>{slide.title}</h1>
      <p className={`mt-5 ${MEASURE} ${LEAD} text-balance text-muted-foreground`}>
        {slide.subtitle}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {slide.meta.map((m) => (
          <span
            key={m}
            className="rounded-lg border-2 border-border px-3 py-1.5 text-base font-semibold text-muted-foreground"
          >
            {m}
          </span>
        ))}
      </div>

      <p className="mt-10 flex items-center gap-2 text-lg font-semibold text-primary">
        아래로 넘기면 시작합니다 <ArrowRight className="size-5" aria-hidden />
      </p>
    </div>
  );
}

export function GoalSlide({ slide }: { slide: Of<"goal"> }) {
  return (
    <div>
      <h2 className={H2}>{slide.title}</h2>
      {slide.lead && (
        <p className={`mt-4 ${MEASURE} ${LEAD} text-muted-foreground`}>{slide.lead}</p>
      )}
      <ol className="mt-6 space-y-3">
        {slide.items.map((it, i) => (
          <li
            key={i}
            className="flex gap-4 rounded-2xl border-2 border-border p-5"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-black text-primary-foreground">
              {i + 1}
            </span>
            <span>
              <span className="block text-xl font-bold sm:text-2xl">
                {it.text}
              </span>
              {it.sub && (
                <span className="mt-1.5 block text-lg sm:text-xl text-muted-foreground">
                  {it.sub}
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PointSlide({ slide }: { slide: Of<"point"> }) {
  return (
    <div>
      <h2 className={H2}>{slide.title}</h2>
      <p className={`mt-4 ${MEASURE} ${LEAD} font-semibold`}>{slide.lead}</p>
      {slide.body && (
        <ul className="mt-6 space-y-3">
          {slide.body.map((b, i) => (
            <li key={i} className="flex gap-3 text-xl sm:text-2xl">
              <span
                className="mt-3 size-2.5 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {slide.quote && (
        <p className="mt-6 flex gap-3 rounded-2xl bg-muted px-5 py-5 text-lg font-semibold sm:text-xl">
          <Quote className="size-6 shrink-0 text-primary" aria-hidden />
          {slide.quote}
        </p>
      )}
    </div>
  );
}

export function AnalogySlide({ slide }: { slide: Of<"analogy"> }) {
  return (
    <div>
      <h2 className={H2}>{slide.title}</h2>
      {slide.lead && (
        <p className={`mt-4 ${MEASURE} ${LEAD} text-muted-foreground`}>{slide.lead}</p>
      )}
      <div className="mt-6 space-y-4">
        {slide.pairs.map((p, i) => (
          <div key={i} className="rounded-2xl border-2 border-border p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="rounded-xl bg-foreground px-4 py-2 text-center text-xl font-black text-background sm:text-2xl">
                {p.term}
              </span>
              <ArrowRight
                className="size-6 rotate-90 self-center text-muted-foreground sm:rotate-0"
                aria-hidden
              />
              <span className="text-xl font-bold sm:text-2xl">{p.means}</span>
            </div>
            {p.caption && (
              <p className="mt-4 text-lg sm:text-xl text-muted-foreground">{p.caption}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function WarningSlide({ slide }: { slide: Of<"warning"> }) {
  return (
    <div>
      <div className="rounded-2xl border-2 border-tone-warning/40 bg-tone-warning/5 p-6 sm:p-8">
        <p className="flex items-center gap-2.5 text-lg font-bold text-tone-warning">
          <CircleAlert className="size-6" aria-hidden />
          주의
        </p>
        <h2 className={`mt-4 ${H2}`}>{slide.title}</h2>
        <p className={`mt-4 ${MEASURE} ${LEAD} font-semibold`}>{slide.lead}</p>
        <ul className="mt-6 space-y-3">
          {slide.points.map((p, i) => (
            <li key={i} className="flex gap-3 text-xl sm:text-2xl">
              <span
                className="mt-3 size-2.5 shrink-0 rounded-full bg-tone-warning"
                aria-hidden
              />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SummarySlide({ slide }: { slide: Of<"summary"> }) {
  return (
    <div>
      <h2 className={H2}>{slide.title}</h2>
      {slide.lead && (
        <p className={`mt-4 ${MEASURE} ${LEAD} text-muted-foreground`}>{slide.lead}</p>
      )}
      <ul className="mt-6 divide-y-2 divide-border overflow-hidden rounded-2xl border-2 border-border">
        {slide.lines.map((l, i) => (
          <li
            key={i}
            className="flex flex-col gap-1 px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-lg sm:text-xl text-muted-foreground sm:text-xl">
              {l.label}
            </span>
            <span className="text-2xl font-black tracking-tight text-primary sm:text-3xl">
              {l.value}
            </span>
          </li>
        ))}
      </ul>
      {slide.footer && (
        <p className="mt-6 rounded-2xl bg-muted px-5 py-4 text-lg font-semibold">
          {slide.footer}
        </p>
      )}
    </div>
  );
}

export function NextSlide({ slide }: { slide: Of<"next"> }) {
  return (
    <div>
      <h2 className={H2}>{slide.title}</h2>
      <p className={`mt-4 ${MEASURE} ${LEAD} text-muted-foreground`}>{slide.lead}</p>

      <ul className="mt-6 space-y-3">
        {slide.done.map((d, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-xl bg-tone-done/8 px-4 py-3.5 text-lg font-semibold sm:text-xl"
          >
            <Check className="mt-1 size-6 shrink-0 text-tone-done" aria-hidden />
            {d}
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl border-2 border-primary/40 bg-primary/5 p-6">
        <p className="text-base font-bold text-primary">다음 주 예고</p>
        <p className="mt-2 text-xl font-black tracking-tight sm:text-2xl">
          {slide.preview.title}
        </p>
        <p className="mt-3 text-lg sm:text-xl text-muted-foreground">
          {slide.preview.desc}
        </p>
      </div>

      {slide.reminders && (
        <ul className="mt-8 space-y-2.5">
          {slide.reminders.map((r, i) => (
            <li key={i} className="flex gap-3 text-lg">
              <span
                className="mt-3 size-2.5 shrink-0 rounded-full bg-foreground/40"
                aria-hidden
              />
              {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
