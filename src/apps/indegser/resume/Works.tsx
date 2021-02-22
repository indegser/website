import styled from "@emotion/styled";
import { ResumeContentHeading } from "./Resume.styled";
import { useTrans } from "../Indegser.hooks";
import { mq } from "common/theme";
import { colors } from "style.types";

const Layout = styled.div``;

const Work = styled.div`
  display: grid;
  grid-template-columns: 240px auto;
  grid-gap: 40px;

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

const Milestone = styled.ul`
  margin: 0;
  padding: 0;
`;

const MilestoneLine = styled.li`
  line-height: 1.4;
  position: relative;
  padding-left: 24px;
  font-size: 15px;
  list-style: none;
  color: ${colors.textLiDot};
  line-height: 1.64;

  & + & {
    margin-top: 1em;
  }

  span {
    color: ${colors.textResume};
    letter-spacing: 0.2px;
  }

  &::before {
    position: absolute;
    left: 0px;
    top: 0px;
    display: inline-block;
    width: 16px;
    content: "•";
    text-align: center;
  }
`;

const Works = () => {
  const companies = {
    naverlabs: "Naver Labs",
    eosdaq: "EOSDAQ",
    alleyswonderlab: "AlleysWonderLab",
    indegs: "Indegs (창업)",
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
      milestone: [
        "로봇을 위한 실내 지도를 그리는 지도 에디터를 WebGL로 만들었습니다",
        "로봇의 위치와 상태, 실내 지도와 시설물을 모니터링할 수 있는 대시보드를 만들었습니다",
        "구글 지도처럼 지도 위에 텍스트 라벨을 그리고, 라벨들이 줌인/아웃에 맞춰 사라질 수 있도록 만들었습니다",
        "Naver Cloud 환경으로 지속적 배포가 가능하도록 Drone CI/CD와 K8s를 사용해 배포 시스템을 구축했습니다",
      ],
    },
    eosdaq: {
      stack: ["React", "AWS", "Vercel(Zeit)", "Redux(-saga)", "Docker"],
      milestone: [
        "AWS CodePipeline, CloudFront, ECS를 사용한 프론트엔드 배포 환경을 구현했습니다",
        "Redux-Saga와 WebSocket을 사용한 실시간 주가 업데이트를 구현했습니다",
      ],
    },
    alleyswonderlab: {
      stack: ["React", "Mapbox.js", "Three.js", "Express.js"],
      milestone: [
        "JWT를 사용한 로그인을 구현했습니다",
        "Mapbox, Three.js를 사용해 벡터 지도와 ",
      ],
    },
    indegs: {
      stack: ["React", "Electron.js"],
      milestone: ["디자이너를 위한 버전관리 서비스"],
    },
  };

  const keys = Object.keys(companies);

  return (
    <Layout>
      {keys.map((key: keyof typeof companies) => {
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
                <Date>{duration}</Date>
                <Date>{role}</Date>
              </Content>
            </Company>
            <div>
              <Milestone>
                {milestone?.map((line, i) => (
                  <MilestoneLine key={i}>
                    <span>{line}</span>
                  </MilestoneLine>
                ))}
              </Milestone>
            </div>
          </Work>
        );
      })}
    </Layout>
  );
};

export default Works;
