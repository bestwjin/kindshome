import Image from "next/image";
import { KAKAO_CHAT_URL, PORTAL_URL } from "@/lib/site";

function RoundedNMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M7 27.4V14a9 9 0 0 1 18 0v13.4h-5.2V14a3.8 3.8 0 0 0-7.6 0v13.4H7z"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="site">
      <header className="site-header">
        <a className="header-brand" href="/" aria-label="kinds 홈">
          <Image
            className="logo logo-on-dark header-logo"
            src="/kinds-logo.png"
            alt="kinds"
            width={759}
            height={235}
            priority
          />
        </a>
        <div className="header-actions">
          <a className="btn btn-ghost-light" href={PORTAL_URL}>
            서비스 포털
          </a>
          <a
            className="btn btn-kakao"
            href={KAKAO_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            카카오톡 문의
          </a>
        </div>
      </header>

      <section className="hero" aria-label="kinds 소개">
        <div className="hero-atmosphere" aria-hidden="true">
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-a" />
          <div className="hero-orb hero-orb-b" />
          <RoundedNMark className="hero-mark" />
        </div>

        <div className="hero-content">
          <div className="brand-lockup">
            <Image
              className="logo logo-on-dark brand-logo"
              src="/kinds-logo.png"
              alt="kinds"
              width={759}
              height={235}
              priority
            />
            <h1 className="hero-title">만들고, 고치고, 이어가는 IT 컨시어지 서비스</h1>
            <p className="hero-copy">
              비싼 채용 없이, 저렴한 유지비용으로 AI로 무장한 숙련된 IT
              전문가를 곁에 두세요.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#contact">
                서비스 문의하기
              </a>
              <a className="btn btn-ghost-light" href="#service">
                서비스 살펴보기
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="audience" id="audience">
        <div className="section">
          <p className="section-label">Who it&apos;s for</p>
          <h2 className="section-title">어떤 고객이 이 서비스를 쓰면 좋을까요?</h2>
          <p className="section-lead">
            전산은 이미 운영 중인데, 전산팀을 직접 꾸리기엔 부담스러운
            중소규모 업체를 위한 서비스입니다.
          </p>

          <ul className="audience-list">
            <li>
              <strong>중소규모 사업장</strong>
              <span>
                업무용 전산·시스템을 쓰고 있지만, 전담 IT 인력을 상시
                채용하기엔 규모가 맞지 않는 곳
              </span>
            </li>
            <li>
              <strong>전산팀 운영이 부담인 곳</strong>
              <span>
                채용·교육·관리 비용은 크고, 필요할 때마다 사람을 구하기는 더
                어려운 곳
              </span>
            </li>
            <li>
              <strong>외주 전산팀이 필요한 곳</strong>
              <span>
                개발·수정·운영을 한곳에서 맡기고, 본업에만 집중하고 싶은 곳
              </span>
            </li>
          </ul>

          <p className="audience-closing">
            요즘에는 AI를 잘 다루는 전문가 한 명이 많은 일을 해냅니다. 든든한
            IT 전문가에게 저렴한 비용으로 맡겨, 외주 전산팀을 운영하세요.
          </p>
        </div>
      </section>

      <section className="section" id="service">
        <p className="section-label">Service</p>
        <h2 className="section-title">고객의 전산을 끊기지 않게 돌봅니다</h2>
        <p className="section-lead">
          요청 접수부터 처리 결과 전달까지, 작은 사업도 운영에 집중할 수 있도록
          kinds가 옆에서 챙깁니다.
        </p>

        <div className="service-panel">
          <ul className="service-list">
            <li>
              <strong>유지보수 요청</strong>
              <span>현장 이슈를 빠르게 접수하고 진행 상태를 공유합니다.</span>
            </li>
            <li>
              <strong>처리 결과 전달</strong>
              <span>조치 내용과 전달 여부를 기록해 히스토리를 남깁니다.</span>
            </li>
            <li>
              <strong>이용시간 패키지</strong>
              <span>필요한 시간만큼 선결제하고 투명하게 사용합니다.</span>
            </li>
            <li>
              <strong>24시간 서버·서비스 모니터링</strong>
              <span className="service-perk">
                10시간 이상 서비스 이용 · 서비스 이용중 무상 제공
              </span>
              <span>
                서버와 핵심 서비스의 상태를 상시 감시하는 체계를 구축합니다.
                장애 징후·응답 지연·다운타임을 빠르게 감지해 알리고, 필요 시
                조치까지 이어가 서비스 공백을 줄입니다.
              </span>
            </li>
            <li>
              <strong>지속적인 운영 관리</strong>
              <span className="service-perk">
                10시간 이상 서비스 이용 · 서비스 이용중 무상 제공
              </span>
              <span>
                도메인 관리와 SSL 인증서 관리·갱신 지원까지, 서비스가 끊기지
                않도록 일상적인 운영을 함께 챙깁니다.
              </span>
            </li>
            <li>
              <strong>접근 통제</strong>
              <span className="service-perk">
                10시간 이상 서비스 이용 · 서비스 이용중 무상 제공
              </span>
              <span>
                악의적인 공격으로부터 데이터가 침해되지 않도록, 가능한 범위에서
                접근 통제와 보안 정책을 수립하고 운용합니다.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="process" id="process">
        <div className="section">
          <p className="section-label">Process</p>
          <h2 className="section-title">요청에서 완료까지, 짧은 루프</h2>
          <p className="section-lead">
            복잡한 절차 없이, 상담과 포털이 같은 맥락으로 이어집니다.
          </p>
          <ol className="process-steps">
            <li>
              <strong>문의·가입</strong>
              <span>카카오톡 또는 포털에서 현황을 공유하고 상품을 선택합니다.</span>
            </li>
            <li>
              <strong>무통장입금 후 입금확인 및 세금계산서 발급</strong>
              <span>선택한 상품의 결제를 진행하고 입금이 확인되면 세금계산서를 발급합니다.</span>
            </li>
            <li>
              <strong>운영 시작</strong>
              <span>승인 후 요청을 등록하고 담당자가 바로 착수합니다.</span>
            </li>
            <li>
              <strong>결과 확인</strong>
              <span>처리 결과와 이용시간을 포털에서 그대로 확인합니다.</span>
            </li>
          </ol>
        </div>
      </section>

      <section className="pricing" id="pricing">
        <div className="section">
          <p className="section-label">Pricing</p>
          <h2 className="section-title">이용시간별 정액제</h2>
          <p className="section-lead">
            월 단위로 필요한 시간을 선결제하고, 구매한 시간만큼 이용합니다.
            기본 단가는 시간당 5만 원이며, 이용 시간 구간에 따라 할인율이
            적용됩니다.
          </p>

          <p className="pricing-formula">
            적용 단가 = 시간당 5만 원 − (5만 원 × 할인율)
          </p>

          <div className="pricing-table-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th scope="col">이용 시간</th>
                  <th scope="col">할인율</th>
                  <th scope="col">시간당 단가</th>
                  <th scope="col">구간 최대 이용 시</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0 ~ 10시간</td>
                  <td>2%</td>
                  <td>49,000원</td>
                  <td>490,000원</td>
                </tr>
                <tr>
                  <td>11 ~ 20시간</td>
                  <td>5%</td>
                  <td>47,500원</td>
                  <td>950,000원</td>
                </tr>
                <tr>
                  <td>21 ~ 30시간</td>
                  <td>10%</td>
                  <td>45,000원</td>
                  <td>1,350,000원</td>
                </tr>
                <tr>
                  <td>31 ~ 40시간</td>
                  <td>20%</td>
                  <td>40,000원</td>
                  <td>1,600,000원</td>
                </tr>
                <tr>
                  <td>41시간 이상</td>
                  <td colSpan={3}>별도 협의</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ul className="pricing-notes">
            <li>
              <strong>이용 기간</strong>
              <span>
                서비스 이용기간은 1달이며, 1달 내 충전 시간을 모두 사용하지 못한
                경우 다음 달로 이월되지 않습니다. 이용기간 만료 1주일 전부터
                알림을 드리며, 이용시간을 추가 구매하여 연장하실 수 있습니다.
              </span>
            </li>
            <li>
              <strong>이용시간 초과</strong>
              <span>
                추가 시간을 구매할 수 있으며, 그때에도 본래 구매 상품의 구간
                할인율이 적용됩니다. 초과분은 별도 협의할 수 있습니다.
              </span>
            </li>
            <li>
              <strong>프로젝트성 의뢰</strong>
              <span>
                보름(영업일 기준 10일) 이상 소요되는 규모의 개발은 별도
                협의합니다.
              </span>
            </li>
            <li>
              <strong>하자 보수</strong>
              <span>
                이미 완료된 개발 건에서 하자가 발생한 경우, 보수에 필요한
                시간은 이용 가능 시간에서 차감하지 않습니다.
              </span>
            </li>
            <li>
              <strong>결제</strong>
              <span>선결제(무통장입금)이며, 세금계산서를 발행합니다.</span>
            </li>
          </ul>

          <p className="pricing-source">
            자세한 안내:{" "}
            <a
              href="https://blog.naver.com/thekinds/223211072146"
              target="_blank"
              rel="noopener noreferrer"
            >
              카인즈 유지보수 서비스의 비용
            </a>
          </p>
        </div>
      </section>

      <section className="contact-band" id="contact">
        <div>
          <h2>지금 바로 kinds와 연결하세요</h2>
          <p>
            도입 상담부터 장애 문의까지, 카카오톡으로 가장 빠르게 시작할 수
            있습니다.
          </p>
        </div>
        <div className="contact-actions">
          <a
            className="btn btn-kakao"
            href={KAKAO_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            카카오톡 문의
          </a>
          <a className="btn btn-ghost-light" href={PORTAL_URL}>
            서비스 포털 열기
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <a className="footer-brand" href="/" aria-label="kinds 홈">
            <Image
              className="logo footer-logo"
              src="/kinds-logo.png"
              alt="kinds"
              width={759}
              height={235}
            />
          </a>
          <span>AI 기반 전산 개발 및 유지보수 에이전트</span>
          <span>© {new Date().getFullYear()} kinds</span>
        </div>
      </footer>
    </div>
  );
}
