import Link from "next/link";
import { course } from "@/content/course";

export function Footer() {
  return (
    <footer className="border-t-2 border-border bg-muted/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-xl font-bold tracking-tight">
          {course.name}{" "}
          <span className="font-semibold text-muted-foreground">
            · {course.subtitle}
          </span>
        </p>
        <p className="mt-2 text-base text-muted-foreground">{course.target}</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-base font-semibold">
          <Link href="/week/1" className="underline underline-offset-4">
            1주차 강의
          </Link>
          <Link href="/prompts" className="underline underline-offset-4">
            프롬프트 모음
          </Link>
          <Link href="/instructor" className="underline underline-offset-4">
            강사 소개
          </Link>
          <Link href="/help" className="underline underline-offset-4">
            도움말
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          화면 오른쪽 위 &lsquo;글씨 크게&rsquo; 버튼을 누르면 글자를 더 크게 볼
          수 있습니다.
        </p>
      </div>
    </footer>
  );
}
