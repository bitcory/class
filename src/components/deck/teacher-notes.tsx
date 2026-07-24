"use client";

import { Clock, Lightbulb, MessageSquareQuote, TriangleAlert } from "lucide-react";
import { usePrefs } from "@/lib/prefs";
import type { TeacherNote } from "@/lib/deck-types";

/** 강사 모드일 때만 슬라이드 아래에 붙는 진행 대본. */
export function TeacherNotes({ notes }: { notes?: TeacherNote }) {
  const { teacher, ready } = usePrefs();
  if (!ready || !teacher || !notes) return null;

  return (
    <aside className="deck-teacher-note mt-10 rounded-2xl border-2 border-dashed border-accent/50 bg-accent/5 px-5 py-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-lg bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
          강사 노트
        </span>
        {notes.time && (
          <span className="inline-flex items-center gap-1.5 text-base font-semibold text-accent">
            <Clock className="size-4" aria-hidden />
            {notes.time}
          </span>
        )}
      </div>

      {notes.say && notes.say.length > 0 && (
        <div className="mt-4">
          <p className="flex items-center gap-2 text-base font-bold">
            <MessageSquareQuote className="size-5 text-accent" aria-hidden />
            이렇게 말해요
          </p>
          <ul className="mt-2 space-y-2 pl-1">
            {notes.say.map((s, i) => (
              <li key={i} className="border-l-4 border-accent/30 pl-3 text-base">
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {notes.tip && notes.tip.length > 0 && (
        <div className="mt-4">
          <p className="flex items-center gap-2 text-base font-bold">
            <Lightbulb className="size-5 text-accent" aria-hidden />
            진행 팁
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-6 text-base">
            {notes.tip.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {notes.watch && notes.watch.length > 0 && (
        <div className="mt-4">
          <p className="flex items-center gap-2 text-base font-bold">
            <TriangleAlert className="size-5 text-tone-warning" aria-hidden />
            자주 막히는 지점
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-6 text-base">
            {notes.watch.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
