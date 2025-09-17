import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const WorldsPage = () => {
  const worlds = [
    {
      title: "Nextup Studio Minecraft World — Waterfall & Villager Map",
      images: [
        "/myworld/1.jpg",
        "/myworld/2.jpg", 
        "/myworld/3.jpg",
        "/myworld/4.jpg",
        "/myworld/5.jpg"
      ],
      description: "Download my Minecraft Bedrock world with custom biomes, a secret waterfall packed with treasure, and a fully automatic villager breeder system. Expand, explore, and survive in one of the best community maps!",
      downloadLink: "https://www.mediafire.com/file/dekjjccymuq62vz/My+World.mctemplate/file",
      downloadText: "Download My World (.mctemplate)"
    },
    {
      title: "Techno Gamerz Minecraft World Download (.mcworld)",
      images: [
        "/Op/1.jpg",
        "/Op/4.jpg",
        "/Op/2.jpg", 
        "/Op/3.jpg"
      ],
      description: "Get the viral Techno Gamerz World for Minecraft Bedrock (fan edition, direct .mcworld download)! Play in the iconic survival world seen in Techno Gamerz's YouTube series. Epic builds, creative base, and true MC adventure.",
      disclaimer: "Fan download only; all credit and rights to Techno Gamerz (Ujjwal Chaurasia). Support the original creator on YouTube.",
      downloadLink: "https://www.mediafire.com/file/rrw0dz8ki8w8edg/techno-gamerz-world.mcworld/file",
      downloadText: "Download Techno Gamerz World (.mcworld)"
    }
  ];

  const updates = [
    "Techno Gamerz World for Bedrock now ready for instant download!",
    "Hidden Waterfall: Adventure treasure spot improved.",
    "Villager Breeder: Easiest auto-farming and trading system added.",
    "Site speed and gallery improved for all devices and screen sizes."
  ];

  return (
    <div className="min-h-screen bg-gaming-bg">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gaming-text mb-4">
              <span className="text-glow">Survival Adventure Worlds</span>
            </h1>
            <p className="text-xl text-gaming-text-muted max-w-2xl mx-auto">
              Download amazing Minecraft worlds with custom builds, hidden treasures, and epic adventures
            </p>
          </div>

          {worlds.map((world, index) => (
            <section key={index} className="card-gaming p-8 mb-12">
              <h2 className="text-2xl font-bold text-primary mb-6">{world.title}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                {world.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${world.title} Preview ${imgIndex + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
              
              <p className="text-gaming-text-muted mb-4 text-center max-w-3xl mx-auto">
                <strong>{world.description}</strong>
              </p>
              
              {world.disclaimer && (
                <p className="text-sm text-gaming-text-muted italic text-center mb-6">
                  {world.disclaimer}
                </p>
              )}
              
              <div className="text-center">
                <Button asChild className="btn-gaming">
                  <a 
                    href={world.downloadLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {world.downloadText}
                  </a>
                </Button>
              </div>
            </section>
          ))}

          <section className="card-gaming p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Latest Minecraft World Updates</h2>
            <ul className="space-y-3">
              {updates.map((update, index) => (
                <li key={index} className="text-gaming-text-muted flex items-start">
                  <span className="text-primary mr-2">•</span>
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