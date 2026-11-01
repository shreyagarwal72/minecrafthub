import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import McButton from "@/components/McButton";
import WelcomeIntro from "@/components/WelcomeIntro";

export const NAVIGATION = [
  { name: "Home", href: "/" },
  { name: "Worlds", href: "/worlds" },
  { name: "Addons", href: "/addons" },
  { name: "Shaders", href: "/shaders" },
  { name: "Beta", href: "/beta" },
  { name: "Downloads", href: "/downloads" },
  { name: "FAQ", href: "/faq" },
];

const safeGet = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [manualIntro, setManualIntro] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!safeGet("hasSeenIntro")) {
      setManualIntro(false);
      setShowIntro(true);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header className={`mc-header ${solid || menuOpen ? "mc-header--solid" : ""}`}>
        <div className="mc-header__inner">
          <button
            className="mc-logo-link"
            onClick={() => {
              setManualIntro(true);
              setShowIntro(true);
            }}
            aria-label="Open the Nextup Studio tour"
          >
            <img src="/icons/grass.png" alt="" />
            <span>NEXTUP STUDIO</span>
          </button>

          <nav className="mc-nav" aria-label="Main">
            {NAVIGATION.map((item) => (
              <Link key={item.href} to={item.href} className="mc-tab" aria-current={pathname === item.href ? "page" : undefined}>
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mc-row" style={{ gap: 10, flexWrap: "nowrap" }}>
            <McButton to="/downloads" variant="green" size="sm" className="mc-nav">
              Play Now
            </McButton>
            <button
              className="mc-btn mc-btn--dark mc-menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mc-drawer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? "X" : "≡"}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mc-drawer" id="mc-drawer" onClick={(e) => e.target === e.currentTarget && setMenuOpen(false)}>
          <div className="mc-drawer__panel mc-panel mc-panel--dark">
            <div className="mc-drawer__title">GAME MENU</div>
            {NAVIGATION.map((item) => (
              <McButton key={item.href} to={item.href} block variant={pathname === item.href ? "green" : "gray"}>
                {item.name}
              </McButton>
            ))}
            <McButton block variant="dark" onClick={() => setMenuOpen(false)}>
              Back to Game
            </McButton>
          </div>
        </div>
      )}

      <WelcomeIntro
        isOpen={showIntro}
        isManualOpen={manualIntro}
        onClose={() => {
          setShowIntro(false);
          setManualIntro(false);
        }}
      />
    </>
  );
};

export default Header;
