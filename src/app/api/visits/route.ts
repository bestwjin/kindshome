import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  hashIp,
  isBotUserAgent,
  sanitizePath,
  sanitizeText,
  visitKey,
  VISIT_LIST_LIMIT,
  VISIT_KEY_PREFIX,
  VISIT_TTL_SECONDS,
  type VisitRecord,
} from "@/lib/visits";

export const dynamic = "force-dynamic";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

function getAdminToken(request: Request) {
  const header = request.headers.get("authorization");
  if (header?.startsWith("Bearer ")) {
    return header.slice("Bearer ".length).trim();
  }
  return new URL(request.url).searchParams.get("token")?.trim() ?? "";
}

export async function POST(request: Request) {
  try {
    const { env, cf } = await getCloudflareContext({ async: true });
    const visits = env.VISITS;
    if (!visits) {
      return Response.json({ ok: false, skipped: "no-binding" }, { status: 503 });
    }

    const ua = request.headers.get("user-agent") ?? "";
    if (isBotUserAgent(ua)) {
      return Response.json({ ok: true, skipped: "bot" });
    }

    let body: Record<string, unknown> = {};
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      body = (await request.json()) as Record<string, unknown>;
    } else {
      const text = await request.text();
      if (text) {
        try {
          body = JSON.parse(text) as Record<string, unknown>;
        } catch {
          body = {};
        }
      }
    }

    const now = Date.now();
    const id = crypto.randomUUID().slice(0, 8);
    const ip =
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "";

    const record: VisitRecord = {
      id,
      at: new Date(now).toISOString(),
      path: sanitizePath(body.path),
      referrer: sanitizeText(body.referrer, 500),
      ua: sanitizeText(ua, 400),
      language: sanitizeText(body.language ?? request.headers.get("accept-language"), 80),
      country: sanitizeText(cf?.country ?? request.headers.get("cf-ipcountry"), 8),
      city: sanitizeText((cf as { city?: string } | undefined)?.city, 80),
      region: sanitizeText((cf as { region?: string } | undefined)?.region, 80),
      ipHash: await hashIp(ip),
    };

    await visits.put(visitKey(now, id), JSON.stringify(record), {
      expirationTtl: VISIT_TTL_SECONDS,
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const visits = env.VISITS;
    if (!visits) {
      return Response.json({ error: "VISITS binding missing" }, { status: 503 });
    }

    const expected = env.VISITS_ADMIN_TOKEN;
    if (!expected || getAdminToken(request) !== expected) {
      return unauthorized();
    }

    const listed = await visits.list({
      prefix: VISIT_KEY_PREFIX,
      limit: VISIT_LIST_LIMIT,
    });

    const loaded: Array<VisitRecord | null> = await Promise.all(
      listed.keys.map(async (key: { name: string }) => {
        const value = await visits.get(key.name);
        if (!value) return null;
        try {
          return JSON.parse(value) as VisitRecord;
        } catch {
          return null;
        }
      }),
    );
    const records = loaded.filter((item): item is VisitRecord => item !== null);

    return Response.json({
      count: records.length,
      truncated: listed.list_complete === false,
      visits: records,
    });
  } catch {
    return Response.json({ error: "Failed to load visits" }, { status: 500 });
  }
}
