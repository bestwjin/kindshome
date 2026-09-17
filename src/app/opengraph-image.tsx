import { ImageResponse } from "next/og";

export const alt = "kinds | 중소기업 IT 컨시어지·전산 유지보수";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(circle at 85% 15%, rgba(26,155,148,0.35), transparent 42%), linear-gradient(145deg, #0c2f2d 0%, #0f6e6a 68%, #1a9b94 100%)",
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
            <span>만들고, 고치고, 이어가는</span>
            <span>IT 컨시어지 서비스</span>
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
            중소기업 전산 개발·유지보수·서버 모니터링을 이용시간 정액제로
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
