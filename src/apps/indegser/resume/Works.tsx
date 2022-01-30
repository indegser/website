import styled from "@emotion/styled";
import { ResumeContentHeading, ResumeGrid } from "./Resume.styled";
import { useIndegserContext, useTrans } from "../Indegser.hooks";
import { colors } from "types/style.types";
import { mq } from "common/theme";

const Layout = styled(ResumeGrid)`
  column-count: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  ${mq("md")} {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  ${mq("md")} {
    &:last-of-type {
      margin-top: 80px;
    }
  }
`;

const Work = styled.div`
  display: grid;
  position: relative;

  & + & {
    margin-top: 80px;
  }
`;

const Company = styled.div`
  display: flex;
`;

const Content = styled.div``;

const Date = styled.div`
  color: ${colors.textGrey};
  font-size: 14px;
  line-height: 1.6;
`;

const Milestone = styled.div`
  margin: 0;
  padding: 0;
  margin-top: 20px;
`;

const MilestoneLine = styled.div`
  line-height: 1.8;
  position: relative;
  /* padding-left: 24px; */
  font-size: 15px;
  list-style: none;
  color: ${colors.textLiDot};

  & + & {
    margin-top: 1em;
  }

  span {
    color: ${colors.textResume};
    letter-spacing: 0.2px;
  }

  /* &::before {
    position: absolute;
    left: 0px;
    top: 0px;
    display: inline-block;
    width: 16px;
    content: "•";
    text-align: center;
  } */
`;

const Duration = styled.div`
  font-size: 13px;
  color: ${colors.textLightGrey};
  position: absolute;
  right: 0;
  top: 0;
`;

