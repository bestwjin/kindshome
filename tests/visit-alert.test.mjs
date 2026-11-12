import test from "node:test";
import assert from "node:assert/strict";
import { OWNER_VISIT_IP, shouldNotifyVisit, visitAlertMessage, notifyVisit, sendTelegramMessage, VISIT_ALERT_DEDUPE_SECONDS } from "../src/lib/visit-alert.ts";

test("owner IP and empty visits are not alerted", () => {
  assert.equal(shouldNotifyVisit(OWNER_VISIT_IP), false);
  assert.equal(shouldNotifyVisit(`  ${OWNER_VISIT_IP}  `), false);
  assert.equal(shouldNotifyVisit(""), false);
});

test("Telegram rejects invalid tokens, unknown chats, and blocked conversations with safe diagnostics", async (t) => {
  for (const [status, description, reason] of [
    [401, "Unauthorized", "invalid-bot-token"],
    [404, "Not Found", "invalid-bot-token"],
    [400, "Bad Request: chat not found", "chat-not-found"],
    [403, "Forbidden: bot was blocked by the user", "bot-blocked-or-chat-not-started"],
    [429, "Too Many Requests", "rate-limited"],
  ]) {
    t.mock.method(globalThis, "fetch", async () => new Response(JSON.stringify({ ok: false, error_code: status, description }), { status }));
    const result = await sendTelegramMessage({ TELEGRAM_BOT_TOKEN: "secret-token", TELEGRAM_CHAT_ID: "test-chat" }, "test");
    assert.deepEqual(result, { ok: false, reason, status });
    assert.equal(JSON.stringify(result).includes("secret-token"), false);
    t.mock.restoreAll();
  }
});

test("missing configuration and network failures never leak credentials", async (t) => {
  assert.deepEqual(await sendTelegramMessage({}, "test"), { ok: false, reason: "missing-configuration" });
  t.mock.method(globalThis, "fetch", async () => { throw new Error("request URL contains secret-token"); });
  assert.deepEqual(await sendTelegramMessage({ TELEGRAM_BOT_TOKEN: "secret-token", TELEGRAM_CHAT_ID: "test-chat" }, "test"), { ok: false, reason: "telegram-network-error" });
});

test("failed delivery is not marked successful or suppressed for 30 minutes", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response(JSON.stringify({ ok: false, error_code: 400, description: "Bad Request: chat not found" }), { status: 400 }));
  t.mock.method(console, "warn", () => {});
  let writes = 0;
  const env = {
    TELEGRAM_BOT_TOKEN: "test-token", TELEGRAM_CHAT_ID: "test-chat",
    VISITS: { async get() { return null; }, async put() { writes++; } },
  };
  assert.equal(await notifyVisit(env, { ip: "203.0.113.10" }), false);
  assert.equal(writes, 0);
});

test("localhost and loopback addresses are not alerted", () => {
  for (const ip of ["localhost", " LOCALHOST ", "127.0.0.1", "::1", "0:0:0:0:0:0:0:1", "::ffff:127.0.0.1", `::ffff:${OWNER_VISIT_IP}`]) {
    assert.equal(shouldNotifyVisit(ip), false, ip);
  }
});

test("other visitor IPs are alerted with the site message", () => {
  assert.equal(shouldNotifyVisit("203.0.113.10"), true);
  assert.equal(visitAlertMessage(" 203.0.113.10 "), "kinds.kr 접속발생 ip:203.0.113.10");
});

test("external visits send Telegram messages including bots, with repeat suppression", async (t) => {
  const stored = new Map();
  const messages = [];
  t.mock.method(globalThis, "fetch", async (_url, options) => {
    messages.push(JSON.parse(options.body));
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  });
  const env = {
    TELEGRAM_BOT_TOKEN: "test-token",
    TELEGRAM_CHAT_ID: "test-chat",
    VISITS: {
      async get(key) { return stored.get(key) ?? null; },
      async put(key, value, options) {
        assert.equal(options.expirationTtl, VISIT_ALERT_DEDUPE_SECONDS);
        stored.set(key, value);
      },
    },
  };
  for (const ip of [OWNER_VISIT_IP, "localhost", "127.0.0.1", "::1"]) {
    assert.equal(await notifyVisit(env, { ip }), false);
  }
  assert.equal(messages.length, 0);
  assert.equal(await notifyVisit(env, { ip: "203.0.113.10", bot: true }), true);
  assert.deepEqual(messages, [{ chat_id: "test-chat", text: "kinds.kr 접속발생 ip:203.0.113.10" }]);
  assert.equal(await notifyVisit(env, { ip: "203.0.113.10" }), false);
  assert.equal(messages.length, 1);
});
