import { youtube } from '@googleapis/youtube';
import { get } from '@vercel/edge-config';
import { UserRefreshClient } from 'google-auth-library';

export const getLikedVideos = async () => {
  const clientParams = await get<string[]>('google_args');
  const client = new UserRefreshClient(...clientParams);
  const response = await client.getAccessToken();

  return youtube('v3').videos.list({
    myRating: 'like',
    part: ['snippet'],
    access_token: response.token,
  });
};
