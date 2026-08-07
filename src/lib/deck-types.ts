// 슬라이드 데이터 모델.
// 데이터 파일(src/content/week-*.ts)만 채우면 화면이 나온다.

export type Tone = "concept" | "practice" | "warning" | "done";

/** 강사 모드에서만 보이는 진행 대본 */
export type TeacherNote = {
  /** 예: "10~30분" */
  time?: string;
  /** 이렇게 말해요 (멘트) */
  say?: string[];
  /** 진행 팁 */
  tip?: string[];
  /** 자주 막히는 지점 */
  watch?: string[];
};

/** 복사 카드 하나 */
export type PromptItem = {
  id: string;
  /** 예: "실습 1" */
  label: string;
  title: string;
  /** 카드 위 짧은 안내 */
  hint?: string;
  /** 빈칸은 {{이름}} 형식으로 작성 */
  template: string;
  /** 빈칸 기본값 — { 주제: "사회복지사의 장래 전망" } */
  blanks?: Record<string, string>;
  /** 이 프롬프트를 쓰고 나면 무엇이 나오는지 */
  result?: string;
};

type SlideBase = {
  id: string;
  /** 목차에 표시될 짧은 제목 */
  nav: string;
  tone: Tone;
  notes?: TeacherNote;
};

export type Slide = SlideBase &
  (
    | {
        type: "cover";
        /** 표지 가운데에 크게 나오는 회차 표시 — "1주차" */
        label?: string;
        title: string;
        subtitle: string;
        meta: string[];
      }
    | {
        /** 인사말 — 시대 흐름(삐삐→AI)처럼 단계로 공감시키는 장 */
        type: "story";
        title: string;
        lead?: string;
        steps: {
          era: string;
          title: string;
          desc: string;
          /** 마지막 '지금' 칸처럼 강조할 때 */
          highlight?: boolean;
        }[];
        quote?: string;
        point?: string;
      }
    | {
        /** 강의 현장 사진 + 숫자로 신뢰를 주는 장 */
        type: "gallery";
        title: string;
        lead?: string;
        stats?: { value: string; label: string }[];
        photos: { src: string; alt: string; caption: string }[];
        footer?: string;
      }
    | {
        type: "goal";
        title: string;
        lead?: string;
        items: { text: string; sub?: string }[];
      }
    | {
        type: "point";
        title: string;
        lead: string;
        body?: string[];
        quote?: string;
      }
    | {
        type: "analogy";
        title: string;
        lead?: string;
        pairs: { term: string; means: string; caption?: string }[];
      }
    | {
        type: "compare";
        title: string;
        lead?: string;
        tools: {
          name: string;
          good: string;
          say: string;
          note?: string;
          /** 예: "OpenAI · 미국" — 이름 아래 짧게 표시 */
          company?: string;
          /** 예: "Deep Dive" — 이름 옆에 영문 원어 표시 */
          enName?: string;
          /** 있으면 이름을 눌렀을 때 이 주소로 새 탭에서 이동한다 */
          url?: string;
        }[];
      }
    | {
        /** 다양한 AI 도구를 아이콘 뱃지 카드로 보여주는 갤러리 */
        type: "toolkit";
        title: string;
        lead?: string;
        items: {
          name: string;
          /** 이 도구가 속한 생성형 AI 분야 */
          group: "LLM" | "이미지 생성" | "영상 생성" | "음악 생성";
          /** 뱃지 안에 넣을 짧은 글자 (2~3자) — logo가 없을 때 대신 표시 */
          icon: string;
          category: string;
          blurb: string;
          /** 뱃지 배경색 — tailwind bg-* 클래스 (logo가 없을 때 사용) */
          color: string;
          /** public/ 아래 로고 이미지 경로. 있으면 icon/color 대신 이 이미지를 보여준다 */
          logo?: string;
        }[];
        footer?: string;
      }
    | {
        type: "steps";
        title: string;
        lead?: string;
        steps: {
          label: string;
          detail?: string;
          /** 있으면 이 단계 오른쪽에 새 탭으로 여는 '바로가기' 버튼이 붙는다 */
          url?: string;
        }[];
        /** 체크 저장용 키 */
        storageKey?: string;
      }
    | {
        type: "prompt";
        title: string;
        lead?: string;
        prompts: PromptItem[];
      }
    | {
        /** 완성 사진(좌) + 그대로 복사해 쓰는 프롬프트(우) */
        type: "photo-prompt";
        title: string;
        lead?: string;
        image: { src: string; alt: string; caption?: string };
        prompt: PromptItem;
      }
    | {
        type: "warning";
        title: string;
        lead: string;
        points: string[];
      }
    | {
        type: "rules";
        title: string;
        lead?: string;
        rules: { title: string; desc: string; example: string }[];
        versus?: {
          before: { text: string; note: string };
          after: { text: string; note: string };
        };
      }
    | {
        type: "summary";
        title: string;
        lead?: string;
        lines: { label: string; value: string }[];
        footer?: string;
      }
    | {
        type: "next";
        title: string;
        lead: string;
        done: string[];
        preview: { title: string; desc: string };
        reminders?: string[];
      }
  );

export type Week = {
  week: number;
  /** "AI와 처음 만나기" */
  title: string;
  /** 한 줄 설명 */
  summary: string;
  /** "3시간 (180분)" */
  duration: string;
  status: "ready" | "preparing";
  slides: Slide[];
};

/** 슬라이드에서 프롬프트만 뽑아낸 형태 (프롬프트 모음 페이지용) */
export type CollectedPrompt = PromptItem & {
  week: number;
  weekTitle: string;
  slideId: string;
  slideTitle: string;
  /** photo-prompt 슬라이드에서 왔다면 함께 보여줄 사진 */
  image?: { src: string; alt: string; caption?: string };
};

export function collectPrompts(weeks: Week[]): CollectedPrompt[] {
  return weeks.flatMap((w) =>
    w.slides.flatMap((s) => {
      if (s.type === "prompt")
        return s.prompts.map((p) => ({
          ...p,
          week: w.week,
          weekTitle: w.title,
          slideId: s.id,
          slideTitle: s.title,
        }));
      if (s.type === "photo-prompt")
        return [
          {
            ...s.prompt,
            week: w.week,
            weekTitle: w.title,
            slideId: s.id,
            slideTitle: s.title,
            image: s.image,
          },
        ];
      return [];
    }),
  );
}

/** {{빈칸}} 을 값으로 치환한 최종 문장 */
export function renderTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, key: string) =>
    (values[key] ?? key).trim(),
  );
}

/** 템플릿에 들어있는 빈칸 이름 목록 */
export function templateBlanks(template: string): string[] {
  return [...template.matchAll(/\{\{\s*([^}]+?)\s*\}\}/g)].map((m) =>
    m[1].trim(),
  );
}
