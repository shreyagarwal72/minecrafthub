import { useCallback, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import McButton from "@/components/McButton";
import Reveal from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { useDownload } from "@/hooks/useDownload";
import { toast } from "@/lib/toast";
import { BETA, BETA_NOTES_URL, compareVersions, type BetaVersionInfo } from "@/data/content";

const FEATURES = [
  { title: "Preview Features", text: "Access experimental gameplay mechanics and upcoming content before the official release." },
  { title: "New Content First", text: "Try new mobs, blocks, biomes and items before they hit the stable version." },
  { title: "Performance Tests", text: "Experience optimizations and improvements being tested for future updates." },
];

const isUsable = (b: Partial<BetaVersionInfo> | null | undefined): b is BetaVersionInfo =>
  !!b &&
  typeof b.version === "string" &&
  /^\d+(\.\d+)+$/.test(b.version) &&
  compareVersions(b.version, BETA.version) >= 0 &&
  typeof b.downloadLink === "string" &&
  b.downloadLink.startsWith("https://") &&
  typeof b.pageUrl === "string";

const BetaPage = () => {
  const [info, setInfo] = useState<BetaVersionInfo>(BETA);
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const { states, start } = useDownload();

  const check = useCallback(async (manual = false) => {
    setIsChecking(true);
    try {
      const { data, error } = await supabase.functions.invoke("version-checker");
      if (error) throw error;
      if (isUsable(data?.beta)) {
        setInfo(data.beta);
        try { localStorage.setItem("mcBetaInfo", JSON.stringify(data.beta)); } catch { /* ignore */ }
      }
      setLastChecked(new Date());
      try { localStorage.setItem("mcBetaLastChecked", new Date().toISOString()); } catch { /* ignore */ }
      if (manual) toast({ title: "Beta checked", text: "Showing the newest preview we know about.", icon: "/icons/obsidian.png" });
    } catch (err) {
      console.error("Beta check failed:", err);
      if (manual) toast({ title: "Update check failed", kind: "error", icon: "/icons/obsidian.png" });
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    let last: string | null = null;
    try {
      const cached = JSON.parse(localStorage.getItem("mcBetaInfo") ?? "null");
      if (isUsable(cached)) setInfo(cached);
      last = localStorage.getItem("mcBetaLastChecked");
    } catch { /* ignore */ }
    if (last) setLastChecked(new Date(last));
    if (!last || Date.now() - new Date(last).getTime() > 2 * 60 * 60 * 1000) void check(false);
  }, [check]);

  const ago = lastChecked
    ? (() => {
        const m = Math.floor((Date.now() - lastChecked.getTime()) / 60000);
        return m < 1 ? "just now" : m < 60 ? `${m} min ago` : `${Math.floor(m / 60)} h ago`;
      })()
    : "never";
  const st = states.beta;

  return (
    <Layout title="Minecraft Beta & Preview" background="stone">
      <div className="mc-container mc-container--narrow">
        <PageHead icon="obsidian" title="Minecraft Beta" subtitle="Get early access to upcoming Minecraft features with the newest Beta & Preview build.">
          <p className="mc-version-big" style={{ marginTop: 18 }}>{info.version}</p>
          <div className="mc-meta-row" style={{ marginTop: 12 }}>
            <span>Last checked: {ago}</span>
            <McButton size="sm" variant="dark" disabled={isChecking} onClick={() => void check(true)}>
              {isChecking ? "Checking..." : "Check for Updates"}
            </McButton>
          </div>
          <div style={{ maxWidth: 380, margin: "22px auto 0" }} className="mc-stack">
            {st?.active && (
              <div className="mc-bar" role="progressbar" aria-valuenow={Math.round(st.progress)} aria-valuemin={0} aria-valuemax={100}>
                <div className="mc-bar__fill" style={{ width: `calc(${st.progress}% - 4px)` }} />
              </div>
            )}
            <McButton
              variant="green"
              size="lg"
              block
              pulse
              disabled={!!st?.active}
              onClick={() => start(info.downloadLink, "beta", `Minecraft Beta ${info.version}`, "/icons/obsidian.png")}
            >
              Download Beta {info.version}
            </McButton>
          </div>
          <p className="mc-muted" style={{ marginTop: 14 }}>
            Source:{" "}
            <a href={info.pageUrl} target="_blank" rel="noopener noreferrer">mcpedl.org</a> · Official notes:{" "}
            <a href={BETA_NOTES_URL} target="_blank" rel="noopener noreferrer">feedback.minecraft.net</a>
          </p>
        </PageHead>

        <div className="mc-grid mc-grid--3" style={{ marginBottom: 32 }}>
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <article className="mc-panel mc-panel--lift mc-card">
                <div className="mc-check">
                  <span className="mc-check__box" aria-hidden="true" />
                  <h2 className="mc-card__title">{f.title}</h2>
                </div>
                <p className="mc-card__text">{f.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <section className="mc-warn" role="note">
            <h2>⚠ EXPERIMENTAL BUILD</h2>
            <ul className="mc-list">
              <li>Beta versions may contain bugs and unstable features.</li>
              <li>Always back up your worlds before updating to a beta.</li>
              <li>Beta worlds may not be compatible with stable releases.</li>
              <li>Some features may change or be removed before the final release.</li>
            </ul>
          </section>
        </Reveal>
      </div>
    </Layout>
  );
};

export default BetaPage;
