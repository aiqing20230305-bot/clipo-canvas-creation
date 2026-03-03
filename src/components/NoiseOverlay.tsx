/**
 * Scanline + noise overlay for cyberpunk CRT feel
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
        opacity: 0.025,
        mixBlendMode: "overlay",
      }}
    />
    {/* Subtle horizontal scanlines */}
    <div
      className="absolute inset-0"
      style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(185 90% 50% / 0.01) 3px, hsl(185 90% 50% / 0.01) 6px)",
      }}
    />
  </div>
);

export default NoiseOverlay;
