import McButton from "@/components/McButton";
import Reveal from "@/components/Reveal";
import { showcase } from "@/data/assets";
import { BETA, RELEASE, type IconName } from "@/data/content";

interface Item {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: IconName;
  buttonText: string;
  href: string;
  variant?: "green" | "gray";
}

const ITEMS: Item[] = [
  {
    id: "worlds",
    title: "Survival Adventure Worlds",
    description: "Explore custom survival with scenic biomes, beautiful builds, hidden loot and a secret waterfall.",
    image: showcase.survivalWorld,
    icon: "grass",
    buttonText: "Browse Worlds",
    href: "/worlds",
  },
  {
    id: "addons",
    title: "Combat & Actions Addons",
    description: "Upgrade Minecraft with Java combat, dynamic lighting, offhand slots and special abilities.",
    image: showcase.combatAddon,
    icon: "planks",
    buttonText: "Browse Addons",
    href: "/addons",
  },
  {
    id: "shaders",
    title: "Minecraft Shaders",
    description: "Transform your world with better lighting, shadows, water and skies: Solar, Newb X, Prizma and BSL.",
    image: showcase.shaders,
    icon: "glowstone",
    buttonText: "Get Shaders",
    href: "/shaders",
  },
  {
    id: "downloads",
    title: `Minecraft Bedrock ${RELEASE.version}`,
    description: `The newest stable release, plus an archive of every major version back to 1.18. With and without music.`,
    image: showcase.minecraftOfficial,
    icon: "diamond",
    buttonText: "Download Minecraft",
    href: "/downloads",
    variant: "green",
  },
  {
    id: "beta",
    title: `Minecraft Beta ${BETA.version}`,
    description: "Get early access to upcoming features with the latest Beta & Preview build.",
    image: showcase.minecraftPreview,
    icon: "obsidian",
    buttonText: "Try the Beta",
    href: "/beta",
  },
];

const STATS = [
  { n: "50K+", l: "Downloads" },
  { n: "1000+", l: "Happy Players" },
  { n: "25+", l: "Custom Worlds" },
];

const STEPS = [
  { icon: "/icons/diamond.png", title: "1. Download", text: "Pick a build, world, addon or shader and open its download page." },
  { icon: "/icons/planks.png", title: "2. Open the file", text: "Tap .mcpack / .mcaddon / .mcworld files and Minecraft imports them automatically." },
  { icon: "/icons/grass.png", title: "3. Play", text: "Enable packs in your world's settings and jump in." },
];

const Showcase = () => (
  <section id="showcase" className="mc-section mc-bg-stone" style={{ scrollMarginTop: 64 }}>
    <div className="mc-container">
      <Reveal className="mc-center">
        <h2 className="mc-page-title">Choose Your Adventure</h2>
        <p className="mc-page-sub">Custom worlds, powerful addons, stunning shaders and the newest Minecraft Bedrock builds.</p>
      </Reveal>

      <div className="mc-grid mc-grid--2" style={{ marginTop: 32 }}>
        {ITEMS.map((item, i) => (
          <Reveal key={item.id} delay={(i % 2) * 0.12}>
            <article id={item.id} className="mc-panel mc-panel--lift mc-card mc-showcase-card">
              <div className="mc-slot mc-slot--hover">
                <img src={item.image} alt="" loading="lazy" style={{ aspectRatio: "16 / 9" }} />
                <img className="mc-badge-icon" src={`/icons/${item.icon}.png`} alt="" style={{ width: 48, height: 48 }} />
              </div>
              <h3 className="mc-card__title">{item.title}</h3>
              <p className="mc-card__text">{item.description}</p>
              <McButton to={item.href} block variant={item.variant ?? "gray"}>
                {item.buttonText}
              </McButton>
            </article>
          </Reveal>
        ))}

        <Reveal delay={0.12}>
          <article className="mc-panel mc-panel--dark mc-card" aria-label="How it works">
            <h3 className="mc-h2 mc-h2--light">HOW IT WORKS</h3>
            <ol className="mc-list mc-list--plain" style={{ listStyle: "none" }}>
              {STEPS.map((s) => (
                <li key={s.title} style={{ alignItems: "center" }}>
                  <span className="mc-slot" style={{ width: 52, height: 52, flex: "none", display: "grid", placeItems: "center" }}>
                    <img src={s.icon} alt="" style={{ width: 40, height: 40, objectFit: "contain" }} />
                  </span>
                  <span>
                    <b className="t-yellow" style={{ fontWeight: 400 }}>{s.title}</b>
                    <br />
                    {s.text}
                  </span>
                </li>
              ))}
            </ol>
          </article>
        </Reveal>
      </div>

      <div className="mc-grid mc-grid--3" style={{ marginTop: 40 }}>
        {STATS.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.12}>
            <div className="mc-panel mc-panel--dark mc-stat">
              <img src="/textures/xp.png" alt="" />
              <div>
                <div className="mc-stat__n">{s.n}</div>
                <div className="mc-stat__l">{s.l}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Showcase;
