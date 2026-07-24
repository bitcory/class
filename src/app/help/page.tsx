import type { Metadata } from "next";
import Link from "next/link";
import { CircleHelp, LifeBuoy } from "lucide-react";
import { helpItems } from "@/content/help";

export const metadata: Metadata = {
  title: "도움말",
  description:
    "가입이 안 될 때, 화면이 영어로 뜰 때, 복사가 안 될 때 — 자주 막히는 지점을 모았습니다.",
};

export default function HelpPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8 sm:py-20">
      <p className="inline-flex items-center gap-2 rounded-lg bg-primary/12 px-3 py-1.5 text-base font-bold text-primary">
        <LifeBuoy className="size-5" aria-hidden />
        도움말
      </p>
      <h1 className="mt-6 text-3xl font-black tracking-tight text-balance sm:text-5xl">
        막히셨나요? 괜찮습니다
      </h1>
      <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">
        여기 있는 건 거의 모든 분이 한 번씩 겪는 일입니다. 천천히 따라 해 보시고,
        그래도 안 되면 손을 들어 주세요.
      </p>

      <ul className="mt-12 grid items-start gap-6 lg:grid-cols-2">
        {helpItems.map((item) => (
          <li
            key={item.q}
            className="rounded-2xl border-2 border-border p-5 sm:p-6"
          >
            <h2 className="flex gap-3 text-xl font-bold tracking-tight sm:text-2xl">
              <CircleHelp
                className="mt-1 size-6 shrink-0 text-primary"
                aria-hidden
              />
              {item.q}
            </h2>
            <ul className="mt-4 space-y-2.5 pl-9">
              {item.a.map((line, i) => (
                <li key={i} className="flex gap-3 text-lg">
                  <span
                    className="mt-3 size-2 shrink-0 rounded-full bg-foreground/40"
                    aria-hidden
                  />
                  {line}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-2xl bg-muted/60 px-5 py-6">
        <p className="text-lg">
          여기에 없는 문제라면 수업 단톡방에 올려 주세요.{" "}
          <Link href="/instructor" className="font-semibold underline underline-offset-4">
            강사에게 직접 연락
          </Link>
          하셔도 됩니다.
        </p>
      </div>
    </div>
  );
}
