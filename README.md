# kindshome

kinds 고객사 맞춤 ERP 개발과 지속적인 관리·유지보수 서비스 홈페이지입니다.

## 실행

```bash
npm install
npm run dev -- --port 3001
```

브라우저에서 [http://localhost:3001](http://localhost:3001) 접속

## 연동

- 서비스 포털 기본 주소: `https://work.kinds.kr`
- 변경 시 `.env.local`에 `NEXT_PUBLIC_PORTAL_URL` 설정
- 사이트 URL 기본값: `https://kinds.kr` (`NEXT_PUBLIC_SITE_URL`로 변경 가능)
- Google Search Console 인증: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

## 이메일 상담

- 홈페이지 하단의 이메일 상담 버튼에서 폼을 펼쳐 `/api/contact`로 제출합니다.
- Cloudflare Email Routing으로 `consult@contact.kinds.kr`에서 `thekinds@naver.com`으로 발송합니다. 답장 주소는 상담 신청자의 이메일입니다.
- 수신 주소 인증과 `contact.kinds.kr`의 메일 DNS 설정이 필요합니다. `CONTACT_EMAIL` 바인딩은 위 발신·수신 주소로 제한되어 있습니다.
- `CONTACT_RATE_LIMITER`로 IP당 1분에 3회로 제한하며, 입력 검증·요청 크기 제한·동일 출처 검사·스팸 방지 항목을 적용합니다.
- 개발 서버에서는 메일이 로컬 시뮬레이터로 처리됩니다. 실제 발송은 배포된 사이트에서 확인합니다.
- 검증: `node --test tests/contact.test.mjs`

## SEO

- `/robots.txt`, `/sitemap.xml`, Open Graph 이미지, JSON-LD(Organization/Service/FAQ) 제공
- Canonical은 `https://kinds.kr`, `www.kinds.kr`는 apex로 영구 리다이렉트

## 접속 기록

- 홈페이지 방문 시 Cloudflare KV(`VISITS`)에 기록 (사람/봇 모두, 봇 여부는 `bot` 필드로 표시)
- 조회: `https://kinds.kr/admin/visits?token=<VISITS_ADMIN_TOKEN>`
- 시크릿 설정: `npx wrangler secret put VISITS_ADMIN_TOKEN`

## 구성

- Hero: 기본 ERP 템플릿 + 고객사별 맞춤 구축 + 월 운영 안내
- Features: kindserp 프로젝트를 참고한 거래처·상품, 견적·수주, 재고, 인사, 권한 구성
- Demo: 견적 검색·등록·상태 변경, 재고·거래처 조회. React 메모리에서만 동작하며 서버 연결이나 영구 저장은 없습니다.
- Pricing: 초기 약 100만·200만원, 월 약 30만원의 예상 구성. 실제 견적 및 운영 조건은 상담 후 확정합니다.
- Process / FAQ / Contact: 도입 절차와 운영 범위, 카카오톡 상담 및 기존 고객 포털

가격과 FAQ 등 공개 안내는 `src/lib/site.ts`, 섹션 구성은 `src/app/page.tsx`, 체험은 `src/app/erp-demo.tsx`에서 관리합니다.
업종별 업무 흐름 예시는 `src/app/business-preview.tsx`, 홈페이지 디자인은 `src/app/redesign.css`에서 관리합니다.
