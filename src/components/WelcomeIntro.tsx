import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Import AI-generated images
import introWelcome from "@/assets/intro-welcome.jpg";
import introWorlds from "@/assets/intro-worlds.jpg";
import introAddons from "@/assets/intro-addons.jpg";
import introShaders from "@/assets/intro-shaders.jpg";

interface WelcomeIntroProps {
  isOpen: boolean;
  onClose: () => void;
  isManualOpen?: boolean;
}

const slides = [
  {
    title: "Welcome to Nextup Studio",
    description: "Your ultimate destination for Minecraft Bedrock content. We provide high-quality worlds, addons, shaders, and more.",
    image: introWelcome,
    color: "from-emerald-500/30 to-cyan-500/20",
  },
  {
    title: "Premium Minecraft Worlds",
    description: "Access exclusive worlds including Techno Gamerz World, custom survival maps, and stunning creative builds.",
    image: introWorlds,
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Powerful Addons",
    description: "Enhance your gameplay with combat addons, furniture packs, new mobs, and quality of life improvements.",
    image: introAddons,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Beautiful Shaders",
    description: "Transform your Minecraft visuals with performance-optimized shaders for every device.",
    image: introShaders,
    color: "from-blue-500/20 to-indigo-500/20",
  },
];

const WelcomeIntro = ({ isOpen, onClose, isManualOpen = false }: WelcomeIntroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D parallax effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
    
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handlePrev = () => {
    if (isTransitioning || currentSlide === 0) return;
    setIsTransitioning(true);
    setCurrentSlide(currentSlide - 1);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handleComplete = () => {
    if (!isManualOpen) {
      localStorage.setItem("hasSeenIntro", "true");
    }
    setCurrentSlide(0);
    onClose();
  };

  const handleSkip = () => {
    handleComplete();
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  const currentSlideData = slides[currentSlide];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleComplete()}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-gaming-surface border-border shadow-2xl">
        {/* 3D Card Container */}
        <div 
          className="relative"
          style={{ perspective: "1200px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Image Section with 3D effect */}
          <div 
            className="relative h-52 sm:h-64 overflow-hidden transition-all duration-500"
            style={{
              transform: `rotateX(${-mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Background gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.color} z-10 mix-blend-overlay`} />
            
            {/* Image with 3D parallax effect */}
            <img
              src={currentSlideData.image}
              alt={currentSlideData.title}
              className={`w-full h-full object-cover transition-all duration-700 ${isTransitioning ? 'scale-105 blur-sm' : 'scale-100 blur-0'}`}
              style={{
                transform: `translateX(${mousePos.x * 2}px) translateY(${mousePos.y * 2}px) scale(1.1)`,
              }}
            />
            
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-gaming-surface via-gaming-surface/30 to-transparent z-20" />
            
            {/* Animated glow orbs */}
            <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
              <div 
                className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-primary/30 blur-2xl animate-pulse"
                style={{ 
                  transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -3}px)`,
                }}
              />
              <div 
                className="absolute bottom-1/3 left-1/4 w-16 h-16 rounded-full bg-cyan-400/30 blur-2xl animate-pulse"
                style={{ 
                  animationDelay: "0.5s",
                  transform: `translate(${mousePos.x * 3}px, ${mousePos.y * 3}px)`,
                }}
              />
            </div>

            {/* Slide counter badge */}
            <div className="absolute top-4 left-4 z-30 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold border border-white/10">
              {currentSlide + 1} / {slides.length}
            </div>

            {/* 3D floating card effect border */}
            <div 
              className="absolute inset-0 z-30 pointer-events-none border-2 border-primary/20 rounded-t-lg"
              style={{
                boxShadow: `inset 0 0 60px rgba(16, 185, 129, 0.1)`,
              }}
            />
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 pt-6 relative z-40">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => !isTransitioning && setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-primary w-8 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Content with 3D transform */}
          <div 
            className={`px-6 py-6 text-center transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
          >
            {/* Title with gradient */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_8s_ease_infinite]">
              {currentSlideData.title}
            </h2>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto text-sm sm:text-base">
              {currentSlideData.description}
            </p>
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrev}
                disabled={currentSlide === 0 || isTransitioning}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-muted-foreground hover:text-foreground"
              >
                Skip
              </Button>
            </div>

            <Button
              onClick={handleNext}
              disabled={isTransitioning}
              data-magnetic
              className="btn-gaming gap-2"
            >
              {currentSlide < slides.length - 1 ? (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                "Get Started"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeIntro;
