'use client';

import { VideoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import getYouTubeID from 'get-youtube-id';
import { useMemo } from 'react';
import YouTube from 'react-youtube';

import { PageContent } from '@src/design/atoms/Container';

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
      <div className="-mx-6 my-11">
        <YouTube
          videoId={youtubeId}
          className={'youtubeContainer'}
          title=""
          opts={{ width: '100%', height: '100%' }}
        />
      </div>
    </PageContent>
  );
};
