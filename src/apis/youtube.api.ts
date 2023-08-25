import 'server-only';

import { get } from '@vercel/edge-config';
import { UserRefreshClient } from 'google-auth-library';

import { youtube } from '@src/sdks/youtube';

export const youtubeApi = {
  getVideos: async () => {
    const clientParams = await get<string[]>('google_args');
    const client = new UserRefreshClient(...clientParams);
    const response = await client.getAccessToken();

    return youtube.videos.list({
      myRating: 'like',
      part: ['snippet'],
      access_token: response.token,
    });
  },
};
