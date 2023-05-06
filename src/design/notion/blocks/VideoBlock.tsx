import styled from '@emotion/styled';
import { VideoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import getYouTubeID from 'get-youtube-id';
import { useMemo } from 'react';
import YouTube from 'react-youtube';

import { PageContent } from '@src/design/atoms/Container';
import { mq } from '@src/design/theme/mediaQueries';
interface Props {
  video: VideoBlockObjectResponse['video'];
}

export const VideoBlock = ({ video }: Props) => {
  const youtubeId = useMemo(() => {
    switch (video.type) {
      case 'file':
        return null;
      case 'external': {
        const id = getYouTubeID(video.external.url);
        return id;
      }
    }
  }, [video]);

  if (!youtubeId) return null;

  return (
    <PageContent>
      <Container>
        <YouTube
          videoId={youtubeId}
          className={'youtubeContainer'}
          title=""
          opts={{ width: '100%', height: '100%' }}
        />
      </Container>
    </PageContent>
  );
};

const Container = styled.div`
  margin: 44px 0;

  ${mq('sm')} {
    margin-left: calc(-1 * max(22px, env(safe-area-inset-left)));
    margin-right: calc(-1 * max(22px, env(safe-area-inset-right)));
  }

  .youtubeContainer {
    aspect-ratio: 16 / 9;
  }
`;
