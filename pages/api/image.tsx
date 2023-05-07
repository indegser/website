import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const font = fetch(
  new URL('../../assets/Pretendard-Bold.otf', import.meta.url)
).then((res) => res.arrayBuffer());

async function handler(request: NextRequest) {
  const fontData = await font;
  const { searchParams } = new URL(request.url);

  // ?title=<title>
  const hasTitle = searchParams.has('title');
  const title = hasTitle
    ? searchParams.get('title')?.slice(0, 100)
    : 'My default title';

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#2a2a2a',
          backgroundSize: '150px 150px',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          color: '#e0e0e0',
          padding: 80,
          boxSizing: 'border-box',
          fontFamily: 'Pretendard',
          wordBreak: 'keep-all',
        }}
      >
        <div
          style={{
            fontSize: 48,
            background: 'white',
            color: 'black',
            padding: 12,
          }}
        >
          에피소드
        </div>
        <div style={{ fontSize: 104, letterSpacing: -0.1 }}>{title}</div>
      </div>
    ),
    {
      width: 1600,
      height: 900,
      fonts: [
        {
          name: 'Pretendard',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}

export default handler;
