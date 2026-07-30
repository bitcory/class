"use client";

import { useMemo, useState } from "react";
import { Check, Copy, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/lib/use-copy";
import { renderTemplate, type PromptItem } from "@/lib/deck-types";
import { cn } from "@/lib/utils";

type Part = { type: "text" | "blank"; value: string };

// 한글은 라틴 문자보다 약 2배 넓다. ch 단위로는 칸이 잘리므로 직접 계산한다.
const WIDE = /[ᄀ-ᇿ㄰-㆏가-힯一-鿿぀-ヿ]/;

function inputWidth(value: string) {
  const em = [...value].reduce((sum, ch) => sum + (WIDE.test(ch) ? 1 : 0.55), 0);
  return `calc(${Math.max(em, 3)}em + 1.2rem)`;
}

function splitTemplate(template: string): Part[] {
  const parts: Part[] = [];
  const re = /\{\{\s*([^}]+?)\s*\}\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(template))) {
    if (m.index > last)
      parts.push({ type: "text", value: template.slice(last, m.index) });
    parts.push({ type: "blank", value: m[1].trim() });
    last = m.index + m[0].length;
  }
  if (last < template.length)
    parts.push({ type: "text", value: template.slice(last) });
  return parts;
}

export function PromptCard({
  prompt,
  className,
  scrollBody,
}: {
  prompt: PromptItem;
  className?: string;
  /** 본문이 길 때 늘어나지 않고 이 안에서만 스크롤되게 한다 */
  scrollBody?: boolean;
}) {
  const parts = useMemo(() => splitTemplate(prompt.template), [prompt.template]);
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const p of parts) {
      if (p.type === "blank") init[p.value] = prompt.blanks?.[p.value] ?? p.value;
    }
    return init;
  });

  const { state, copy } = useCopy();
  const finalText = renderTemplate(prompt.template, values);
  const hasBlanks = parts.some((p) => p.type === "blank");

  return (
    <div
      data-slot="prompt-card"
      className={cn(
        "overflow-hidden rounded-2xl border-2 border-border bg-card",
        className,
      )}
    >
      {/* 머리말 */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b-2 border-border bg-muted/60 px-5 py-4">
        <span className="rounded-lg bg-primary px-3 py-1 text-base font-bold text-primary-foreground">
          {prompt.label}
        </span>
        <span className="text-lg font-bold tracking-tight">{prompt.title}</span>
      </div>

      <div className="px-5 py-5 sm:px-6">
        {prompt.hint && (
          <p className="mb-4 text-base text-muted-foreground">{prompt.hint}</p>
        )}

        {/* 프롬프트 본문 — 노란 칸은 눌러서 수정 */}
        <div
          className={cn(
            scrollBody &&
              "max-h-[340px] overflow-y-auto rounded-xl border-2 border-border/60 bg-muted/20 px-4 py-3.5 sm:max-h-[400px]",
          )}
        >
          <p className="text-xl leading-[1.9] font-medium whitespace-pre-line sm:text-[1.35rem]">
            {parts.map((p, i) =>
              p.type === "text" ? (
                <span key={i}>{p.value}</span>
              ) : (
                <input
                  key={i}
                  type="text"
                  aria-label={`${p.value} 입력칸`}
                  value={values[p.value] ?? ""}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [p.value]: e.target.value }))
                  }
                  style={{ width: inputWidth(values[p.value] ?? "") }}
                  className="mx-0.5 max-w-full rounded-md border-b-4 border-blank-border bg-blank px-1.5 py-0.5 text-center font-bold text-foreground focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
                />
              ),
            )}
          </p>

          {hasBlanks && (
            <p className="mt-3 text-base text-muted-foreground">
              노란 칸을 눌러 원하는 내용으로 바꿀 수 있습니다.
            </p>
          )}
        </div>

        {scrollBody && (
          <p className="mt-2 text-sm text-muted-foreground">
            ▲ 위 상자 안에서 손가락으로 밀어 나머지 내용을 볼 수 있습니다.
          </p>
        )}

        {/* 복사 */}
        <div className="mt-5 space-y-3">
          <Button
            type="button"
            size="lg"
            variant={state === "copied" ? "dark" : "default"}
            className="w-full"
            onClick={() => copy(finalText)}
          >
            {state === "copied" ? (
              <>
                <Check aria-hidden /> 복사했어요!
              </>
            ) : (
              <>
                <Copy aria-hidden /> 복사하기
              </>
            )}
          </Button>

          {state === "copied" && (
            <p
              role="status"
              className="rounded-xl bg-tone-done/10 px-4 py-3 text-base font-semibold text-tone-done"
            >
              이제 ChatGPT 입력창에 붙여넣고 보내기를 누르세요.
            </p>
          )}

          {state === "manual" && (
            <div className="rounded-xl border-2 border-blank-border bg-blank/40 px-4 py-4">
              <p className="text-base font-semibold">
                자동 복사가 안 됩니다. 아래 글을 길게 눌러서 복사해 주세요.
              </p>
              <textarea
                readOnly
                value={finalText}
                rows={4}
                onFocus={(e) => e.currentTarget.select()}
                className="mt-3 w-full rounded-lg border-2 border-border bg-background p-3 text-lg"
              />
            </div>
          )}

          <a
            href={`https://chatgpt.com/?q=${encodeURIComponent(finalText)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-lg font-semibold text-foreground underline underline-offset-4"
          >
            <ExternalLink className="size-5" aria-hidden />
            ChatGPT에서 바로 열기
          </a>
        </div>

        {prompt.result && (
          <p className="mt-5 flex items-start gap-2 rounded-xl bg-muted px-4 py-3 text-base">
            <Sparkles className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
            <span>
              <span className="font-semibold">이렇게 됩니다 · </span>
              {prompt.result}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
