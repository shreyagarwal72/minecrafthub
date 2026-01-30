import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MCPE_LIFE_URL = "https://mcpelife.com/";

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

interface BetaVersionInfo {
  version: string;
  downloadLink: string;
  updateDate: string;
  pageUrl: string;
  changelog: ChangelogItem[];
}

async function fetchChangelog(pageUrl: string): Promise<ChangelogItem[]> {
  try {
    console.log("Fetching changelog from:", pageUrl);
    
    const response = await fetch(pageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch changelog page:", response.status);
      return getDefaultChangelog();
    }

    const html = await response.text();
    const changelog: ChangelogItem[] = [];

    // Extract changelog sections - look for common patterns
    // Pattern 1: Look for h2/h3 headers with "What's New" or similar
    const whatsNewMatch = html.match(/What['']s New[^<]*<\/h[23]>([\s\S]*?)(?=<h[23]|<\/article|<\/div class="entry)/i);
    
    if (whatsNewMatch) {
      const content = whatsNewMatch[1];
      // Extract list items
      const listItems = content.match(/<li[^>]*>([^<]+)<\/li>/gi);
      if (listItems && listItems.length > 0) {
        const items = listItems
          .map(item => item.replace(/<[^>]+>/g, '').trim())
          .filter(item => item.length > 0);
        
        if (items.length > 0) {
          changelog.push({
            title: "What's New",
            items: items.slice(0, 10) // Limit to 10 items
          });
        }
      }
    }

    // Pattern 2: Look for feature lists with bullet points or numbered lists
    const featureMatches = html.match(/<ul[^>]*class="[^"]*feature[^"]*"[^>]*>([\s\S]*?)<\/ul>/gi);
    if (featureMatches) {
      featureMatches.forEach((match, index) => {
        const listItems = match.match(/<li[^>]*>([^<]+)<\/li>/gi);
        if (listItems && listItems.length > 0) {
          const items = listItems
            .map(item => item.replace(/<[^>]+>/g, '').trim())
            .filter(item => item.length > 0);
          
          if (items.length > 0 && changelog.length < 3) {
            changelog.push({
              title: `Features ${index + 1}`,
              items: items.slice(0, 8)
            });
          }
        }
      });
    }

    // Pattern 3: Generic list extraction from article content
    if (changelog.length === 0) {
      const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i) || 
                          html.match(/<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
      
      if (articleMatch) {
        const content = articleMatch[1];
        const allLists = content.match(/<ul[^>]*>([\s\S]*?)<\/ul>/gi);
        
        if (allLists && allLists.length > 0) {
          allLists.slice(0, 2).forEach((list, index) => {
            const listItems = list.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
            if (listItems && listItems.length > 0) {
              const items = listItems
                .map(item => item.replace(/<[^>]+>/g, '').trim())
                .filter(item => item.length > 0 && item.length < 200);
              
              if (items.length > 0) {
                changelog.push({
                  title: index === 0 ? "New Features" : "Bug Fixes & Improvements",
                  items: items.slice(0, 8)
                });
              }
            }
          });
        }
      }
    }

    // If still no changelog, return defaults
    if (changelog.length === 0) {
      return getDefaultChangelog();
    }

    console.log("Extracted changelog:", changelog.length, "sections");
    return changelog;
  } catch (error) {
    console.error("Error fetching changelog:", error);
    return getDefaultChangelog();
  }
}

function getDefaultChangelog(): ChangelogItem[] {
  return [
    {
      title: "New Features",
      items: [
        "New blocks and items added",
        "Performance improvements",
        "Bug fixes and stability updates",
        "Multiplayer enhancements"
      ]
    },
    {
      title: "Technical Updates",
      items: [
        "Improved world generation",
        "Better chunk loading",
        "Optimized rendering engine"
      ]
    }
  ];
}

async function fetchLatestVersions(): Promise<{
  release: VersionInfo;
  beta: BetaVersionInfo;
}> {
  try {
    console.log("Fetching latest Minecraft versions from mcpelife.com...");
    
    const response = await fetch(MCPE_LIFE_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();
    
    // Find release version (1.21.xxx pattern - stable releases)
    const releaseMatch = html.match(/minecraft-pe-(1\.21\.\d+)/i);
    // Find beta version (1.26.xxx or 1.25.xxx pattern - beta/preview)
    const betaMatch = html.match(/minecraft-pe-(1\.2[56]\.\d+\.\d+)/i);
    
    let releaseVersion = "1.21.132";
    let betaVersion = "1.26.10.20";
    
    if (releaseMatch && releaseMatch[1]) {
      releaseVersion = releaseMatch[1];
    }
    
    if (betaMatch && betaMatch[1]) {
      betaVersion = betaMatch[1];
    }

    console.log(`Found release: ${releaseVersion}, beta: ${betaVersion}`);

    // Construct URLs
    const releaseSlug = releaseVersion.replace(/\./g, "-");
    const betaSlug = betaVersion.replace(/\./g, "-");
    
    const releasePageUrl = `https://mcpelife.com/minecraft-pe-${releaseSlug}/`;
    const betaPageUrl = `https://mcpelife.com/minecraft-pe-${betaSlug}/`;

    // Fetch changelogs in parallel
    const [releaseChangelog, betaChangelog] = await Promise.all([
      fetchChangelog(releasePageUrl),
      fetchChangelog(betaPageUrl)
    ]);

    return {
      release: {
        version: releaseVersion,
        musicLink: `${releasePageUrl}download/1/`,
        noMusicLink: `${releasePageUrl}download/2/`,
        updateDate: new Date().toISOString(),
        pageUrl: releasePageUrl,
        changelog: releaseChangelog,
      },
      beta: {
        version: betaVersion,
        downloadLink: `${betaPageUrl}download/1/`,
        updateDate: new Date().toISOString(),
        pageUrl: betaPageUrl,
        changelog: betaChangelog,
      },
    };
  } catch (error) {
    console.error("Error fetching versions:", error);
    const defaultChangelog = getDefaultChangelog();
    // Return fallback versions
    return {
      release: {
        version: "1.21.132",
        musicLink: "https://mcpelife.com/minecraft-pe-1-21-132/download/1/",
        noMusicLink: "https://mcpelife.com/minecraft-pe-1-21-132/download/2/",
        updateDate: new Date().toISOString(),
        pageUrl: "https://mcpelife.com/minecraft-pe-1-21-132/",
        changelog: defaultChangelog,
      },
      beta: {
        version: "1.26.10.20",
        downloadLink: "https://mcpelife.com/minecraft-pe-1-26-10-20/download/1/",
        updateDate: new Date().toISOString(),
        pageUrl: "https://mcpelife.com/minecraft-pe-1-26-10-20/",
        changelog: defaultChangelog,
      },
    };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const versions = await fetchLatestVersions();

    return new Response(JSON.stringify(versions), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Version checker error:", error);
    const defaultChangelog = getDefaultChangelog();
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        release: {
          version: "1.21.132",
          musicLink: "https://mcpelife.com/minecraft-pe-1-21-132/download/1/",
          noMusicLink: "https://mcpelife.com/minecraft-pe-1-21-132/download/2/",
          updateDate: new Date().toISOString(),
          pageUrl: "https://mcpelife.com/minecraft-pe-1-21-132/",
          changelog: defaultChangelog,
        },
        beta: {
          version: "1.26.10.20",
          downloadLink: "https://mcpelife.com/minecraft-pe-1-26-10-20/download/1/",
          updateDate: new Date().toISOString(),
          pageUrl: "https://mcpelife.com/minecraft-pe-1-26-10-20/",
          changelog: defaultChangelog,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});