import { FC, useMemo } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import dayjs from "dayjs";
import { mq } from "common/theme";

interface Props {
  story: IStory;
}

const MarqueeBox = styled.div`
  break-inside: avoid;
  page-break-inside: avoid;
  position: relative;
  border-bottom: 1px solid var(--border100);
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
  font-size: 18px;
  font-weight: 600;
  line-height: 1.35;
  margin-bottom: 4px;
  color: var(--text400);

  ${mq("md")} {
    font-size: 17px;
  }
`;

const MarqueeExcerpt = styled.div`
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.2px;
  color: var(--text300);
`;

const MarqueeDate = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: var(--text300);
  padding-top: 2px;
  font-family: var(--font-sans);
`;

const MarqueeCover = styled.img`
  flex: 0 0 auto;
  width: 200px;
  height: auto;

  ${mq("md")} {
    margin-top: 8px;
  }
`;

const Marquee: FC<Props> = ({ story }) => {
  const relDate = useMemo(() => {
    const nowYear = dayjs().year();
    const storyDay = dayjs(story.modifiedAt);
    const storyYear = storyDay.year();
    let res = storyDay.format("MMM D");

    if (nowYear !== storyYear) {
      res += `, ${storyYear}`;
    }

    return res;
  }, [story.modifiedAt]);

  const linkProps = {
    href: "/story/[...slug]",
    as: `/story/${story.slug}----${story.id}`,
  };

  if (!story.data.title) return null;

  return (
    <MarqueeBox>
      <MarqueeDate>{relDate}</MarqueeDate>
      <MarqueeContent>
        <Link {...linkProps} passHref>
          <a>
            <MarqueeTitle>{story.data.title}</MarqueeTitle>
            <MarqueeExcerpt>{story.data.excerpt}</MarqueeExcerpt>
          </a>
        </Link>
      </MarqueeContent>
      {story.data.coverUrl && (
        <Link {...linkProps} passHref>
          <a>
            <MarqueeCover src={story.data.coverUrl} alt={story.data.coverAlt} />
          </a>
        </Link>
      )}
    </MarqueeBox>
  );
};

export default Marquee;
