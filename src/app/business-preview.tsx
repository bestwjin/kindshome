"use client";

import { useId, useState } from "react";
import SiteIcon from "./site-icon";

const examples = [
  { name: "유통·도소매", title: "주문부터 출고까지, 끊김 없이.", steps: ["견적·수주", "재고 확인", "출고 관리", "매출 정리"], rows: [["거래처별 단가 관리", "영업 관리", "맞춤 항목"], ["창고별 입출고 현황", "재고 관리", "업무 연결"], ["우리 회사 거래명세서", "문서 출력", "맞춤 양식"]] },
  { name: "제조", title: "현장의 순서에 맞춘 업무 흐름.", steps: ["수주 접수", "생산 요청", "자재 확인", "납품 관리"], rows: [["제품별 수주 내역", "영업 관리", "맞춤 항목"], ["생산·납품 진행 현황", "업무 관리", "업무 연결"], ["자재별 재고 조회", "재고 관리", "맞춤 화면"]] },
  { name: "서비스", title: "진행하는 일도, 고객 정보도 한곳에.", steps: ["고객 상담", "견적 작성", "업무 진행", "정산 관리"], rows: [["고객별 상담·계약 정보", "고객 관리", "맞춤 항목"], ["담당자별 진행 현황", "업무 관리", "업무 연결"], ["회사별 견적서 양식", "문서 출력", "맞춤 양식"]] },
];

export default function BusinessPreview() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];
  const panelId = useId();
  return (
    <div className="kh-preview">
      <div className="kh-preview-top"><span><i /> 구성 예시</span></div>
      <div className="kh-industry-picker" aria-label="업종별 업무 흐름 예시">
        {examples.map((item, index) => <button key={item.name} type="button" aria-pressed={selected === index} aria-controls={panelId} onClick={() => setSelected(index)}>{item.name}</button>)}
      </div>
      <div className="kh-workspace" id={panelId}>
        <div className="kh-workspace-bar"><strong>kinds<span>workspace</span></strong><span><i /> 우리 회사 전용 ERP</span></div>
        <div className="kh-workspace-body">
          <aside aria-hidden="true"><span className="kh-workspace-avatar">K</span><SiteIcon name="grid" /><SiteIcon name="chart" /><SiteIcon name="box" /><SiteIcon name="users" /><span className="kh-rail-bottom"><SiteIcon name="shield" /></span></aside>
          <div className="kh-workspace-content" aria-live="polite">
            <div className="kh-workspace-heading"><p>우리 회사의 업무 공간</p></div>
            <h3>{example.title}</h3>
            <p className="kh-workspace-subtitle">익숙한 업무가 하나의 시스템으로 연결됩니다.</p>
            <div className="kh-workflow">{example.steps.map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < 3 && <SiteIcon name="arrow" />}</div>)}</div>
            <div className="kh-workspace-table"><div><span>우리 업무에 맞춘 기능</span><span>구성 방식</span></div>{example.rows.map(([title, module, tag]) => <div key={title}><span><SiteIcon name="check" /><strong>{title}<small>{module}</small></strong></span><em>{tag}</em></div>)}</div>
            <div className="kh-workspace-bottom"><SiteIcon name="layers" /><span>필요한 기능을 연결하고, 회사의 방식을 담습니다.</span></div>
          </div>
        </div>
      </div>
      <div className="kh-care-float"><span className="kh-care-float-icon"><SiteIcon name="shield" /></span><span><strong>만든 뒤에도, 함께 관리합니다.</strong></span><span className="kh-float-check"><SiteIcon name="check" /></span></div>
      <p className="kh-preview-note">이해를 돕기 위한 예시이며, 실제 개발 범위는 상담 후 정합니다.</p>
    </div>
  );
}
