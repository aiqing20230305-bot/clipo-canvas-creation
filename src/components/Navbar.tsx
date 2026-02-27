const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="text-xl font-bold text-gradient-gold tracking-tight">
          Clipo
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            解决方案
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            报价方案
          </a>
          <a
            href="#"
            className="px-5 py-2 rounded-lg bg-gradient-gold text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            立即体验
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
