"use client";

import { useId, useState } from "react";
import "./erp-demo.css";

function MenuIcon({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {index === 0 ? (
        <>
          <path d="M3 3h2l2 13h12l2-9H6" />
          <circle cx="9" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </>
      ) : index === 1 ? (
        <>
          <path d="m3 9 9-6 9 6v12H3Z" />
          <path d="M7 21V11h10v10M7 15h10M7 18h10" />
        </>
      ) : (
        <>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" />
        </>
      )}
    </svg>
  );
}

type Order = {
  id: number;
  customer: string;
  product: string;
  quantity: number;
  amount: number;
  status: string;
};
const initialOrders: Order[] = [
  {
    id: 1,
    customer: "다온리테일",
    product: "스마트 단말기 A1",
    quantity: 10,
    amount: 3200000,
    status: "견적",
  },
  {
    id: 2,
    customer: "온유컴퍼니",
    product: "오피스 데스크",
    quantity: 8,
    amount: 2400000,
    status: "수주",
  },
  {
    id: 3,
    customer: "모아상사",
    product: "무선 바코드 리더",
    quantity: 12,
    amount: 1800000,
    status: "출고 완료",
  },
  {
    id: 4,
    customer: "그린웍스",
    product: "스마트 단말기 A1",
    quantity: 5,
    amount: 1600000,
    status: "수주",
  },
];
const inventory = [
  ["P-001", "스마트 단말기 A1", "본사 창고", "48", "대"],
  ["P-002", "오피스 데스크", "물류 창고", "24", "개"],
  ["P-003", "무선 바코드 리더", "본사 창고", "120", "대"],
  ["P-004", "라벨 프린터", "물류 창고", "16", "대"],
];
const customers = [
  ["C-001", "다온리테일", "유통", "김담당", "서울"],
  ["C-002", "온유컴퍼니", "서비스", "이담당", "경기"],
  ["C-003", "모아상사", "도소매", "박담당", "인천"],
  ["C-004", "그린웍스", "제조", "정담당", "경기"],
];
const menus = ["견적·수주", "재고 현황", "거래처 관리"];
export default function ErpDemo({ preview = false }: { preview?: boolean }) {
  const id = useId();
  const [menu, setMenu] = useState(0);
  const [orders, setOrders] = useState(initialOrders);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("전체");
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");
  function openMenu(index: number) {
    setMenu(index);
    setQuery("");
    setFilter("전체");
    setAdding(false);
    setMessage("");
  }
  const visibleOrders = orders.filter(
    (order) =>
      `${order.customer} ${order.product}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()) &&
      (filter === "전체" || order.status === filter),
  );
  const rows = (menu === 1 ? inventory : customers).filter((row) =>
    row.join(" ").toLowerCase().includes(query.trim().toLowerCase()),
  );
  function reset() {
    setOrders(initialOrders);
    setQuery("");
    setFilter("전체");
    setAdding(false);
    setMenu(0);
    setMessage("샘플 데이터를 초기화했습니다.");
  }
  return (
    <div className={`erp-window erp-workspace ${preview ? "erp-preview" : ""}`}>
      <div className="erp-titlebar">
        <strong>kindworks</strong>
        <div className="erp-work-tabs" aria-label="체험 업무 화면">
          {menus.map((name, index) => (
            <button
              type="button"
              key={name}
              aria-pressed={menu === index}
              onClick={() => openMenu(index)}
              className={menu === index ? "active" : ""}
            >
              {name}
            </button>
          ))}
        </div>
        <span className="sample-badge">샘플 체험</span>
        <span className="erp-company">
          <span>
            다온컴퍼니<small>체험 관리자</small>
          </span>
          <b>다</b>
        </span>
      </div>
      <div className="erp-layout">
        <nav className="erp-module-rail" aria-label="ERP 업무 모듈">
          {menus.map((name, index) => (
            <button
              key={name}
              type="button"
              aria-label={`${["영업·구매", "재고·물류", "기준정보"][index]} 모듈`}
              title={["영업·구매", "재고·물류", "기준정보"][index]}
              aria-pressed={menu === index}
              onClick={() => openMenu(index)}
              className={menu === index ? "active" : ""}
            >
              <MenuIcon index={index} />
            </button>
          ))}
          <span className="rail-monogram" aria-hidden="true">
            k
          </span>
        </nav>
        <aside className="erp-sidebar">
          <small>WORKSPACE</small>
          <h4>{["영업·구매", "재고·물류", "기준정보"][menu]}</h4>
          <p className="erp-nav-caption">체험 가능한 업무</p>
          {menus.map((name, index) => (
            <button
              key={name}
              type="button"
              aria-pressed={menu === index}
              onClick={() => openMenu(index)}
              className={menu === index ? "active" : ""}
            >
              <MenuIcon index={index} />
              {name}
            </button>
          ))}
          <div className="sidebar-bottom">
            <span className="status-dot" /> 샘플 워크스페이스
          </div>
        </aside>
        <div className="erp-main">
          <div className="erp-breadcrumb">
            {["구매·판매", "재고·물류", "기준정보"][menu]}
            <span>/</span>
            <strong>{menus[menu]}</strong>
          </div>
          <div className="erp-page-heading">
            <div>
              <h3>{menus[menu]}</h3>
              <p>
                {
                  [
                    "거래처별 견적과 수주 진행 상태를 관리합니다.",
                    "창고별 재고와 입출고 흐름을 확인합니다.",
                    "거래처 기본 정보와 담당자를 관리합니다.",
                  ][menu]
                }
              </p>
            </div>
            {!preview && (
              <button className="demo-reset" onClick={reset}>
                ↻ 초기화
              </button>
            )}
          </div>
          <div className="erp-stats">
            {(menu === 0
              ? [
                  ["전체 견적·수주", `${orders.length}건`],
                  [
                    "수주 진행",
                    `${orders.filter((o) => o.status === "수주").length}건`,
                  ],
                  [
                    "전체 문서 금액",
                    `${(orders.reduce((sum, o) => sum + o.amount, 0) / 10000).toLocaleString("ko-KR", { maximumFractionDigits: 2 })}만원`,
                  ],
                ]
              : menu === 1
                ? [
                    ["등록 품목", "4개"],
                    ["운영 창고", "2곳"],
                    ["재고 보유 품목", "4개"],
                  ]
                : [
                    ["등록 거래처", "4곳"],
                    ["거래 지역", "3곳"],
                    ["업종", "4개"],
                  ]
            ).map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          {!preview && (
            <div className="demo-toolbar">
              <label className="demo-search">
                <span aria-hidden="true">⌕</span>
                <input
                  aria-label="샘플 데이터 검색"
                  placeholder={
                    menu === 0 ? "거래처 또는 상품 검색" : "이름 또는 정보 검색"
                  }
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
              {menu === 0 && (
                <>
                  <select
                    aria-label="진행 상태 필터"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    {["전체", "견적", "수주", "출고 완료"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <button
                    className="demo-add"
                    onClick={() => setAdding(!adding)}
                    aria-expanded={adding}
                    aria-controls={`${id}-form`}
                  >
                    {adding ? "등록 닫기" : "+ 견적 등록"}
                  </button>
                </>
              )}
            </div>
          )}
          {adding && !preview && (
            <form
              id={`${id}-form`}
              className="demo-form"
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const customer = String(data.get("customer") ?? "").trim();
                const product = String(data.get("product") ?? "").trim();
                const quantity = Number(data.get("quantity"));
                const amount = Number(data.get("amount"));
                if (
                  !customer ||
                  !product ||
                  !Number.isSafeInteger(quantity) ||
                  quantity < 1 ||
                  !Number.isSafeInteger(amount) ||
                  amount < 0
                ) {
                  setMessage("거래처·상품과 올바른 수량·금액을 입력해주세요.");
                  return;
                }
                setOrders([
                  ...orders,
                  {
                    id: Math.max(...orders.map((o) => o.id)) + 1,
                    customer,
                    product,
                    quantity,
                    amount,
                    status: "견적",
                  },
                ]);
                setQuery("");
                setFilter("전체");
                setAdding(false);
                setMessage(
                  `${customer}의 견적을 등록했습니다. 상태를 수주로 바꿔보세요.`,
                );
              }}
            >
              <p>
                샘플 견적 등록 <span>실제 고객 정보는 입력하지 마세요.</span>
              </p>
              <label>
                거래처
                <input
                  name="customer"
                  required
                  maxLength={40}
                  placeholder="예: 우리상사"
                />
              </label>
              <label>
                상품
                <input
                  name="product"
                  required
                  maxLength={50}
                  placeholder="예: 스마트 단말기"
                />
              </label>
              <label>
                수량
                <input
                  name="quantity"
                  type="number"
                  min="1"
                  max="1000000"
                  step="1"
                  defaultValue="1"
                  required
                />
              </label>
              <label>
                총 금액 (원)
                <input
                  name="amount"
                  type="number"
                  min="0"
                  max="100000000000"
                  step="1"
                  defaultValue="320000"
                  required
                />
              </label>
              <button className="demo-add" type="submit">
                등록하기
              </button>
            </form>
          )}
          <div className="erp-table-wrap">
            <div className="erp-grid-caption">
              <strong>목록</strong>
              <span>{menu === 0 ? visibleOrders.length : rows.length}건</span>
              <small>
                {preview ? "견적·수주 샘플" : "검색 및 진행 상태 변경 가능"}
              </small>
            </div>
            <table>
              <caption className="sr-only">{menus[menu]} 샘플 목록</caption>
              <thead>
                <tr>
                  {(menu === 0
                    ? [
                        "문서번호",
                        "작성일",
                        "거래처",
                        "상품",
                        "수량",
                        "금액",
                        "진행 상태",
                      ]
                    : menu === 1
                      ? ["상품 코드", "상품명", "창고", "현재 재고", "단위"]
                      : ["거래처 코드", "거래처명", "업종", "담당자", "지역"]
                  ).map((title) => (
                    <th key={title} scope="col">
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {menu === 0
                  ? visibleOrders.map((order) => (
                      <tr key={order.id}>
                        <td>Q-{String(order.id).padStart(4, "0")}</td>
                        <td>2026-09-10</td>
                        <td>{order.customer}</td>
                        <td>{order.product}</td>
                        <td className="erp-numeric">{order.quantity}</td>
                        <td className="erp-numeric">
                          {order.amount.toLocaleString("ko-KR")}
                        </td>
                        <td>
                          {preview ? (
                            <span
                              className={`order-status status-${order.status.replaceAll(" ", "-")}`}
                            >
                              {order.status}
                            </span>
                          ) : (
                            <select
                              className={`order-status status-${order.status.replaceAll(" ", "-")}`}
                              aria-label={`${order.customer} Q-${String(order.id).padStart(4, "0")} 진행 상태`}
                              value={order.status}
                              onChange={(e) => {
                                setOrders(
                                  orders.map((o) =>
                                    o.id === order.id
                                      ? { ...o, status: e.target.value }
                                      : o,
                                  ),
                                );
                                setMessage(
                                  `${order.customer}의 상태를 ${e.target.value}(으)로 변경했습니다.`,
                                );
                              }}
                            >
                              {["견적", "수주", "출고 완료"].map((s) => (
                                <option key={s}>{s}</option>
                              ))}
                            </select>
                          )}
                        </td>
                      </tr>
                    ))
                  : rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, i) => (
                          <td key={i}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                {(menu === 0 ? visibleOrders.length : rows.length) === 0 && (
                  <tr>
                    <td colSpan={menu === 0 ? 7 : 5} className="empty-state">
                      검색 결과가 없습니다. 검색어나 상태 필터를 바꿔보세요.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="erp-table-footer">
            <span>총 {menu === 0 ? visibleOrders.length : rows.length}건</span>
            <span>샘플 데이터 · 실제 운영 정보가 아닙니다</span>
          </div>
          {!preview && (
            <p className="demo-message" role="status">
              {message ||
                "거래처·재고 메뉴도 눌러보세요. 견적 상태는 목록에서 변경할 수 있습니다."}
            </p>
          )}
        </div>
      </div>
      <div className="erp-statusbar">
        <span>
          <i /> 샘플 체험 모드
        </span>
        <span>회사코드 DEMO-1000</span>
        <span>입력 내용은 새로고침 시 초기화</span>
      </div>
    </div>
  );
}
