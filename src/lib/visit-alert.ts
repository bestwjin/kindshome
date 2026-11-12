/** 운영자 접속은 알림에서 제외한다. */
export const OWNER_VISIT_IP = "182.215.75.16";

const EXCLUDED_VISIT_IPS = new Set([
  OWNER_VISIT_IP,
  "localhost",
  "127.0.0.1",
  "::1",
  "0:0:0:0:0:0:0:1",
]);

/** 같은 IP의 새로고침으로 알림이 반복되지 않게 하는 간격 */
export const VISIT_ALERT_DEDUPE_SECONDS = 30 * 60;

type VisitAlertStore = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
};

export type VisitAlertEnv = {
  VISITS?: VisitAlertStore;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
};

export type TelegramResult =
  | { ok: true }
  | { ok: false; reason: string; status?: number };

/** Return only safe diagnostics; never expose the bot URL or token. */
export async function sendTelegramMessage(env: VisitAlertEnv, text: string): Promise<TelegramResult> {
  const token = env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) return { ok: false, reason: "missing-configuration" };

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(10_000),
    });
    const result = await response.json() as { ok?: boolean; error_code?: number; description?: string };
    if (response.ok && result.ok === true) return { ok: true };
    const status = result.error_code ?? response.status;
    const description = result.description?.toLowerCase() ?? "";
    const reason = status === 401 || status === 404 ? "invalid-bot-token"
      : description.includes("chat not found") ? "chat-not-found"
      : status === 403 ? "bot-blocked-or-chat-not-started"
      : status === 429 ? "rate-limited"
      : "telegram-rejected";
    return { ok: false, reason, status };
  } catch {
    return { ok: false, reason: "telegram-network-error" };
  }
}

export function shouldNotifyVisit(ip: string) {
  const normalized = ip.trim().toLowerCase().replace(/^::ffff:/, "");
  return Boolean(normalized) && !EXCLUDED_VISIT_IPS.has(normalized);
}

export function visitAlertMessage(ip: string) {
  return `kinds.kr 접속발생 ip:${ip.trim()}`;
}

function alertKey(ip: string) {
  return `alert:${ip.trim()}`;
}

export async function notifyVisit(env: VisitAlertEnv, visit: { ip: string; bot?: boolean }) {
  if (!shouldNotifyVisit(visit.ip)) return false;

  const token = env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = env.TELEGRAM_CHAT_ID?.trim();
  const visits = env.VISITS;
  if (!token || !chatId || !visits) return false;

  const key = alertKey(visit.ip);
  if (await visits.get(key)) return false;

  const result = await sendTelegramMessage(env, visitAlertMessage(visit.ip));
  await visits.put("telegram:delivery-status", JSON.stringify({ ...result, at: new Date().toISOString() }), {
    expirationTtl: 24 * 60 * 60,
  });
  if (!result.ok) {
    console.warn("Telegram visit alert failed", result);
    return false;
  }

  await visits.put(key, "1", { expirationTtl: VISIT_ALERT_DEDUPE_SECONDS });
  return true;
}
