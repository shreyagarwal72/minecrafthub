import { Button } from "@/components/ui/button";
import heroImage from "@/assets/gaming-hero.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Gaming Hero Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gaming-bg/50 via-gaming-bg/70 to-gaming-bg"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-8 h-8 bg-primary/30 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/25 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="gaming-title mb-6">
            Welcome to Nextup Studio!
          </h1>
          
          <p className="text-xl md:text-2xl text-gaming-text-muted mb-4 max-w-3xl mx-auto leading-relaxed">
            Your hub for Minecraft worlds, Techno Gamerz World downloads, 
            feature-rich Bedrock addons, and stunning shaders.
          </p>
          
          <p className="text-lg text-gaming-text-muted mb-8 max-w-2xl mx-auto">
            Designed for players seeking adventure, survival, and epic new visuals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button 
              className="btn-gaming text-lg px-8 py-4 animate-glow-pulse"
              onClick={() => document.getElementById('worlds')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore My World
            </Button>
            <Button 
              className="btn-gaming-outline text-lg px-8 py-4"
              onClick={() => document.getElementById('addons')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Discover Addons
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;