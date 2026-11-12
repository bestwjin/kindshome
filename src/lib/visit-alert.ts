/** 운영자 접속은 알림에서 제외한다. */
export const OWNER_VISIT_IP = "182.215.75.16";

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

export function shouldNotifyVisit(ip: string, bot = false) {
  if (bot) return false;
  const normalized = ip.trim();
  if (!normalized || normalized === OWNER_VISIT_IP) return false;
  return true;
}

export function visitAlertMessage(ip: string) {
  return `kinds.kr 접속발생 ip:${ip.trim()}`;
}

function alertKey(ip: string) {
  return `alert:${ip.trim()}`;
}

export async function notifyVisit(env: VisitAlertEnv, visit: { ip: string; bot?: boolean }) {
  if (!shouldNotifyVisit(visit.ip, Boolean(visit.bot))) return false;

  const token = env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = env.TELEGRAM_CHAT_ID?.trim();
  const visits = env.VISITS;
  if (!token || !chatId || !visits) return false;

  const key = alertKey(visit.ip);
  if (await visits.get(key)) return false;

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: visitAlertMessage(visit.ip),
    }),
  });
  if (!response.ok) return false;

  await visits.put(key, "1", { expirationTtl: VISIT_ALERT_DEDUPE_SECONDS });
  return true;
}
