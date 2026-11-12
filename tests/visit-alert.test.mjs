import test from "node:test";
import assert from "node:assert/strict";
import { OWNER_VISIT_IP, shouldNotifyVisit, visitAlertMessage } from "../src/lib/visit-alert.ts";

test("owner IP and empty or bot visits are not alerted", () => {
  assert.equal(shouldNotifyVisit(OWNER_VISIT_IP), false);
  assert.equal(shouldNotifyVisit(`  ${OWNER_VISIT_IP}  `), false);
  assert.equal(shouldNotifyVisit(""), false);
  assert.equal(shouldNotifyVisit("1.2.3.4", true), false);
});

test("other visitor IPs are alerted with the site message", () => {
  assert.equal(shouldNotifyVisit("203.0.113.10"), true);
  assert.equal(visitAlertMessage(" 203.0.113.10 "), "kinds.kr 접속발생 ip:203.0.113.10");
});
