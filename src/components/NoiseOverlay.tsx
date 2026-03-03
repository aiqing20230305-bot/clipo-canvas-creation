/**
 * Film grain / noise overlay for a premium, editorial feel.
 * Uses an inline SVG filter for performance.
 */
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
    <svg className="absolute w-0 h-0">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </svg>
    <div
      className="absolute inset-0"
      style={{
        filter: "url(#noise)",
        opacity: 0.03,
        mixBlendMode: "overlay",
      }}
    />
  </div>
);

export default NoiseOverlay;
