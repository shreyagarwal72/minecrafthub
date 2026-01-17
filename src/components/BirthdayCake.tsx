import { useState, useEffect } from "react";
import { X, Cake, PartyPopper, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const BirthdayCake = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkBirthday = () => {
      const today = new Date();
      const month = today.getMonth(); // 0-indexed (August = 7)
      const day = today.getDate();
      
      // Check if it's August 19th
      if (month === 7 && day === 19) {
        // Check if already dismissed today
        const dismissedDate = localStorage.getItem("birthdayDismissed");
        const todayStr = `${today.getFullYear()}-${month}-${day}`;
        
        if (dismissedDate !== todayStr) {
          setIsVisible(true);
        }
      }
    };

    checkBirthday();
  }, []);

  const handleDismiss = () => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    localStorage.setItem("birthdayDismissed", todayStr);
    setDismissed(true);
    setTimeout(() => setIsVisible(false), 500);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${dismissed ? 'opacity-0' : 'opacity-100'}`}>
      {/* Confetti Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da', '#fcbad3'][Math.floor(Math.random() * 7)],
            }}
          />
        ))}
      </div>

      {/* Birthday Card */}
      <div className={`relative bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-1 rounded-3xl shadow-2xl transform transition-all duration-700 ${dismissed ? 'scale-75' : 'scale-100 animate-bounce-slow'}`}>
        <div className="bg-gaming-bg rounded-3xl p-8 md:p-12 max-w-lg mx-4 relative overflow-hidden">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-gaming-text-muted hover:text-gaming-text z-10"
            onClick={handleDismiss}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Decorative Icons */}
          <div className="absolute top-4 left-4 animate-pulse">
            <PartyPopper className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="absolute bottom-4 right-4 animate-pulse" style={{ animationDelay: '0.5s' }}>
            <Gift className="w-8 h-8 text-pink-400" />
          </div>
          <div className="absolute top-1/2 left-4 animate-pulse" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>

          {/* Cake Animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Candle Flames */}
              <div className="flex justify-center gap-4 mb-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flame-container">
                    <div className="flame animate-flicker" style={{ animationDelay: `${i * 0.2}s` }} />
                  </div>
                ))}
              </div>
              {/* Cake Icon */}
              <Cake className="w-24 h-24 text-pink-400 animate-pulse" />
            </div>
          </div>

          {/* Birthday Message */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
              🎉 Happy Birthday! 🎉
            </h2>
            <p className="text-xl text-gaming-text">
              Dear <span className="font-bold text-primary">Vanshu Agarwal</span>
            </p>
            <p className="text-gaming-text-muted">
              Wishing you an amazing birthday filled with joy, success, and countless blessings! 🎂✨
            </p>
            <p className="text-sm text-gaming-text-muted italic">
              August 19th • Your Special Day
            </p>
          </div>

          {/* Celebrate Button */}
          <div className="mt-8 text-center">
            <Button 
              onClick={handleDismiss}
              className="btn-gaming px-8 py-3 text-lg"
            >
              🎊 Thank You! 🎊
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes flicker {
          0%, 100% { transform: scale(1) translateY(0); opacity: 1; }
          25% { transform: scale(1.1) translateY(-2px); opacity: 0.9; }
          50% { transform: scale(0.9) translateY(1px); opacity: 1; }
          75% { transform: scale(1.05) translateY(-1px); opacity: 0.95; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall 4s linear infinite;
        }

        .flame-container {
          width: 8px;
          height: 20px;
          display: flex;
          justify-content: center;
        }

        .flame {
          width: 8px;
          height: 16px;
          background: linear-gradient(to top, #ff6b35, #ffd700, #fff);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          animation: flicker 0.3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-flicker {
          animation: flicker 0.3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BirthdayCake;
