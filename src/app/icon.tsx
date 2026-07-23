import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Thicker rounded-n mark than the previous favicon. */
const MARK =
  "M4.5 28V13.5a11.5 11.5 0 0 1 23 0V28h-7.6V13.5a3.9 3.9 0 0 0-7.8 0V28H4.5z";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path fill="#0f6e6a" d={MARK} />
        </svg>
      </div>
    ),
    { ...size },
  );
}
