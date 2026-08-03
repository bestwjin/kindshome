import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Metadata } from "next";
import {
  VISIT_KEY_PREFIX,
  VISIT_LIST_LIMIT,
  type VisitRecord,
} from "@/lib/visits";
import "./visits.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "접속 기록",
  robots: {
    index: false,
    follow: false,
  },
};

type SearchParams = Promise<{ token?: string }>;

async function loadVisits(token: string | undefined) {
  const { env } = await getCloudflareContext({ async: true });
  const expected = env.VISITS_ADMIN_TOKEN;
  const visitsKv = env.VISITS;

  if (!visitsKv) {
    return { error: "VISITS KV 바인딩이 없습니다.", visits: [] as VisitRecord[] };
  }
  if (!expected) {
    return {
      error: "VISITS_ADMIN_TOKEN 시크릿이 설정되지 않았습니다.",
      visits: [] as VisitRecord[],
    };
  }
  if (!token || token !== expected) {
    return { error: "권한이 없습니다. ?token=관리토큰 으로 접속하세요.", visits: [] as VisitRecord[] };
  }

  const listed = await visitsKv.list({
    prefix: VISIT_KEY_PREFIX,
    limit: VISIT_LIST_LIMIT,
  });

  const loaded: Array<VisitRecord | null> = await Promise.all(
    listed.keys.map(async (key: { name: string }) => {
      const value = await visitsKv.get(key.name);
      if (!value) return null;
      try {
        return JSON.parse(value) as VisitRecord;
      } catch {
        return null;
      }
    }),
  );
  const visits = loaded.filter((item): item is VisitRecord => item !== null);

  return { error: null as string | null, visits };
}

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

export default async function VisitsAdminPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { token } = await searchParams;
  const { error, visits } = await loadVisits(token);

  return (
    <main className="visits-admin">
      <header className="visits-admin-header">
        <h1>kinds 홈페이지 접속 기록</h1>
        <p>최근 {VISIT_LIST_LIMIT}건 · 세션당 1회 기록 · 180일 보관</p>
      </header>

      {error ? (
        <p className="visits-admin-error">{error}</p>
      ) : (
        <>
          <p className="visits-admin-count">총 {visits.length}건</p>
          <div className="visits-admin-table-wrap">
            <table className="visits-admin-table">
              <thead>
                <tr>
                  <th>시각(KST)</th>
                  <th>경로</th>
                  <th>국가</th>
                  <th>지역</th>
                  <th>유입</th>
                  <th>언어</th>
                  <th>IP 해시</th>
                  <th>UA</th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit) => (
                  <tr key={`${visit.at}-${visit.id}`}>
                    <td>{formatWhen(visit.at)}</td>
                    <td>{visit.path}</td>
                    <td>{visit.country || "-"}</td>
                    <td>
                      {[visit.city, visit.region].filter(Boolean).join(", ") || "-"}
                    </td>
                    <td className="visits-admin-referrer">
                      {visit.referrer || "직접/없음"}
                    </td>
                    <td>{visit.language || "-"}</td>
                    <td>{visit.ipHash || "-"}</td>
                    <td className="visits-admin-ua" title={visit.ua}>
                      {visit.ua || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
