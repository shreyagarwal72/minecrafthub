import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, Shield, Eye, Sparkles, Gamepad2 } from "lucide-react";

const PatchPage = () => {
  const patches = [
    {
      title: "Normal Version",
      description: "Pure, original Minecraft 1.21.101 experience. No modifications. Maximum compatibility and stability for all players.",
      downloadLink: "https://dl2.cdn9mc.com/index.php?act=dl&id=1755232472",
      icon: Gamepad2,
      image: "/patched/1.jpg"
    },
    {
      title: "Night Vision Version", 
      description: "Always see clearly even in the darkest caves and night! Permanent Night Vision makes survival easier and exploration more fun.",
      downloadLink: "https://download2.cdn9mc.com/index.php?act=dl&id=1756570028",
      icon: Eye,
      image: "/patched/2.jpg"
    },
    {
      title: "4D Skin Layer Version",
      description: "Play with fully supported 4D/extra-layer skins! Stand out with custom character models just like in advanced Java mods.",
      downloadLink: "https://files4.cdn9mc.com/index.php?act=dl&id=1755232442",
      icon: Shield,
      image: "/patched/3.jpg"
    },
    {
      title: "Vibrant Visuals Extended",
      description: "Enhanced saturated colors, custom sky, and dynamic lighting for the most visually immersive Minecraft 1.21.101 experience.",
      downloadLink: "https://files4.cdn9mc.com/index.php?act=dl&id=1755863842",
      icon: Sparkles,
      image: "/patched/4.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gaming-bg">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gaming-text mb-4">
              <span className="text-glow">Minecraft Patched 1.21.101</span>
            </h1>
            <p className="text-xl text-gaming-text-muted max-w-3xl mx-auto mb-8">
              Download the latest Minecraft 1.21.101 patches by Nextup Studio.
              Each version offers a unique twist—see visuals below and pick your favorite!
            </p>
          </section>

          {/* Patches Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {patches.map((patch, index) => (
              <div 
                key={index}
                className="card-gaming p-6 hover:scale-105 transition-all duration-300"
              >
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img 
                    src={patch.image} 
                    alt={`${patch.title} Preview`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-start space-x-4 mb-4">
                  <patch.icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gaming-text mb-2">{patch.title}</h3>
                    <p className="text-gaming-text-muted mb-4">{patch.description}</p>
                  </div>
                </div>
                <Button 
                  asChild 
                  className="btn-gaming w-full"
                >
                  <a 
                    href={patch.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download {patch.title}
                  </a>
                </Button>
              </div>
            ))}
          </section>

          {/* Note Section */}
          <section className="card-gaming p-8 border-l-4 border-warning">
            <div className="bg-warning/10 rounded-lg p-6">
              <h3 className="text-xl font-bold text-warning mb-4">Important Note:</h3>
              <div className="space-y-2 text-gaming-text-muted">
                <p>1. Night Vision and 4D Skin Layer versions do <strong>NOT</strong> include Minecraft original music.</p>
                <p>2. I am <strong>not</strong> the real owner or manufacturer of these files.</p>
                <p>All rights belong to their respective owners and Mojang/Microsoft.</p>
                <p>Use for personal educational/testing purposes only.</p>
              </div>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-gaming-text">
                  <strong className="text-primary">Need support?</strong> Contact us at{" "}
                  <a href="mailto:sanjayvansu1973@gmail.com" className="text-primary hover:underline">
                    sanjayvansu1973@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatchPage;