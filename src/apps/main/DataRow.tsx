import { useMemo } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { colors } from "style.types";
import { mediaQueries, mq } from "common/theme";
import { motion } from "framer-motion";
import { StoryType } from "types/story.types";
import "dayjs/locale/ko";

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
      sameElse: "YYYY[년] MMMM[월] D[일] A h:mm", // Everything else ( 17/10/2011 )
    });

    return result;
  }, [story.updatedAt]);

  return (
    <Container>
      <Link href={`/newsroom/${story.id}`} passHref>
        <a>
          <Item whileTap={{ opacity: 0.4 }} transition={{ duration: 0.2 }}>
            <Title>{story.title}</Title>
            <Right>
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
  margin-bottom: 4px;
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
    margin-top: 4px;
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
