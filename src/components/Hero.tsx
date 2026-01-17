import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/gaming-hero.jpg";

const Hero = () => {
  const scrollToShowcase = () => {
    const showcase = document.getElementById("showcase");
    if (showcase) {
      showcase.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Gaming Hero Background"
          className="w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gaming-bg/50 via-gaming-bg/70 to-gaming-bg"></div>
        {/* Animated grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Floating Elements - hidden on low-end devices */}
      <div className="hidden md:block absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-full animate-float blur-sm"></div>
      <div className="hidden md:block absolute top-40 right-20 w-8 h-8 bg-primary/30 rounded-full animate-float blur-sm" style={{ animationDelay: "1s" }}></div>
      <div className="hidden md:block absolute bottom-40 left-20 w-12 h-12 bg-primary/25 rounded-full animate-float blur-sm" style={{ animationDelay: "2s" }}></div>
      {/* Additional glow orbs */}
      <div className="hidden lg:block absolute top-1/3 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="hidden lg:block absolute bottom-1/3 left-1/4 w-24 h-24 bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="gaming-title mb-6">
            Welcome to Nextup Studio!
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gaming-text-muted mb-4 max-w-3xl mx-auto leading-relaxed">
            Your hub for Minecraft worlds, Techno Gamerz World downloads, 
            feature-rich Bedrock addons, and stunning shaders.
          </p>
          
          <p className="text-base sm:text-lg text-gaming-text-muted mb-8 max-w-2xl mx-auto">
            Designed for players seeking adventure, survival, and epic new visuals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button 
              onClick={scrollToShowcase}
              data-magnetic
              className="btn-gaming text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 animate-glow-pulse w-full sm:w-auto"
            >
              Get Started
            </Button>
            <Button 
              asChild 
              data-magnetic
              className="btn-gaming-outline text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              <Link to="/addons">
                Discover Addons
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center hover:border-primary transition-colors duration-300">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;