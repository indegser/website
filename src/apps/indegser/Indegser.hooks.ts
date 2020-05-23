import create from "zustand";
import { useMemo } from "react";

interface IndegserLangStore {
  lang: "en" | "ko";
  changeLang: (lang: IndegserLangStore["lang"]) => void;
}

export const [useIndegserLangStore] = create<IndegserLangStore>((set) => ({
  lang: "ko",
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
    "Web services are the art of the 21st century. Good services depend on a deep understanding and proper use of technology. I want to be an artist who creates a web service where technology and design are perfectly merged.",
    "웹 서비스는 21세기의 예술입니다. 좋은 웹 서비스는 기술에 대한 깊은 이해와 적절한 활용에 달려있다고 믿고 있기에 프론트엔드 개발을 시작했고, 한 분야에 갇혀있지 않으려 때로는 디자이너로서 때로는 개발자로서 일해 왔습니다. 어디에서든 기술과 디자인이 완벽하게 결합된 웹 서비스를 만드는 예술가가 되고자 합니다.",
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
