import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const BG = "#36566A";
const FG = "#F8F6F1";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: BG,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 100,
            height: 28,
            background: FG,
            borderRadius: 14,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: 28,
            height: 100,
            background: FG,
            borderRadius: 14,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
