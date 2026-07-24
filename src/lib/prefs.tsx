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

    const url = new URL(window.location.href);
    const fromQuery = url.searchParams.get("teacher");
    const savedTeacher =
      fromQuery === "1" ? true : localStorage.getItem(TEACHER_KEY) === "1";
    if (savedTeacher) setTeacherState(true);
    if (fromQuery === "1") localStorage.setItem(TEACHER_KEY, "1");

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