const Works = () => {
  const { lang } = useIndegserContext();
  const isEn = lang === "en";

  const companies = {
    naverlabs: "Naver Labs",
    eosdaq: "EOSDAQ",
    alleyswonderlab: "AlleysWonderLab",
    indegs: "Indegs",
    aurumplanet: "Aurumplanet",
  };

  const works = {
    naverlabs: {
      stack: [
        "React",
        "Next.js",
        "Three.js",
        "D3",
        "Emotion",
        "Zustand",
        "Docker",
        "K8s",
      ],
      milestone: isEn
        ? [
            "Building web services for robots running inside NAVER new office building. Created robot monitoring dashboard and 2D map editor with React and WebGL. Built vercel-like CI/CD pipeline called `Navercel` for front-end continuous deployment. Aggressively using Typescript and jest for strongly-typed(tested) application.",
          ]
        : [
            "네이버 신사옥에서 서비스될 로봇들을 위한 웹서비스를 만들고 있습니다. React와 WebGL을 사용해 로봇 모니터링 대시보드, 지도 에디터를  개발했습니다. 클라우드 환경으로 지속적 배포가 가능하도록 DroneCI와 k8s를 활용해 Navercel이라는 시스템을 만들었습니다. Vercel처럼 Git 브랜치와 연동된 웹사이트가 클라우드에 떠있습니다. 타입을 적극 활용하고, 테스트 코드를 짜는 것이 중요하다는 것을 알게 되었고 페어 프로그래밍과 코드 리뷰를 활용해 코드를 함께 보고 개선 하는 시간을 가지고자 노력하고 있습니다.",
          ],
    },
    eosdaq: {
      stack: ["React", "AWS", "Vercel(Zeit)", "Redux(-saga)", "Docker"],
      milestone: isEn
        ? [
            "I was in charge of UI design and front-end development of decentralized blockchain exchange. Used Redux-saga and Websocket for realtime ticker display and created CI/CD pipeline on AWS Codepipeline. It was the first time I experienced JAM stack like Gatsby.js, Next.js and front-end deployment services like Netlify and Zeit. After building exchange, I open-sourced keychain based blockchain wallet, called Keycat.",
          ]
        : [
            "탈중앙화 블록체인 거래소의 UI 디자인과 프론트엔드 개발을 맡았습니다. Redux-saga를 사용해 WebSocket으로 들어오는 실시간 주가를 처리했으며, 백엔드 개발자분과 함께 AWS에 CodePipeline과 ECR/ECS를 사용해 배포 시스템을 구축했습니다. 이때부터 배포에 관심을 가지게 되었고, Gatsby, Next.js, Netlify와 Zeit(Vercel) 같은 프레임워크/서비스들을 사이드 프로젝트에 사용했습니다. 프로젝트 후반에는 기존 지갑들에 대한 대안으로, 브라우저의 키체인 기술을 사용한 지갑, Keycat을 사이드 프로젝트로 만들어 오픈소스로 공개했습니다.",
          ],
    },
    alleyswonderlab: {
      stack: ["React", "Mapbox.js", "Three.js", "Express.js"],
      milestone: isEn
        ? [
            "Created web service connecting map and video. Handled social login and SSR with Node.js web server and created web application with React and Mapbox.js. To maintain 60fps while rendering both vector-tile map and high-quality video, put a lot of effort on reducing memory usage and removing janks.",
          ]
        : [
            "지도와 동영상을 연결하는 웹 서비스를 만들었습니다. Node.js로 소셜 로그인과 SSR을 처리하는 웹 서버를 작성했고, React.js, Mapbox.js로 클라이언트를 만들었습니다. 벡터-타일 지도와 고화질 영상을 화면에 동시에 담아야 했기 때문에, 종종 노트북 팬에서 굉음이 나곤 했습니다. 덕분에 개발자 도구를 사용해 성능/메모리를 측정하고 개선하는 경험을 할 수 있었습니다.",
          ],
    },
    indegs: {
      stack: ["React", "Electron.js"],
      milestone: isEn
        ? [
            "Started own startup for design version control using Git. It was design-specific Git GUI software equipped with visual commit. Whenever a designer create/save a Photoshop file, Indegs automatically created a commit with a thumbnail. It was based on Electron, thus used web frontend technology.",
          ]
        : [
            "디자이너를 위한 Git이 필요하다고 생각해 창업했습니다. Photoshop 파일을 수정할 때마다 자동으로 커밋을 생성하고 썸네일을 생성해 사용자가 “시각적”으로 커밋을 확인할 수 있도록 만들었습니다. Electron을 기반으로 만든 덕분에 웹 프론트엔드 기술을 사용했습니다.",
          ],
    },
    aurumplanet: {
      stack: [],
      milestone: isEn
        ? [
            "Worked as UI designer for online art exhibition web service. To solve photoshop shadow effect not rendered similarly on browser screen, I started using browser developer tools to manually fix box-shadow CSS property and more.",
          ]
        : [
            "Sketch에서 깔끔하게 보이는 그림자 효과가 브라우저에서는 깨지는 걸 보며, 개발자 도구로 box-shadow를 수정하다 CSS에 입문했습니다.",
          ],
    },
  };

  const keys = Object.keys(companies);
  const columns = [keys.slice(0, 2), keys.slice(2)];

  return (
    <Layout>
      {columns.map((column, i) => (
        <Column key={i}>
          {column.map((key: keyof typeof companies) => {
            const name = companies[key];
            const [duration, role] = useTrans(key);
            const milestone = works[key]?.milestone;

            return (
              <Work key={key}>
                <Company>
                  <Content>
                    <ResumeContentHeading
                      style={{ lineHeight: 1, marginBottom: 4 }}
                    >
                      {name}
                    </ResumeContentHeading>
                    <Duration>{duration}</Duration>
                    <Date>{role}</Date>
                  </Content>
                </Company>
                <Milestone>
                  {milestone?.map((line, i) => (
                    <MilestoneLine key={i}>
                      <span>{line}</span>
                    </MilestoneLine>
                  ))}
                </Milestone>
              </Work>
            );
          })}
        </Column>
      ))}
    </Layout>
  );
};

export default Works;
