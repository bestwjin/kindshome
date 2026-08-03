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

type VisitInput = {
  path?: string;
  referrer?: string;
  language?: string;
  ua?: string;
  ip?: string;
  country?: string;
  city?: string;
  region?: string;
};

export async function writeVisitRecord(input: VisitInput = {}) {
  const { env, cf } = await getCloudflareContext({ async: true });
  const visits = env.VISITS;
  if (!visits) return false;

  const ua = input.ua ?? "";
  const now = Date.now();
  const id = crypto.randomUUID().slice(0, 8);

  const record: VisitRecord = {
    id,
    at: new Date(now).toISOString(),
    path: sanitizePath(input.path ?? "/"),
    referrer: sanitizeText(input.referrer, 500),
    ua: sanitizeText(ua, 400),
    language: sanitizeText(input.language, 80),
    country: sanitizeText(input.country ?? cf?.country, 8),
    city: sanitizeText(
      input.city ?? (cf as { city?: string } | undefined)?.city,
      80,
    ),
    region: sanitizeText(
      input.region ?? (cf as { region?: string } | undefined)?.region,
      80,
    ),
    ip: sanitizeText(input.ip, 80),
    bot: isBotUserAgent(ua),
  };

  await visits.put(visitKey(now, id), JSON.stringify(record), {
    expirationTtl: VISIT_TTL_SECONDS,
  });
  return true;
}

export async function recordServerVisit(path = "/") {
  try {
    const headerStore = await headers();
    const ua = headerStore.get("user-agent") ?? "";
    const ip =
      headerStore.get("cf-connecting-ip") ??
      headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "";

    await writeVisitRecord({
      path,
      referrer: headerStore.get("referer") ?? "",
      language: headerStore.get("accept-language") ?? "",
      ua,
      ip,
      country: headerStore.get("cf-ipcountry") ?? "",
    });
  } catch {
    // Visit logging must never break the page.
  }
}
