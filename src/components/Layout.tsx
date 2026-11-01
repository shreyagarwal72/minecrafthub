import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastHost from "@/components/ToastHost";
import ClickParticles from "@/components/ClickParticles";
import XpHud from "@/components/XpHud";

interface LayoutProps {
  /** Page title (without the site name) */
  title?: string;
  children: ReactNode;
  background?: "dirt" | "stone" | "deep";
  /** Remove the header offset so a hero can sit under the fixed header */
  flush?: boolean;
}

const SITE = "Nextup Studio";

/** Shared chrome for every page: header, footer, toasts, click particles and the XP HUD. */
const Layout = ({ title, children, background = "dirt", flush = false }: LayoutProps) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} - Professional Minecraft Gaming Hub`;
  }, [title]);

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className={`mc-app mc-bg-${background}`}>
      <Header />
      <main className="mc-main" style={flush ? { paddingTop: 0 } : undefined}>
        {children}
      </main>
      <Footer />
      <ToastHost />
      <ClickParticles />
      <XpHud />
    </div>
  );
};

export default Layout;
