import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.nextUrl.pathname === "/") {
    const apiUrl = new URL("/api/visits", request.url);
    const headers = new Headers({
      "content-type": "application/json",
    });

    const ua = request.headers.get("user-agent");
    if (ua) headers.set("user-agent", ua);

    // Worker 내부 fetch는 CF-Connecting-IP를 의사 IP(2a06:98c0:3600::103)로
    // 덮어쓰므로, 실제 방문자 IP는 body로 전달한다.
    const ip =
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "";

    const country = request.headers.get("cf-ipcountry");
    if (country) headers.set("cf-ipcountry", country);

    event.waitUntil(fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        path: "/",
        referrer: request.headers.get("referer") ?? "",
        language: request.headers.get("accept-language") ?? "",
        ip,
        country: country ?? "",
      }),
    }).then((response) => {
      if (!response.ok) console.warn("Visit recording failed", response.status);
    }).catch(() => {
      console.warn("Visit recording request failed");
    }));
  }

  const response = NextResponse.next();
  response.headers.set(
    "Cache-Control",
    "private, no-cache, no-store, max-age=0, must-revalidate",
  );
  return response;
}

export const config = {
  matcher: ["/"],
};
