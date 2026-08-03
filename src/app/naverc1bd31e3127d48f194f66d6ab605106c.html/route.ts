const BODY = "naver-site-verification: naverc1bd31e3127d48f194f66d6ab605106c.html";

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
