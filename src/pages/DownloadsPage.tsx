import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const DownloadsPage = () => {
  const versions = [
    {
      title: "Normal Version",
      image: "/patched/1.jpg",
      description: "Pure, original Minecraft 1.21.101 experience. No modifications. Maximum compatibility and stability for all players.",
      downloadLink: "https://dl2.cdn9mc.com/index.php?act=download&id=1755232472&hash=68b5ae8601e6d",
      downloadText: "Download Normal"
    },
    {
      title: "Night Vision Version",
      image: "/patched/2.jpg", 
      description: "Always see clearly even in the darkest caves and night! Permanent Night Vision makes survival easier and exploration more fun.",
      downloadLink: "https://download2.cdn9mc.com/index.php?act=download&id=1756570028&hash=68b5aee0eec00",
      downloadText: "Download Night Vision"
    },
    {
      title: "4D Skin Layer Version",
      image: "/patched/3.jpg",
      description: "Play with fully supported 4D/extra-layer skins! Stand out with custom character models just like in advanced Java mods.",
      downloadLink: "https://files4.cdn9mc.com/index.php?act=download&id=1755232442&hash=68b5af01181d8",
      downloadText: "Download 4D Skin Layer"
    },
    {
      title: "Vibrant Visuals Extended",
      image: "/patched/4.jpg",
      description: "Enhanced saturated colors, custom sky, and dynamic lighting for the most visually immersive Minecraft 1.21.101 experience.",
      downloadLink: "https://files4.cdn9mc.com/index.php?act=download&id=1755863842&hash=68b5af1f6feba",
      downloadText: "Download Vibrant Visuals"
    }
  ];

  return (
    <div className="min-h-screen bg-gaming-bg">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gaming-text mb-4">
              <span className="text-glow">Minecraft Downloads</span>
            </h1>
            <p className="text-xl text-gaming-text-muted max-w-2xl mx-auto">
              Download the latest Minecraft 1.21.101 patches by Nextup Studio. Each version offers a unique twist—see visuals below and pick your favorite!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {versions.map((version, index) => (
              <div 
                key={index}
                className="card-gaming p-6 hover:transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={version.image} 
                    alt={`${version.title} Preview`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-3">{version.title}</h3>
                
                <p className="text-gaming-text-muted mb-6 leading-relaxed">
                  {version.description}
                </p>
                
                <Button asChild className="btn-gaming w-full">
                  <a 
                    href={version.downloadLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {version.downloadText}
                  </a>
                </Button>
              </div>
            ))}
          </div>

          <div className="card-gaming p-8 bg-amber-900/20 border-l-4 border-amber-500">
            <h2 className="text-xl font-bold text-amber-400 mb-4">Important Notes</h2>
            <div className="space-y-2 text-gaming-text-muted">
              <p>
                <strong className="text-amber-300">1.</strong> Night Vision and 4D Skin Layer versions do <strong>NOT</strong> include Minecraft original music.
              </p>
              <p>
                <strong className="text-amber-300">2.</strong> I am <strong>not</strong> the real owner or manufacturer of these files.
              </p>
              <p className="text-sm">
                All rights belong to their respective owners and Mojang/Microsoft.<br />
                Use for personal educational/testing purposes only.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DownloadsPage;