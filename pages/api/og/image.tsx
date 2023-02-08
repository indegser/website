import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

// Make sure the font exists in the specified path:
const pretendardBoldFont = fetch(new URL('../../../assets/Pretendard-Bold.subset.woff', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

const pretendardRegularFont = fetch(new URL('../../../assets/Pretendard-Regular.subset.woff', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export default async function handler(req: NextRequest) {
  const [bold, regular] = await Promise.all([pretendardBoldFont, pretendardRegularFont]);
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "";
  const desc = searchParams.get('desc') || ""

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "black",
          width: '100%',
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          padding: 80,
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 800, color: "white", fontFamily: 'PretendardBold' }}>{decodeURIComponent(title)}</div>
          <div style={{ width: 1000, color: 'white', fontSize: 40, fontWeight: 400, fontFamily: 'PretendardRegular' }}>{desc}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 1200 * (9 / 16),
      fonts: [
        {
          name: 'PretendardBold',
          data: bold,
          style: 'normal',
        },
        {
          name: 'PretendardRegular',
          data: regular,
          style: 'normal',
        },
      ],
    }
  );
}
