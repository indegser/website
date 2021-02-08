import styled from "@emotion/styled";
import { ResumeContentHeading } from "./Resume.styled";
import { useTrans } from "../Indegser.hooks";
import { mq } from "common/theme";
import { colors } from "style.types";

const Layout = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(3, 1fr);

  ${mq("md")} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Logo = styled.img`
  display: block;
  width: 48px;
  height: 48px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
`;

const Content = styled.div`
  margin-top: 0.5em;
`;

const Date = styled.div`
  color: ${colors.textGrey};
  font-size: 14px;
  line-height: 1.6;
`;

const Works = () => {
  const companies = {
    aurumplanet: "Aurumplanet",
    indegs: "Indegs",
    alleyswonderlab: "AlleysWonderLab",
    eosdaq: "EOSDAQ",
    naverlabs: "Naver Labs",
  };

  const keys = Object.keys(companies);

  return (
    <Layout>
      {keys.map((key: keyof typeof companies) => {
        const name = companies[key];
        const [duration, role] = useTrans(key);

        return (
          <div key={key}>
            <Logo src={`/images/ic-${key}.png`} />
            <Content>
              <ResumeContentHeading>{name}</ResumeContentHeading>
              <Date>{duration}</Date>
              <Date>{role}</Date>
            </Content>
          </div>
        );
      })}
    </Layout>
  );
};

export default Works;
