# kindshome

kinds 회사·서비스 홍보용 홈페이지입니다.

## 실행

```bash
npm install
npm run dev -- --port 3001
```

브라우저에서 [http://localhost:3001](http://localhost:3001) 접속

## 연동

- 서비스 포털 기본 주소: `https://console.kinds.kr`
- 변경 시 `.env.local`에 `NEXT_PUBLIC_PORTAL_URL` 설정
- 사이트 URL 기본값: `https://kinds.kr` (`NEXT_PUBLIC_SITE_URL`로 변경 가능)
- Google Search Console 인증: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

## SEO

- `/robots.txt`, `/sitemap.xml`, Open Graph 이미지, JSON-LD(Organization/Service/FAQ) 제공
- Canonical은 `https://kinds.kr`, `www.kinds.kr`는 apex로 영구 리다이렉트

## 접속 기록

- 홈페이지 방문 시 Cloudflare KV(`VISITS`)에 세션당 1회 기록
- 조회: `https://kinds.kr/admin/visits?token=<VISITS_ADMIN_TOKEN>`
- 시크릿 설정: `npx wrangler secret put VISITS_ADMIN_TOKEN`

## 구성

- Hero: kinds 브랜드 중심 소개
- Service: IT 컨시어지 핵심 가치
- Process: 문의 → 결제 → 운영 → 결과 흐름
- FAQ: 검색·도입 관련 자주 묻는 질문
- Contact: 카카오톡 문의 / 포털 이동
