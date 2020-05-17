import create from "zustand";
import { useMemo } from "react";

interface IndegserLangStore {
  lang: "en" | "ko";
  changeLang: (lang: IndegserLangStore["lang"]) => void;
}

export const [useIndegserLangStore] = create<IndegserLangStore>((set) => ({
  lang: "en",
  changeLang: (lang) =>
    set({
      lang,
    }),
}));

const locale = {
  resume: ["Resume", "이력서"],
  portfolio: ["Portfolio", "포트폴리오"],
};

export const useTrans = (key: keyof typeof locale) => {
  const lang = useIndegserLangStore((s) => s.lang);
  return useMemo(() => {
    const index = lang === "en" ? 0 : 1;
    const target = locale[key];
    return target[index] || target[0];
  }, [lang]);
};
