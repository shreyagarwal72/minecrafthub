import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import customAddonPack from "@/assets/custom-addon-pack.jpg";
import minecraft3DPack from "@/assets/minecraft-3d-pack.jpg";

const AddonsPage = () => {
  const addons = [
    { title: "Raiyon's Java Combat Addon", image: "/images/2.gif", description: "Bring Java Edition combat mechanics to Bedrock! Features sweeping edge attacks, shield blocking, instant attack speeds, critical hits, and advanced PvP mechanics.", downloadLink: "https://mcpedl.com/raiyons-java-combat-addon/", downloadText: "Download Java Combat Addon" },
    { title: "Minecraft 3D Texture Pack", image: minecraft3DPack, description: "Transform your Minecraft world with realistic 3D textures! This resource pack adds stunning 3D depth to blocks and items without sacrificing performance.", downloadLink: "https://mcpedl.com/leaving/?url=https%3A%2F%2Fdirect-link.net%2F144609%2Ftexture-pack1&blid=142", downloadText: "Download Minecraft 3D Pack" },
    { title: "Java Saturation Addon", image: "/images/1.gif", description: "Get true Java Edition hunger & saturation mechanics in Minecraft Bedrock. Never worry about unfair food loss again.", downloadLink: "https://www.mediafire.com/file/f5npxzqk25yklgd/Raiyon's+Java+Saturation.mcaddon/file", downloadText: "Download Java Saturation Addon" },
    { title: "Actions and Stuff Addon", image: "/images/3.jpeg", description: "Tons of new animations, custom mob behaviors, advanced UI options, and creative tweaks. Make your world play like a pro modpack!", downloadLink: "https://www.mediafire.com/file/addon3/Actions-and-Stuff.mcaddon/file", downloadText: "Download Actions and Stuff Addon" },
    { title: "Raiyon Dynamic Lighting", image: "/images/4.jpg", description: "Real moving light sources! Hold a torch, lantern, or fire and the world around you lights up instantly.", downloadLink: "https://www.mediafire.com/file/oz8vwi3lhyv9vhl/Dynamic-Lightning.mcaddon/file", downloadText: "Download Dynamic Lighting" },
    { title: "Raiyon's Useful Offhand Addon", image: "/images/5.gif", description: "Real dual wielding in Bedrock Edition! Use shields, food, totems, arrows, and more in your offhand.", downloadLink: "https://www.mediafire.com/file/vz4kwleud60vj3j/Raiyon.mcaddon/file", downloadText: "Download Useful Offhand Addon" },
    { title: "The Ty-el's UI Pack v1.2.0", image: "https://img.youtube.com/vi/5CdlEFepD9c/hqdefault.jpg", description: "A complete, clean, responsive Minecraft Bedrock UI resource pack with animated menus, advanced controls, and more!", videoLink: "https://youtu.be/5CdlEFepD9c?feature=shared", downloadLink: "https://www.mediafire.com/file/pxh53kd6j6ot670/Ty-el.mcpack/file", downloadText: "Download Ty-el's UI Pack" },
    { title: "Optifine", image: "/Addons/1.jpeg", description: "Download the latest Optifine Bedrock addon! Works on all versions (1.21+), includes gameplay tweaks and content.", downloadLink: "https://www.mediafire.com/file/xccrf2gasi0nuua/Optifine-Plus-Plus-Client-MCPE-1.20.mcpack.zip/file", downloadText: "Download Now" },
    { title: "Custom Addon Pack", image: customAddonPack, description: "Exclusive custom addon pack handcrafted by Nextup Studio! A unique collection of the best features and enhancements.", downloadLink: "https://www.mediafire.com/file/j9n4hsitabze51j/My+addons.mcaddon/file", downloadText: "Download Custom Pack" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Minecraft Bedrock Addons & Mods | Nextup Studio</title>
        <meta name="description" content="Download premium Minecraft Bedrock addons including Java Combat mechanics, 3D texture packs, dynamic lighting, and more." />
      </Helmet>
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
              <span className="text-glow">Combat & Actions Addons</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enhance your Minecraft Bedrock experience with powerful addons and modifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {addons.map((addon, index) => (
              <div key={index} className="card-gaming glass-shine p-5 hover:scale-[1.02] transition-all duration-400">
                <div className="aspect-video mb-4 rounded-xl overflow-hidden">
                  <img src={addon.image} alt={`${addon.title} Preview`} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-base font-bold text-primary mb-2">{addon.title}</h3>
                <p className="text-muted-foreground mb-4 text-xs leading-relaxed">
                  {addon.description}
                  {addon.videoLink && (
                    <> <a href={addon.videoLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View Showcase</a></>
                  )}
                </p>
                <Button asChild className="btn-gaming w-full text-xs">
                  <a href={addon.downloadLink} target="_blank" rel="noopener noreferrer" download>{addon.downloadText}</a>
                </Button>
              </div>
            ))}
          </div>

          <section className="card-gaming p-6">
            <h2 className="text-lg font-bold text-primary mb-3">How to Install Minecraft Addons</h2>
            <p className="text-muted-foreground text-sm">
              Download the <code className="bg-muted px-1.5 py-0.5 rounded text-primary text-xs">.mcaddon</code> files above, then open them on your device.
              <strong className="text-foreground"> Minecraft Bedrock will auto-import</strong> these addons under Behavior & Resource Packs.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddonsPage;
