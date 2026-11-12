import { createHash, timingSafeEqual } from "node:crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { sendTelegramMessage } from "@/lib/visit-alert";

export const dynamic = "force-dynamic";

/** Authenticated, fixed-message connectivity check. Credentials stay in the Worker. */
export async function POST(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  const expected = env.TELEGRAM_TEST_TOKEN || env.VISITS_ADMIN_TOKEN;
  const authorization = request.headers.get("authorization") ?? "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  const digest = (value: string) => createHash("sha256").update(value).digest();
  if (!expected || !token || !timingSafeEqual(digest(token), digest(expected))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cooldownKey = "telegram:test:cooldown";
  if (!env.VISITS) return Response.json({ ok: false, reason: "missing-visit-store" }, { status: 503 });
  if (await env.VISITS.get(cooldownKey)) {
    return Response.json({ ok: false, reason: "test-cooldown" }, { status: 429 });
  }
  await env.VISITS.put(cooldownKey, "1", { expirationTtl: 60 });
  const result = await sendTelegramMessage(env, "kinds.kr 텔레그램 알림 연결 테스트입니다.");
  return Response.json(result, {
    status: result.ok ? 200 : 502,
    headers: { "Cache-Control": "no-store" },
  });
}
