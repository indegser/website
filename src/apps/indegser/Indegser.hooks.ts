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
  name: ["Jaekwon Han", "한재권"],
  oneLiner: ["Design, Code", "웹 개발, UI 디자인"],
  bio: ["Bio", "소개"],
  works: ["Works and Roles", "경험 및 역할"],
  tech: ["Tools & Stacks", "기술 및 툴"],
  contact: ["Contact", "연락처"],
  location: ["Location", "위치"],
  education: ["Education", "교육"],
  biography: [
    "Artists in 14th century combined their brilliant painting skills with all the scientific discoveries. They made history as brilliant artist and creative engineer.<br />",
    "호기심. 디자이너가 길을 포기하고 프론트엔드 개발자를 하는가? 호기심 때문이다. 해부학은 다 빈치의 모나리자를, 타이포그래피 수업은 스티브 잡스에게 예술을  르네상스의 예술가들은  그들에겐 예술과 과학의 경계가 없었으며 천재적인 예술가이자 창의적인 엔지니어로 역사에 남았다. 나는 모든 것이 연결되어 있는 사람이다. 디자이너이면서 개발자이고, 오픈소스 프로젝트를 운영하며 미술사 팟캐스트를 진행하는 그런 사람.",
  ],
  aurumplanet: [
    [["June, 2013 ~ Jan, 2015"], ["UI Design"]],
    [["2013년 6월 ~ 2015년 1월"], ["UI 디자인"]],
  ],
  indegs: [
    [["Aug, 2015 ~ May, 2016"], ["Front-End, UI Design"]],
    [["2015년 8월 ~ 2016년 5월"], ["프론트엔드, UI 디자인"]],
  ],
  alleyswonderlab: [
    [["Sep, 2016 ~ Dec, 2017"], ["Front-End"]],
    [["2016년 9월 ~ 2017년 12월"], ["프론트엔드"]],
  ],
  eosdaq: [
    [["June, 2018 ~ Sep, 2019"], ["Front-End, UI Design"]],
    [["2018년 6월 ~ 2019년 9월"], ["프론트엔드, UI Design"]],
  ],
  naverlabs: [
    [["Jan, 2020 ~"], ["Front-End"]],
    [["2020년 1월 ~"], ["프론트엔드"]],
  ],
};

export const useTrans = (key: keyof typeof locale) => {
  const lang = useIndegserLangStore((s) => s.lang);
  return useMemo(() => {
    const index = lang === "en" ? 0 : 1;
    const target = locale[key];
    return target[index] || target[0];
  }, [lang]);
};
