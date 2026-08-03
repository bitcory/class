"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontScaleToggle } from "@/components/site/font-scale-toggle";
import { TeacherToggle } from "@/components/site/teacher-toggle";
import { weeks } from "@/content/course";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "프롬프트 모음", href: "/prompts" },
  { label: "강사 소개", href: "/instructor" },
  { label: "도움말", href: "/help" },
];

export function Header() {
  const pathname = usePathname();

  // 강의(슬라이드) 화면에서는 헤더를 고정하지 않는다.
  // 스크롤하면 헤더가 위로 사라지고 진행바만 남아 화면을 넓게 쓴다.
  // (맨 위로 올리면 헤더가 다시 나와 메뉴를 쓸 수 있다.)
  const onDeck = pathname.startsWith("/week/");

  return (
    <header
      className={cn(
        "z-40 border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85",
        onDeck ? "relative" : "sticky top-0",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-2 px-4 sm:h-20 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 rounded-lg py-1 pr-1 text-lg font-black tracking-tight sm:text-xl"
        >
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            AI
          </span>
          <span className="truncate leading-tight">
            AI 활용과정
            <span className="ml-2 hidden text-base font-semibold text-muted-foreground lg:inline">
              4주 과정
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          <ul className="flex items-center gap-1 rounded-xl bg-muted/60 p-1">
            {weeks.map((w) => {
              const href = `/week/${w.week}`;
              const active = pathname === href;
              return (
                <li key={w.week}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-center rounded-lg px-3.5 py-2 text-lg font-black transition-colors",
                      active
                        ? "bg-background text-foreground shadow-sm"
                        : w.status === "ready"
                          ? "text-foreground/80 hover:bg-background/70 hover:text-foreground"
                          : "text-muted-foreground/60 hover:text-muted-foreground",
                    )}
                  >
                    {w.week}주
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-4 py-2.5 text-lg font-semibold transition-colors",
                    active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="flex items-center gap-1.5">
          <FontScaleToggle />
          <TeacherToggle />
        </div>
      </div>

      {/* 모바일 내비 — 가로 스크롤 */}
      <nav className="overflow-x-auto border-t border-border/70 md:hidden">
        <ul className="flex w-max items-center gap-0.5 px-2 py-1.5">
          {weeks.map((w) => {
            const href = `/week/${w.week}`;
            const active = pathname === href;
            return (
              <li key={w.week}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-xl px-3 py-2 text-base font-semibold whitespace-nowrap",
                    active
                      ? "bg-foreground text-background"
                      : w.status === "ready"
                        ? "text-foreground/80 hover:bg-muted"
                        : "text-muted-foreground/60 hover:bg-muted",
                  )}
                >
                  {w.week}주차
                </Link>
              </li>
            );
          })}
          <li aria-hidden className="mx-1 h-6 w-px shrink-0 bg-border" />
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-xl px-3 py-2 text-base font-semibold whitespace-nowrap",
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
