import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import McButton from "@/components/McButton";
import Reveal from "@/components/Reveal";
import { ADDONS } from "@/data/content";
import { resolveImage } from "@/data/assets";
import { toast } from "@/lib/toast";

const AddonsPage = () => (
  <Layout title="Minecraft Bedrock Addons & Mods">
    <div className="mc-container">
      <PageHead
        icon="planks"
        title="Combat & Actions Addons"
        subtitle="Enhance your Minecraft Bedrock experience with powerful addons and modifications."
      />

      <div className="mc-grid mc-grid--3">
        {ADDONS.map((addon, i) => (
          <Reveal key={addon.title} delay={(i % 3) * 0.1}>
            <article className="mc-panel mc-panel--lift mc-card">
              <div className="mc-frame">
                <div className="mc-frame__inner">
                  <img src={resolveImage(addon.image)} alt={`${addon.title} preview`} loading="lazy" />
                </div>
              </div>
              <h2 className="mc-card__title">{addon.title}</h2>
              <p className="mc-card__text">
                {addon.description}
                {addon.videoLink && (
                  <>
                    {" "}
                    <a href={addon.videoLink} target="_blank" rel="noopener noreferrer">
                      View showcase
                    </a>
                  </>
                )}
              </p>
              {addon.meta && <p className="mc-card__meta">{addon.meta}</p>}
              <div className="mc-chips">
                <span className="mc-tip mc-tip--aqua">{addon.source}</span>
              </div>
              <McButton
                href={addon.downloadLink}
                variant="green"
                block
                onClick={() => toast({ title: "Opening download", text: addon.title, icon: "/icons/planks.png" })}
              >
                {addon.downloadText}
              </McButton>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <section className="mc-panel mc-panel--dark" style={{ marginTop: 32 }}>
          <h2 className="mc-h2 mc-h2--light">HOW TO INSTALL ADDONS</h2>
          <p>
            Download the <code>.mcaddon</code> or <code>.mcpack</code> file, then open it on your device.{" "}
            <b className="t-yellow" style={{ fontWeight: 400 }}>Minecraft Bedrock auto-imports it</b> under Behavior &amp; Resource Packs. Then
            enable the pack in your world's settings.
          </p>
        </section>
      </Reveal>
    </div>
  </Layout>
);

export default AddonsPage;
