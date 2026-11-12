"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { KAKAO_CHAT_URL } from "@/lib/site";
import SiteIcon from "./site-icon";

export default function ContactSection() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const panelId = useId();
  const nameInput = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sending = useRef(false);

  useEffect(() => {
    if (!open) return;
    nameInput.current?.focus({ preventScroll: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const header = document.querySelector(".kh-header");
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      const top = panel.getBoundingClientRect().top + window.scrollY - headerBottom - 20;
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
    }, reduce ? 0 : 460);
    return () => window.clearTimeout(timer);
  }, [open]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => { throw new Error("인터넷 연결을 확인하고 다시 시도해주세요. 작성하신 내용은 유지됩니다."); });
      const result = await response.json().catch(() => ({ ok: false }));
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "메일을 보내지 못했습니다. 잠시 후 다시 시도해주세요.");
      }
      form.reset();
      setStatus("success");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "연결을 확인하고 다시 시도해주세요.");
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  return (
    <section className="kh-contact kh-contact-with-email kh-container" id="contact">
      <div className="kh-contact-copy">
        <h2>고객님, 회사의 이야기를<br /><em>들려주세요.</em></h2>
        <p>지금 사용하시는 엑셀, 반복되는 일, 바꾸고 싶은 과정.<br />어디서부터 시작하면 좋을지 함께 찾아보겠습니다.</p>
      </div>
      <div className="kh-contact-actions">
        <button className="kh-button kh-email-toggle" type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
          <SiteIcon name="mail" /> 이메일로 상담하기
        </button>
        <a className="kh-button" href={KAKAO_CHAT_URL} target="_blank" rel="noopener noreferrer"><SiteIcon name="message" /> 카카오톡으로 상담하기</a>
      </div>
      <div className={`kh-email-reveal${open ? " is-open" : ""}`} id={panelId} inert={!open} aria-hidden={!open}>
        <div className="kh-email-reveal-inner">
          <div className="kh-email-panel" ref={panelRef} role="region" aria-labelledby={`${panelId}-title`}>
            <div className="kh-email-heading">
              <span className="kh-email-heading-icon"><SiteIcon name="mail" /></span>
              <div><p id={`${panelId}-title`}>편하게 남겨주시면, 작성하신 이메일로 답변드리겠습니다.</p></div>
            </div>
            {status === "success" ? (
              <div className="kh-email-success" role="status">
                <span><SiteIcon name="check" /></span>
                <h3>상담 메일을 보냈습니다.</h3>
                <p>남겨주신 내용을 확인하고 이메일로 답변드리겠습니다.</p>
                <button type="button" className="kh-text-link" onClick={() => setStatus("idle")}>추가 상담 작성하기</button>
              </div>
            ) : (
              <form className="kh-email-form" onSubmit={submit} aria-busy={status === "sending"}>
                <fieldset disabled={status === "sending"}>
                  <div className="kh-email-fields">
                    <label htmlFor={`${panelId}-name`}>담당자명 <span>필수</span><input ref={nameInput} id={`${panelId}-name`} name="name" autoComplete="name" placeholder="성함을 알려주세요" maxLength={50} required /></label>
                    <label htmlFor={`${panelId}-company`}>회사명 <input id={`${panelId}-company`} name="company" autoComplete="organization" placeholder="회사 또는 브랜드명" maxLength={100} /></label>
                    <label htmlFor={`${panelId}-email`}>답변받을 이메일 <span>필수</span><input id={`${panelId}-email`} name="email" type="email" autoComplete="email" placeholder="name@company.com" maxLength={254} required /></label>
                    <label htmlFor={`${panelId}-phone`}>연락처 <input id={`${panelId}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="연락 가능한 번호 (선택)" maxLength={40} /></label>
                    <label className="kh-email-message" htmlFor={`${panelId}-message`}>상담 내용 <span>필수</span><textarea id={`${panelId}-message`} name="message" rows={5} placeholder="지금 하고 계신 업무, 필요한 기능, 도입 일정 등을 자유롭게 알려주세요." minLength={10} maxLength={5000} required /><small>10자 이상, 5,000자 이내로 작성해주세요.</small></label>
                  </div>
                  <div className="kh-email-honeypot" aria-hidden="true"><label>웹사이트<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
                  <div className="kh-email-form-footer"><p>입력한 연락처는 상담 답변에만 사용합니다.</p><button className="kh-button kh-email-submit" type="submit">{status === "sending" ? "메일 보내는 중…" : "상담 메일 보내기"}</button></div>
                </fieldset>
                {status === "error" && <p className="kh-email-error" role="alert">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
