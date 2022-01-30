import styled from "@emotion/styled";
import { useIndegserContext } from "../Indegser.hooks";
import { ResumeGrid } from "./Resume.styled";

const Layout = styled.div`
  padding-top: 40px;
  margin-bottom: -12px;
`;

const Biography = styled(ResumeGrid)`
  line-height: 1.8;
  font-size: 15px;

  p {
    margin: 0;
    margin-top: 1.25em;
  }

  p:first-of-type {
    margin-top: 0;
  }
`;

const Bold = styled.strong`
  &::before {
    content: " ";
  }
`;

const en = (
  <>
    <p>
      When I was working as a web designer, I used to experience the limitations
      of design being determined by the limitations of technology. To accept
      “hard-to-implement design” assessment, I should understand how browsers
      render a web page, and things that Photoshop can do but browsers can’t.
      Thinking about how to present design as it is on screen made me a front
      end developer.
    </p>
    <p>
      I am as much interested in web design as frontend technology. When I look
      at a beautiful web page, I look for the technology that supports it, and
      when I discover a new technology, I think about UX/UI that was only in
      imagination, but now can be made into reality. I would like to introduce a
      story of an artist/engineer with this tendency. Leonardo da Vinci.
    </p>
    <p>
      Leonardo Da Vinci put together all his aesthetic and scientific knowledge
      to paint the Mona Lisa. He used a technique called ‘sfumato’. He found out
      that when we look at an object, the surrounding landscape gets blurred.
      The mysterious smile of Mona Lisa was created by applying this scientific
      principle.
    </p>
    <p>
      The Mona Lisa, not only aesthetically pleasing, but also technically
      sound, is a prototype of the service I want to build. I call it a
      <Bold>technical beauty</Bold>, and consider myself as a
      <Bold>technical artist</Bold>.
    </p>
  </>
);

const ko = (
  <>
    <p>
      웹디자이너로 일할 당시 디자인의 한계가 기술의 한계에 의해 결정되는 것을
      경험하곤 했습니다. “구현하기 어려운 디자인"이라는 평가를 수용하기 위해선
      “웹 기술"에 대한 지식이 있어야 했고, 포토샵이나 스케치에선 되지만
      브라우저에서는 안 되는 것들을 알아야 했습니다. 어떻게 하면 디자인을 그대로
      화면에 옮길 수 있을까 하는 기술적 고민들이 쌓이다 프론트엔드 개발자가
      된거라고 볼 수 있죠.
    </p>
    <p>
      그래서 저는 프론트엔드 기술만큼이나 웹 디자인에 관심이 많습니다. 멋진
      화면을 보면 그것을 지탱하는 기술을 찾아보고, 반대로 새로운 기술을 발견하게
      되면 이를 적용해 어떤 디자인을 상상이 아닌 현실로 만들 수 있을 지
      고민합니다. 이런 성향을 지닌 예술가/엔지니어의 이야기를 하나 소개해볼까
      합니다. 레오나르도 다 빈치입니다.
    </p>
    <p>
      레오나르도 다 빈치는 그의 모든 미적/과학적 지식을 집대성하여 모나리자를
      그렸습니다. 처음으로 ‘스푸마토’라는 기법을 사용했는데 쉽게 설명하면 색과
      색의 경계를 뿌옇게 만드는 겁니다. 눈 앞에 있는 사물을 볼 때 주변 풍경이
      흐리게 보이는 원리를 그림에 녹여내면서 모나리자만의 신비스러운 미소를
      완성할 수 있었습니다. (모나리자의 미소를 찾겠다고 입을 보고 있으면 입만
      보입니다. 눈에 초점을 맞추는 순간 미소가 보입니다)
    </p>
    <p>
      미적으로도 훌륭할 뿐 아니라 과학(기술)적으로도 접근이 뛰어난 모나리자는
      제가 만들고 싶은 서비스의 표본같은 작품입니다. 보다 유려하면서도
      기술적으로 수준 높은 웹 서비스를 만들기 위해 웹 디자이너에서 프론트엔드
      개발자가 되었습니다.
    </p>
  </>
);

const Bio = () => {
  const { lang } = useIndegserContext();
  const biography = lang === "en" ? en : ko;

  return (
    <Layout>
      <Biography>{biography}</Biography>
    </Layout>
  );
};

export default Bio;
