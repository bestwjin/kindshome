export default function ServiceBridge() {
  return (
    <svg className="kh-service-bridge" viewBox="0 0 100 56" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="service-ribbon-loop" x1="28" y1="10" x2="72" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9bb2d2" />
          <stop offset=".5" stopColor="#7f9bc3" />
          <stop offset="1" stopColor="#6789b7" />
        </linearGradient>
        <linearGradient id="service-ribbon-fold" x1="37" y1="41.5" x2="63" y2="14.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7f9bc3" />
          <stop offset=".5" stopColor="#537aad" />
          <stop offset="1" stopColor="#7f9bc3" />
        </linearGradient>
        <mask id="service-ribbon-underpass">
          <rect width="100" height="56" fill="white" />
          <path d="M37 41.5C41.25 38.5 45.5 34 50 28C54.5 22 58.75 17.5 63 14.5" stroke="black" strokeWidth="9" />
        </mask>
      </defs>
      <path
        d="M50 28C41 16 33 10 24 10C15.164 10 8 18.059 8 28C8 37.941 15.164 46 24 46C33 46 41 40 50 28C59 16 67 10 76 10C84.836 10 92 18.059 92 28C92 37.941 84.836 46 76 46C67 46 59 40 50 28Z"
        stroke="url(#service-ribbon-loop)"
        strokeWidth="7"
        strokeLinejoin="round"
        mask="url(#service-ribbon-underpass)"
      />
      {/* Exact subdivisions of the loop keep the crossing tangent and seamless. */}
      <path
        d="M37 41.5C41.25 38.5 45.5 34 50 28C54.5 22 58.75 17.5 63 14.5"
        stroke="url(#service-ribbon-fold)"
        strokeWidth="7"
      />
    </svg>
  );
}
