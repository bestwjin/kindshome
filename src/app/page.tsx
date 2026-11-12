import Image from "next/image";
import Link from "next/link";
import BusinessPreview from "./business-preview";
import ContactSection from "./contact-section";
import ServiceBridge from "./service-bridge";
import SiteIcon from "./site-icon";
import { KAKAO_CHAT_URL, PORTAL_URL, SITE_DESCRIPTION, SITE_FAQS, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const modules = [
  { icon: "users" as const, title: "거래처·고객 관리", description: "거래처 정보와 담당자, 고객별 이력을 회사의 기준으로 정리합니다.", tag: "업무의 기준을 한곳에" },
  { icon: "chart" as const, title: "견적·수주 관리", description: "견적부터 수주까지 이어지는 과정과 문서 양식을 업무에 맞춥니다.", tag: "영업의 흐름을 자연스럽게" },
  { icon: "box" as const, title: "재고·입출고 관리", description: "품목과 창고별 재고, 입출고 정보를 필요한 화면에서 확인합니다.", tag: "물건의 흐름을 정확하게" },
  { icon: "flow" as const, title: "인사·업무 관리", description: "직원 정보, 일정과 문서를 함께 관리할 수 있도록 구성합니다.", tag: "함께 일하는 기준을 명확하게" },
  { icon: "shield" as const, title: "메뉴·접근 권한", description: "조직과 역할에 따라 사용할 메뉴와 데이터 접근 범위를 설정합니다.", tag: "담당자에게 필요한 화면으로" },
  { icon: "code" as const, title: "회사별 맞춤 개발", description: "입력 항목, 업무 흐름, 출력 양식부터 필요한 추가 기능까지 협의합니다.", tag: "우리 회사만의 방식까지" },
];

export default function HomePage() {
  const jsonLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL, description: SITE_DESCRIPTION, logo: `${SITE_URL}/kinds-logo.png` },
    { "@type": "WebSite", url: SITE_URL, name: SITE_TITLE, description: SITE_DESCRIPTION, inLanguage: "ko-KR" },
    { "@type": "Service", "@id": `${SITE_URL}/#service`, name: "kinds 맞춤형 ERP 개발·관리·유지보수", serviceType: "고객사 맞춤 ERP 개발 및 지속적인 관리·유지보수", provider: { "@id": `${SITE_URL}/#organization` }, description: SITE_DESCRIPTION },
    { "@type": "FAQPage", mainEntity: SITE_FAQS.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ] };
  return (
    <div className="home-v2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <a className="kh-skip" href="#main">본문으로 바로가기</a>
      <header className="kh-header">
        <div className="kh-header-inner">
          <Link href="/" className="kh-brand" aria-label="kinds 홈"><Image src="/kinds-logo.png" alt="kinds" width={759} height={235} priority /></Link>
          <nav aria-label="주 메뉴"><a href="#custom">맞춤 ERP 개발</a><a href="#care">관리·유지보수</a><a href={PORTAL_URL} target="_blank" rel="noopener noreferrer">ERP 체험</a><a href="#pricing">도입 비용</a></nav>
          <div className="kh-header-actions">
            <a className="kh-demo-button" href={PORTAL_URL} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="currentColor" /><path d="m8 6 6 4-6 4Z" fill="white" /></svg>
              데모 체험
            </a>
            <a className="kh-button kh-button-small kh-button-teal" href="#contact">도입 상담</a>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="kh-hero kh-laptop-hero">
          <div className="kh-container kh-hero-grid">
            <div className="kh-hero-copy">
              <p className="kh-service-flow">
                <span className="kh-service-start">
                  <span className="kh-service-from">고객사 맞춤 ERP 개발</span>
                  <ServiceBridge />
                </span>
                <a className="kh-service-to" href="#pricing">운영·유지보수 <span>가성비 정액제</span></a>
              </p>
              <h1>우리 회사에 맞는 ERP.<br /><em>그다음까지, 함께.</em></h1>
              <p className="kh-hero-description">업무를 먼저 이해하고, 필요한 기능을 만듭니다.<br />도입 이후에도 관리와 유지보수로<br className="kh-mobile-break" /> 매일의 업무를 함께합니다.</p>
              <div className="kh-hero-actions"><a className="kh-button" href="#contact">우리 회사 ERP 상담하기</a><a className="kh-text-link" href={PORTAL_URL} target="_blank" rel="noopener noreferrer"><span className="kh-play">▷</span> 먼저 체험해보기</a></div>
              <div className="kh-hero-promise"><span><SiteIcon name="check" /> 회사별 맞춤 개발</span><span><SiteIcon name="check" /> 도입 후 지속 관리</span></div>
            </div>
            <figure className="kh-hero-device">
              <Image
                src="/goqual_mainboard.jpg"
                alt="노트북에 표시된 Kindworks ERP 업무 대시보드의 매출 현황과 오늘의 업무"
                width={2400}
                height={1224}
                preload
                unoptimized
              />
            </figure>
          </div>
          <div className="kh-container kh-lifecycle">
            <p>처음 만드는 순간부터,<br /><strong>매일 사용하는 순간까지.</strong></p>
            {[ ["01", "업무를 이해하고", "지금의 업무와 필요한 변화를 함께 정리합니다."], ["02", "회사에 맞게 만들고", "화면, 기능, 업무 흐름을 실제 사용에 맞춥니다."], ["03", "꾸준히 함께 관리합니다", "문의와 오류에 대응하고 운영을 이어갑니다."] ].map(([n, title, description]) => <div key={n}><span>{n}</span><div><h2>{title}</h2><p>{description}</p></div></div>)}
          </div>
        </section>

        <section className="kh-section kh-container kh-custom" id="custom">
          <div className="kh-section-heading"><div><h2>회사의 일하는 방식이,<br /><em>시스템의 기준이 됩니다.</em></h2></div><p>같은 업종이어도 일하는 방식은 다르니까.<br />지금 쓰는 용어부터 승인 절차와 문서까지,<br />우리 회사에 필요한 모습으로 개발합니다.</p></div>
          <div className="kh-custom-grid">
            <BusinessPreview />
            <div className="kh-custom-list">{[["01", "지금의 업무에서 출발합니다", "사용 중인 엑셀과 문서, 반복되는 작업을 함께 살펴보고 시스템에 담을 업무를 정리합니다."], ["02", "필요한 만큼, 제대로 맞춥니다", "기본 ERP 기능을 바탕으로 입력 항목, 화면, 권한과 출력 양식을 고객사에 맞게 구성합니다."], ["03", "실제 사용을 함께 확인합니다", "개발한 화면을 함께 검수하고, 사용자가 업무를 시작할 수 있도록 초기 도입을 지원합니다."]].map(([n, title, description]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}<a className="kh-text-link" href="#features">구성할 수 있는 기능 살펴보기 <SiteIcon name="arrow" /></a></div>
          </div>
        </section>

        <section className="kh-care" id="care">
          <div className="kh-container kh-care-grid">
            <div className="kh-care-copy"><h2>오픈은 끝이 아니라,<br /><em>함께 일하는 시작.</em></h2><p>잘 만드는 것만큼, 잘 사용하는 시간도 중요합니다.<br />사용 중 생기는 문제와 관리할 일을 함께 살피고,<br />시스템이 일상의 업무로 자리 잡도록 돕습니다.</p><a className="kh-button kh-button-light" href="#contact">운영·유지보수 상담하기</a><div className="kh-partnership"><span><SiteIcon name="code" /> 맞춤 개발</span><i /><span><SiteIcon name="shield" /> 지속 관리</span><i /><span><SiteIcon name="spark" /> 개선 협의</span></div></div>
            <div className="kh-care-services">{[{ icon: "chart" as const, title: "안정적인 운영을 위한 관리", description: "서비스 상태와 운영 이슈를 살피고, 필요한 관리 작업을 진행합니다." }, { icon: "shield" as const, title: "오류 대응과 유지보수", description: "사용 중 발견한 오류를 확인하고 수정하며, 처리 상황을 공유합니다." }, { icon: "message" as const, title: "막힐 때 함께하는 사용 지원", description: "사용 문의를 접수하고, 업무에서 생기는 불편과 개선 요청을 함께 정리합니다." }, { icon: "spark" as const, title: "변화하는 업무에 맞춘 개선", description: "새로 필요한 기능은 범위와 비용을 먼저 협의한 뒤 개발을 진행합니다." }].map(({ icon, title, description }) => <article key={title}><span><SiteIcon name={icon} /></span><div><h3>{title}</h3><p>{description}</p></div></article>)}<p className="kh-care-note">지원 시간, 대응 방식, 서버·백업 등 세부 운영 범위는 계약 시 확정합니다.</p></div>
          </div>
        </section>

        <section className="kh-section kh-container" id="features">
          <div className="kh-section-heading"><div><h2>필요한 업무를 연결하고,<br />우리 회사의 기능을 더합니다.</h2></div><p>기본 기능을 활용해 시작하고,<br />회사마다 다른 업무에 맞춤 개발을 더합니다.<br />사용할 모듈과 세부 범위는 상담에서 정합니다.</p></div>
          <div className="kh-modules">{modules.map(({ icon, title, description, tag }, index) => <article key={title}><div className="kh-module-top"><SiteIcon name={icon} /><span>0{index + 1}</span></div><h3>{title}</h3><p>{description}</p><span className="kh-module-tag">{tag}</span></article>)}</div>
        </section>


        <section className="kh-section kh-container" id="process"><div className="kh-section-heading"><div><h2>상담으로 시작해,<br />꾸준한 운영으로 이어집니다.</h2></div><a className="kh-text-link" href="#contact">지금의 업무 이야기하기 <SiteIcon name="arrow" /></a></div><ol className="kh-process">{[["업무 상담", "현재 업무와 필요한 기능을 듣고, 도입 방향을 함께 찾습니다."], ["설계·견적", "개발 범위와 일정, 비용과 운영 조건을 명확히 정합니다."], ["개발·도입", "회사의 방식에 맞게 개발하고 검수와 초기 사용을 지원합니다."], ["관리·유지보수", "운영 상태를 살피고, 사용 문의와 오류 대응을 이어갑니다."]].map(([title, description], index) => <li key={title}><span className="kh-step-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p>{index === 3 && <span className="kh-step-ongoing">계속 함께합니다 <SiteIcon name="arrow" /></span>}</li>)}</ol></section>

        <section className="kh-pricing-band" id="pricing"><div className="kh-section kh-container"><div className="kh-section-heading"><div><h2>개발은 필요한 만큼.<br />관리는 꾸준하게.</h2></div><p>처음의 맞춤 개발과 도입 이후의 관리를 나누어,<br />시작부터 운영까지 비용의 기준을 안내합니다.</p></div><div className="kh-pricing-grid"><div className="kh-build-price"><div className="kh-price-heading"><span>01</span><div><h3>우리 회사 맞춤 구축</h3><p>업무 범위에 따라 정하는 1회 개발 비용</p></div><SiteIcon name="code" /></div><div className="kh-price-options"><div><span>기본 맞춤형</span><p className="kh-price"><small>약</small>100<span>만원</span></p><p>메뉴·항목·권한 설정과<br />기본 템플릿 중심의 맞춤 구성</p></div><div><span>업무 확장형</span><p className="kh-price"><small>약</small>200<span>만원</span></p><p>회사별 업무 흐름 조정과<br />입력 화면·출력 양식 맞춤</p></div></div><p className="kh-price-foot"><SiteIcon name="check" /> 구축 기간에는 월 관리비가 발생하지 않습니다.</p></div><div className="kh-manage-price"><div className="kh-price-heading"><span>02</span><div><h3>도입 후 관리·유지보수</h3><p>사용을 시작한 뒤, 매월 이어지는 관리</p></div><SiteIcon name="shield" /></div><p className="kh-price"><small>월</small>30<span>만원</span></p><div className="kh-care-inclusions"><span><SiteIcon name="check" /> 운영 상태 확인</span><span><SiteIcon name="check" /> 오류 대응·유지보수</span><span><SiteIcon name="check" /> 사용 문의 지원</span></div><a className="kh-text-link" href="#contact">우리 회사에 맞는 견적 문의 <SiteIcon name="arrow" /></a></div></div><p className="kh-pricing-note">위 금액은 예상 비용입니다. 맞춤 개발 범위, 부가세, 서버·백업 비용과 지원 조건을 포함한 최종 견적은 상담 후 확정합니다.<br />대규모 신규 기능, 외부 연동, 데이터 이관은 별도로 범위와 비용을 협의합니다. 월 관리비는 도입 완료 후부터 적용합니다.</p></div></section>

        <section className="kh-section kh-container kh-faq" id="faq"><div><h2>함께하기 전,<br />궁금한 이야기.</h2><p>더 궁금한 점은 편하게 물어보세요.</p><a className="kh-text-link" href={KAKAO_CHAT_URL} target="_blank" rel="noopener noreferrer">카카오톡으로 문의하기 <SiteIcon name="arrow" /></a></div><div className="kh-faq-list">{SITE_FAQS.map((faq, index) => <details key={faq.question}><summary><span>0{index + 1}</span>{faq.question}<i aria-hidden="true">+</i></summary><p>{faq.answer}</p></details>)}</div></section>

        <ContactSection />
      </main>
      <footer className="kh-footer kh-container"><div className="kh-footer-top"><Link href="/" className="kh-brand" aria-label="kinds 홈"><Image src="/kinds-logo.png" alt="kinds" width={759} height={235} /></Link><p>회사마다 다른 방식에 맞춥니다.</p><a href={PORTAL_URL} target="_blank" rel="noopener noreferrer">기존 고객 포털 <span>↗</span></a></div><div className="kh-footer-bottom"><span>맞춤 ERP 개발 · 지속적인 관리와 유지보수</span><span>© {new Date().getFullYear()} kinds. All rights reserved.</span></div></footer>
    </div>
  );
}
