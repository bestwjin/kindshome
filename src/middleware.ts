import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const apiUrl = new URL("/api/visits", request.url);
    const headers = new Headers({
      "content-type": "application/json",
    });

    const ua = request.headers.get("user-agent");
    if (ua) headers.set("user-agent", ua);

    const ip =
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (ip) headers.set("cf-connecting-ip", ip);

    const country = request.headers.get("cf-ipcountry");
    if (country) headers.set("cf-ipcountry", country);

    void fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        path: "/",
        referrer: request.headers.get("referer") ?? "",
        language: request.headers.get("accept-language") ?? "",
      }),
    }).catch(() => {});
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
