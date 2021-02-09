import { FC, useMemo } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import dayjs from "dayjs";
import { mq } from "common/theme";
import { IssuesListForRepoResponseData } from "@octokit/types";
import { colors } from "style.types";
import Typography from "common/atoms/Typography";

interface Props {
  issue: IssuesListForRepoResponseData[number];
}

const MarqueeBox = styled.div`
  break-inside: avoid;
  page-break-inside: avoid;
  position: relative;
  border-bottom: 1px solid ${colors.bgDivider};
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 114px auto max-content;
  padding-bottom: 20px;
  margin-bottom: 20px;

  ${mq("md")} {
    grid-template-columns: 1fr;
    grid-gap: 4px;
  }

  p {
    margin: 0.5rem 0;
  }
`;

const MarqueeContent = styled.div`
  margin-right: 12px;
  flex: 1 1;
`;

const MarqueeTitle = styled.div`
  margin-bottom: 2px;
  color: ${colors.textMarqueeTitle};
`;

const MarqueeExcerpt = styled.div`
  color: ${colors.textMarqueeLabel};
`;

const MarqueeDate = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: ${colors.textMarqueeLabel};
  padding-top: 2px;
  font-family: var(--font-sans);
`;

const IssueMarquee: FC<Props> = ({ issue }) => {
  const desc = useMemo(() => {
    const nowYear = dayjs().year();
    const storyDay = dayjs(issue.updated_at);
    const storyYear = storyDay.year();
    let res = storyDay.format("MMM D");

    if (nowYear !== storyYear) {
      res += `, ${storyYear}`;
    }

    return res;
  }, [issue.updated_at]);

  const authors = issue.labels
    .map((label) => label.name)
    .concat([desc])
    .join(" · ");

  return (
    <MarqueeBox>
      <MarqueeDate>{`#${issue.number}`}</MarqueeDate>
      <MarqueeContent>
        <Link href={`/issue/${issue.number}`} passHref>
          <a>
            <MarqueeTitle>
              <Typography.MarqueeTitle>{issue.title}</Typography.MarqueeTitle>
            </MarqueeTitle>
            <MarqueeExcerpt>
              <Typography.MarqueeDesc>{authors}</Typography.MarqueeDesc>
            </MarqueeExcerpt>
          </a>
        </Link>
      </MarqueeContent>
    </MarqueeBox>
  );
};

export default IssueMarquee;
