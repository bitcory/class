import type { Metadata } from "next";
import Image from "next/image";
import {
  Check,
  ExternalLink,
  Mail,
  MessageCircle,
  UserRound,
} from "lucide-react";
import { instructor } from "@/content/instructor";

const CONTACT_ICON = {
  chat: MessageCircle,
  mail: Mail,
  link: ExternalLink,
} as const;

export const metadata: Metadata = {
  title: "강사 소개",
  description: instructor.headline,
};

export default function InstructorPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8 sm:py-20">
      {/* 프로필 */}
      <div className="flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:gap-10">
        {/* 세로 인물 사진 — 정사각형으로 자르면 얼굴이 작아져서 3:4 그대로 쓴다 */}
        <div className="relative aspect-[3/4] w-44 shrink-0 overflow-hidden rounded-3xl border-2 border-border bg-muted sm:w-60">
          <Image
            src={instructor.photo}
            alt={`${instructor.name} 강사 사진`}
            fill
            priority
            sizes="(min-width: 640px) 240px, 176px"
            className="object-cover"
          />
          <span className="absolute inset-0 -z-10 flex items-center justify-center">
            <UserRound className="size-12 text-muted-foreground" aria-hidden />
          </span>
        </div>

        <div>
          <p className="text-base font-bold text-primary">{instructor.role}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-balance sm:text-5xl">
            {instructor.name}
            {instructor.nickname && (
              <span className="ml-2 text-xl font-bold text-muted-foreground sm:text-2xl">
                ({instructor.nickname})
              </span>
            )}
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-muted-foreground">
            {instructor.headline}
          </p>
        </div>
      </div>

      {/* 소개 */}
      <div className="mt-10 max-w-4xl space-y-4">
        {instructor.intro.map((p, i) => (
          <p key={i} className="text-xl leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      {/* 이런 걸 가르칩니다 */}
      <section className="mt-14">
        <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
          이렇게 가르칩니다
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {instructor.teaches.map((t) => (
            <li
              key={t.title}
              className="flex gap-4 rounded-2xl border-2 border-border p-6"
            >
              <Check className="mt-1 size-6 shrink-0 text-primary" aria-hidden />
              <span>
                <span className="block text-xl font-bold">{t.title}</span>
                <span className="mt-1.5 block text-lg text-muted-foreground">
                  {t.desc}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 걸어온 길 · 강의 이력 — 넓은 화면에서 나란히 */}
      <div className="mt-14 grid gap-x-10 gap-y-14 lg:grid-cols-2">
        <section>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            걸어온 길
          </h2>
          <ul className="mt-6 divide-y-2 divide-border overflow-hidden rounded-2xl border-2 border-border">
            {instructor.career.map((c, i) => (
              <li
                key={i}
                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6"
              >
                <span className="w-20 shrink-0 text-lg font-bold text-primary">
                  {c.year}
                </span>
                <span className="text-lg">{c.text}</span>
              </li>
            ))}
          </ul>

        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            강의 이력
          </h2>
          <ul className="mt-6 space-y-3">
            {instructor.lectures.map((l) => (
              <li key={l} className="flex gap-3 text-lg">
                <span
                  className="mt-3 size-2.5 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />
                {l}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-xl font-bold">수업에서 쓰는 도구</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {instructor.tools.map((t) => (
              <li
                key={t}
                className="rounded-lg border-2 border-border px-3 py-1.5 text-base font-semibold text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* 문의 */}
      <section className="mt-14 rounded-2xl border-2 border-border bg-muted/50 p-6">
        <h2 className="text-2xl font-black tracking-tight">
          궁금한 게 있으면
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          수업 중이든 끝난 뒤든 편하게 물어보세요. 사소한 질문일수록 좋습니다.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {instructor.contact.map((c) => {
            const Icon = CONTACT_ICON[c.icon];
            return (
              <a
                key={c.label}
                href={c.href}
                {...(c.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-foreground px-5 text-lg font-semibold text-background hover:bg-foreground/90"
              >
                <Icon className="size-5" aria-hidden />
                {c.label}
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
