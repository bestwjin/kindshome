import test from "node:test";
import assert from "node:assert/strict";
import { validateContact, inquiryText } from "../src/lib/contact.ts";

const valid = {
  name: "김담당",
  company: "테스트 회사",
  email: "contact@example.com",
  phone: "010-0000-0000",
  message: "엑셀로 관리하는 수주와 재고를 ERP로 연결하고 싶습니다.",
};

test("valid inquiries are trimmed; optional fields can be omitted", () => {
  const result = validateContact({ ...valid, name: "  김담당  ", company: undefined, phone: undefined });
  assert.equal(result.ok, true);
  assert.deepEqual(result.inquiry, { ...valid, name: "김담당", company: "", phone: "" });
});

test("missing, malformed, and array payloads are rejected", () => {
  for (const value of [null, [], "hello", {}, { ...valid, email: "broken" }, { ...valid, name: " " }, { ...valid, message: "짧은 문의" }]) {
    assert.equal(validateContact(value).ok, false);
  }
});

test("email/header injection and non-text input are rejected", () => {
  for (const value of [{ ...valid, email: "a@example.com\r\nBcc: other@example.com" }, { ...valid, company: "Test\nBcc: other@example.com" }, { ...valid, name: { evil: true } }, { ...valid, phone: 123 }]) {
    assert.equal(validateContact(value).ok, false);
  }
});

test("field limits are checked before delivery", () => {
  for (const [key, max] of Object.entries({ name: 50, company: 100, email: 254, phone: 40, message: 5000 })) {
    assert.equal(validateContact({ ...valid, [key]: "x".repeat(max + 1) }).ok, false);
  }
  assert.equal(validateContact({ ...valid, message: "가".repeat(5000) }).ok, true);
});

test("recipient overrides are ignored and multi-line messages are preserved", () => {
  const message = "첫 번째 업무는 수주 관리입니다.\n두 번째는 재고 관리입니다.";
  const result = validateContact({ ...valid, message, to: "other@example.com", from: "other@example.com" });
  assert.equal(result.ok, true);
  assert.deepEqual(Object.keys(result.inquiry).sort(), ["company", "email", "message", "name", "phone"]);
  assert.ok(inquiryText(result.inquiry).includes(message));
});
