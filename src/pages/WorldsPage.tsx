import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const WorldsPage = () => {
  const worlds = [
    {
      title: "Nextup Studio Minecraft World — Waterfall & Villager Map",
      images: ["/myworld/1.jpg", "/myworld/2.jpg", "/myworld/3.jpg", "/myworld/4.jpg", "/myworld/5.jpg"],
      description: "Download my Minecraft Bedrock world with custom biomes, a secret waterfall packed with treasure, and a fully automatic villager breeder system.",
      downloadLink: "https://drive.google.com/file/d/1CWLSfJrlJPjxc75ISYdlI-XGiHkW9-ot/view?usp=drivesdk",
      downloadText: "Download My World (.mctemplate)"
    },
    {
      title: "Techno Gamerz Minecraft World Download (.mcworld)",
      images: ["/Op/1.jpg", "/Op/4.jpg", "/Op/2.jpg", "/Op/3.jpg"],
      description: "Get the viral Techno Gamerz World for Minecraft Bedrock! Play in the iconic survival world seen in Techno Gamerz's YouTube series.",
      disclaimer: "Fan download only; all credit and rights to Techno Gamerz (Ujjwal Chaurasia).",
      downloadLink: "https://www.mediafire.com/file/rrw0dz8ki8w8edg/techno-gamerz-world.mcworld/file",
      downloadText: "Download Techno Gamerz World (.mcworld)"
    }
  ];

  const updates = [
    "Techno Gamerz World for Bedrock now ready for instant download!",
    "Hidden Waterfall: Adventure treasure spot improved.",
    "Villager Breeder: Easiest auto-farming and trading system added.",
    "Site speed and gallery improved for all devices."
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
              <span className="text-glow">Survival Adventure Worlds</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Download amazing Minecraft worlds with custom builds, hidden treasures, and epic adventures
            </p>
          </div>

          {worlds.map((world, index) => (
            <section key={index} className="card-gaming p-6 mb-8">
              <h2 className="text-xl font-bold text-primary mb-5">{world.title}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
                {world.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="aspect-video rounded-xl overflow-hidden">
                    <img src={image} alt={`${world.title} Preview ${imgIndex + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-400" />
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mb-3 text-center max-w-3xl mx-auto text-sm"><strong>{world.description}</strong></p>
              {world.disclaimer && <p className="text-xs text-muted-foreground italic text-center mb-5">{world.disclaimer}</p>}
              <div className="text-center">
                <Button asChild className="btn-gaming">
                  <a href={world.downloadLink} target="_blank" rel="noopener noreferrer">{world.downloadText}</a>
                </Button>
              </div>
            </section>
          ))}

          <section className="card-gaming p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Latest Minecraft World Updates</h2>
            <ul className="space-y-2">
              {updates.map((update, index) => (
                <li key={index} className="text-muted-foreground text-sm flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span dangerouslySetInnerHTML={{ __html: update }} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WorldsPage;
