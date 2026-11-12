import { getCloudflareContext } from "@opennextjs/cloudflare";
import { CONTACT_RECIPIENT, CONTACT_SENDER, MAX_CONTACT_BYTES, inquiryText, validateContact } from "@/lib/contact";

export const dynamic = "force-dynamic";

function failure(error: string, status: number) {
  return Response.json({ ok: false, error }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return failure("홈페이지에서 다시 시도해주세요.", 403);
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return failure("입력 형식을 확인해주세요.", 415);
  }
  if (Number(request.headers.get("content-length")) > MAX_CONTACT_BYTES) {
    return failure("상담 내용은 5,000자 이내로 작성해주세요.", 413);
  }

  let body: unknown;
  try {
    // Bound the stream as well: Content-Length may be absent or supplied by a client.
    const reader = request.body?.getReader();
    if (!reader) return failure("상담 내용을 입력해주세요.", 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_CONTACT_BYTES) {
        await reader.cancel();
        return failure("상담 내용은 5,000자 이내로 작성해주세요.", 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    body = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return failure("입력 내용을 확인해주세요.", 400);
  }

  const validation = validateContact(body);
  if (!validation.ok) return failure(validation.error, 400);

  try {
    const { env } = await getCloudflareContext({ async: true });
    if (!env.CONTACT_EMAIL || !env.CONTACT_RATE_LIMITER) {
      return failure("현재 이메일 상담 연결을 확인 중입니다. 카카오톡으로 문의해주세요.", 503);
    }
    const ip = request.headers.get("cf-connecting-ip") || "local";
    const rate = await env.CONTACT_RATE_LIMITER.limit({ key: `contact:${ip}` });
    if (!rate.success) return failure("문의가 연속으로 접수되었습니다. 1분 후 다시 시도해주세요.", 429);
    if (typeof (body as Record<string, unknown>).website === "string" && (body as Record<string, unknown>).website) {
      return failure("입력 내용을 확인하고 다시 시도해주세요.", 400);
    }

    const { inquiry } = validation;
    await env.CONTACT_EMAIL.send({
      from: { name: "kinds 홈페이지 상담", email: CONTACT_SENDER },
      to: CONTACT_RECIPIENT,
      replyTo: inquiry.email,
      subject: `[kinds ERP 상담] ${inquiry.company || inquiry.name}`,
      text: inquiryText(inquiry),
    });

    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    // Never log the form contents or contact details.
    console.error("Contact email delivery failed");
    return failure("메일을 보내지 못했습니다. 입력 내용은 유지되니 잠시 후 다시 시도하거나 카카오톡으로 문의해주세요.", 502);
  }
}
