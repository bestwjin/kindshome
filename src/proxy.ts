import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    try {
      const { getCloudflareContext } = await import("@opennextjs/cloudflare");
      const { writeVisitRecord } = await import("@/lib/record-visit");
      const { ctx } = await getCloudflareContext({ async: true });

      const write = writeVisitRecord({
        path: "/",
        referrer: request.headers.get("referer") ?? "",
        language: request.headers.get("accept-language") ?? "",
        ua: request.headers.get("user-agent") ?? "",
        ip:
          request.headers.get("cf-connecting-ip") ??
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          "",
        country: request.headers.get("cf-ipcountry") ?? "",
      });

      if (ctx?.waitUntil) {
        ctx.waitUntil(write);
      } else {
        await write;
      }
    } catch {
      // Visit logging must never break the page.
    }
  }

  const response = NextResponse.next();
  if (request.nextUrl.pathname === "/") {
    response.headers.set(
      "Cache-Control",
      "private, no-cache, no-store, max-age=0, must-revalidate",
    );
  }
  return response;
}

export const config = {
  matcher: ["/"],
};
