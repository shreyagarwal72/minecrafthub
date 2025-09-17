import ShowcaseCard from "./ShowcaseCard";
import survivalWorldImage from "@/assets/survival-world.jpg";
import combatAddonImage from "@/assets/combat-addon.jpg";
import shadersImage from "@/assets/shaders.jpg";
import minecraftOfficialImage from "@/assets/minecraft-official.jpg";

const Showcase = () => {
  const showcaseItems = [
    {
      id: "worlds",
      title: "Survival Adventure World",
      description: "Explore custom survival with scenic biomes, beautiful builds, hidden loot, and questlines.",
      image: survivalWorldImage,
      buttonText: "More Details",
      onClick: () => console.log("Navigate to worlds")
    },
    {
      id: "addons",
      title: "Combat & Actions Addon",
      description: "Upgrade Minecraft with new combat moves, unique animations, and epic special abilities!",
      image: combatAddonImage,
      buttonText: "Download Addon",
      onClick: () => console.log("Navigate to addons")
    },
    {
      id: "shaders",
      title: "Minecraft Shaders",
      description: "Transform your Minecraft world with stunning new visuals! Experience better lighting, shadows, and beautiful effects.",
      image: shadersImage,
      buttonText: "Get Shaders",
      onClick: () => console.log("Navigate to shaders")
    },
    {
      id: "downloads",
      title: "Minecraft Original Full Version",
      description: "Download the official Minecraft Bedrock 1.21.101 (Android/PC/MCPE). No ads, direct and safe from Nextup Studio.",
      image: minecraftOfficialImage,
      buttonText: "Download Minecraft",
      onClick: () => console.log("Navigate to downloads")
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold text-gaming-text mb-4">
          <span className="text-glow">Showcase</span>
        </h2>
        <p className="text-xl text-gaming-text-muted max-w-2xl mx-auto">
          Discover our collection of amazing Minecraft content, from custom worlds to powerful addons
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {showcaseItems.map((item, index) => (
          <div
            key={item.id}
            className="animate-scale-in"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <ShowcaseCard
              title={item.title}
              description={item.description}
              image={item.image}
              buttonText={item.buttonText}
              onButtonClick={item.onClick}
            />
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { number: "50K+", label: "Downloads" },
          { number: "1000+", label: "Happy Players" },
          { number: "25+", label: "Custom Worlds" }
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="card-gaming text-center animate-fade-in"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
            <div className="text-gaming-text-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Showcase;