"use client";

import Image from "next/image";
import { useId } from "react";
import { PORTAL_URL } from "@/lib/site";
import SiteIcon from "./site-icon";
import "./business-preview.css";

const examples = [
  { name: "유통·도소매", sales: "284,350,000", orders: "91,720,000", pending: "출고 대기", count: "18건", note: "오늘 출고 7건", tasks: ["매입 전표 승인", "신규 주문 확인", "안전 재고 미달", "거래처 계약 만료"], descriptions: ["승인 대기 중인 매입 전표가 있습니다.", "오늘 접수된 주문의 출고 일정을 확인하세요.", "기준 수량 아래로 내려간 제품이 있습니다.", "30일 이내 갱신이 필요한 계약입니다."], shortcuts: ["견적 관리", "거래처 관리", "재고 현황", "출고 관리"], activity: ["출고 지시를 등록했습니다.", "신규 견적서를 작성했습니다.", "거래처 정보를 수정했습니다."], bars: [48, 60, 53, 72, 66, 88], last: "2.84억" },
  { name: "제조", sales: "326,800,000", orders: "124,500,000", pending: "생산 대기", count: "12건", note: "오늘 납품 5건", tasks: ["생산 요청 확인", "자재 발주 승인", "안전 재고 미달", "납품 일정 확인"], descriptions: ["수주에 따른 생산 요청을 확인하세요.", "승인 대기 중인 자재 발주가 있습니다.", "생산에 필요한 자재 수량을 확인하세요.", "이번 주 납품 예정인 주문입니다."], shortcuts: ["수주 관리", "자재 관리", "생산 현황", "납품 관리"], activity: ["생산 요청을 등록했습니다.", "자재 입고를 완료했습니다.", "납품 일정을 변경했습니다."], bars: [42, 56, 65, 61, 77, 92], last: "3.27억" },
  { name: "서비스", sales: "168,400,000", orders: "62,300,000", pending: "진행 프로젝트", count: "9건", note: "이번 주 완료 3건", tasks: ["견적서 승인", "신규 고객 상담", "프로젝트 일정 확인", "계약 갱신 확인"], descriptions: ["고객에게 전달할 견적서를 확인하세요.", "담당자 배정이 필요한 상담이 있습니다.", "이번 주 처리할 업무를 확인하세요.", "만료 예정인 유지보수 계약입니다."], shortcuts: ["고객 관리", "견적 관리", "업무 일정", "계약 관리"], activity: ["신규 프로젝트를 등록했습니다.", "고객 상담을 완료했습니다.", "계약서를 작성했습니다."], bars: [44, 58, 51, 69, 75, 87], last: "1.68억" },
];

