import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/gaming-hero.jpg";

const Hero = () => {
  const scrollToShowcase = () => {
    const showcase = document.getElementById("showcase");
    if (showcase) showcase.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Gaming Hero Background" className="w-full h-full object-cover opacity-20" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/75 to-background" />
        {/* Glass grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Ambient glow orbs */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[120px]" />
      <div className="hidden md:block absolute bottom-1/3 right-1/4 w-48 h-48 bg-primary/8 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="hidden lg:block absolute top-1/2 right-1/3 w-32 h-32 bg-primary/6 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '3s', animationDuration: '8s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="gaming-title mb-6">Welcome to Nextup Studio!</h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            Your hub for Minecraft worlds, Techno Gamerz World downloads,
            feature-rich Bedrock addons, and stunning shaders.
          </p>

          <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
            Designed for players seeking adventure, survival, and epic new visuals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button
              onClick={scrollToShowcase}
              data-magnetic
              className="btn-gaming text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 animate-glow-pulse w-full sm:w-auto"
            >
              Get Started
            </Button>
            <Button
              asChild
              data-magnetic
              className="btn-gaming-outline text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              <Link to="/addons">Discover Addons</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center hover:border-primary/50 transition-colors">
          <div className="w-1 h-3 bg-primary/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
