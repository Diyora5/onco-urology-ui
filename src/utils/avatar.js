// A clean, neutral default doctor avatar (inline SVG, works offline).
const SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f0fdfa"/>
      <stop offset="1" stop-color="#ccfbf1"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#g)"/>
  <circle cx="100" cy="80" r="36" fill="#5eead4"/>
  <path d="M44 178c0-31 25-52 56-52s56 21 56 52z" fill="#5eead4"/>
</svg>`;

export const DEFAULT_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(
  SVG.trim()
)}`;
