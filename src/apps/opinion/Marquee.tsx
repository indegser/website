import { FC, useMemo } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { dateFns } from "utils/dateUtils";
import { capitalize } from "utils/stringUtils";

interface Props {
  story: IStory;
}

const MarqueeBox = styled.div`
  break-inside: avoid;
  page-break-inside: avoid;
  position: relative;
  border-bottom: 1px solid var(--border100);
  display: flex;
  padding-bottom: 16px;
  margin-bottom: 16px;
  font-family: var(--font-serif);

  p {
    margin: 0.5rem 0;
  }
`;

const MarqueeContent = styled.div`
  margin-right: 12px;
  flex: 1 1;
`;

const MarqueeTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 4px;
  color: var(--text400);
`;

const MarqueeExcerpt = styled.div`
  font-size: 13px;
  line-height: 20px;
  color: var(--text300);
`;

const MarqueeDate = styled.div`
  font-size: 13px;
  line-height: 16px;
  color: var(--text200);
  margin-top: 12px;
  font-family: var(--font-sans);
`;

const MarqueeCover = styled.img`
  flex: 0 0 auto;
  width: 120px;
  height: auto;
`;

const Marquee: FC<Props> = ({ story }) => {
  const relDate = useMemo(() => {
    const text = dateFns.formatRelative(story.modifiedAt, Date.now());
    return capitalize(text);
  }, [story.modifiedAt]);

  const linkProps = {
    href: "/story/[...slug]",
    as: `/story/${story.slug}----${story.id}`,
  };

  if (!story.data.title) return null;

  return (
    <MarqueeBox>
      <MarqueeContent>
        <Link {...linkProps}>
          <a>
            <MarqueeTitle>{story.data.title}</MarqueeTitle>
            <MarqueeExcerpt>{story.data.excerpt}</MarqueeExcerpt>
          </a>
        </Link>
        <MarqueeDate>{relDate}</MarqueeDate>
      </MarqueeContent>
      {story.data.coverUrl && (
        <Link {...linkProps}>
          <a>
            <MarqueeCover src={story.data.coverUrl} alt={story.data.coverAlt} />
          </a>
        </Link>
      )}
    </MarqueeBox>
  );
};

export default Marquee;
