import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const text = searchParams.get("text") || "";

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "#efefef",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {text}
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
