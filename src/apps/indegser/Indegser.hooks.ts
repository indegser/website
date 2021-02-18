import create, { State } from "zustand";
import { useMemo } from "react";

interface IndegserLangStore extends State {
  lang: "en" | "ko";
  changeLang: (lang: IndegserLangStore["lang"]) => void;
}

export const useIndegserLangStore = create<IndegserLangStore>((set) => ({
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
    `웹디자이너로 일할 당시 디자인의 한계가 기술의 한계에 의해 결정되는 것을 경험하곤 했습니다. “구현하기 어려운 디자인"이라는 평가를 수용하기 위해선 “웹 기술"에 대한 지식이 있어야 했고, 포토샵이나 스케치에선 되지만 브라우저에서는 안 되는 것들을 알아야 했습니다. 어떻게 하면 디자인을 그대로 화면에 옮길 수 있을까 하는 기술적 고민들이 쌓이다 프론트엔드 개발자가 된거라고 볼 수 있죠.<br /><br />
    그래서 저는 프론트엔드 기술만큼이나 웹 디자인에 관심이 많습니다. 멋진 화면을 보면 그것을 지탱하는 기술을 찾아보고, 반대로 새로운 기술을 발견하게 되면 이를 적용해 어떤 디자인을 상상이 아닌 현실로 만들 수 있을 지 고민합니다. 이런 성향을 지닌 예술가/엔지니어의 이야기를 하나 소개해볼까 합니다. 레오나르도 다 빈치입니다.<br /><br />
    레오나르도 다 빈치는 그의 모든 미적/과학적 지식을 집대성하여 모나리자를 그렸습니다. 처음으로 ‘스푸마토’라는 기법을 사용했는데 쉽게 설명하면 색과 색의 경계를 뿌옇게 만드는 겁니다. 눈 앞에 있는 사물을 볼 때 주변 풍경이 흐리게 보이는 원리를 그림에 녹여내면서 모나리자만의 신비스러운 미소를 완성할 수 있었습니다. (모나리자의 미소를 찾겠다고 입을 보고 있으면 입만 보입니다. 눈에 초점을 맞추는 순간 미소가 보입니다)<br /><br />
    미적으로도 훌륭할 뿐 아니라 과학(기술)적으로도 접근이 뛰어난 모나리자는 제가 만들고 싶은 서비스의 표본같은 작품입니다. 보다 유려하면서도 기술적으로 수준 높은 웹 서비스를 만들기 위해 웹 디자이너에서 프론트엔드 개발자가 되었습니다.`,
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
    [["2018년 6월 ~ 2019년 9월"], ["프론트엔드, UI 디자인"]],
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