function AppIcon({ name }: { name: "home" | "search" | "bell" | "calendar" | "cart" | "wallet" | "clock" | "star" | "briefcase" | "database" }) {
  const paths = {
    home: "m3 10 9-7 9 7v10H3Zm6 10v-8h6v8",
    search: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6",
    bell: "M5 17h14l-2-4V9a5 5 0 0 0-10 0v4Zm5 3h4",
    calendar: "M3 5h18v16H3Zm4-2v5m10-5v5M3 11h18m-13 4h1m3 0h1m3 0h1",
    cart: "M2 3h3l3 12h11l3-9H6M10 20a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm9 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
    wallet: "M3 4h18v16H3ZM3 8h18M3 12h5l2 3h4l2-3h5",
    clock: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 6v6h5",
    star: "m12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z",
    briefcase: "M3 7h18v14H3Zm5 0V3h8v4M3 12l9 3 9-3m-9 1v4",
    database: "M20 5c0 4-16 4-16 0s16-4 16 0ZM4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0",
  };
  return <svg className="kw-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export default function BusinessPreview() {
  const panelId = useId();
  const example = examples[0];
  const external = { href: PORTAL_URL, target: "_blank", rel: "noopener noreferrer" };
  return (
    <div className="kw-preview">
      <div className="kw-preview-label"><span><i /> 실제 서비스 기반 구성 예시</span><a {...external}>솔루션 체험 <SiteIcon name="arrow" /></a></div>
      <div className="kw-window" id={panelId} role="region" aria-label={`${example.name} ERP 업무 홈 예시`}>
        <div className="kw-topbar">
          <span className="kw-logo"><Image src="/kindworks-logo.png" alt="kindworks" width={2172} height={724} /></span><span className="kw-home-tab"><AppIcon name="home" /> 홈</span>
          <div className="kw-top-tools" aria-hidden="true"><AppIcon name="search" /><SiteIcon name="spark" /><AppIcon name="bell" /><span className="kw-user-avatar">K</span><span>관리자<small>최고 관리자</small></span><span>⌄</span></div>
        </div>
        <div className="kw-app">
          <aside className="kw-rail" aria-label="업무 메뉴 미리보기">
            <span className="kw-rail-selected" title="홈"><SiteIcon name="grid" /></span><span title="인사·급여"><AppIcon name="briefcase" /></span><span title="기준정보"><AppIcon name="database" /></span><span title="재고·물류"><SiteIcon name="box" /></span><span title="계약관리"><SiteIcon name="flow" /></span><span title="회계·재무"><AppIcon name="wallet" /></span><span title="경영분석"><SiteIcon name="chart" /></span><span title="시스템 관리"><SiteIcon name="shield" /></span><span className="kw-rail-divider" title="즐겨찾기"><AppIcon name="star" /></span><span title="최근 업무"><AppIcon name="clock" /></span>
          </aside>
          <div className="kw-dashboard" aria-live="polite" aria-atomic="true">
            <div className="kw-page-title"><h3>업무 홈</h3><span>오늘의 경영 현황과 처리할 업무를 한눈에 확인하세요.</span><span className="kw-date"><AppIcon name="calendar" /> 오늘의 현황</span></div>
            <div className="kw-greeting"><span className="kw-greeting-avatar"><SiteIcon name="users" /></span><div><strong>관리자님, 좋은 아침입니다.</strong><p>오늘 처리할 업무 <b>7건</b>과 확인이 필요한 알림 <b>2건</b>이 있습니다.</p></div><a {...external}>내 업무 보기 <SiteIcon name="arrow" /></a></div>
            <div className="kw-kpis">
              <div><span><AppIcon name="wallet" /></span><div><small>이번 달 매출</small><strong>₩ {example.sales}</strong><em className="kw-up">↗ 전월 대비 12.4%</em></div></div>
              <div><span><AppIcon name="cart" /></span><div><small>수주 잔액</small><strong>₩ {example.orders}</strong><em>진행 주문 23건</em></div></div>
              <div><span><SiteIcon name="box" /></span><div><small>{example.pending}</small><strong>{example.count}</strong><em>{example.note}</em></div></div>
              <div><span><SiteIcon name="users" /></span><div><small>활성 사용자</small><strong>12명</strong><em>현재 접속 3명</em></div></div>
            </div>
            <div className="kw-panels">
              <div className="kw-panel kw-tasks"><div className="kw-panel-heading"><div><strong>오늘의 업무</strong><small>우선순위에 따라 처리할 항목입니다.</small></div><span>전체 보기 ›</span></div><div className="kw-task-list">{example.tasks.map((task, index) => <div key={task}><span className={`kw-task-icon kw-tone-${index}`}><SiteIcon name={(["layers", "box", "shield", "users"] as const)[index]} /></span><span><strong>{task}</strong><small>{example.descriptions[index]}</small></span><em>{["4건", "3건", "2개", "2건"][index]}</em><span className="kw-chevron">›</span></div>)}</div></div>
              <div className="kw-panel kw-quick"><div className="kw-panel-heading"><div><strong>빠른 실행</strong><small>자주 사용하는 업무를 바로 시작합니다.</small></div></div><div className="kw-shortcuts">{example.shortcuts.map((shortcut, index) => <a key={shortcut} {...external}><span><SiteIcon name={(["layers", "users", "box", "flow"] as const)[index]} /></span>{shortcut}</a>)}</div></div>
              <div className="kw-panel kw-sales"><div className="kw-panel-heading"><div><strong>매출 흐름</strong><small>최근 6개월 공급가액 기준</small></div><em>↗ 12.4%</em></div><div className="kw-chart" role="img" aria-label={`${example.name} 최근 6개월 매출 추이 예시, 마지막 달 ${example.last}`}><div className="kw-chart-scale"><span>3억</span><span>1억</span><span>0</span></div><div className="kw-bars">{example.bars.map((height, index) => <div key={index}><span style={{ height: `${height}%` }}>{index === 5 && <i>{example.last}</i>}</span><small>{index + 3}월</small></div>)}</div></div></div>
              <div className="kw-panel kw-activity"><div className="kw-panel-heading"><div><strong>최근 업무 활동</strong><small>전체 사용자의 최신 업무 이력</small></div><span className="kw-activity-tab">전체 활동</span></div><div className="kw-activity-list">{example.activity.map((activity, index) => <div key={activity}><i /><span><strong>{activity}</strong><small>관리자 · {example.shortcuts[index]}</small></span><time>{["10:42", "10:28", "09:51"][index]}</time></div>)}</div></div>
            </div>
          </div>
        </div>
        <div className="kw-statusbar"><span>© kindworks. All rights reserved.</span><span><i /> 시스템 정상 운영 중</span></div>
      </div>
      <div className="kw-care"><span><SiteIcon name="shield" /></span><strong>만든 뒤에도, 함께 관리합니다.</strong><i><SiteIcon name="check" /></i></div>
      <p className="kw-note">실제 kindworks 화면을 바탕으로 구성한 예시입니다. 표시된 데이터는 샘플입니다.</p>
    </div>
  );
}
