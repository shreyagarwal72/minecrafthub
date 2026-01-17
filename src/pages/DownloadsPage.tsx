import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, Music, VolumeX, CheckCircle, Shield, Zap, Users, Smartphone, RefreshCw, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import minecraftMainPreview from "@/assets/minecraft-main-preview-updated.jpg";

interface VersionInfo {
  version: string;
  musicLink: string;
  noMusicLink: string;
  updateDate: string;
}

const DownloadsPage = () => {
  const [versionInfo, setVersionInfo] = useState<VersionInfo>({
    version: "1.21.132",
    musicLink: "https://mcpe-planet.com/wp-content/uploads/version/minecraft-1-21-132-music.apk",
    noMusicLink: "https://mcpe-planet.com/wp-content/uploads/version/minecraft-1-21-132.apk",
    updateDate: new Date().toISOString(),
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

      if (data) {
        setVersionInfo(data);
        setLastChecked(new Date());
        localStorage.setItem("mcVersionInfo", JSON.stringify(data));
        localStorage.setItem("mcVersionLastChecked", new Date().toISOString());
      }
    } catch (error) {
      console.error("Failed to check for updates:", error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Load cached version info
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

    // Auto-check if last check was more than 6 hours ago
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
    if (!lastCheck || new Date(lastCheck) < sixHoursAgo) {
      checkForUpdates();
    }
  }, []);

  const mainVersions = [
    {
      title: "Minecraft Music Version",
      description: "Complete Minecraft experience with all original soundtracks and music. Full-featured version for the best gaming experience.",
      downloadLink: versionInfo.musicLink,
      icon: Music,
      primary: true
    },
    {
      title: "Minecraft No Music Version", 
      description: "Lightweight version without music files. Perfect for devices with limited storage space while maintaining full gameplay.",
      downloadLink: versionInfo.noMusicLink,
      icon: VolumeX,
      primary: false
    }
  ];

  const features = [
    {
      icon: Music,
      title: "Music & No Music",
      description: "Both versions for what suits your storage and play style."
    },
    {
      icon: Smartphone,
      title: "Works Everywhere", 
      description: "Android, Windows 10/11, MCPE, emulators, tablets all supported."
    },
    {
      icon: Zap,
      title: "Direct Fast Link",
      description: "No ads, no fake redirects, instant and safe verified download."
    },
    {
      icon: CheckCircle,
      title: `${versionInfo.version} Patch`,
      description: "Latest features, multiplayer, crossplay, bugfixes—official build."
    },
    {
      icon: Shield,
      title: "Trusted by Players",
      description: "Only by Nextup Studio, always tested and real MC files."
    },
    {
      icon: Users,
      title: "Community Approved",
      description: "Downloaded by thousands of players worldwide with positive feedback."
    }
  ];

  const tips = [
    "For No Music, app size is MUCH smaller and loads faster for low-storage phones.",
    "Always back up your Minecraft worlds before upgrading or reinstalling.",
    "Both versions are fully compatible with multiplayer and Realms.",
    "No root or special permissions required for installation."
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
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gaming-text mb-4">
              <span className="text-glow">Minecraft Original Full Version</span>
            </h1>
            <p className="text-2xl font-bold text-primary mb-4">
              Minecraft Version {versionInfo.version}
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
                className="flex items-center gap-2"
              >
                {isChecking ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                {isChecking ? "Checking..." : "Check for Updates"}
              </Button>
            </div>
            
            {/* Preview Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src={minecraftMainPreview} 
                  alt="Minecraft Bedrock Main Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src={minecraftMainPreview} 
                  alt="Minecraft Bedrock Extra Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <p className="text-xl text-gaming-text-muted max-w-3xl mx-auto mb-8">
              <strong>Download the latest, safest, and fastest Minecraft Bedrock {versionInfo.version}:</strong><br />
              Choose with music or a super-light No Music edition, both clean and tested.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {mainVersions.map((version, index) => (
                <Button 
                  key={index}
                  asChild 
                  data-magnetic
                  className={version.primary ? "btn-gaming text-lg px-8 py-4" : "btn-gaming-outline text-lg px-8 py-4"}
                >
                  <a 
                    href={version.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex items-center"
                  >
                    <version.icon className="w-5 h-5 mr-2" />
                    {version.title}
                  </a>
                </Button>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="card-gaming p-8 mb-12">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              Why Download from Nextup Studio?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="feature-card flex items-start space-x-4 p-4 rounded-xl bg-gaming-elevated/50 hover:bg-gaming-elevated border border-transparent hover:border-primary/20"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
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

          {/* Setup & Tips Section */}
          <section className="card-gaming p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Setup & Tips</h2>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="text-gaming-text-muted flex items-start">
                  <span className="text-primary mr-3 mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-gaming-text">
                <strong className="text-primary">Need help or tutorial?</strong> Contact Nextup Studio support anytime for assistance with installation or gameplay.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DownloadsPage;