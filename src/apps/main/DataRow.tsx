import { useMemo } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { colors } from "style.types";
import { mq } from "common/theme";
import { StoryType } from "types/story.types";
import "dayjs/locale/ko";
import { Row } from "common/atoms/Row";

dayjs.extend(calendar);
dayjs.locale("ko");

interface Props {
  story: StoryType;
}

export const DataRow = ({ story }: Props) => {
  const desc = useMemo(() => {
    const result = dayjs(dayjs(story.createdAt)).calendar(null, {
      sameDay: "[오늘] A h:mm", // The same day ( Today at 2:30 AM )
      lastDay: "[어제] A h:mm", // The day before ( Yesterday at 2:30 AM )
      lastWeek: "[지난] dddd A h:mm", // Last week ( Last Monday at 2:30 AM )
      sameElse: "YYYY[년] MMMM D[일] A h:mm", // Everything else ( 17/10/2011 )
    });

    return result;
  }, [story.updatedAt]);

  return (
    <Container>
      <Link href={`/story/${story.id}`} passHref>
        <a>
          <Row>
            <Title>{story.title}</Title>
            <Right>
              <Time>{desc}</Time>
            </Right>
          </Row>
        </a>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 2px;
`;

const Right = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: max-content;
  grid-gap: 8px;
  align-items: center;
  flex: 0 0 auto;

  ${mq("sm")} {
    margin-top: 4px;
  }
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
    overflow: auto;
    white-space: pre-wrap;
    text-overflow: unset;
  }
`;

const Time = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${colors.gray500};
  line-height: 1.5;
`;
