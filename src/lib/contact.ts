export const CONTACT_RECIPIENT = "thekinds@naver.com";
export const CONTACT_SENDER = "consult@contact.kinds.kr";
export const MAX_CONTACT_BYTES = 24_000;

export type ContactInquiry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

export function validateContact(value: unknown):
  | { ok: true; inquiry: ContactInquiry }
  | { ok: false; error: string } {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ok: false, error: "입력 내용을 확인해주세요." };
  }
  const body = value as Record<string, unknown>;
  const limits = { name: 50, company: 100, email: 254, phone: 40, message: 5000 };
  const fields = {} as ContactInquiry;
  for (const field of Object.keys(limits) as (keyof ContactInquiry)[]) {
    const raw = body[field] ?? "";
    if (typeof raw !== "string" || raw.length > limits[field]) {
      return { ok: false, error: "입력 항목의 형식과 길이를 확인해주세요." };
    }
    const text = raw.trim();
    if (field !== "message" && /[\r\n\x00-\x1f\x7f]/.test(text)) {
      return { ok: false, error: "입력 항목에 올바르지 않은 문자가 있습니다." };
    }
    fields[field] = text;
  }
  if (!fields.name) return { ok: false, error: "담당자명을 입력해주세요." };
  if (!/^[^\s<>@,;"\\]+@[^\s<>@,;"\\]+\.[^\s<>@,;"\\]+$/.test(fields.email)) {
    return { ok: false, error: "답변받을 이메일 주소를 확인해주세요." };
  }
  if (fields.message.length < 10) {
    return { ok: false, error: "상담 내용을 10자 이상 입력해주세요." };
  }
  return { ok: true, inquiry: fields };
}

export function inquiryText(inquiry: ContactInquiry) {
  return [
    "kinds 홈페이지에서 접수된 ERP 상담입니다.", "",
    `담당자: ${inquiry.name}`,
    `회사명: ${inquiry.company || "미입력"}`,
    `이메일: ${inquiry.email}`,
    `연락처: ${inquiry.phone || "미입력"}`,
    "", "[상담 내용]", inquiry.message, "",
    "이 메일에 답장하면 상담 신청자의 이메일로 전달됩니다.",
  ].join("\n");
}
