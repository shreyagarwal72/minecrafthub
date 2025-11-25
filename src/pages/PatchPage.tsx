import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, Gamepad2 } from "lucide-react";

const PatchPage = () => {
  const patch = {
    title: "Official Minecraft Patch",
    description: "Official Minecraft 1.21.124 patched version. Pure, original experience with enhanced compatibility and stability for all players.",
    downloadLink: "https://download3.cdn9mc.com/index.php?act=download&id=1763795862&hash=69260fde4b230",
    icon: Gamepad2,
    image: "/patched/official-patch.jpg"
  };

  return (
    <div className="min-h-screen bg-gaming-bg">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gaming-text mb-4">
              <span className="text-glow">Minecraft Patched 1.21.124</span>
            </h1>
            <p className="text-xl text-gaming-text-muted max-w-3xl mx-auto mb-8">
              Download the official Minecraft 1.21.124 patched version by Nextup Studio.
              Pure, stable, and fully compatible with the latest features!
            </p>
          </section>

          {/* Patch Card */}
          <section className="max-w-3xl mx-auto">
            <div className="card-gaming p-8 hover:scale-105 transition-all duration-300">
              <div className="aspect-video rounded-lg overflow-hidden mb-6">
                <img 
                  src={patch.image} 
                  alt={`${patch.title} Preview`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start space-x-4 mb-6">
                <patch.icon className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-gaming-text mb-3">{patch.title}</h3>
                  <p className="text-gaming-text-muted text-lg">{patch.description}</p>
                </div>
              </div>
              <Button 
                asChild 
                className="btn-gaming w-full text-lg py-6"
              >
                <a 
                  href={patch.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download {patch.title}
                </a>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatchPage;