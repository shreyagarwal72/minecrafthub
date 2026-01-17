import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gamepad2, Download, Sparkles, Layers, ChevronRight } from "lucide-react";

interface WelcomeIntroProps {
  isOpen: boolean;
  onClose: () => void;
  isManualOpen?: boolean;
}

const WelcomeIntro = ({ isOpen, onClose, isManualOpen = false }: WelcomeIntroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Gamepad2,
      title: "Welcome to Nextup Studio",
      description: "Your ultimate destination for Minecraft Bedrock content. We provide high-quality worlds, addons, shaders, and more.",
      color: "text-primary",
    },
    {
      icon: Download,
      title: "Premium Downloads",
      description: "Access exclusive Minecraft worlds including Techno Gamerz World, custom addons, and stunning shader packs.",
      color: "text-emerald-400",
    },
    {
      icon: Sparkles,
      title: "Quality Content",
      description: "All our content is tested, optimized, and regularly updated to ensure the best gaming experience.",
      color: "text-cyan-400",
    },
    {
      icon: Layers,
      title: "Easy to Use",
      description: "Simple one-click downloads with detailed installation guides. Compatible with all Minecraft Bedrock platforms.",
      color: "text-amber-400",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
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

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleComplete()}>
      <DialogContent className="sm:max-w-md bg-gaming-surface border-border p-0 overflow-hidden">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 pt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-primary w-6" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-6 py-8 text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className={`p-4 rounded-2xl bg-primary/10 ${slides[currentSlide].color}`}>
              <CurrentIcon className="w-12 h-12" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-foreground mb-3">
            {slides[currentSlide].title}
          </h2>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip
          </Button>

          <Button
            onClick={handleNext}
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
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeIntro;
