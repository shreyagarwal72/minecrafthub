import { useMemo } from "react";
import McButton from "@/components/McButton";
import { RELEASE, SPLASHES } from "@/data/content";

/** Deterministic pseudo-random so the starfield is stable between renders. */
const STARS = Array.from({ length: 46 }, (_, i) => {
  const s = Math.sin(i * 91.7) * 10000;
  const r = s - Math.floor(s);
  const s2 = Math.sin(i * 17.3 + 4) * 10000;
  const r2 = s2 - Math.floor(s2);
  return { left: `${(r * 100).toFixed(2)}%`, top: `${(r2 * 100).toFixed(2)}%`, delay: `${((r + r2) * 2.6).toFixed(2)}s` };
});

/** Title screen: animated day/night sky, drifting clouds and the main menu. */
const Hero = () => {
  const splash = useMemo(() => SPLASHES[Math.floor(Math.random() * SPLASHES.length)], []);

  return (
    <section id="home" className="mc-hero" aria-label="Title screen">
      <div className="mc-sky" aria-hidden="true">
        <div className="mc-sky__dusk" />
        <div className="mc-sky__night" />
      </div>
      <div className="mc-stars" aria-hidden="true">
        {STARS.map((s, i) => (
          <span key={i} className="mc-star" style={{ left: s.left, top: s.top, animationDelay: s.delay }} />
        ))}
      </div>
      <div className="mc-orbit" aria-hidden="true">
        <img className="sun" src="/textures/sun.png" alt="" />
        <img className="moon" src="/textures/moon.png" alt="" />
      </div>
      <div className="mc-cloud mc-cloud--a" aria-hidden="true" />
      <div className="mc-cloud mc-cloud--b" aria-hidden="true" />
      <div className="mc-cloud mc-cloud--c" aria-hidden="true" />
      <div className="mc-night-dim" aria-hidden="true" />

      <div className="mc-ground" aria-hidden="true">
        <img className="mc-tree mc-tree--l" src="/textures/tree.png" alt="" />
        <img className="mc-tree mc-tree--m" src="/textures/tree.png" alt="" />
        <img className="mc-tree mc-tree--r" src="/textures/tree.png" alt="" />
        <div className="mc-ground__grass" />
        <div className="mc-ground__dirt" />
      </div>
      <div className="mc-hero-night-tint" aria-hidden="true" />

      <div className="mc-title-wrap">
        <h1 className="mc-logo">
          <span className="mc-logo__main">
            NEXTUP
            <br />
            STUDIO
          </span>
          <span className="mc-logo__sub">MINECRAFT · BEDROCK · HUB</span>
          <span className="mc-splash" aria-hidden="true">{splash}</span>
        </h1>

        <nav className="mc-menu" aria-label="Main menu">
          <McButton to="/downloads" variant="green" size="lg" block pulse sub={`Latest release · ${RELEASE.version}`}>
            Download Minecraft
          </McButton>
          <McButton to="/worlds" block>
            Worlds
          </McButton>
          <McButton to="/addons" block>
            Addons
          </McButton>
          <McButton to="/shaders" block>
            Shaders
          </McButton>
          <div className="mc-menu__row">
            <McButton to="/beta">Beta</McButton>
            <McButton to="/faq">FAQ</McButton>
          </div>
        </nav>
      </div>

      <a href="#showcase" className="mc-scroll-cue" aria-label="Scroll to the showcase" style={{ textDecoration: "none" }}>
        ▼ SCROLL ▼
      </a>

      <div className="mc-hero__foot" aria-hidden="true">
        <span>Nextup Studio · Bedrock Hub</span>
        <span>Not affiliated with Mojang or Microsoft</span>
      </div>
    </section>
  );
};

export default Hero;
