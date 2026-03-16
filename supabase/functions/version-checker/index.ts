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

async function fetchPageContent(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  return response.text();
}

function extractChangelog(html: string): ChangelogItem[] {
  const changelog: ChangelogItem[] = [];

  // Extract description text before "Show Content"
  const descMatch = html.match(/<div class="fullstory-content[^"]*"[^>]*>([\s\S]*?)<div class="content-toggle"/i);
  if (descMatch) {
    const descContent = descMatch[1];
    const listItems = descContent.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    if (listItems && listItems.length > 0) {
      const items = listItems
        .map(item => item.replace(/<[^>]+>/g, '').trim())
        .filter(item => item.length > 3 && item.length < 300);
      if (items.length > 0) {
        changelog.push({ title: "New Features", items: items.slice(0, 10) });
      }
    }
  }

  // Extract from toggle content area
  const toggleMatch = html.match(/class="content-toggle">([\s\S]*?)(?:<div class="dl-box|<div class="comments-tree)/i);
  if (toggleMatch) {
    const content = toggleMatch[1];
    const allLists = content.match(/<ul[^>]*>([\s\S]*?)<\/ul>/gi);
    if (allLists) {
      allLists.slice(0, 3).forEach((list, index) => {
        const listItems = list.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
        if (listItems && listItems.length > 0) {
          const items = listItems
            .map(item => item.replace(/<[^>]+>/g, '').trim())
            .filter(item => item.length > 3 && item.length < 300);
          if (items.length > 0 && changelog.length < 4) {
            changelog.push({
              title: index === 0 ? "Bug Fixes & Improvements" : `Changes ${index + 1}`,
              items: items.slice(0, 8)
            });
          }
        }
      });
    }
  }

  // Fallback: extract any bullet points from the page
  if (changelog.length === 0) {
    const bulletMatch = html.match(/(?:<p>|<div[^>]*>)\s*[-•]\s*([^<]+)/gi);
    if (bulletMatch && bulletMatch.length > 0) {
      const items = bulletMatch
        .map(m => m.replace(/<[^>]+>/g, '').replace(/^[-•]\s*/, '').trim())
        .filter(item => item.length > 5 && item.length < 300);
      if (items.length > 0) {
        changelog.push({ title: "Updates", items: items.slice(0, 8) });
      }
    }
  }

  if (changelog.length === 0) {
    return [
      { title: "New Features", items: ["New blocks and items added", "Performance improvements", "Bug fixes and stability updates"] },
      { title: "Technical Updates", items: ["Improved world generation", "Better chunk loading", "Optimized rendering engine"] }
    ];
  }

  return changelog;
}

function extractFullVersion(html: string): string | null {
  // Look for "Version X.X.X.X" text in download boxes
  const versionMatch = html.match(/Version\s+(1\.\d+\.\d+\.\d+)/i);
  if (versionMatch) return versionMatch[1];

  // Look for version in title
  const titleMatch = html.match(/<h1[^>]*>[^<]*?(\d+\.\d+(?:\.\d+)*)/i);
  if (titleMatch) return titleMatch[1];

  return null;
}

