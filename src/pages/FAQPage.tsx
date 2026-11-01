import { Fragment, useMemo, useState, type ReactNode } from "react";
import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import McButton from "@/components/McButton";
import { BETA, RELEASE, SOCIAL } from "@/data/content";

interface FAQItem {
  id: string;
  category: "worlds" | "addons" | "shaders" | "downloads" | "general";
  question: string;
  answer: string;
  tags: string[];
}

const FAQ_ITEMS: FAQItem[] = [
  // Worlds
  {
    id: "available-worlds",
    category: "worlds",
    question: "What Minecraft worlds are available to download?",
    answer:
      "Nextup Studio offers premium Minecraft Bedrock custom worlds including:\n" +
      "• **Techno Gamerz Survival World**: The famous survival world featuring the massive castle, redstone auto-farms, and trading halls.\n" +
      "• **Waterfall & Villager Map**: Our custom handcrafted survival adventure map with scenic mountains and custom village builds.\n\n" +
      "All worlds are fully compatible with modern Minecraft Bedrock Edition across Android, iOS, and Windows.",
    tags: ["worlds", "techno gamerz", "survival", "map", "bedrock"],
  },
  {
    id: "install-world",
    category: "worlds",
    question: "How do I install a downloaded world save?",
    answer:
      "Installing worlds on Bedrock Edition is simple:\n" +
      "1. Download the `.mcworld` or `.zip` file from our Worlds page.\n" +
      "2. For `.mcworld` files: Tap or double-click the file. It will automatically launch Minecraft and import the world into your worlds list.\n" +
      "3. For `.zip` archives: Extract the folder and move it to `games/com.mojang/minecraftWorlds/` (Android) or your `%localappdata%/Packages/Microsoft.MinecraftUWP.../LocalState/games/com.mojang/minecraftWorlds/` folder (Windows).",
    tags: ["worlds", "install", "mcworld", "import"],
  },

  // Addons
  {
    id: "install-addons",
    category: "addons",
    question: "How do I install addons on Minecraft Bedrock?",
    answer:
      "Follow these steps to install addons:\n" +
      "1. Download the `.mcaddon` or `.mcpack` file from our Addons page.\n" +
      "2. Tap the file in your file manager to open it in Minecraft.\n" +
      "3. Wait for the 'Import Started' and 'Import Successful' notifications.\n" +
      "4. Open your World Settings, go to **Resource Packs** and **Behavior Packs**, and activate the addon.\n" +
      "5. **Important**: Under the Experiments tab, enable 'Holiday Creator Features' and other experimental toggles if required by the addon.",
    tags: ["addons", "mcaddon", "mcpack", "install", "behavior pack"],
  },
  {
    id: "addons-multiplayer",
    category: "addons",
    question: "Do addons work in multiplayer and on Realms?",
    answer:
      "Yes! When hosting a multiplayer world or Realm with resource and behavior packs applied, check the option 'Require players to accept resource packs to join'. Friends who join will automatically download and sync the addon packs.",
    tags: ["addons", "multiplayer", "realms", "friends"],
  },

  // Shaders
  {
    id: "mobile-shaders",
    category: "shaders",
    question: "Which shader works best on mobile devices?",
    answer:
      "For mobile phones and tablets:\n" +
      "• **Newb X Legacy**: The top choice for budget and midrange phones. Gorgeous skies and waving leaves with almost zero FPS impact.\n" +
      "• **Solar Shader**: A balanced choice with realistic sun, moon, and clear water effects.\n" +
      "• **Prizma Visuals**: Best for high-end flagship phones and PC Bedrock, delivering cinematic lighting and reflections.",
    tags: ["shaders", "mobile", "newb x legacy", "performance", "fps"],
  },
  {
    id: "render-dragon-shaders",
    category: "shaders",
    question: "How do shaders work with Minecraft Bedrock's Render Dragon?",
    answer:
      "Render Dragon is Bedrock's modern graphics engine. Traditional shader files require compatible Render Dragon shader packs or patched clients. All shaders hosted on Nextup Studio are verified and optimized for current Render Dragon versions.",
    tags: ["shaders", "render dragon", "graphics", "patch"],
  },

  // Downloads & Versions
  {
    id: "versions-difference",
    category: "downloads",
    question: "What is the difference between Stable Release and Beta/Preview?",
    answer:
      `• **Stable Release (v${RELEASE.version})**: The official, fully tested build. Recommended for main survival worlds, multiplayer servers, and regular gameplay.\n` +
      `• **Beta & Preview (v${BETA.version})**: Early-access test builds featuring upcoming experimental mobs, blocks, and gameplay tweaks. Preview versions install separately so your main worlds remain untouched.`,
    tags: ["downloads", "versions", "release", "beta", "preview"],
  },
  {
    id: "download-safety",
    category: "downloads",
    question: "Are the downloads safe and free of viruses?",
    answer:
      "Yes! We strictly curate links to official community releases, verified GitHub releases, and clean mirrors. We never distribute malware, trojans, or intrusive adware. However, we always recommend keeping backups of your worlds before testing new mods.",
    tags: ["downloads", "safety", "virus", "security", "backup"],
  },

  // General
  {
    id: "about-nextup",
    category: "general",
    question: "What is Nextup Studio?",
    answer:
      "Nextup Studio is a Minecraft content hub created by **Vanshu Agarwal**, dedicated to curating high-quality Bedrock Edition survival worlds, battle addons, shaders, and game update resources for the Minecraft community.",
    tags: ["general", "about", "nextup studio", "vanshu agarwal"],
  },
  {
    id: "contact-support",
    category: "general",
    question: "How can I contact Nextup Studio for support or suggestions?",
    answer:
      `You can reach out anytime:\n` +
      `• **Email**: ${SOCIAL.email}\n` +
      `• **YouTube**: @nextupstudioyt\n` +
      `• **Instagram**: @vanshu_ag_72\n\n` +
      "Feel free to send questions, content suggestions, or bug reports!",
    tags: ["general", "contact", "support", "email", "social"],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "worlds", label: "Worlds" },
  { id: "addons", label: "Addons" },
  { id: "shaders", label: "Shaders" },
  { id: "downloads", label: "Downloads & Versions" },
  { id: "general", label: "General" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

/** Safe renderer for **bold** and newlines */
const Rich = ({ text }: { text: string }) => (
  <>
    {text.split("\n").map((line, li) => {
      const parts: ReactNode[] = line.split(/(\*\*[^*]+\*\*)/g).map((part, pi) =>
        part.startsWith("**") && part.endsWith("**") ? <b key={pi}>{part.slice(2, -2)}</b> : <Fragment key={pi}>{part}</Fragment>,
      );
      return (
        <Fragment key={li}>
          {li > 0 && <br />}
          {parts}
        </Fragment>
      );
    })}
  </>
);

const FAQPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [openedIds, setOpenedIds] = useState<Record<string, boolean>>({
    "available-worlds": true,
    "install-addons": true,
    "mobile-shaders": true,
  });

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [search, activeCategory]);

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    for (const item of filteredItems) next[item.id] = true;
    setOpenedIds(next);
  };

  const collapseAll = () => {
    setOpenedIds({});
  };

  return (
    <Layout title="Frequently Asked Questions" background="deep">
      <div className="mc-container mc-container--narrow">
        <PageHead
          icon="lapis"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about worlds, addons, shaders, and Bedrock downloads."
        />

        {/* Search & Filter Bar */}
        <section className="mc-panel mc-panel--dark" aria-label="Search and filter FAQ" style={{ marginBottom: 24 }}>
          <div className="mc-field">
            <span>Search Questions</span>
            <input
              type="search"
              className="mc-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by keywords (e.g. shader, addon, techno gamerz, virus)..."
              aria-label="Search FAQ"
            />
          </div>

          <div className="mc-chips" role="group" aria-label="FAQ Categories" style={{ marginTop: 14 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className="mc-tag mc-tag--btn"
                aria-pressed={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="mc-row mc-row--between" style={{ marginTop: 14, alignItems: "center" }}>
            <span className="mc-muted">
              Showing {filteredItems.length} question{filteredItems.length === 1 ? "" : "s"}
            </span>
            <div className="mc-row" style={{ gap: 8 }}>
              <McButton size="sm" variant="dark" onClick={expandAll}>Expand All</McButton>
              <McButton size="sm" variant="dark" onClick={collapseAll}>Collapse All</McButton>
            </div>
          </div>
        </section>

        {/* Written-book styled knowledge base */}
        <section aria-labelledby="knowledge-base-heading">
          <h2 id="knowledge-base-heading" className="mc-h2 mc-h2--light" style={{ marginBottom: 14 }}>
            KNOWLEDGE BASE
          </h2>

          {filteredItems.length === 0 ? (
            <div className="mc-panel mc-panel--dark mc-center" style={{ padding: "32px 16px" }}>
              <p style={{ fontSize: 24, marginBottom: 12 }}>No questions match your search.</p>
              <McButton
                size="sm"
                variant="green"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
              >
                Reset Search Filters
              </McButton>
            </div>
          ) : (
            <div className="mc-book" style={{ display: "grid", gap: 12 }}>
              {filteredItems.map((item) => {
                const isOpen = !!openedIds[item.id];
                return (
                  <details
                    key={item.id}
                    open={isOpen}
                    onToggle={(e) => {
                      const open = (e.currentTarget as HTMLDetailsElement).open;
                      setOpenedIds((prev) => ({ ...prev, [item.id]: open }));
                    }}
                  >
                    <summary style={{ cursor: "pointer" }}>
                      <span style={{ flex: 1 }}>{item.question}</span>
                    </summary>
                    <div style={{ fontSize: 22, padding: "8px 6px 12px 24px", lineHeight: 1.35 }}>
                      <Rich text={item.answer} />
                    </div>
                  </details>
                );
              })}
            </div>
          )}
        </section>

        {/* Contact & Community Section */}
        <section className="mc-panel mc-panel--dark" style={{ marginTop: 28, padding: 20 }}>
          <h3 className="mc-h3 mc-yellow" style={{ marginBottom: 8 }}>STILL NEED HELP?</h3>
          <p style={{ fontSize: 22, color: "#ccc", marginBottom: 16 }}>
            Have a question that is not answered here, or want to suggest a new world or addon? Reach out directly:
          </p>
          <div className="mc-row" style={{ flexWrap: "wrap", gap: 10 }}>
            <McButton href={`mailto:${SOCIAL.email}`} variant="green">Email Us</McButton>
            <McButton href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" variant="dark">YouTube</McButton>
            <McButton href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" variant="dark">Instagram</McButton>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FAQPage;
