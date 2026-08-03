export type VisitRecord = {
  id: string;
  at: string;
  path: string;
  referrer: string;
  ua: string;
  language: string;
  country: string;
  city: string;
  region: string;
  ip: string;
  /** @deprecated kept for older records */
  ipHash?: string;
};

export const VISIT_KEY_PREFIX = "v:";
export const VISIT_TTL_SECONDS = 60 * 60 * 24 * 180; // 180 days
export const VISIT_LIST_LIMIT = 200;

const BOT_UA =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|redditbot|ahrefs|semrush|petalbot|bytespider|gptbot|claudebot|google-extended|yandex|baidu|duckduck|preview/i;

export function isBotUserAgent(ua: string) {
  return !ua || BOT_UA.test(ua);
}

export function visitKey(atMs: number, id: string) {
  // Lexicographically newest-first.
  const inverted = (1_000_000_000_000_000 - atMs).toString().padStart(16, "0");
  return `${VISIT_KEY_PREFIX}${inverted}:${id}`;
}

export function sanitizePath(path: unknown) {
  if (typeof path !== "string" || !path.startsWith("/")) return "/";
  return path.slice(0, 200);
}

export function sanitizeText(value: unknown, max = 300) {
  if (typeof value !== "string") return "";
  return value.slice(0, max);
}

export function visitIp(visit: VisitRecord) {
  return visit.ip || visit.ipHash || "";
}
