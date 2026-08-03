"use client";

import { useEffect } from "react";

const SESSION_KEY = "kinds_visit_logged";

export function VisitTracker() {
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (window.sessionStorage.getItem(SESSION_KEY)) return;

      const payload = JSON.stringify({
        path: window.location.pathname || "/",
        referrer: document.referrer || "",
        language: navigator.language || "",
      });

      window.sessionStorage.setItem(SESSION_KEY, "1");

      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/visits", blob);
        return;
      }

      void fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      });
    } catch {
      // Ignore tracking failures.
    }
  }, []);

  return null;
}
