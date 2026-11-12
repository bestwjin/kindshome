import test from "node:test";
import assert from "node:assert/strict";
import { OWNER_VISIT_IP, shouldNotifyVisit, visitAlertMessage, notifyVisit, VISIT_ALERT_DEDUPE_SECONDS } from "../src/lib/visit-alert.ts";

test("owner IP and empty visits are not alerted", () => {
  assert.equal(shouldNotifyVisit(OWNER_VISIT_IP), false);
  assert.equal(shouldNotifyVisit(`  ${OWNER_VISIT_IP}  `), false);
  assert.equal(shouldNotifyVisit(""), false);
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
