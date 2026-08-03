import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers } from "next/headers";
import {
  isBotUserAgent,
  sanitizePath,
  sanitizeText,
  visitKey,
  VISIT_TTL_SECONDS,
  type VisitRecord,
} from "@/lib/visits";

export async function recordServerVisit(path = "/") {
  try {
    const { env, cf, ctx } = await getCloudflareContext({ async: true });
    const visits = env.VISITS;
    if (!visits) return;

    const headerStore = await headers();
    const ua = headerStore.get("user-agent") ?? "";
    const ip =
      headerStore.get("cf-connecting-ip") ??
      headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "";

    const now = Date.now();
    const id = crypto.randomUUID().slice(0, 8);
    const record: VisitRecord = {
      id,
      at: new Date(now).toISOString(),
      path: sanitizePath(path),
      referrer: sanitizeText(headerStore.get("referer"), 500),
      ua: sanitizeText(ua, 400),
      language: sanitizeText(headerStore.get("accept-language"), 80),
      country: sanitizeText(cf?.country ?? headerStore.get("cf-ipcountry"), 8),
      city: sanitizeText((cf as { city?: string } | undefined)?.city, 80),
      region: sanitizeText((cf as { region?: string } | undefined)?.region, 80),
      ip: sanitizeText(ip, 80),
      bot: isBotUserAgent(ua),
    };

    const write = visits.put(visitKey(now, id), JSON.stringify(record), {
      expirationTtl: VISIT_TTL_SECONDS,
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
