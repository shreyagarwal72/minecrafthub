import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import McButton from "@/components/McButton";
import Reveal from "@/components/Reveal";
import { SHADERS, SOCIAL } from "@/data/content";
import { resolveImage } from "@/data/assets";
import { toast } from "@/lib/toast";

const ShadersPage = () => (
  <Layout title="Minecraft Shaders" background="deep">
    <div className="mc-container mc-container--narrow">
      <PageHead
        icon="glowstone"
        title="Minecraft Shaders"
        subtitle="Transform your Minecraft world with stunning visual enhancements and realistic lighting."
      />

      <div className="mc-stack" style={{ ["--gap" as string]: "28px" }}>
        {SHADERS.map((shader, i) => (
          <Reveal key={shader.title} delay={0.05}>
            <section className="mc-panel mc-panel--lift">
              <div className="mc-frame">
                <div className="mc-frame__inner">
                  <img src={resolveImage(shader.image)} alt={`${shader.title} preview`} loading={i > 0 ? "lazy" : "eager"} />
                </div>
              </div>

              <div className="mc-stack" style={{ marginTop: 18 }}>
                <div className="mc-row mc-row--between">
                  <h2 className="mc-h2" style={{ margin: 0, fontSize: 15 }}>{shader.title}</h2>
                  <span className="mc-tip mc-tip--aqua">{shader.source}</span>
                </div>
                <p className="mc-card__text">{shader.description}</p>
                {shader.meta && <p className="mc-card__meta">{shader.meta}</p>}
                <div className="mc-row">
                  <McButton
                    href={shader.downloadLink}
                    variant="green"
                    onClick={() => toast({ title: "Opening download", text: shader.title, icon: "/icons/glowstone.png" })}
                  >
                    {shader.downloadText}
                  </McButton>
                </div>
                <p className="mc-card__meta">
                  <b style={{ fontWeight: 400, color: "#2c7a1d" }}>How to use:</b> download and open the <code>.mcpack</code> file in Minecraft
                  Bedrock, then enable it from Resource Packs.
                </p>
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <p className="mc-center mc-muted" style={{ marginTop: 28 }}>
        Follow{" "}
        <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">
          @vanshu_ag_72
        </a>{" "}
        for more.
      </p>
    </div>
  </Layout>
);

export default ShadersPage;
