import { useState, useEffect } from 'react';

const SwordIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gaming-bg z-50 transition-opacity duration-500 opacity-0 pointer-events-none" />
    );
  }

  return (
    <div className="fixed inset-0 bg-gaming-bg z-50 flex items-center justify-center">
      <div className="relative">
        {/* Left Sword */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <div className="sword-left animate-sword-cross-left">
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 120 120" 
              className="text-primary"
            >
              {/* Diamond Sword Left */}
              <g transform="rotate(-45 60 60)">
                {/* Blade */}
                <rect x="56" y="10" width="8" height="70" className="fill-cyan-400" />
                <rect x="54" y="12" width="12" height="4" className="fill-cyan-300" />
                <rect x="54" y="20" width="12" height="4" className="fill-cyan-300" />
                <rect x="54" y="28" width="12" height="4" className="fill-cyan-300" />
                <rect x="54" y="36" width="12" height="4" className="fill-cyan-300" />
                <rect x="54" y="44" width="12" height="4" className="fill-cyan-300" />
                <rect x="54" y="52" width="12" height="4" className="fill-cyan-300" />
                <rect x="54" y="60" width="12" height="4" className="fill-cyan-300" />
                <rect x="54" y="68" width="12" height="4" className="fill-cyan-300" />
                
                {/* Guard */}
                <rect x="50" y="78" width="20" height="6" className="fill-amber-600" />
                
                {/* Handle */}
                <rect x="56" y="84" width="8" height="20" className="fill-amber-800" />
                
                {/* Pommel */}
                <rect x="54" y="104" width="12" height="6" className="fill-amber-600" />
              </g>
            </svg>
          </div>
        </div>

        {/* Right Sword */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <div className="sword-right animate-sword-cross-right">
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 120 120" 
              className="text-primary"
            >
              {/* Diamond Sword Right */}
              <g transform="rotate(45 60 60)">
                {/* Blade */}
                <rect x="56" y="10" width="8" height="70" className="fill-cyan-400" />
                <rect x="54" y="12" width="12" height="4" className="fill-cyan-300" />
                <rect x="54" y="20" width="12" height="4" className="fill-cyan-300" />
                <rect x="54" y="28" width="12" height="4" className="fill-cyan-300" />
                <rect x="54" y="36" width="12" height="4" className="fill-cyan-300" />
                <rect x="54" y="44" width="12" height="4" className="fill-cyan-300" />
                <rect x="54" y="52" width="12" height="4" className="fill-cyan-300" />
                <rect x="54" y="60" width="12" height="4" className="fill-cyan-300" />
                <rect x="54" y="68" width="12" height="4" className="fill-cyan-300" />
                
                {/* Guard */}
                <rect x="50" y="78" width="20" height="6" className="fill-amber-600" />
                
                {/* Handle */}
                <rect x="56" y="84" width="8" height="20" className="fill-amber-800" />
                
                {/* Pommel */}
                <rect x="54" y="104" width="12" height="6" className="fill-amber-600" />
              </g>
            </svg>
          </div>
        </div>

        {/* Center Glow Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-primary/20 rounded-full animate-pulse blur-xl"></div>
        </div>

        {/* Studio Name */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl font-bold text-primary animate-fade-in">
            Nextup Studio
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SwordIntro;