import clipoLogo from "@/assets/clipo-logo.webp";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top HUD status bar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="bg-background/40 backdrop-blur-2xl border-b border-primary/10">
        <div className="container mx-auto px-6 flex items-center justify-between h-14">
          {/* Left HUD bracket + logo */}
          <div className="flex items-center">
            <a href="https://clipo.cc" className="flex items-center">
              <img src={clipoLogo} alt="Clipo" className="h-6" />
            </a>
          </div>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#solutions" className="text-xs text-foreground/70 hover:text-foreground transition-colors tracking-wide">解决方案</a>
            <a href="#cases" className="text-xs text-foreground/70 hover:text-foreground transition-colors tracking-wide">案例</a>
            <a href="#pricing" className="text-xs text-foreground/70 hover:text-foreground transition-colors tracking-wide">报价</a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-primary/30 tracking-wider">
              <motion.span
                className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/80"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              ACTIVE
            </div>
            <a
              href="https://asset.clipo.cc/video-agent/signup"
              className="relative px-5 py-2 rounded text-primary-foreground text-xs font-medium tracking-wide overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, hsl(265 85% 55% / 0.8), hsl(225 85% 50% / 0.8))",
                border: "1px solid hsl(265 85% 65% / 0.3)",
              }}
            >
              <span className="relative z-10">立即体验</span>
              <span className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom scan line */}
      <motion.div
        className="h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(265 85% 65% / 0.5) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </nav>
  );
};

const NavItem = ({ href, label, code }: { href: string; label: string; code: string }) => (
  <a
    href={href}
    className="group flex items-center gap-2 px-3 py-1.5 rounded hover:bg-primary/5 transition-colors"
  >
    <span className="text-[10px] font-mono text-primary/25 group-hover:text-primary/50 transition-colors">
      {code}
    </span>
    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors tracking-wide">
      {label}
    </span>
  </a>
);

export default Navbar;
