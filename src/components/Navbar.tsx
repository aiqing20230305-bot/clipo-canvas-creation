import clipoLogo from "@/assets/clipo-logo.webp";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-2xl border-b border-accent/10">
      <div className="container mx-auto px-6 flex items-center justify-between h-14">
        <a href="https://clipo.cc" className="flex items-center gap-3">
          <img src={clipoLogo} alt="Clipo" className="h-6" />
          <span className="hidden md:inline font-mono-cyber text-[10px] text-accent/40 tracking-[0.2em]">SYS.ONLINE</span>
        </a>
        <div className="flex items-center gap-8">
          <a href="#solutions" className="font-mono-cyber text-[10px] text-muted-foreground hover:text-accent transition-colors hidden md:block tracking-[0.15em] uppercase">
            解决方案
          </a>
          <a href="#pricing" className="font-mono-cyber text-[10px] text-muted-foreground hover:text-accent transition-colors hidden md:block tracking-[0.15em] uppercase">
            报价
          </a>
          <motion.a
            href="https://asset.clipo.cc/video-agent/signup"
            className="px-5 py-2 rounded-sm bg-gradient-purple text-primary-foreground text-xs font-medium tracking-wider relative overflow-hidden"
            whileHover={{ boxShadow: "0 0 20px hsl(185 90% 50% / 0.3)" }}
          >
            <span className="relative z-10 font-mono-cyber">立即体验</span>
            <motion.span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(110deg, transparent 30%, hsla(185,90%,60%,0.2) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
