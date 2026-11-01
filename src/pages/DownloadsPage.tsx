import { useCallback, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import McButton from "@/components/McButton";
import Reveal from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { useDownload } from "@/hooks/useDownload";
import { toast } from "@/lib/toast";
import { showcase } from "@/data/assets";
import { ARCHIVE, OFFICIAL, RELEASE, SIZES, compareVersions, type VersionInfo } from "@/data/content";

const FEATURES = [
  { icon: "diamond", title: "Latest Builds", text: "New mobs, blocks, improved lighting and mechanics, tracked automatically." },
  { icon: "grass", title: "All Devices", text: "Android, Windows, tablets and emulators are supported." },
  { icon: "planks", title: "Curated Sources", text: "Links point to well-known community archives, never random mirrors." },
  { icon: "lapis", title: "Multiplayer Ready", text: "Crossplay, Realms and multiplayer compatible." },
  { icon: "obsidian", title: "Back-up Reminder", text: "We nag you to save your worlds before every update. You're welcome." },
  { icon: "glowstone", title: "Community Trusted", text: "Downloaded by thousands of players worldwide." },
] as const;

const TIPS = [
  "Both builds work with multiplayer and Realms. Pick \"no music\" (" + SIZES.noMusic + ") for low-storage phones.",
  "Always back up your Minecraft worlds before upgrading or reinstalling.",
  "On the source page, choose the file variant that matches your device (arm64 / armv7a).",
  "No root or special permissions are required to install.",
  "If the primary page is slow, use the mirror toggle at the top of this page.",
];

const storageGet = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const storageSet = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* ignore */
  }
};

/** Accept a cached / remote release only if it is real and not older than what ships with the site. */
const isUsable = (v: Partial<VersionInfo> | null | undefined): v is VersionInfo =>
  !!v &&
  typeof v.version === "string" &&
  /^\d+(\.\d+)+$/.test(v.version) &&
  compareVersions(v.version, RELEASE.version) >= 0 &&
  typeof v.musicLink === "string" &&
  v.musicLink.startsWith("https://") &&
  typeof v.noMusicLink === "string" &&
  v.noMusicLink.startsWith("https://") &&
  typeof v.pageUrl === "string";

