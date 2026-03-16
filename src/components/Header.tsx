import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import WelcomeIntro from "@/components/WelcomeIntro";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [isManualIntro, setIsManualIntro] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) {
      setShowIntro(true);
      setIsManualIntro(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    setIsManualIntro(true);
    setShowIntro(true);
  };

  const handleCloseIntro = () => {
    setShowIntro(false);
    setIsManualIntro(false);
  };

  const scrollToShowcase = () => {
    const showcase = document.getElementById("showcase");
    if (showcase) {
      showcase.scrollIntoView({ behavior: "smooth" });
    } else if (location.pathname !== "/") {
      window.location.href = "/#showcase";
    }
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Worlds", href: "/worlds" },
    { name: "Addons", href: "/addons" },
    { name: "Shaders", href: "/shaders" },
    { name: "Beta", href: "/beta" },
    { name: "Downloads", href: "/downloads" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-nav"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 group cursor-pointer bg-transparent border-none"
            >
              <div className="relative">
                <Sparkles className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-400" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary via-gaming-emeraldBright to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_6s_ease_infinite]">
                Nextup Studio
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-2 text-[13px] font-medium transition-all duration-300 rounded-lg group ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] bg-primary rounded-full transition-all duration-400 ${
                      location.pathname === item.href
                        ? "w-5 shadow-[0_0_8px_hsl(160_84%_39%/0.5)]"
                        : "w-0 group-hover:w-3"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Button
                onClick={scrollToShowcase}
                data-magnetic
                className="btn-gaming text-xs px-5 py-2"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-400 ease-out ${
              isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-3 space-y-0.5 rounded-2xl mt-2 border border-border/30 px-2"
              style={{
                background: 'hsl(220 30% 8% / 0.85)',
                backdropFilter: 'blur(24px)',
              }}
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                    location.pathname === item.href
                      ? "text-primary bg-primary/8"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-2 pt-2 pb-1">
                <Button onClick={scrollToShowcase} className="btn-gaming w-full text-sm">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <WelcomeIntro isOpen={showIntro} onClose={handleCloseIntro} isManualOpen={isManualIntro} />
    </>
  );
};

export default Header;
