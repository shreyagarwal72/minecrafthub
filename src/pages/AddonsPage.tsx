import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import customAddonPack from "@/assets/custom-addon-pack.jpg";
import minecraft3DPack from "@/assets/minecraft-3d-pack.jpg";

const AddonsPage = () => {
  const addons = [
    {
      title: "Raiyon's Java Combat Addon",
      image: "/images/2.gif",
      description: "Bring Java Edition combat mechanics to Bedrock! Features sweeping edge attacks, shield blocking, instant attack speeds, critical hits, and advanced PvP mechanics. Perfect for competitive players and vanilla+ enthusiasts.",
      downloadLink: "https://mcpedl.com/raiyons-java-combat-addon/",
      downloadText: "Download Java Combat Addon"
    },
    {
      title: "Minecraft 3D Texture Pack",
      image: minecraft3DPack,
      description: "Transform your Minecraft world with realistic 3D textures! This resource pack by LvzBx adds stunning 3D depth to blocks and items without sacrificing performance. Perfect for both high-end and low-end devices.",
      downloadLink: "https://mcpedl.com/leaving/?url=https%3A%2F%2Fdirect-link.net%2F144609%2Ftexture-pack1&blid=142",
      downloadText: "Download Minecraft 3D Pack"
    },
    {
      title: "Java Saturation Addon", 
      image: "/images/1.gif",
      description: "Get true Java Edition hunger & saturation mechanics in Minecraft Bedrock. Never worry about unfair food loss again. Plug and play!",
      downloadLink: "https://www.mediafire.com/file/f5npxzqk25yklgd/Raiyon's+Java+Saturation.mcaddon/file",
      downloadText: "Download Java Saturation Addon"
    },
    {
      title: "Actions and Stuff Addon",
      image: "/images/3.jpeg", 
      description: "Tons of new animations, custom mob behaviors, advanced UI options, and creative tweaks. Make your world look and play like a pro modpack — no scripting needed!",
      downloadLink: "https://www.mediafire.com/file/addon3/Actions-and-Stuff.mcaddon/file",
      downloadText: "Download Actions and Stuff Addon"
    },
    {
      title: "Raiyon Dynamic Lighting",
      image: "/images/4.jpg",
      description: "Real moving light sources! Hold a torch, lantern, or even fire and the world around you lights up instantly. The best Bedrock dynamic lighting, inspired by Java mods.",
      downloadLink: "https://www.mediafire.com/file/oz8vwi3lhyv9vhl/Dynamic-Lightning.mcaddon/file", 
      downloadText: "Download Dynamic Lighting"
    },
    {
      title: "Raiyon's Useful Offhand Addon",
      image: "/images/5.gif",
      description: "Real dual wielding in Bedrock Edition! Use shields, food, totems, arrows, and more in your offhand — just like Minecraft Java Edition. Perfect for PvP pros.",
      downloadLink: "https://www.mediafire.com/file/vz4kwleud60vj3j/Raiyon.mcaddon/file",
      downloadText: "Download Useful Offhand Addon"
    },
    {
      title: "The Ty-el's UI Pack v1.2.0 (110)",
      image: "https://img.youtube.com/vi/5CdlEFepD9c/hqdefault.jpg",
      description: "A complete, clean, responsive Minecraft Bedrock UI resource pack. New features: animated menus, advanced controls, exclusive screen options, server XP, quick settings & more!",
      videoLink: "https://youtu.be/5CdlEFepD9c?feature=shared",
      downloadLink: "https://www.mediafire.com/file/pxh53kd6j6ot670/Ty-el.mcpack/file",
      downloadText: "Download Ty-el's UI Pack"
    },
    {
      title: "Optifine",
      image: "/Addons/1.jpeg",
      description: "Download the latest and exclusive Optifine Bedrock addon from Nextup Studio! Works on all versions (1.21+), includes new gameplay tweaks and content.",
      downloadLink: "https://www.mediafire.com/file/xccrf2gasi0nuua/Optifine-Plus-Plus-Client-MCPE-1.20.mcpack.zip/file",
      downloadText: "Download Now"
    },
    {
      title: "Custom Addon Pack crafted by Us",
      image: customAddonPack,
      description: "Exclusive custom addon pack handcrafted by Nextup Studio! A unique collection combining the best features, optimizations, and enhancements for the ultimate Minecraft Bedrock experience.",
      downloadLink: "https://www.mediafire.com/file/j9n4hsitabze51j/My+addons.mcaddon/file",
      downloadText: "Download Custom Pack"
    }
  ];

  return (
    <div className="min-h-screen bg-gaming-bg">
      <Helmet>
        <title>Minecraft Bedrock Addons & Mods - Combat, 3D Textures, UI Packs | Nextup Studio</title>
        <meta name="description" content="Download premium Minecraft Bedrock addons including Java Combat mechanics, 3D texture packs, dynamic lighting, useful offhand, and custom UI packs. Free MCPE addons optimized for all devices." />
        <meta name="keywords" content="minecraft addons, bedrock addons, mcpe mods, java combat addon, 3d texture pack, minecraft shaders, dynamic lighting, offhand addon, minecraft ui pack, optifine bedrock" />
        <link rel="canonical" href="https://minecraft-hub-xi.vercel.app/addons" />
        <meta property="og:title" content="Minecraft Bedrock Addons & Mods - Combat, 3D Textures, UI Packs" />
        <meta property="og:description" content="Download premium Minecraft Bedrock addons including Java Combat mechanics, 3D texture packs, dynamic lighting, and more. Free MCPE addons optimized for all devices." />
        <meta property="og:url" content="https://minecraft-hub-xi.vercel.app/addons" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Minecraft Bedrock Addons Collection",
            "description": "Premium Minecraft Bedrock Edition addons and modifications",
            "url": "https://minecraft-hub-xi.vercel.app/addons",
            "provider": {
              "@type": "Organization",
              "name": "Nextup Studio"
            }
          })}
        </script>
      </Helmet>
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gaming-text mb-4">
              <span className="text-glow">Combat & Actions Addons</span>
            </h1>
            <p className="text-xl text-gaming-text-muted max-w-2xl mx-auto">
              Enhance your Minecraft Bedrock experience with powerful addons and modifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {addons.map((addon, index) => (
              <div 
                key={index}
                className="card-gaming p-6 hover:transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={addon.image} 
                    alt={`${addon.title} Preview`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-3">{addon.title}</h3>
                
                <p className="text-gaming-text-muted mb-4 text-sm leading-relaxed">
                  {addon.description}
                  {addon.videoLink && (
                    <>
                      <br />
                      <a 
                        href={addon.videoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-glow transition-colors"
                      >
                        View Showcase
                      </a>
                    </>
                  )}
                </p>
                
                <Button asChild className="btn-gaming w-full">
                  <a 
                    href={addon.downloadLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    download
                  >
                    {addon.downloadText}
                  </a>
                </Button>
              </div>
            ))}
          </div>

          <section className="card-gaming p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">How to Install Minecraft Addons</h2>
            <p className="text-gaming-text-muted">
              Download the <code className="bg-gaming-surface px-2 py-1 rounded text-primary">.mcaddon</code> files above, then just open them on your device. 
              <strong className="text-gaming-text"> Minecraft Bedrock will auto-import</strong> these addons under Behavior & Resource Packs.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddonsPage;