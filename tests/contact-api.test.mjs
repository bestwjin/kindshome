import test from "node:test";
import assert from "node:assert/strict";

// Run explicitly against a running deployment: node tests/contact-api.test.mjs https://kinds.kr
// These checks only submit invalid payloads and never send an email.
const baseUrl = process.argv[2];
const cases = [
  { name: "rejects requests without an origin", body: "{}", origin: false, expected: 403 },
  { name: "rejects missing required fields", body: "{}", origin: true, expected: 400 },
  { name: "rejects malformed JSON", body: "broken", origin: true, expected: 400 },
  { name: "rejects oversized requests", body: "x".repeat(25000), origin: true, expected: 413 },
];

for (const item of cases) {
  test(item.name, { skip: !baseUrl }, async () => {
    const endpoint = new URL("/api/contact", baseUrl);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(item.origin ? { Origin: endpoint.origin } : {}),
      },
      body: item.body,
    });
    assert.equal(response.status, item.expected);
    assert.equal((await response.json()).ok, false);
  });
}
