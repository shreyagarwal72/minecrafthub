import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import McButton from "@/components/McButton";
import Reveal from "@/components/Reveal";
import { WORLDS, WORLD_UPDATES } from "@/data/content";
import { toast } from "@/lib/toast";

const WorldsPage = () => {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  return (
    <Layout title="Survival Adventure Worlds">
      <div className="mc-container mc-container--narrow">
        <PageHead
          icon="grass"
          title="Select World"
          subtitle="Download amazing Minecraft Bedrock worlds with custom builds, hidden treasures and epic adventures."
        />

        <div className="mc-stack" style={{ ["--gap" as string]: "20px" }}>
          {WORLDS.map((world, i) => (
            <Reveal key={world.title} delay={i * 0.1}>
              <article className="mc-world">
                <div className="mc-slot mc-world__thumb">
                  <img src={world.images[0]} alt="" />
                </div>
                <div>
                  <h2 className="mc-world__name">{world.title}</h2>
                  <p className="mc-world__line">Survival Mode · Bedrock · {world.format}</p>
                  <p className="mc-world__line">Hosted on {world.source}</p>
                  <p className="mc-world__desc">{world.description}</p>
                  {world.disclaimer && <p className="mc-world__line" style={{ marginTop: 8, fontStyle: "italic" }}>{world.disclaimer}</p>}
                </div>

                <div className="mc-gallery" aria-label={`${world.title} screenshots`}>
                  {world.images.map((src, n) => (
                    <button key={src} onClick={() => setZoom({ src, alt: `${world.title} screenshot ${n + 1}` })} aria-label={`Enlarge screenshot ${n + 1}`}>
                      <span className="mc-slot mc-slot--hover" style={{ display: "block" }}>
                        <img src={src} alt={`${world.title} screenshot ${n + 1}`} loading="lazy" />
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mc-world__actions">
                  <McButton
                    href={world.downloadLink}
                    variant="green"
                    onClick={() => toast({ title: "Opening download", text: world.title, icon: "/icons/grass.png" })}
                  >
                    {world.downloadText}
                  </McButton>
                  <span className="mc-tip mc-tip--aqua">{world.format}</span>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal>
            <section className="mc-panel">
              <h2 className="mc-h2">
                <img src="/textures/xp.png" alt="" /> LATEST WORLD UPDATES
              </h2>
              <ul className="mc-list">
                {WORLD_UPDATES.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section className="mc-panel mc-panel--dark">
              <h2 className="mc-h2 mc-h2--light">HOW TO INSTALL</h2>
              <p>
                Open the downloaded <code>.mcworld</code> or <code>.mctemplate</code> file and Minecraft imports it into your world list.
                Back up your existing worlds first.
              </p>
            </section>
          </Reveal>
        </div>
      </div>

      {zoom && (
        <div className="mc-lightbox" role="dialog" aria-modal="true" aria-label="Screenshot" onClick={() => setZoom(null)}>
          <img src={zoom.src} alt={zoom.alt} />
          <McButton variant="dark" size="sm" onClick={() => setZoom(null)}>
            Close
          </McButton>
        </div>
      )}
    </Layout>
  );
};

export default WorldsPage;
