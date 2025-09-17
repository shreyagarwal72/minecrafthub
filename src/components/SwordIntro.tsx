import { useState, useEffect } from 'react';

const SwordIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 2000); // Changed from 3000 to 2000

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
              {/* Diamond Sword Left - Improved texture matching uploaded image */}
              <g transform="rotate(-45 60 60)">
                {/* Blade - Teal/Cyan colors like diamond sword */}
                <rect x="58" y="10" width="4" height="68" className="fill-teal-400" />
                <rect x="56" y="12" width="8" height="4" className="fill-teal-300" />
                <rect x="54" y="16" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="18" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="22" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="24" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="28" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="30" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="34" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="36" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="40" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="42" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="46" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="48" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="52" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="54" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="58" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="60" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="64" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="66" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="70" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="72" width="8" height="6" className="fill-teal-400" />
                
                {/* Guard - Dark teal */}
                <rect x="50" y="78" width="20" height="4" className="fill-teal-700" />
                <rect x="52" y="82" width="16" height="2" className="fill-teal-600" />
                
                {/* Handle - Brown colors */}
                <rect x="58" y="84" width="4" height="16" className="fill-amber-800" />
                <rect x="56" y="86" width="8" height="2" className="fill-amber-700" />
                <rect x="56" y="90" width="8" height="2" className="fill-amber-700" />
                <rect x="56" y="94" width="8" height="2" className="fill-amber-700" />
                
                {/* Pommel - Dark brown */}
                <rect x="54" y="100" width="12" height="4" className="fill-amber-900" />
                <rect x="56" y="104" width="8" height="2" className="fill-amber-800" />
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
              {/* Diamond Sword Right - Improved texture matching uploaded image */}
              <g transform="rotate(45 60 60)">
                {/* Blade - Teal/Cyan colors like diamond sword */}
                <rect x="58" y="10" width="4" height="68" className="fill-teal-400" />
                <rect x="56" y="12" width="8" height="4" className="fill-teal-300" />
                <rect x="54" y="16" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="18" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="22" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="24" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="28" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="30" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="34" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="36" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="40" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="42" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="46" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="48" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="52" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="54" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="58" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="60" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="64" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="66" width="8" height="4" className="fill-teal-400" />
                <rect x="54" y="70" width="12" height="2" className="fill-cyan-300" />
                <rect x="56" y="72" width="8" height="6" className="fill-teal-400" />
                
                {/* Guard - Dark teal */}
                <rect x="50" y="78" width="20" height="4" className="fill-teal-700" />
                <rect x="52" y="82" width="16" height="2" className="fill-teal-600" />
                
                {/* Handle - Brown colors */}
                <rect x="58" y="84" width="4" height="16" className="fill-amber-800" />
                <rect x="56" y="86" width="8" height="2" className="fill-amber-700" />
                <rect x="56" y="90" width="8" height="2" className="fill-amber-700" />
                <rect x="56" y="94" width="8" height="2" className="fill-amber-700" />
                
                {/* Pommel - Dark brown */}
                <rect x="54" y="100" width="12" height="4" className="fill-amber-900" />
                <rect x="56" y="104" width="8" height="2" className="fill-amber-800" />
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