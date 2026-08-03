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
  bot?: boolean;
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

/** Cloudflare Worker 서브요청 시 CF-Connecting-IP에 고정되는 의사 IP */
export const CF_WORKER_PSEUDO_IP = "2a06:98c0:3600::103";

export function isCloudflareWorkerPseudoIp(ip: string) {
  return ip.trim().toLowerCase() === CF_WORKER_PSEUDO_IP;
}

export function visitIp(visit: VisitRecord) {
  const ip = visit.ip || visit.ipHash || "";
  if (!ip || isCloudflareWorkerPseudoIp(ip)) return "";
  return ip;
}

/**
 * Worker→자체 API fetch 시 CF-Connecting-IP가 의사 IP로 바뀌므로,
 * 원본 방문 IP는 body/custom header로 넘긴 값을 우선한다.
 */
export function resolveClientIp(options: {
  headerIp?: string | null;
  forwardedIp?: string | null;
  bodyIp?: unknown;
}) {
  const headerIp = sanitizeText(options.headerIp, 80).trim();
  const bodyIp = sanitizeText(options.bodyIp, 80).trim();
  const forwardedIp = sanitizeText(options.forwardedIp, 80).trim();

  if (headerIp && !isCloudflareWorkerPseudoIp(headerIp)) return headerIp;
  if (bodyIp && !isCloudflareWorkerPseudoIp(bodyIp)) return bodyIp;
  if (forwardedIp && !isCloudflareWorkerPseudoIp(forwardedIp)) return forwardedIp;
  return "";
}
