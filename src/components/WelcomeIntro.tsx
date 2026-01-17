import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface WelcomeIntroProps {
  isOpen: boolean;
  onClose: () => void;
  isManualOpen?: boolean;
}

const slides = [
  {
    title: "Welcome to Nextup Studio",
    description: "Your ultimate destination for Minecraft Bedrock content. We provide high-quality worlds, addons, shaders, and more.",
    image: "/images/1.gif",
    color: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    title: "Premium Minecraft Worlds",
    description: "Access exclusive worlds including Techno Gamerz World, custom survival maps, and stunning creative builds.",
    image: "/myworld/1.jpg",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Powerful Addons",
    description: "Enhance your gameplay with combat addons, furniture packs, new mobs, and quality of life improvements.",
    image: "/Addons/1.jpeg",
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Beautiful Shaders",
    description: "Transform your Minecraft visuals with performance-optimized shaders for every device.",
    image: "/images/3.jpeg",
    color: "from-blue-500/20 to-indigo-500/20",
  },
];

const WelcomeIntro = ({ isOpen, onClose, isManualOpen = false }: WelcomeIntroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-gaming-surface border-border">
        {/* 3D Card Container */}
        <div 
          className="relative"
          style={{ perspective: "1000px" }}
        >
          {/* Image Section with 3D effect */}
          <div 
            className={`relative h-48 sm:h-56 overflow-hidden transition-all duration-500 ${isTransitioning ? 'opacity-80' : 'opacity-100'}`}
            style={{
              transform: isTransitioning ? "rotateX(5deg)" : "rotateX(0deg)",
              transformOrigin: "center bottom",
            }}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.color} z-10`} />
            
            {/* Image with 3D parallax effect */}
            <img
              src={currentSlideData.image}
              alt={currentSlideData.title}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{
                transform: `scale(1.1) translateY(${currentSlide * 2}px)`,
              }}
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gaming-surface via-gaming-surface/50 to-transparent z-20" />
            
            {/* Floating 3D elements */}
            <div className="absolute inset-0 z-30 pointer-events-none">
              <div 
                className="absolute top-4 right-4 w-16 h-16 rounded-full bg-primary/20 blur-xl animate-pulse"
                style={{ animationDelay: "0s" }}
              />
              <div 
                className="absolute bottom-8 left-8 w-12 h-12 rounded-full bg-cyan-400/20 blur-xl animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            {/* Slide counter badge */}
            <div className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 pt-6 relative z-40">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => !isTransitioning && setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-primary w-8" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Content with 3D transform */}
          <div 
            className={`px-6 py-6 text-center transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
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
