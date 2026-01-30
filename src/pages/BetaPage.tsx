import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, Beaker, RefreshCw, Clock, Loader2, Sparkles, Zap, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BetaVersionInfo {
  version: string;
  downloadLink: string;
  updateDate: string;
  pageUrl: string;
}

const BetaPage = () => {
  const [betaInfo, setBetaInfo] = useState<BetaVersionInfo>({
    version: "1.26.10.20",
    downloadLink: "https://mcpelife.com/minecraft-pe-1-26-10-20/download/1/",
    updateDate: new Date().toISOString(),
    pageUrl: "https://mcpelife.com/minecraft-pe-1-26-10-20/",
  });
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkForUpdates = async () => {
    setIsChecking(true);
    try {
      const { data, error } = await supabase.functions.invoke("version-checker");
      
      if (error) {
        console.error("Version check error:", error);
        return;
      }

      if (data?.beta) {
        setBetaInfo(data.beta);
        setLastChecked(new Date());
        localStorage.setItem("mcBetaInfo", JSON.stringify(data.beta));
        localStorage.setItem("mcBetaLastChecked", new Date().toISOString());
      }
    } catch (error) {
      console.error("Failed to check for updates:", error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Load cached version info
    const cached = localStorage.getItem("mcBetaInfo");
    const lastCheck = localStorage.getItem("mcBetaLastChecked");
    
    if (cached) {
      try {
        setBetaInfo(JSON.parse(cached));
      } catch (e) {
        console.error("Failed to parse cached beta info:", e);
      }
    }
    
    if (lastCheck) {
      setLastChecked(new Date(lastCheck));
    }

    // Auto-check if last check was more than 2 hours ago
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    if (!lastCheck || new Date(lastCheck) < twoHoursAgo) {
      checkForUpdates();
    }
  }, []);

  const formatLastChecked = () => {
    if (!lastChecked) return "Never";
    const diff = Date.now() - lastChecked.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hours ago`;
    return lastChecked.toLocaleDateString();
  };

  const features = [
    {
      icon: Beaker,
      title: "Preview Features",
      description: "Access experimental gameplay mechanics and upcoming content before official release."
    },
    {
      icon: Sparkles,
      title: "New Content First",
      description: "Try new mobs, blocks, biomes, and items before they hit the stable version."
    },
    {
      icon: Zap,
      title: "Performance Tests",
      description: "Experience optimizations and improvements being tested for future updates."
    },
    {
      icon: AlertTriangle,
      title: "Beta Notice",
      description: "This version may contain bugs. Back up your worlds before using beta builds."
    }
  ];

  return (
    <div className="min-h-screen bg-gaming-bg">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20">
          {/* Hero Section with 3D Effect */}
          <section className="text-center mb-16 relative">
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-sm bg-primary/30"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 mb-6">
                <Beaker className="w-4 h-4" />
                <span className="text-sm font-medium">Beta / Preview Build</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gaming-text mb-4">
                <span className="text-glow">Minecraft Beta</span>
              </h1>
              
              <p className="text-3xl font-bold text-primary mb-4 minecraft-text">
                Version {betaInfo.version}
              </p>

              {/* Version Checker */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                <div className="flex items-center gap-2 text-gaming-text-muted text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Last checked: {formatLastChecked()}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={checkForUpdates}
                  disabled={isChecking}
                  className="flex items-center gap-2 border-primary/50 hover:bg-primary/10"
                >
                  {isChecking ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  {isChecking ? "Checking..." : "Check for Updates"}
                </Button>
              </div>
              
              <p className="text-xl text-gaming-text-muted max-w-3xl mx-auto mb-8">
                Get early access to upcoming Minecraft features! The beta version includes 
                experimental content, new mechanics, and preview features before they're released.
              </p>

              {/* Download Button with 3D effect */}
              <div className="relative inline-block group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-primary to-amber-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <Button 
                  asChild 
                  className="relative btn-gaming text-lg px-10 py-6 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 border-amber-500"
                >
                  <a 
                    href={betaInfo.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <Download className="w-6 h-6" />
                    <span>Download Minecraft Beta {betaInfo.version}</span>
                  </a>
                </Button>
              </div>

              <p className="mt-4 text-sm text-gaming-text-muted">
                Source: <a href={betaInfo.pageUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mcpelife.com</a>
              </p>
            </div>
          </section>

          {/* Features Grid with 3D Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card-gaming p-6 hover:scale-[1.02] transition-all duration-300 group minecraft-card"
                style={{
                  transform: `perspective(1000px) rotateY(${index % 2 === 0 ? -2 : 2}deg)`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-primary/20 border border-amber-500/30 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gaming-text mb-2">{feature.title}</h3>
                    <p className="text-gaming-text-muted text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Warning Section */}
          <section className="card-gaming p-8 max-w-3xl mx-auto border-amber-500/30">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-amber-400 mb-3">Beta Version Notice</h3>
                <ul className="space-y-2 text-gaming-text-muted">
                  <li>• Beta versions may contain bugs and unstable features</li>
                  <li>• Always backup your worlds before updating to beta</li>
                  <li>• Beta worlds may not be compatible with stable releases</li>
                  <li>• Some features may change or be removed before final release</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .minecraft-text {
          font-family: 'Segoe UI', system-ui, sans-serif;
          letter-spacing: 0.05em;
          text-shadow: 2px 2px 0 rgba(0,0,0,0.5), 0 0 20px hsl(var(--primary) / 0.5);
        }
        
        .minecraft-card {
          transform-style: preserve-3d;
        }
        
        .minecraft-card:hover {
          transform: perspective(1000px) rotateY(0deg) translateZ(10px) !important;
        }
      `}</style>
    </div>
  );
};

export default BetaPage;