const DownloadsPage = () => {
  const [info, setInfo] = useState<VersionInfo>(RELEASE);
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [hasNew, setHasNew] = useState(false);

  const markSeen = useCallback(() => {
    storageSet("mcLastSeenVersion", info.version);
    setHasNew(false);
  }, [info.version]);

  const { states, start } = useDownload(markSeen);

  const checkForUpdates = useCallback(async (manual = false) => {
    setIsChecking(true);
    try {
      if (manual && "Notification" in window && Notification.permission === "default") {
        void Notification.requestPermission();
      }
      const { data, error } = await supabase.functions.invoke("version-checker");
      if (error) throw error;
      const release = data?.release as VersionInfo | undefined;
      if (isUsable(release)) {
        const seen = storageGet("mcLastSeenVersion");
        if (seen && compareVersions(release.version, seen) > 0) {
          setHasNew(true);
          toast({ title: "New version available!", text: `Minecraft ${release.version} is out`, icon: "/icons/diamond.png" });
          if (manual && "Notification" in window && Notification.permission === "granted") {
            new Notification("Minecraft update available", { body: `Version ${release.version} is ready to download.`, icon: "/favicon.png" });
          }
        } else if (manual) {
          toast({ title: "You're up to date", text: `Latest release is ${release.version}`, icon: "/icons/grass.png" });
        }
        const merged: VersionInfo = {
          ...release,
          changelog: release.changelog?.length ? release.changelog : release.version === RELEASE.version ? RELEASE.changelog : [],
        };
        setInfo(merged);
        storageSet("mcVersionInfo", JSON.stringify(merged));
      } else if (manual) {
        toast({ title: "You're up to date", text: `Latest release is ${RELEASE.version}`, icon: "/icons/grass.png" });
      }
      const now = new Date();
      setLastChecked(now);
      storageSet("mcVersionLastChecked", now.toISOString());
    } catch (err) {
      console.error("Version check failed:", err);
      if (manual) toast({ title: "Update check failed", text: "Showing the newest version we know about.", kind: "error", icon: "/icons/obsidian.png" });
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    const cachedRaw = storageGet("mcVersionInfo");
    if (cachedRaw) {
      try {
        const cached = JSON.parse(cachedRaw);
        if (isUsable(cached)) setInfo(cached);
        else try { localStorage.removeItem("mcVersionInfo"); } catch { /* ignore */ }
      } catch {
        /* ignore corrupt cache */
      }
    }
    const last = storageGet("mcVersionLastChecked");
    if (last) setLastChecked(new Date(last));
    const stale = !last || Date.now() - new Date(last).getTime() > 60 * 60 * 1000;
    if (stale) void checkForUpdates(false);
  }, [checkForUpdates]);

  const [useMirror, setUseMirror] = useState(false);
  // The "mirror" is the plain source article instead of the #download-link anchor.
  const linkFor = (link: string) => (useMirror ? link.replace("#download-link", "") : link);

  const ago = () => {
    if (!lastChecked) return "never";
    const mins = Math.floor((Date.now() - lastChecked.getTime()) / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    return hrs < 24 ? `${hrs} h ago` : lastChecked.toLocaleDateString();
  };

  const builds = [
    { key: "music", title: "With Music", subtitle: "Full experience", text: "Complete Minecraft with every original soundtrack.", size: SIZES.music, link: info.musicLink, icon: "diamond", primary: true },
    { key: "nomusic", title: "No Music", subtitle: "Lightweight", text: "Perfect for devices with limited storage.", size: SIZES.noMusic, link: info.noMusicLink, icon: "cobble", primary: false },
  ] as const;

  return (
    <Layout title="Download Minecraft Bedrock">
      <div className="mc-container">
        <PageHead icon="diamond" title="Minecraft Bedrock" subtitle="The newest stable release for Android, tablets and emulators.">
          {hasNew && (
            <p style={{ marginTop: 14 }}>
              <span className="mc-newbadge">NEW VERSION</span>{" "}
              <button className="mc-btn mc-btn--sm mc-btn--dark" onClick={markSeen}>Dismiss</button>
            </p>
          )}
          <p className="mc-version-big" style={{ marginTop: 18 }}>VERSION {info.version}</p>
          <div className="mc-meta-row" style={{ marginTop: 12 }}>
            <span>Last checked: {ago()}</span>
            <McButton size="sm" variant="dark" disabled={isChecking} onClick={() => void checkForUpdates(true)}>
              {isChecking ? "Checking..." : "Check for Updates"}
            </McButton>
            <label className="mc-toggle-row">
              <input type="checkbox" checked={useMirror} onChange={(e) => setUseMirror(e.target.checked)} />
              Use source article (no anchor)
            </label>
          </div>
        </PageHead>

        <Reveal>
          <div className="mc-frame" style={{ maxWidth: 720, margin: "0 auto 32px" }}>
            <div className="mc-frame__inner">
              <img src={showcase.minecraftPreview} alt="Minecraft Bedrock preview" />
            </div>
          </div>
        </Reveal>

        <div className="mc-grid mc-grid--2" style={{ maxWidth: 820, margin: "0 auto" }}>
          {builds.map((b, i) => {
            const st = states[b.key];
            return (
              <Reveal key={b.key} delay={i * 0.12}>
                <article className="mc-panel mc-panel--lift mc-card mc-version-card">
                  <div className="mc-row" style={{ flexWrap: "nowrap" }}>
                    <img className="mc-ver-icon" src={`/icons/${b.icon}.png`} alt="" />
                    <div>
                      <h2 className="mc-card__title">{b.title}</h2>
                      <p className="mc-card__meta">{b.subtitle}</p>
                    </div>
                  </div>
                  <p className="mc-card__text">{b.text}</p>
                  {st?.active || (st && st.progress > 0) ? (
                    <div className="mc-bar" role="progressbar" aria-valuenow={Math.round(st.progress)} aria-valuemin={0} aria-valuemax={100}>
                      <div className="mc-bar__fill" style={{ width: `calc(${st.progress}% - 4px)` }} />
                      <div className="mc-bar__label">{st.progress >= 100 ? "Opened!" : "Opening source..."}</div>
                    </div>
                  ) : (
                    <p className="mc-card__meta">Approx. size {b.size}</p>
                  )}
                  <McButton
                    variant={b.primary ? "green" : "gray"}
                    block
                    disabled={!!st?.active}
                    onClick={() => start(linkFor(b.link), b.key, `Minecraft ${info.version} · ${b.title}`, `/icons/${b.icon}.png`)}
                  >
                    Download {info.version}
                  </McButton>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mc-center mc-muted" style={{ marginTop: 16 }}>
          Source:{" "}
          <a href={info.pageUrl} target="_blank" rel="noopener noreferrer">
            mcpedl.org
          </a>
          {" · "}Own the game? Support Mojang on{" "}
          <a href={OFFICIAL.googlePlay} target="_blank" rel="noopener noreferrer">Google Play</a> or{" "}
          <a href={OFFICIAL.minecraftNet} target="_blank" rel="noopener noreferrer">minecraft.net</a>.
        </p>

        <section className="mc-section" aria-labelledby="changelog-h">
          <Reveal>
            <div className="mc-book">
              <h2 id="changelog-h" className="mc-h2">What's New in {info.version}</h2>
              {info.changelog?.length ? (
                info.changelog.map((section, i) => (
                  <details key={section.title} open={i === 0}>
                    <summary>
                      {section.title} <span className="mc-tip mc-tip--green" style={{ fontFamily: "var(--mc-body)" }}>{section.items.length}</span>
                    </summary>
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </details>
                ))
              ) : (
                <p>The changelog appears after the next update check.</p>
              )}
              <p className="mc-card__meta" style={{ marginTop: 12 }}>
                Full notes:{" "}
                <a href="https://feedback.minecraft.net/hc/en-us/sections/360001186971-Release-Changelogs" target="_blank" rel="noopener noreferrer">
                  official release changelogs
                </a>
              </p>
            </div>
          </Reveal>
        </section>

        <section aria-labelledby="archive-h">
          <Reveal>
            <h2 id="archive-h" className="mc-page-title" style={{ fontSize: "clamp(14px, 2.6vw, 24px)", marginBottom: 6 }}>Version Archive</h2>
            <p className="mc-page-sub" style={{ marginBottom: 24 }}>Grab any major Minecraft Bedrock version (final build of each line).</p>
          </Reveal>
          <div className="mc-grid mc-grid--3">
            {ARCHIVE.map((v, i) => {
              const key = `v-${v.version}`;
              const st = states[key];
              return (
                <Reveal key={v.version} delay={(i % 3) * 0.1}>
                  <article className="mc-panel mc-panel--lift mc-card">
                    <div className="mc-row mc-row--between" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
                      <div>
                        <div className="mc-ver-num">
                          {v.version} {v.latest && <span className="mc-tip mc-tip--yellow" style={{ fontFamily: "var(--mc-body)" }}>Latest</span>}
                        </div>
                        <h3 className="mc-card__title" style={{ marginTop: 6 }}>{v.codename}</h3>
                        <p className="mc-card__meta">{v.releaseDate}</p>
                      </div>
                      <img className="mc-ver-icon" style={{ width: 52, height: 52 }} src={`/icons/${v.icon}.png`} alt="" />
                    </div>
                    <p className="mc-card__text">{v.description}</p>
                    <div className="mc-chips">
                      {v.highlights.map((h) => (
                        <span key={h} className="mc-tip">{h}</span>
                      ))}
                    </div>
                    {st?.active && (
                      <div className="mc-bar" role="progressbar" aria-valuenow={Math.round(st.progress)} aria-valuemin={0} aria-valuemax={100}>
                        <div className="mc-bar__fill" style={{ width: `calc(${st.progress}% - 4px)` }} />
                      </div>
                    )}
                    <McButton
                      block
                      variant={v.latest ? "green" : "gray"}
                      disabled={!!st?.active}
                      onClick={() => start(v.downloadLink, key, `Minecraft ${v.version}`, `/icons/${v.icon}.png`)}
                    >
                      Download {v.version}
                    </McButton>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="mc-section" aria-labelledby="why-h">
          <Reveal>
            <div className="mc-panel mc-panel--dark">
              <h2 id="why-h" className="mc-h2 mc-h2--light mc-center" style={{ justifyContent: "center" }}>WHY DOWNLOAD FROM NEXTUP STUDIO?</h2>
              <div className="mc-grid mc-grid--3" style={{ marginTop: 16 }}>
                {FEATURES.map((f) => (
                  <div key={f.title} className="mc-row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
                    <img className="mc-feature-icon" src={`/icons/${f.icon}.png`} alt="" />
                    <div>
                      <h3 className="mc-h2 mc-h2--light" style={{ marginBottom: 6 }}>{f.title}</h3>
                      <p>{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <Reveal>
          <section className="mc-panel">
            <h2 className="mc-h2">SETUP &amp; TIPS</h2>
            <ul className="mc-list">
              {TIPS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        </Reveal>
      </div>
    </Layout>
  );
};

export default DownloadsPage;
