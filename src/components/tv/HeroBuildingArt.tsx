/**
 * Stylized illustration echoing Haita's own facade at dusk — warm lit
 * windows against a plum-to-coral evening sky, street trees and string
 * lights out front. Not a literal photo (none was available to embed);
 * drawn from the real building's palette and composition instead.
 */
export function HeroBuildingArt() {
  return (
    <svg
      viewBox="0 0 800 700"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="haita-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f2140" />
          <stop offset="45%" stopColor="#7a3f52" />
          <stop offset="75%" stopColor="#c96b52" />
          <stop offset="100%" stopColor="#3a2230" />
        </linearGradient>
        <radialGradient id="haita-glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#f2c98a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f2c98a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="haita-street" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241a22" />
          <stop offset="100%" stopColor="#150f16" />
        </linearGradient>
      </defs>

      <rect width="800" height="700" fill="url(#haita-sky)" />
      <rect width="800" height="700" fill="url(#haita-glow)" />

      <g>
        <rect x="230" y="120" width="340" height="470" fill="#2a1c22" />
        <rect x="230" y="120" width="340" height="18" fill="#3a2530" />
        <g fill="#f2c98a" opacity="0.92">
          <rect x="262" y="160" width="46" height="62" rx="2" />
          <rect x="332" y="160" width="46" height="62" rx="2" />
          <rect x="422" y="160" width="46" height="62" rx="2" />
          <rect x="492" y="160" width="46" height="62" rx="2" />
          <rect x="262" y="248" width="46" height="62" rx="2" />
          <rect x="332" y="248" width="46" height="62" rx="2" opacity="0.5" />
          <rect x="422" y="248" width="46" height="62" rx="2" />
          <rect x="492" y="248" width="46" height="62" rx="2" />
          <rect x="262" y="336" width="46" height="62" rx="2" opacity="0.6" />
          <rect x="332" y="336" width="46" height="62" rx="2" />
          <rect x="422" y="336" width="46" height="62" rx="2" />
          <rect x="492" y="336" width="46" height="62" rx="2" opacity="0.5" />
          <rect x="262" y="424" width="46" height="62" rx="2" />
          <rect x="332" y="424" width="46" height="62" rx="2" />
          <rect x="422" y="424" width="46" height="62" rx="2" opacity="0.6" />
          <rect x="492" y="424" width="46" height="62" rx="2" />
        </g>
        <path d="M340 590 v-70 a60 60 0 0 1 120 0 v70 z" fill="#f2c98a" opacity="0.85" />
        <rect x="330" y="580" width="140" height="10" fill="#e9c789" />
      </g>

      <g fill="#1c2a1c">
        <circle cx="140" cy="470" r="95" />
        <circle cx="90" cy="520" r="70" />
        <circle cx="205" cy="510" r="60" />
        <circle cx="680" cy="480" r="90" />
        <circle cx="740" cy="530" r="65" />
      </g>
      <g stroke="#150f16" strokeWidth="10">
        <line x1="140" y1="560" x2="140" y2="640" />
        <line x1="700" y1="560" x2="700" y2="640" />
      </g>

      <g fill="#f2c98a">
        <circle cx="60" cy="440" r="4" />
        <circle cx="115" cy="410" r="4" />
        <circle cx="175" cy="430" r="4" />
        <circle cx="620" cy="420" r="4" />
        <circle cx="680" cy="405" r="4" />
        <circle cx="745" cy="430" r="4" />
      </g>

      <rect x="0" y="620" width="800" height="80" fill="url(#haita-street)" />
    </svg>
  );
}
