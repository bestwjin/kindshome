export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://kinds.kr";

export const SITE_NAME = "kinds";

export const SITE_TITLE = "kinds | 중소기업 IT 컨시어지·전산 유지보수";

export const SITE_DESCRIPTION =
  "중소기업·소규모 업체를 위한 AI 기반 IT 컨시어지 서비스. 전산 개발, 시스템 유지보수, 서버 모니터링, 외주 전산팀을 저렴한 이용시간 정액제로 제공합니다.";

export const SITE_KEYWORDS = [
  "kinds",
  "카인즈",
  "IT 컨시어지",
  "전산 유지보수",
  "시스템 유지보수",
  "중소기업 IT",
  "외주 전산팀",
  "서버 모니터링",
  "AI 개발",
  "전산 외주",
  "IT 유지보수 비용",
];

export const KAKAO_CHAT_URL = "http://pf.kakao.com/_gUzxnX/chat";

export const PORTAL_URL =
  process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://console.kinds.kr";

export const SITE_FAQS = [
  {
    question: "kinds IT 컨시어지 서비스는 어떤 업체에 맞나요?",
    answer:
      "업무용 전산·시스템을 이미 운영 중이지만, 전담 IT 인력을 상시 채용하기엔 부담스러운 중소규모 사업장에 맞습니다. 개발·수정·운영을 외주 전산팀처럼 한곳에서 맡기고 싶을 때 적합합니다.",
  },
  {
    question: "전산 유지보수 비용은 어떻게 계산되나요?",
    answer:
      "이용시간 정액제입니다. 기본 단가는 시간당 5만 원이며, 월 이용 시간 구간에 따라 할인율이 적용됩니다. 선결제(무통장입금) 후 세금계산서를 발행합니다.",
  },
  {
    question: "어떤 업무를 맡길 수 있나요?",
    answer:
      "유지보수 요청 처리, 처리 결과 전달, 이용시간 패키지 운영, 24시간 서버·서비스 모니터링, 도메인·SSL 운영 관리, 접근 통제까지 전산이 끊기지 않도록 함께 챙깁니다.",
  },
  {
    question: "서비스는 어떻게 시작하나요?",
    answer:
      "카카오톡 문의 또는 서비스 포털에서 현황을 공유하고 상품을 선택한 뒤, 결제·승인 절차를 거쳐 바로 요청을 등록하고 운영을 시작할 수 있습니다.",
  },
] as const;
