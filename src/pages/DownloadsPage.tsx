import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, Music, VolumeX, CheckCircle, Shield, Zap, Users, Smartphone, RefreshCw, Clock, Loader2, Pickaxe, Gem, Box } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import minecraftMainPreview from "@/assets/minecraft-main-preview-updated.jpg";

interface VersionInfo {
  version: string;
  musicLink: string;
  noMusicLink: string;
  updateDate: string;
  pageUrl: string;
}

const DownloadsPage = () => {
  const [versionInfo, setVersionInfo] = useState<VersionInfo>({
    version: "1.21.132",
    musicLink: "https://mcpelife.com/minecraft-pe-1-21-132/download/1/",
    noMusicLink: "https://mcpelife.com/minecraft-pe-1-21-132/download/2/",
    updateDate: new Date().toISOString(),
    pageUrl: "https://mcpelife.com/minecraft-pe-1-21-132/",
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

      if (data?.release) {
        setVersionInfo(data.release);
        setLastChecked(new Date());
        localStorage.setItem("mcVersionInfo", JSON.stringify(data.release));
        localStorage.setItem("mcVersionLastChecked", new Date().toISOString());
      }
    } catch (error) {
      console.error("Failed to check for updates:", error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem("mcVersionInfo");
    const lastCheck = localStorage.getItem("mcVersionLastChecked");
    
    if (cached) {
      try {
        setVersionInfo(JSON.parse(cached));
      } catch (e) {
        console.error("Failed to parse cached version:", e);
      }
    }
    
    if (lastCheck) {
      setLastChecked(new Date(lastCheck));
    }

    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
    if (!lastCheck || new Date(lastCheck) < sixHoursAgo) {
      checkForUpdates();
    }
  }, []);

  const mainVersions = [
    {
      title: "With Music",
      subtitle: "Full Experience",
      description: "Complete Minecraft with all original soundtracks",
      downloadLink: versionInfo.musicLink,
      icon: Music,
      primary: true,
      size: "~900MB"
    },
    {
      title: "No Music", 
      subtitle: "Lightweight",
      description: "Perfect for devices with limited storage",
      downloadLink: versionInfo.noMusicLink,
      icon: VolumeX,
      primary: false,
      size: "~200MB"
    }
  ];

  const features = [
    { icon: Pickaxe, title: "Latest Features", description: "Cherry Blossom biome, new mobs, improved lighting" },
    { icon: Smartphone, title: "All Devices", description: "Android, Windows, tablets, emulators supported" },
    { icon: Zap, title: "Direct Download", description: "No ads, no redirects, instant & verified files" },
    { icon: Gem, title: "Multiplayer Ready", description: "Crossplay, Realms, and multiplayer compatible" },
    { icon: Shield, title: "Safe & Tested", description: "Verified by Nextup Studio, always clean APKs" },
    { icon: Users, title: "Community Trusted", description: "Downloaded by thousands of players worldwide" }
  ];

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

  return (
    <div className="min-h-screen bg-gaming-bg">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20">
          {/* Hero Section with 3D Effect */}
          <section className="text-center mb-16 relative">
            {/* Floating Minecraft blocks */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute minecraft-block"
                  style={{
                    left: `${5 + i * 8}%`,
                    top: `${10 + (i % 4) * 20}%`,
                    width: `${8 + (i % 3) * 4}px`,
                    height: `${8 + (i % 3) * 4}px`,
                    background: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? '#8B5A2B' : '#4A4A4A',
                    opacity: 0.3,
                    animation: `blockFloat ${4 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary mb-6">
                <Box className="w-4 h-4" />
                <span className="text-sm font-medium">Official Release</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gaming-text mb-4 minecraft-title">
                <span className="text-glow">Minecraft Bedrock</span>
              </h1>
              
              <p className="text-3xl font-bold text-primary mb-4">
                Version {versionInfo.version}
              </p>

              {/* Version Checker */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
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
              
              {/* Preview Image with 3D Frame */}
              <div className="max-w-2xl mx-auto mb-8 perspective-1000">
                <div className="minecraft-frame rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                  <img 
                    src={minecraftMainPreview} 
                    alt="Minecraft Bedrock Preview"
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Download Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                {mainVersions.map((version, index) => (
                  <div 
                    key={index}
                    className={`card-gaming p-6 hover:scale-[1.03] transition-all duration-300 minecraft-download-card ${
                      version.primary ? 'border-primary/50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl ${version.primary ? 'bg-primary/20' : 'bg-muted/50'}`}>
                        <version.icon className={`w-6 h-6 ${version.primary ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-gaming-text">{version.title}</h3>
                        <p className="text-xs text-gaming-text-muted">{version.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gaming-text-muted mb-4 text-left">{version.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gaming-text-muted">{version.size}</span>
                      <Button 
                        asChild 
                        size="sm"
                        className={version.primary ? "btn-gaming" : "btn-gaming-outline"}
                      >
                        <a 
                          href={version.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gaming-text-muted">
                Source: <a href={versionInfo.pageUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mcpelife.com</a>
              </p>
            </div>
          </section>

          {/* Features Grid */}
          <section className="card-gaming p-8 mb-12">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center flex items-center justify-center gap-3">
              <Pickaxe className="w-6 h-6" />
              Why Download from Nextup Studio?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="feature-card flex items-start space-x-4 p-4 rounded-xl bg-gaming-elevated/50 hover:bg-gaming-elevated border border-transparent hover:border-primary/20"
                >
                  <div className="p-2 rounded-lg bg-primary/10 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gaming-text mb-1">{feature.title}</h3>
                    <p className="text-gaming-text-muted text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tips Section */}
          <section className="card-gaming p-8">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              Setup & Tips
            </h2>
            <ul className="space-y-3">
              <li className="text-gaming-text-muted flex items-start">
                <span className="text-primary mr-3 mt-1">•</span>
                <span>For No Music, app size is MUCH smaller and loads faster for low-storage phones.</span>
              </li>
              <li className="text-gaming-text-muted flex items-start">
                <span className="text-primary mr-3 mt-1">•</span>
                <span>Always back up your Minecraft worlds before upgrading or reinstalling.</span>
              </li>
              <li className="text-gaming-text-muted flex items-start">
                <span className="text-primary mr-3 mt-1">•</span>
                <span>Both versions are fully compatible with multiplayer and Realms.</span>
              </li>
              <li className="text-gaming-text-muted flex items-start">
                <span className="text-primary mr-3 mt-1">•</span>
                <span>No root or special permissions required for installation.</span>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />

      <style>{`
        @keyframes blockFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(45deg); }
        }
        
        .minecraft-block {
          border-radius: 2px;
          box-shadow: inset -2px -2px 0 rgba(0,0,0,0.3), inset 2px 2px 0 rgba(255,255,255,0.1);
        }
        
        .minecraft-title {
          text-shadow: 3px 3px 0 rgba(0,0,0,0.5), 0 0 30px hsl(var(--primary) / 0.5);
        }
        
        .minecraft-frame {
          box-shadow: 
            0 0 0 4px hsl(var(--primary) / 0.3),
            0 0 30px hsl(var(--primary) / 0.2),
            inset 0 0 30px rgba(0,0,0,0.3);
        }
        
        .minecraft-download-card {
          transform-style: preserve-3d;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default DownloadsPage;
