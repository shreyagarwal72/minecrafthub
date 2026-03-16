import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, Beaker, RefreshCw, Clock, Loader2, Sparkles, Zap, AlertTriangle, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BetaVersionInfo {
  version: string;
  downloadLink: string;
  updateDate: string;
  pageUrl: string;
}

const BetaPage = () => {
  const [betaInfo, setBetaInfo] = useState<BetaVersionInfo>({
    version: "1.26.20.20",
    downloadLink: "https://mcpelife.com/minecraft-pe-1-26-20-20/download/1/",
    updateDate: new Date().toISOString(),
    pageUrl: "https://mcpelife.com/minecraft-pe-1-26-20-20/",
  });
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkForUpdates = async () => {
    setIsChecking(true);
    try {
      const { data, error } = await supabase.functions.invoke("version-checker");
      if (error) { console.error("Version check error:", error); return; }
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
    const cached = localStorage.getItem("mcBetaInfo");
    const lastCheck = localStorage.getItem("mcBetaLastChecked");
    if (cached) { try { setBetaInfo(JSON.parse(cached)); } catch {} }
    if (lastCheck) setLastChecked(new Date(lastCheck));
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    if (!lastCheck || new Date(lastCheck) < twoHoursAgo) checkForUpdates();
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
    { icon: Beaker, title: "Preview Features", description: "Access experimental gameplay mechanics and upcoming content before official release." },
    { icon: Sparkles, title: "New Content First", description: "Try new mobs, blocks, biomes, and items before they hit the stable version." },
    { icon: Zap, title: "Performance Tests", description: "Experience optimizations and improvements being tested for future updates." },
    { icon: AlertTriangle, title: "Beta Notice", description: "This version may contain bugs. Back up your worlds before using beta builds." }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          {/* Hero */}
          <section className="text-center mb-14 relative">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-5" style={{ background: 'hsl(38 92% 50% / 0.08)', borderColor: 'hsl(38 92% 50% / 0.25)', color: 'hsl(38 92% 60%)' }}>
                <Beaker className="w-3.5 h-3.5" />
                Beta / Preview Build
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
                <span className="text-glow">Minecraft Beta</span>
              </h1>

              <p className="text-2xl font-bold text-primary mb-3">{betaInfo.version}</p>

              {/* Version Checker */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Last checked: {formatLastChecked()}</span>
                </div>
                <Button variant="outline" size="sm" onClick={checkForUpdates} disabled={isChecking} className="flex items-center gap-2 border-primary/30 hover:bg-primary/8 text-xs">
                  {isChecking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                  {isChecking ? "Checking..." : "Check for Updates"}
                </Button>
              </div>

              <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Get early access to upcoming Minecraft features! The beta version includes
                experimental content, new mechanics, and preview features before they're released.
              </p>

              {/* Download Button */}
              <div className="relative inline-block group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-gaming-emeraldBright to-primary rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                <Button asChild className="relative btn-gaming text-sm px-8 py-5">
                  <a href={betaInfo.downloadLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5">
                    <Download className="w-5 h-5" />
                    Download Beta {betaInfo.version}
                  </a>
                </Button>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Source: <a href={betaInfo.pageUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">mcpelife.com <ExternalLink className="w-3 h-3" /></a>
              </p>
            </div>
          </section>

          {/* Features */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
            {features.map((feature, index) => (
              <div key={index} className="card-gaming p-5 transition-all duration-400 group hover:border-primary/25 hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/8 border border-primary/15 group-hover:scale-105 transition-transform duration-400">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Warning */}
          <section className="card-gaming p-6 max-w-3xl mx-auto" style={{ borderColor: 'hsl(38 92% 50% / 0.2)' }}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" style={{ color: 'hsl(38 92% 60%)' }} />
              <div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'hsl(38 92% 60%)' }}>Beta Version Notice</h3>
                <ul className="space-y-1.5 text-muted-foreground text-sm">
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
    </div>
  );
};

export default BetaPage;
