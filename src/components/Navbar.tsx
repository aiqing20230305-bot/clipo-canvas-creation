import clipoLogo from "@/assets/clipo-logo.webp";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/50">
      <div className="container mx-auto px-6 flex items-center justify-between h-14">
        <a href="https://clipo.cc" className="flex items-center">
          <img src={clipoLogo} alt="Clipo" className="h-6" />
        </a>
        <div className="flex items-center gap-8">
          <a href="#solutions" className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden md:block tracking-wide uppercase">
            解决方案
          </a>
          <a href="#pricing" className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden md:block tracking-wide uppercase">
            报价
          </a>
          <a
            href="https://asset.clipo.cc/video-agent/signup"
            className="px-5 py-2 rounded-full bg-gradient-purple text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity tracking-wide"
          >
            立即体验
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
