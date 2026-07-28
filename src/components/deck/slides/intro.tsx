"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import type { Slide } from "@/lib/deck-types";

type Of<T extends Slide["type"]> = Extract<Slide, { type: T }>;

const H2 = "text-3xl font-black tracking-tight sm:text-5xl";
const LEAD = "text-xl leading-relaxed sm:text-[1.7rem] sm:leading-[1.6]";
const MEASURE = "max-w-3xl";

export function StorySlide({ slide }: { slide: Of<"story"> }) {
  return (
    <div>
      <h2 className={H2}>{slide.title}</h2>
      {slide.lead && (
        <p className={`mt-4 ${MEASURE} ${LEAD} text-muted-foreground`}>
          {slide.lead}
        </p>
      )}

      <ol className="mt-6 grid gap-3 sm:grid-cols-2">
        {slide.steps.map((s, i) => (
          <li
            key={i}
            className={
              s.highlight
                ? "rounded-2xl border-2 border-primary bg-primary/10 p-5 sm:p-6"
                : "rounded-2xl border-2 border-border p-5 sm:p-6"
            }
          >
            <span
              className={
                s.highlight
                  ? "text-base font-bold text-primary"
                  : "text-base font-bold text-muted-foreground"
              }
            >
              {s.era}
            </span>
            <span className="mt-1.5 block text-xl font-bold sm:text-2xl">
              {s.title}
            </span>
            <span className="mt-2 block text-lg text-muted-foreground sm:text-xl">
              {s.desc}
            </span>
          </li>
        ))}
      </ol>

      {slide.quote && (
        <p className="mt-6 flex gap-3 rounded-2xl bg-muted px-5 py-5 text-lg font-semibold sm:text-xl">
          <Quote className="size-6 shrink-0 text-primary" aria-hidden />
          {slide.quote}
        </p>
      )}
      {slide.point && (
        <p className="mt-4 text-xl font-bold sm:text-2xl">{slide.point}</p>
      )}
    </div>
  );
}

export function GallerySlide({ slide }: { slide: Of<"gallery"> }) {
  return (
    <div>
      <h2 className={H2}>{slide.title}</h2>
      {slide.lead && (
        <p className={`mt-4 ${MEASURE} ${LEAD} text-muted-foreground`}>
          {slide.lead}
        </p>
      )}

      {slide.stats && (
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {slide.stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-muted px-5 py-4">
              <dt className="text-2xl font-black tracking-tight text-primary sm:text-3xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-lg text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      )}

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {slide.photos.map((p) => (
          <li
            key={p.src}
            className="overflow-hidden rounded-2xl border-2 border-border"
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={1400}
              height={1050}
              sizes="(min-width: 640px) 45vw, 100vw"
              // 강의 중 목차로 건너뛰어도 빈칸이 보이지 않게 미리 받는다 (4장·약 1MB)
              loading="eager"
              className="aspect-[4/3] w-full object-cover"
            />
            <p className="border-t-2 border-border px-4 py-3 text-lg font-bold">
              {p.caption}
            </p>
          </li>
        ))}
      </ul>

      {slide.footer && (
        <p className="mt-6 text-xl font-bold sm:text-2xl">{slide.footer}</p>
      )}
    </div>
  );
}
