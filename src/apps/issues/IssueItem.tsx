import { useMemo } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { colors } from "style.types";
import { IssueType } from "apis/github";
import { mediaQueries, mq } from "common/theme";
import { motion } from "framer-motion";

dayjs.extend(calendar);

interface Props {
  issue: IssueType;
}

export const IssueItem = ({ issue }: Props) => {
  const desc = useMemo(() => {
    const result = dayjs(dayjs(issue.updatedAt)).calendar(null, {
      sameDay: "[Today at] h:mm A", // The same day ( Today at 2:30 AM )
      nextDay: "[Tomorrow at] h:mm A", // The next day ( Tomorrow at 2:30 AM )
      nextWeek: "dddd [at] h:mm A", // The next week ( Sunday at 2:30 AM )
      lastDay: "[Yesterday at] h:mm A", // The day before ( Yesterday at 2:30 AM )
      lastWeek: "[Last] dddd [at] h:mm A", // Last week ( Last Monday at 2:30 AM )
      sameElse: "MMMM D[,] YYYY h:mm A", // Everything else ( 17/10/2011 )
    });

    return result;
  }, [issue.updatedAt]);

  const labels = issue.labels.map((label) => (
    <div key={label.id}>
      <Label>{label.name}</Label>
    </div>
  ));

  return (
    <Container>
      <Link href={`/issue/${issue.number}`} passHref>
        <a>
          <Item whileTap={{ opacity: 0.4 }} transition={{ duration: 0.2 }}>
            <Title>{issue.title}</Title>
            <Right>
              <Labels>{labels}</Labels>
              <Time>{desc}</Time>
            </Right>
          </Item>
        </a>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 6;
  margin: 2px 0;
`;

const Item = styled(motion.div)`
  display: flex;
  padding: 4px;
  border-radius: 3px;
  justify-content: space-between;
  transition: 0.2s background-color ease;

  ${mediaQueries.hoverable} {
    &:hover {
      background: ${colors.gray50};
    }
  }

  ${mq("sm")} {
    display: block;
    padding-bottom: 18px;
    padding-top: 12px;
    border-bottom: 1px solid ${colors.gray100};
  }
`;

const Right = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: max-content;
  grid-gap: 8px;
  align-items: center;
  flex: 0 0 auto;

  ${mq("sm")} {
    margin-top: 8px;
  }
`;

const Labels = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: max-content;
  grid-gap: 4px;
  align-items: center;

  &:empty {
    display: none;
  }
`;

const Label = styled.div`
  padding: 2px 0px;
  border-radius: 3px;
  font-size: 12px;
  letter-spacing: 0.2px;
  line-height: 1;
  font-weight: 560;
  color: ${colors.gray700};
  /* background: ${colors.blue50}; */
`;

const Title = styled.h2`
  font-weight: 580;
  font-size: 16px;
  line-height: 1.5;
  padding-bottom: 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  margin-right: 20px;
  background-image: linear-gradient(
    to right,
    ${colors.gray100} 0%,
    ${colors.gray100} 100%
  );
  background-repeat: repeat-x;
  background-position: 0px 100%;
  background-size: 100% 1px;

  ${mq("sm")} {
    font-size: 17px;
    background: none !important;
  }
`;

const Time = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${colors.gray500};
  line-height: 1.5;
`;
