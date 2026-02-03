import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, Music, VolumeX, CheckCircle, Shield, Zap, Users, Smartphone, RefreshCw, Clock, Loader2, Pickaxe, Gem, Box, Sparkles, Bell, ChevronRight, Calendar, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import minecraftMainPreview from "@/assets/minecraft-main-preview-updated.jpg";

interface ChangelogItem {
  title: string;
  items: string[];
}

interface VersionInfo {
  version: string;
  musicLink: string;
  noMusicLink: string;
  updateDate: string;
  pageUrl: string;
  changelog: ChangelogItem[];
}

interface DownloadState {
  isDownloading: boolean;
  progress: number;
  fileName: string;
}

const DownloadsPage = () => {
  const { toast } = useToast();
  const [versionInfo, setVersionInfo] = useState<VersionInfo>({
    version: "1.21.132",
    musicLink: "https://mcpelife.com/minecraft-pe-1-21-132/download/1/",
    noMusicLink: "https://mcpelife.com/minecraft-pe-1-21-132/download/2/",
    updateDate: new Date().toISOString(),
    pageUrl: "https://mcpelife.com/minecraft-pe-1-21-132/",
    changelog: [
      { title: "New Features", items: ["New blocks and items", "Performance improvements", "Bug fixes"] },
      { title: "Technical Updates", items: ["Improved rendering", "Better chunk loading"] }
    ]
  });
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [hasNewVersion, setHasNewVersion] = useState(false);
  const [lastSeenVersion, setLastSeenVersion] = useState<string | null>(null);
  const [downloadStates, setDownloadStates] = useState<Record<string, DownloadState>>({});

  const checkForUpdates = async (showNotification = false) => {
    setIsChecking(true);
    try {
      const { data, error } = await supabase.functions.invoke("version-checker");
      
      if (error) {
        console.error("Version check error:", error);
        toast({
          title: "Update check failed",
          description: "Could not fetch latest version info",
          variant: "destructive",
        });
        return;
      }

      if (data?.release) {
        const newVersion = data.release.version;
        const previousSeenVersion = localStorage.getItem("mcLastSeenVersion");
        
        // Check if this is a new version
        if (previousSeenVersion && previousSeenVersion !== newVersion) {
          setHasNewVersion(true);
          toast({
            title: "New version available!",
            description: `Minecraft ${newVersion} is now available`,
          });
          
          // Send push notification if enabled
          if (showNotification && Notification.permission === "granted") {
            new Notification("🎮 Minecraft Update Available!", {
              body: `Version ${newVersion} is now available for download!`,
              icon: "/favicon.png",
              tag: "minecraft-update",
            });
          }
        }
        
        setVersionInfo(data.release);
        setLastChecked(new Date());
        localStorage.setItem("mcVersionInfo", JSON.stringify(data.release));
        localStorage.setItem("mcVersionLastChecked", new Date().toISOString());
        
        console.log("Version info updated:", data.release.version, "Changelog sections:", data.release.changelog?.length);
      }
    } catch (error) {
      console.error("Failed to check for updates:", error);
    } finally {
      setIsChecking(false);
    }
  };

  const markVersionAsSeen = useCallback(() => {
    localStorage.setItem("mcLastSeenVersion", versionInfo.version);
    setLastSeenVersion(versionInfo.version);
    setHasNewVersion(false);
  }, [versionInfo.version]);

  const handleDownload = useCallback((downloadLink: string, fileName: string) => {
    // Simulate download progress for UX (actual download happens via browser)
    setDownloadStates(prev => ({
      ...prev,
      [fileName]: { isDownloading: true, progress: 0, fileName }
    }));

    // Simulate progress animation
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Open download link
        window.open(downloadLink, "_blank");
        
        // Mark version as seen when user downloads
        markVersionAsSeen();
        
        // Reset after delay
        setTimeout(() => {
          setDownloadStates(prev => ({
            ...prev,
            [fileName]: { isDownloading: false, progress: 0, fileName }
          }));
        }, 1500);
      }
      
      setDownloadStates(prev => ({
        ...prev,
        [fileName]: { ...prev[fileName], progress }
      }));
    }, 150);
  }, [markVersionAsSeen]);

  // Request push notification permission
  const requestNotificationPermission = useCallback(async () => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return false;
    }
    
    if (Notification.permission === "granted") {
      return true;
    }
    
    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    
    return false;
  }, []);

  // Send push notification for new version
  const sendVersionNotification = useCallback((newVersion: string) => {
    if (Notification.permission === "granted") {
      const notification = new Notification("🎮 Minecraft Update Available!", {
        body: `Version ${newVersion} is now available for download!`,
        icon: "/favicon.png",
        badge: "/favicon.png",
        tag: "minecraft-update",
        requireInteraction: true,
      });
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  }, []);

  useEffect(() => {
    const cached = localStorage.getItem("mcVersionInfo");
    const lastCheck = localStorage.getItem("mcVersionLastChecked");
    const previousSeenVersion = localStorage.getItem("mcLastSeenVersion");
    
    if (previousSeenVersion) {
      setLastSeenVersion(previousSeenVersion);
    }
    
    if (cached) {
      try {
        const parsedVersion = JSON.parse(cached);
        
        // Validate changelog exists and has proper structure
        if (parsedVersion.changelog && Array.isArray(parsedVersion.changelog) && parsedVersion.changelog.length > 0) {
          setVersionInfo(parsedVersion);
        } else {
          // Invalid cache, fetch fresh data
          console.log("Invalid changelog cache, fetching fresh data...");
          localStorage.removeItem("mcVersionInfo");
          checkForUpdates();
          return;
        }
        
        // Check if current cached version is different from last seen
        if (previousSeenVersion && previousSeenVersion !== parsedVersion.version) {
          setHasNewVersion(true);
        }
      } catch (e) {
        console.error("Failed to parse cached version:", e);
        localStorage.removeItem("mcVersionInfo");
        checkForUpdates();
        return;
      }
    }
    
    if (lastCheck) {
      setLastChecked(new Date(lastCheck));
    }

    // Always fetch on first load to ensure fresh changelog data
    const oneHourAgo = new Date(Date.now() - 1 * 60 * 60 * 1000);
    if (!lastCheck || new Date(lastCheck) < oneHourAgo || !cached) {
      checkForUpdates();
    }
    
    // Request notification permission on mount
    requestNotificationPermission();
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

  // Major Minecraft versions from 1.18 to latest
  const majorVersions = [
    {
      version: "1.21",
      codename: "Tricky Trials",
      releaseDate: "June 2024",
      description: "Adds Trial Chambers, the Breeze mob, new copper and tuff blocks, mace weapon, and ominous events.",
      highlights: ["Trial Chambers", "Breeze Mob", "Mace Weapon", "Ominous Trials"],
      downloadLink: "https://mcpelife.com/minecraft-pe-1-21-132/download/1/",
      color: "from-emerald-500 to-teal-600"
    },
    {
      version: "1.20",
      codename: "Trails & Tales",
      releaseDate: "June 2023",
      description: "Cherry Blossom biomes, archaeology, armor trims, new bamboo and hanging signs, camels, and sniffers.",
      highlights: ["Cherry Blossoms", "Archaeology", "Armor Trims", "Camels"],
      downloadLink: "https://mcpelife.com/minecraft-pe-1-20-81/download/1/",
      color: "from-pink-500 to-rose-600"
    },
    {
      version: "1.19",
      codename: "The Wild Update",
      releaseDate: "June 2022",
      description: "Deep Dark biome, Ancient Cities, Warden, Mangrove Swamps, Frogs, Allays, and mud blocks.",
      highlights: ["Deep Dark", "Warden", "Mangrove Swamp", "Allays"],
      downloadLink: "https://mcpelife.com/minecraft-pe-1-19-83/download/1/",
      color: "from-cyan-500 to-blue-600"
    },
    {
      version: "1.18",
      codename: "Caves & Cliffs Part 2",
      releaseDate: "November 2021",
      description: "Massive world generation overhaul with new mountain and cave biomes, increased world height and depth.",
      highlights: ["New Caves", "Mountain Biomes", "World Height", "Lush Caves"],
      downloadLink: "https://mcpelife.com/minecraft-pe-1-18-33/download/1/",
      color: "from-amber-500 to-orange-600"
    }
  ];

  const [hoveredVersion, setHoveredVersion] = useState<string | null>(null);

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
              {/* New Version Badge */}
              {hasNewVersion && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-400 mb-4 animate-pulse">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm font-medium">New version available!</span>
                  <button 
                    onClick={markVersionAsSeen}
                    className="text-xs underline hover:no-underline ml-2"
                  >
                    Dismiss
                  </button>
                </div>
              )}
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary mb-6">
                <Box className="w-4 h-4" />
                <span className="text-sm font-medium">Official Release</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gaming-text mb-4 minecraft-title">
                <span className="text-glow">Minecraft Bedrock</span>
                {hasNewVersion && (
                  <span className="relative ml-2">
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-ping" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full" />
                  </span>
                )}
              </h1>
              
              <p className="text-3xl font-bold text-primary mb-4 flex items-center justify-center gap-2">
                Version {versionInfo.version}
                {lastSeenVersion && lastSeenVersion !== versionInfo.version && (
                  <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full">
                    Updated from {lastSeenVersion}
                  </span>
                )}
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
                  onClick={() => checkForUpdates(true)}
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
                {mainVersions.map((version, index) => {
                  const downloadState = downloadStates[version.title];
                  const isDownloading = downloadState?.isDownloading;
                  const progress = downloadState?.progress || 0;
                  
                  return (
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
                      
                      {/* Download Progress Bar */}
                      {isDownloading && (
                        <div className="mb-4 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-primary">Preparing download...</span>
                            <span className="text-gaming-text-muted">{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gaming-text-muted">{version.size}</span>
                        <Button 
                          size="sm"
                          disabled={isDownloading}
                          onClick={() => handleDownload(version.downloadLink, version.title)}
                          className={version.primary ? "btn-gaming" : "btn-gaming-outline"}
                        >
                          {isDownloading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Downloading...
                            </>
                          ) : progress === 100 ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Complete!
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-sm text-gaming-text-muted">
                Source: <a href={versionInfo.pageUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mcpelife.com</a>
              </p>
            </div>
          </section>

          {/* Changelog Section */}
          <section className="card-gaming p-8 mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              What's New in {versionInfo.version}
            </h2>
            
            <Accordion type="single" collapsible className="w-full space-y-3">
              {versionInfo.changelog && versionInfo.changelog.length > 0 ? (
                versionInfo.changelog.map((section, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-primary/20 rounded-xl bg-gaming-elevated/30 hover:bg-gaming-elevated/50 transition-colors data-[state=open]:bg-gaming-elevated [&[data-state=open]]:border-primary/40"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline [&>svg]:text-primary [&>svg]:ml-auto">
                      <div className="flex items-center gap-3 text-left">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
                        <span className="text-gaming-text font-semibold hover:text-primary transition-colors">
                          {section.title}
                        </span>
                        <span className="text-xs text-gaming-text-muted bg-primary/10 px-2 py-1 rounded-full flex-shrink-0">
                          {section.items.length} items
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <ul className="space-y-3 pt-2">
                        {section.items.map((item, itemIndex) => (
                          <li 
                            key={itemIndex}
                            className="flex items-start gap-3 text-gaming-text-muted text-sm animate-in fade-in-0 slide-in-from-top-2"
                            style={{ animationDelay: `${itemIndex * 50}ms` }}
                          >
                            <span className="text-primary mt-0.5 flex-shrink-0">✦</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <div className="text-center py-8 text-gaming-text-muted">
                  <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  <p>Changelog information will appear after checking for updates</p>
                </div>
              )}
            </Accordion>

            <div className="mt-6 pt-4 border-t border-primary/10 flex items-center justify-between">
              <p className="text-xs text-gaming-text-muted">
                Changelog data fetched from mcpelife.com
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => checkForUpdates(false)}
                disabled={isChecking}
                className="text-primary hover:text-primary/80"
              >
                {isChecking ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Refresh
              </Button>
            </div>
          </section>

          {/* Major Versions Archive */}
          <section className="card-gaming p-8 mb-12 overflow-hidden">
            <h2 className="text-2xl font-bold text-primary mb-2 flex items-center gap-3">
              <Package className="w-6 h-6" />
              Minecraft Version Archive
            </h2>
            <p className="text-gaming-text-muted mb-8">
              Download any major Minecraft Bedrock version from 1.18 to the latest release
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {majorVersions.map((version, index) => (
                <div
                  key={version.version}
                  className={`group relative overflow-hidden rounded-2xl border border-primary/20 bg-gaming-elevated/30 transition-all duration-500 hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                  onMouseEnter={() => setHoveredVersion(version.version)}
                  onMouseLeave={() => setHoveredVersion(null)}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${version.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Animated Border Glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${version.color} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10`} />
                  
                  <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`text-3xl font-bold bg-gradient-to-r ${version.color} bg-clip-text text-transparent`}>
                            {version.version}
                          </span>
                          {index === 0 && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full animate-pulse">
                              Latest
                            </span>
                          )}
                        </div>
                        <p className="text-lg font-medium text-gaming-text">{version.codename}</p>
                      </div>
                      <div className="flex items-center gap-2 text-gaming-text-muted text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{version.releaseDate}</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gaming-text-muted text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                      {version.description}
                    </p>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {version.highlights.map((highlight, hIndex) => (
                        <span
                          key={hIndex}
                          className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${version.color} bg-opacity-10 text-gaming-text border border-primary/10 transition-all duration-300 group-hover:border-primary/30`}
                          style={{
                            transitionDelay: `${hIndex * 50}ms`,
                          }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    
                    {/* Download Button */}
                    <Button
                      onClick={() => handleDownload(version.downloadLink, `MC-${version.version}`)}
                      disabled={downloadStates[`MC-${version.version}`]?.isDownloading}
                      className={`w-full bg-gradient-to-r ${version.color} hover:opacity-90 text-white border-0 group/btn transition-all duration-300`}
                    >
                      {downloadStates[`MC-${version.version}`]?.isDownloading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2 transition-transform group-hover/btn:translate-y-0.5" />
                          Download {version.version}
                          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover/btn:opacity-100 transition-all duration-300 transform group-hover/btn:translate-x-1" />
                        </>
                      )}
                    </Button>
                    
                    {/* Progress Bar */}
                    {downloadStates[`MC-${version.version}`]?.isDownloading && (
                      <div className="mt-3">
                        <Progress value={downloadStates[`MC-${version.version}`]?.progress || 0} className="h-1.5" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
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