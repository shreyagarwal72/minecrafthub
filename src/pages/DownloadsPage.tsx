import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, Music, VolumeX, CheckCircle, Shield, Zap, Users, Smartphone, RefreshCw, Clock, Loader2, Pickaxe, Gem, Sparkles, Bell, ChevronRight, ChevronDown, Calendar, Package, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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
    version: "1.26.3.1",
    musicLink: "https://mcpelife.com/minecraft-pe-26-3/download/1/",
    noMusicLink: "https://mcpelife.com/minecraft-pe-26-3/download/2/",
    updateDate: new Date().toISOString(),
    pageUrl: "https://mcpelife.com/minecraft-pe-26-3/",
    changelog: [
      { title: "New Features", items: ["New mob spawning mechanics", "Improved bedrock visibility", "Enhanced player animations"] },
      { title: "Technical Updates", items: ["Improved rendering", "Better chunk loading"] }
    ]
  });
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [hasNewVersion, setHasNewVersion] = useState(false);
  const [lastSeenVersion, setLastSeenVersion] = useState<string | null>(null);
  const [downloadStates, setDownloadStates] = useState<Record<string, DownloadState>>({});
  const [openChangelogs, setOpenChangelogs] = useState<Record<number, boolean>>({});
  const [useAlternateLinks, setUseAlternateLinks] = useState(false);

  // Alternate download sources
  const getAlternateLink = (originalLink: string) => {
    // Provide mediafire mirrors as alternates
    if (originalLink.includes("mcpelife.com")) {
      return originalLink.replace("/download/1/", "/download/3/").replace("/download/2/", "/download/4/");
    }
    return originalLink;
  };

  const checkForUpdates = async (showNotification = false) => {
    setIsChecking(true);
    try {
      const { data, error } = await supabase.functions.invoke("version-checker");

      if (error) {
        console.error("Version check error:", error);
        toast({ title: "Update check failed", description: "Could not fetch latest version info", variant: "destructive" });
        return;
      }

      if (data?.release) {
        const newVersion = data.release.version;
        const previousSeenVersion = localStorage.getItem("mcLastSeenVersion");

        if (previousSeenVersion && previousSeenVersion !== newVersion) {
          setHasNewVersion(true);
          toast({ title: "New version available!", description: `Minecraft ${newVersion} is now available` });

          if (showNotification && "Notification" in window && Notification.permission === "granted") {
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
    const link = useAlternateLinks ? getAlternateLink(downloadLink) : downloadLink;
    setDownloadStates(prev => ({ ...prev, [fileName]: { isDownloading: true, progress: 0, fileName } }));

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        window.open(link, "_blank");
        markVersionAsSeen();
        setTimeout(() => {
          setDownloadStates(prev => ({ ...prev, [fileName]: { isDownloading: false, progress: 0, fileName } }));
        }, 1500);
      }
      setDownloadStates(prev => ({ ...prev, [fileName]: { ...prev[fileName], progress } }));
    }, 150);
  }, [markVersionAsSeen, useAlternateLinks]);

  useEffect(() => {
    const cached = localStorage.getItem("mcVersionInfo");
    const lastCheck = localStorage.getItem("mcVersionLastChecked");
    const previousSeenVersion = localStorage.getItem("mcLastSeenVersion");

    if (previousSeenVersion) setLastSeenVersion(previousSeenVersion);

    if (cached) {
      try {
        const parsedVersion = JSON.parse(cached);
        if (parsedVersion.changelog && Array.isArray(parsedVersion.changelog) && parsedVersion.changelog.length > 0) {
          setVersionInfo(parsedVersion);
        } else {
          localStorage.removeItem("mcVersionInfo");
          checkForUpdates();
          return;
        }
        if (previousSeenVersion && previousSeenVersion !== parsedVersion.version) setHasNewVersion(true);
      } catch {
        localStorage.removeItem("mcVersionInfo");
        checkForUpdates();
        return;
      }
    }

    if (lastCheck) setLastChecked(new Date(lastCheck));

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    if (!lastCheck || new Date(lastCheck) < oneHourAgo || !cached) checkForUpdates();

    if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  const toggleChangelog = (index: number) => {
    setOpenChangelogs(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const mainVersions = [
    { title: "With Music", subtitle: "Full Experience", description: "Complete Minecraft with all original soundtracks", downloadLink: versionInfo.musicLink, icon: Music, primary: true, size: "~900MB" },
    { title: "No Music", subtitle: "Lightweight", description: "Perfect for devices with limited storage", downloadLink: versionInfo.noMusicLink, icon: VolumeX, primary: false, size: "~200MB" }
  ];

  const features = [
    { icon: Pickaxe, title: "Latest Features", description: "New mobs, blocks, improved lighting and mechanics" },
    { icon: Smartphone, title: "All Devices", description: "Android, Windows, tablets, emulators supported" },
    { icon: Zap, title: "Direct Download", description: "No ads, no redirects, instant & verified files" },
    { icon: Gem, title: "Multiplayer Ready", description: "Crossplay, Realms, and multiplayer compatible" },
    { icon: Shield, title: "Safe & Tested", description: "Verified by Nextup Studio, always clean APKs" },
    { icon: Users, title: "Community Trusted", description: "Downloaded by thousands of players worldwide" }
  ];

  const majorVersions = [
    { version: "1.26", codename: "Spring Drop", releaseDate: "March 2026", description: "New mob spawning mechanics, improved bedrock visibility, and enhanced player animations.", highlights: ["Mob Cubs", "New Animations", "World Saves", "Bedrock Textures"], downloadLink: "https://mcpelife.com/minecraft-pe-26-3/download/1/", color: "from-primary to-gaming-emeraldBright" },
    { version: "1.21", codename: "Tricky Trials", releaseDate: "June 2024", description: "Adds Trial Chambers, the Breeze mob, new copper and tuff blocks, mace weapon, and ominous events.", highlights: ["Trial Chambers", "Breeze Mob", "Mace Weapon", "Ominous Trials"], downloadLink: "https://mcpelife.com/minecraft-pe-1-21-132/download/1/", color: "from-primary/80 to-accent" },
    { version: "1.20", codename: "Trails & Tales", releaseDate: "June 2023", description: "Cherry Blossom biomes, archaeology, armor trims, new bamboo and hanging signs, camels, and sniffers.", highlights: ["Cherry Blossoms", "Archaeology", "Armor Trims", "Camels"], downloadLink: "https://mcpelife.com/minecraft-pe-1-20-81/download/1/", color: "from-primary/60 to-accent/80" },
    { version: "1.19", codename: "The Wild Update", releaseDate: "June 2022", description: "Deep Dark biome, Ancient Cities, Warden, Mangrove Swamps, Frogs, Allays, and mud blocks.", highlights: ["Deep Dark", "Warden", "Mangrove Swamp", "Allays"], downloadLink: "https://mcpelife.com/minecraft-pe-1-19-83/download/1/", color: "from-primary/50 to-accent/60" },
    { version: "1.18", codename: "Caves & Cliffs Part 2", releaseDate: "November 2021", description: "Massive world generation overhaul with new mountain and cave biomes, increased world height and depth.", highlights: ["New Caves", "Mountain Biomes", "World Height", "Lush Caves"], downloadLink: "https://mcpelife.com/minecraft-pe-1-18-33/download/1/", color: "from-primary/40 to-muted" }
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          {/* Hero */}
          <section className="text-center mb-14 relative">
            <div className="relative z-10">
              {hasNewVersion && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 text-primary mb-4 animate-pulse text-sm" style={{ background: 'hsl(160 84% 39% / 0.08)' }}>
                  <Bell className="w-3.5 h-3.5" />
                  <span className="font-medium">New version available!</span>
                  <button onClick={markVersionAsSeen} className="text-xs underline hover:no-underline ml-1">Dismiss</button>
                </div>
              )}

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 text-primary mb-5 text-xs" style={{ background: 'hsl(160 84% 39% / 0.06)' }}>
                <Sparkles className="w-3.5 h-3.5" />
                <span className="font-medium">Official Release</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
                <span className="text-glow">Minecraft Bedrock</span>
              </h1>

              <p className="text-2xl font-bold text-primary mb-3">
                Version {versionInfo.version}
              </p>

              {/* Version Checker */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Last checked: {formatLastChecked()}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => checkForUpdates(true)} disabled={isChecking} className="flex items-center gap-2 border-primary/30 hover:bg-primary/8 text-xs">
                  {isChecking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                  {isChecking ? "Checking..." : "Check for Updates"}
                </Button>
              </div>

              {/* Toggle: Alternate download source */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                  <input type="checkbox" checked={useAlternateLinks} onChange={(e) => setUseAlternateLinks(e.target.checked)} className="rounded border-border" />
                  <ExternalLink className="w-3 h-3" />
                  Use alternate download source (mirror)
                </label>
              </div>

              {/* Preview Image */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="card-gaming p-1 overflow-hidden">
                  <img src={minecraftMainPreview} alt="Minecraft Bedrock Preview" className="w-full h-auto rounded-xl" />
                </div>
              </div>

              {/* Download Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-6">
                {mainVersions.map((version, index) => {
                  const downloadState = downloadStates[version.title];
                  const isDownloading = downloadState?.isDownloading;
                  const progress = downloadState?.progress || 0;

                  return (
                    <div key={index} className={`card-gaming glass-shine p-5 hover:scale-[1.02] transition-all duration-400 ${version.primary ? 'border-primary/30' : ''}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2.5 rounded-xl ${version.primary ? 'bg-primary/12' : 'bg-muted/30'}`}>
                          <version.icon className={`w-5 h-5 ${version.primary ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-foreground text-sm">{version.title}</h3>
                          <p className="text-xs text-muted-foreground">{version.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 text-left">{version.description}</p>

                      {isDownloading && (
                        <div className="mb-3 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-primary">Preparing...</span>
                            <span className="text-muted-foreground">{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-1.5" />
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{version.size}</span>
                        <Button size="sm" disabled={isDownloading} onClick={() => handleDownload(version.downloadLink, version.title)} className={version.primary ? "btn-gaming text-xs px-4 py-1.5" : "btn-gaming-outline text-xs px-4 py-1.5"}>
                          {isDownloading ? <><Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />Downloading...</> : progress === 100 ? <><CheckCircle className="w-3.5 h-3.5 mr-1" />Complete!</> : <><Download className="w-3.5 h-3.5 mr-1" />Download</>}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-muted-foreground">
                Source: <a href={versionInfo.pageUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mcpelife.com</a>
                {useAlternateLinks && <span className="ml-2 text-primary/70">• Using mirror links</span>}
              </p>
            </div>
          </section>

          {/* Changelog Section — Custom expandable (no Radix Accordion) */}
          <section className="card-gaming p-6 mb-10">
            <h2 className="text-xl font-bold text-primary mb-5 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              What's New in {versionInfo.version}
            </h2>

            <div className="space-y-2">
              {versionInfo.changelog && versionInfo.changelog.length > 0 ? (
                versionInfo.changelog.map((section, index) => (
                  <div key={index} className="rounded-xl border border-border/50 overflow-hidden transition-colors hover:border-primary/20" style={{ background: 'hsl(220 25% 11% / 0.4)' }}>
                    <button
                      onClick={() => toggleChangelog(index)}
                      className="w-full px-5 py-3.5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-foreground font-semibold text-sm">{section.title}</span>
                        <span className="text-xs text-muted-foreground bg-primary/8 px-2 py-0.5 rounded-full">{section.items.length} items</span>
                      </span>
                      <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-300 ${openChangelogs[index] ? 'rotate-180' : ''}`} />
                    </button>

                    <div className={`transition-all duration-300 ease-out ${openChangelogs[index] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                      <ul className="px-5 pb-4 space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                            <span className="text-primary mt-0.5 flex-shrink-0 text-xs">✦</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Sparkles className="w-6 h-6 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">Changelog will appear after checking for updates</p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-border/20 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Changelog data from mcpelife.com</p>
              <Button variant="ghost" size="sm" onClick={() => checkForUpdates(false)} disabled={isChecking} className="text-primary hover:text-primary/80 text-xs">
                {isChecking ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <RefreshCw className="w-3.5 h-3.5 mr-1" />}
                Refresh
              </Button>
            </div>
          </section>

          {/* Version Archive */}
          <section className="card-gaming p-6 mb-10 overflow-hidden">
            <h2 className="text-xl font-bold text-primary mb-1 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Version Archive
            </h2>
            <p className="text-muted-foreground text-sm mb-6">Download any major Minecraft Bedrock version</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {majorVersions.map((version, index) => (
                <div
                  key={version.version}
                  className="group relative overflow-hidden rounded-xl border border-border/40 transition-all duration-500 hover:scale-[1.01] hover:border-primary/30 glass-shine"
                  style={{ background: 'hsl(220 25% 10% / 0.5)', backdropFilter: 'blur(12px)' }}
                >
                  {/* Hover glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${version.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  <div className="relative p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-2xl font-bold text-primary">{version.version}</span>
                          {index === 0 && (
                            <span className="px-2 py-0.5 text-[10px] font-semibold bg-primary/15 text-primary rounded-full">Latest</span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-foreground">{version.codename}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{version.releaseDate}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-xs mb-3 line-clamp-2 group-hover:line-clamp-none transition-all leading-relaxed">{version.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {version.highlights.map((h, i) => (
                        <span key={i} className="px-2 py-0.5 text-[10px] rounded-full text-muted-foreground border border-border/40 transition-colors group-hover:border-primary/20 group-hover:text-foreground" style={{ background: 'hsl(220 25% 14% / 0.5)' }}>
                          {h}
                        </span>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleDownload(version.downloadLink, `MC-${version.version}`)}
                      disabled={downloadStates[`MC-${version.version}`]?.isDownloading}
                      className="w-full btn-gaming text-xs py-2"
                    >
                      {downloadStates[`MC-${version.version}`]?.isDownloading ? (
                        <><Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />Downloading...</>
                      ) : (
                        <><Download className="w-3.5 h-3.5 mr-1" />Download {version.version}<ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" /></>
                      )}
                    </Button>

                    {downloadStates[`MC-${version.version}`]?.isDownloading && (
                      <div className="mt-2">
                        <Progress value={downloadStates[`MC-${version.version}`]?.progress || 0} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="card-gaming p-6 mb-10">
            <h2 className="text-lg font-bold text-primary mb-6 text-center flex items-center justify-center gap-2">
              <Pickaxe className="w-5 h-5" />
              Why Download from Nextup Studio?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="feature-card flex items-start gap-3 p-3.5 rounded-xl border border-transparent hover:border-primary/15 transition-all" style={{ background: 'hsl(220 25% 11% / 0.3)' }}>
                  <div className="p-2 rounded-lg bg-primary/8">
                    <feature.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-0.5">{feature.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section className="card-gaming p-6">
            <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Setup & Tips
            </h2>
            <ul className="space-y-2">
              {[
                "For No Music, app size is MUCH smaller and loads faster for low-storage phones.",
                "Always back up your Minecraft worlds before upgrading or reinstalling.",
                "Both versions are fully compatible with multiplayer and Realms.",
                "No root or special permissions required for installation.",
                "Toggle 'alternate source' above if the primary download link is slow.",
              ].map((tip, i) => (
                <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DownloadsPage;
