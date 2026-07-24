"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type FontScale = "normal" | "large" | "xlarge";

const SCALE_KEY = "tbclass:font-scale";
const TEACHER_KEY = "tbclass:teacher-mode";

// 강사 대본(강사 모드)을 여는 비밀 암호.
// 강사용 링크:  /week/1?teacher=ssam2026   (이 값을 바꾸면 링크도 바뀝니다)
// 수강생은 이 링크·암호를 모르므로 대본을 볼 수 없습니다.
// 끄기 링크:    /week/1?teacher=off
const TEACHER_PASS = "ssam2026";

type PrefsValue = {
  scale: FontScale;
  setScale: (s: FontScale) => void;
  teacher: boolean;
  setTeacher: (v: boolean) => void;
  /** 하이드레이션 이후에만 true — 서버/클라이언트 불일치 방지 */
  ready: boolean;
};

const PrefsContext = createContext<PrefsValue | null>(null);

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [scale, setScaleState] = useState<FontScale>("normal");
  const [teacher, setTeacherState] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedScale = localStorage.getItem(SCALE_KEY) as FontScale | null;
    if (savedScale === "large" || savedScale === "xlarge") {
      setScaleState(savedScale);
      document.documentElement.dataset.scale = savedScale;
    }

    // 강사 모드: 올바른 암호(?teacher=<암호>)로만 켜지고, 한 번 켜지면
    // 이 브라우저에 저장되어 다른 페이지에서도 유지된다. ?teacher=off 로 끈다.
    const url = new URL(window.location.href);
    const fromQuery = url.searchParams.get("teacher");
    let on = localStorage.getItem(TEACHER_KEY) === "1";
    if (fromQuery === TEACHER_PASS) {
      on = true;
      localStorage.setItem(TEACHER_KEY, "1");
    } else if (fromQuery === "off") {
      on = false;
      localStorage.removeItem(TEACHER_KEY);
    }
    setTeacherState(on);

    // 암호가 주소창에 남지 않도록 teacher 파라미터를 URL에서 제거
    if (fromQuery !== null) {
      url.searchParams.delete("teacher");
      window.history.replaceState(
        null,
        "",
        url.pathname + url.search + url.hash,
      );
    }

    setReady(true);
  }, []);

  const setScale = useCallback((s: FontScale) => {
    setScaleState(s);
    localStorage.setItem(SCALE_KEY, s);
    if (s === "normal") delete document.documentElement.dataset.scale;
    else document.documentElement.dataset.scale = s;
  }, []);

  const setTeacher = useCallback((v: boolean) => {
    setTeacherState(v);
    localStorage.setItem(TEACHER_KEY, v ? "1" : "0");
  }, []);

  const value = useMemo(
    () => ({ scale, setScale, teacher, setTeacher, ready }),
    [scale, setScale, teacher, setTeacher, ready],
  );

  return <PrefsContext value={value}>{children}</PrefsContext>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs must be used inside <PrefsProvider>");
  return ctx;
}
