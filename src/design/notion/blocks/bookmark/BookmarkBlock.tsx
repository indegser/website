import styled from '@emotion/styled';
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import { motion } from 'framer-motion';

import { useBookmarkBlock } from './BookmarkBlock.hooks';
import { Caption } from '../Caption';

import { mediaQueries } from '@src/design/mediaQueries';
import { theme } from '@src/design/theme';

interface Props {
  url: string;
  caption?: RichTextItemResponse[];
}

export const BookmarkBlock = (props: Props) => {
  const { url, caption = [] } = props;
  const { data: metadata } = useBookmarkBlock(url);

  return (
    <Figure>
      <a href={url} title={metadata?.title} target="_blank" rel="noreferrer">
        <Container whileTap={{ opacity: 0.8 }} transition={{ duration: 0.2 }}>
          <Metadata>
            <Title>{metadata?.title}</Title>
            <Desc>{metadata?.description}</Desc>
            <Url>
              <UrlText>{decodeURIComponent(url)}</UrlText>
            </Url>
          </Metadata>
          <Cover
            style={{
              backgroundImage:
                metadata?.image_url && `url(${metadata.image_url})`,
            }}
          />
        </Container>
      </a>
      <Caption caption={caption} />
    </Figure>
  );
};

const Figure = styled.figure`
  margin: 1.65em 0;
`;

const Container = styled(motion.div)`
  display: flex;
  cursor: pointer;
  margin: 8px 0;
  border-radius: 1px;
  overflow: hidden;
  transition: 0.2s background ease;
  position: relative;
  box-shadow: 0 0 0 1px ${theme.colors.gray6.computedValue};

  ${mediaQueries.hoverable} {
    &:hover {
      background: ${theme.colors.gray3.computedValue};
    }
  }
`;

const Metadata = styled.div`
  flex: 4 1;
  padding: 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
`;

const Title = styled.div`
  font-size: 14px;
  line-height: 22px;
  height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 2px;
  color: ${theme.colors.gray12.computedValue};

  &:empty {
    background: ${theme.colors.gray6.computedValue};
    border-radius: 4px;
  }
`;

const Desc = styled.div`
  font-size: 13px;
  line-height: 17px;
  letter-spacing: 0;
  color: ${theme.colors.gray11.computedValue};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 4px;

  &:empty {
    background: ${theme.colors.gray6.computedValue};
    border-radius: 4px;
    height: 17px;
  }
`;

const Url = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${theme.colors.gray10.computedValue};
`;

const UrlText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 15px;
  letter-spacing: 0;
`;

const Cover = styled.div`
  flex: 1 1 100px;
  background-size: cover;
  background-position: 50% 50%;
  background-color: ${theme.colors.gray6.computedValue};
`;