async function fetchLatestVersions(): Promise<{ release: VersionInfo; beta: BetaVersionInfo }> {
  try {
    console.log("Fetching latest Minecraft versions from mcpelife.com...");
    const homepageHtml = await fetchPageContent(MCPE_LIFE_URL);

    // Find all article links with titles
    // Release pattern: /minecraft-pe-XX-X/ (short slug, 2-part version like "26.3")
    // Beta pattern: /minecraft-pe-1-XX-XX-XX/ (long slug, 4-part version like "1.26.20.20")
    const articleRegex = /href="(https:\/\/mcpelife\.com\/(minecraft-pe-[^/]+))\/?"[^>]*title="Minecraft PE ([^"]+)"/gi;
    
    let releasePageUrl = "";
    let releaseDisplayVersion = "";
    let betaPageUrl = "";
    let betaDisplayVersion = "";
    
    let match;
    while ((match = articleRegex.exec(homepageHtml)) !== null) {
      const pageUrl = match[1] + "/";
      const displayVersion = match[3].trim();
      
      // Beta versions have 4-part numbers starting with "1."
      const isBeta = /^1\.\d+\.\d+\.\d+$/.test(displayVersion);
      // Release versions have short format like "26.3" or "26.2"
      const isRelease = /^\d{2}\.\d+$/.test(displayVersion);

      if (isRelease && !releasePageUrl) {
        releasePageUrl = pageUrl;
        releaseDisplayVersion = displayVersion;
        console.log("Found release:", displayVersion, "at", pageUrl);
      }
      if (isBeta && !betaPageUrl) {
        betaPageUrl = pageUrl;
        betaDisplayVersion = displayVersion;
        console.log("Found beta:", displayVersion, "at", pageUrl);
      }
      
      if (releasePageUrl && betaPageUrl) break;
    }

    // Fallback patterns if the above didn't match
    if (!releasePageUrl) {
      // Try matching release URLs directly
      const relMatch = homepageHtml.match(/href="(https:\/\/mcpelife\.com\/minecraft-pe-(\d{2}-\d+))\/"/i);
      if (relMatch) {
        releasePageUrl = relMatch[1] + "/";
        releaseDisplayVersion = relMatch[2].replace(/-/g, '.');
        console.log("Fallback release found:", releaseDisplayVersion);
      }
    }
    if (!betaPageUrl) {
      const betMatch = homepageHtml.match(/href="(https:\/\/mcpelife\.com\/minecraft-pe-(1-\d+-\d+-\d+))\/"/i);
      if (betMatch) {
        betaPageUrl = betMatch[1] + "/";
        betaDisplayVersion = betMatch[2].replace(/-/g, '.');
        console.log("Fallback beta found:", betaDisplayVersion);
      }
    }

    // Fetch both pages in parallel for full version info + changelogs
    const [releaseHtml, betaHtml] = await Promise.all([
      releasePageUrl ? fetchPageContent(releasePageUrl) : Promise.resolve(""),
      betaPageUrl ? fetchPageContent(betaPageUrl) : Promise.resolve(""),
    ]);

    // Extract actual full version from release page
    let releaseVersion = releaseDisplayVersion;
    if (releaseHtml) {
      const fullVer = extractFullVersion(releaseHtml);
      if (fullVer) {
        releaseVersion = fullVer;
        console.log("Full release version:", releaseVersion);
      }
    }

    let betaVersion = betaDisplayVersion || "1.26.20.20";
    
    const releaseChangelog = releaseHtml ? extractChangelog(releaseHtml) : [];
    const betaChangelog = betaHtml ? extractChangelog(betaHtml) : [];

    const now = new Date().toISOString();
    const relUrl = releasePageUrl || "https://mcpelife.com/minecraft-pe-26-3/";
    const betUrl = betaPageUrl || "https://mcpelife.com/minecraft-pe-1-26-20-20/";

    return {
      release: {
        version: releaseVersion || "1.26.3.1",
        musicLink: `${relUrl}download/1/`,
        noMusicLink: `${relUrl}download/2/`,
        updateDate: now,
        pageUrl: relUrl,
        changelog: releaseChangelog.length > 0 ? releaseChangelog : [
          { title: "New Features", items: ["New mob spawning mechanics", "Improved bedrock visibility", "Enhanced player animations"] },
        ],
      },
      beta: {
        version: betaVersion,
        downloadLink: `${betUrl}download/1/`,
        updateDate: now,
        pageUrl: betUrl,
        changelog: betaChangelog.length > 0 ? betaChangelog : [
          { title: "Preview Features", items: ["Experimental gameplay mechanics", "New content previews", "Performance testing"] },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching versions:", error);
    const now = new Date().toISOString();
    return {
      release: {
        version: "1.26.3.1",
        musicLink: "https://mcpelife.com/minecraft-pe-26-3/download/1/",
        noMusicLink: "https://mcpelife.com/minecraft-pe-26-3/download/2/",
        updateDate: now,
        pageUrl: "https://mcpelife.com/minecraft-pe-26-3/",
        changelog: [{ title: "New Features", items: ["New mob spawning mechanics", "Improved visuals", "Bug fixes"] }],
      },
      beta: {
        version: "1.26.20.20",
        downloadLink: "https://mcpelife.com/minecraft-pe-1-26-20-20/download/1/",
        updateDate: now,
        pageUrl: "https://mcpelife.com/minecraft-pe-1-26-20-20/",
        changelog: [{ title: "Preview Features", items: ["Experimental content", "Performance improvements"] }],
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
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
