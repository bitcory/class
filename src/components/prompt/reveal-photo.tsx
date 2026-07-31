"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/** 결과 사진을 바로 보여주지 않고, 눌러야 공개되는 사진 카드 */
export function RevealPhoto({
  image,
}: {
  image: { src: string; alt: string; caption?: string };
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <figure className="overflow-hidden rounded-2xl border-2 border-border">
      <button
        type="button"
        onClick={() => setRevealed(true)}
        disabled={revealed}
        aria-label={revealed ? image.alt : `${image.alt} — 눌러서 결과 확인하기`}
        className={cn(
          "relative block w-full",
          !revealed && "cursor-pointer",
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={900}
          height={900}
          className="h-auto w-full object-cover"
        />
        {!revealed && (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-950 text-white">
            <Sparkles className="size-8" aria-hidden />
            <span className="text-lg font-bold">눌러서 결과 확인하기</span>
          </span>
        )}
      </button>
      {revealed && image.caption && (
        <figcaption className="border-t-2 border-border bg-muted/60 px-4 py-3 text-base font-semibold text-muted-foreground">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
