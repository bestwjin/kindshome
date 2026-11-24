"use client";

import { useEffect, useRef } from "react";

export default function ChannelTalkHint() {
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hint = hintRef.current;
    const heading = document.getElementById("contact-heading");
    if (!hint || !heading) return;

    let headingEntered = false;
    let positionTimer: number | undefined;
    let dismissTimer: number | undefined;

    const hideHint = () => {
      window.clearInterval(positionTimer);
      window.clearTimeout(dismissTimer);
      delete hint.dataset.state;
    };

    const positionHint = () => {
      // Channel Talk renders its launcher in a shadow root after the SDK boots.
      const launcher = document.querySelector("#ch-plugin-entry > div")?.shadowRoot?.querySelector("button");
      const bounds = launcher?.getBoundingClientRect();
      const messenger = document.getElementById("ch-plugin-script");
      if (
        (messenger && !messenger.classList.contains("ch-messenger-hidden")) ||
        (!bounds?.width && hint.dataset.state === "visible")
      ) {
        hideHint();
        return;
      }
      if (!bounds?.width || !bounds.height) return;

      hint.style.setProperty("--kh-channel-button-left", `${bounds.left}px`);
      hint.style.setProperty("--kh-channel-button-center", `${bounds.top + bounds.height / 2}px`);
      hint.style.setProperty("--kh-channel-button-width", `${bounds.width}px`);
      hint.style.setProperty("--kh-channel-button-height", `${bounds.height}px`);

      if (hint.dataset.state === "visible") return;
      hint.dataset.state = "visible";
      window.clearTimeout(dismissTimer);
      dismissTimer = window.setTimeout(() => {
        window.clearInterval(positionTimer);
        hint.dataset.state = "fading";
      }, 5000);
    };

    const headerHeight = document.querySelector(".kh-header")?.getBoundingClientRect().height ?? 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio === 0) {
        headingEntered = false;
        hideHint();
      } else if (!headingEntered && entry.intersectionRatio >= 0.8) {
        headingEntered = true;
        dismissTimer = window.setTimeout(hideHint, 10_000);
        positionTimer = window.setInterval(positionHint, 120);
        positionHint();
      }
    }, { rootMargin: `-${headerHeight}px 0px 0px`, threshold: [0, 0.8] });

    observer.observe(heading);
    return () => {
      observer.disconnect();
      hideHint();
    };
  }, []);

  return (
    <div className="kh-channel-hint" ref={hintRef}>
      또는 채널톡으로도 상담하실 수 있어요^^
      <span className="kh-channel-hint-arrow" aria-hidden="true" />
    </div>
  );
}
