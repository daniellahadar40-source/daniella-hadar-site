import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const BG = "#36566A";
const FG = "#F8F6F1";

export default function Icon() {
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
            top: 7,
            left: 7,
            width: 18,
            height: 5,
            background: FG,
            borderRadius: 2.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 7,
            right: 7,
            width: 5,
            height: 18,
            background: FG,
            borderRadius: 2.5,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
