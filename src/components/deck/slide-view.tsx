"use client";

import { SlideFrame } from "@/components/deck/slide-frame";
import {
  AnalogySlide,
  CoverSlide,
  GoalSlide,
  NextSlide,
  PointSlide,
  SummarySlide,
  WarningSlide,
} from "@/components/deck/slides/basic";
import {
  GallerySlide,
  StorySlide,
} from "@/components/deck/slides/intro";
import {
  CompareSlide,
  PromptSlide,
  RulesSlide,
  StepsSlide,
} from "@/components/deck/slides/practice";
import type { Slide } from "@/lib/deck-types";

export function SlideView({
  slide,
  index,
  total,
}: {
  slide: Slide;
  index: number;
  total: number;
}) {
  return (
    <SlideFrame slide={slide} index={index} total={total}>
      {slide.type === "cover" && <CoverSlide slide={slide} />}
      {slide.type === "story" && <StorySlide slide={slide} />}
      {slide.type === "gallery" && <GallerySlide slide={slide} />}
      {slide.type === "goal" && <GoalSlide slide={slide} />}
      {slide.type === "point" && <PointSlide slide={slide} />}
      {slide.type === "analogy" && <AnalogySlide slide={slide} />}
      {slide.type === "warning" && <WarningSlide slide={slide} />}
      {slide.type === "compare" && <CompareSlide slide={slide} />}
      {slide.type === "steps" && <StepsSlide slide={slide} />}
      {slide.type === "prompt" && <PromptSlide slide={slide} />}
      {slide.type === "rules" && <RulesSlide slide={slide} />}
      {slide.type === "summary" && <SummarySlide slide={slide} />}
      {slide.type === "next" && <NextSlide slide={slide} />}
    </SlideFrame>
  );
}
