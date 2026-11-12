import { ImageResponse } from "next/og";

export const alt = "kinds | 우리 회사에 맞춘 ERP 개발·관리·유지보수";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background:
            "linear-gradient(145deg, #17283f 0%, #213a64 100%)",
        color: "#f5fbfa",
        fontFamily:
          "Pretendard, Apple SD Gothic Neo, Malgun Gothic, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 42,
          fontWeight: 800,
          letterSpacing: "-0.06em",
        }}
      >
        kinds
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 58,
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 1.15,
            maxWidth: 920,
          }}
        >
            <span>우리 회사에 맞는 ERP.</span>
            <span style={{ color: "#9bb8ff" }}>그다음까지, 함께.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            lineHeight: 1.45,
            color: "rgba(245,251,250,0.86)",
            maxWidth: 820,
          }}
        >
          고객사 맞춤 개발부터 지속적인 관리·유지보수까지
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
