import { ReactNode } from "react";

/**
 * HUD-style corner brackets frame wrapper.
 * Wraps content with sci-fi cockpit corner markers.
 */
const HudFrame = ({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) => {
  const cornerStyle = "absolute w-4 h-4 pointer-events-none";
  const lineColor = "hsl(265 85% 65% / 0.2)";

  return (
    <div className={`relative ${className}`}>
      {/* Corner brackets */}
      <span className={`${cornerStyle} top-0 left-0`}>
        <svg viewBox="0 0 16 16" fill="none" stroke={lineColor} strokeWidth="1">
          <path d="M0 12V0H12" />
        </svg>
      </span>
      <span className={`${cornerStyle} top-0 right-0`}>
        <svg viewBox="0 0 16 16" fill="none" stroke={lineColor} strokeWidth="1">
          <path d="M16 12V0H4" />
        </svg>
      </span>
      <span className={`${cornerStyle} bottom-0 left-0`}>
        <svg viewBox="0 0 16 16" fill="none" stroke={lineColor} strokeWidth="1">
          <path d="M0 4V16H12" />
        </svg>
      </span>
      <span className={`${cornerStyle} bottom-0 right-0`}>
        <svg viewBox="0 0 16 16" fill="none" stroke={lineColor} strokeWidth="1">
          <path d="M16 4V16H4" />
        </svg>
      </span>

      {/* Optional label */}
      {label && (
        <span className="absolute -top-2.5 left-6 text-[9px] font-mono text-primary/30 tracking-[0.3em] uppercase bg-background px-2">
          {label}
        </span>
      )}

      {children}
    </div>
  );
};

export default HudFrame;
