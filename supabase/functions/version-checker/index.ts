import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MCPE_LIFE_URL = "https://mcpelife.com/";

interface VersionInfo {
  version: string;
  musicLink: string;
  noMusicLink: string;
  updateDate: string;
  pageUrl: string;
}

interface BetaVersionInfo {
  version: string;
  downloadLink: string;
  updateDate: string;
  pageUrl: string;
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

    return {
      release: {
        version: releaseVersion,
        musicLink: `${releasePageUrl}download/1/`,
        noMusicLink: `${releasePageUrl}download/2/`,
        updateDate: new Date().toISOString(),
        pageUrl: releasePageUrl,
      },
      beta: {
        version: betaVersion,
        downloadLink: `${betaPageUrl}download/1/`,
        updateDate: new Date().toISOString(),
        pageUrl: betaPageUrl,
      },
    };
  } catch (error) {
    console.error("Error fetching versions:", error);
    // Return fallback versions
    return {
      release: {
        version: "1.21.132",
        musicLink: "https://mcpelife.com/minecraft-pe-1-21-132/download/1/",
        noMusicLink: "https://mcpelife.com/minecraft-pe-1-21-132/download/2/",
        updateDate: new Date().toISOString(),
        pageUrl: "https://mcpelife.com/minecraft-pe-1-21-132/",
      },
      beta: {
        version: "1.26.10.20",
        downloadLink: "https://mcpelife.com/minecraft-pe-1-26-10-20/download/1/",
        updateDate: new Date().toISOString(),
        pageUrl: "https://mcpelife.com/minecraft-pe-1-26-10-20/",
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
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        release: {
          version: "1.21.132",
          musicLink: "https://mcpelife.com/minecraft-pe-1-21-132/download/1/",
          noMusicLink: "https://mcpelife.com/minecraft-pe-1-21-132/download/2/",
          updateDate: new Date().toISOString(),
          pageUrl: "https://mcpelife.com/minecraft-pe-1-21-132/",
        },
        beta: {
          version: "1.26.10.20",
          downloadLink: "https://mcpelife.com/minecraft-pe-1-26-10-20/download/1/",
          updateDate: new Date().toISOString(),
          pageUrl: "https://mcpelife.com/minecraft-pe-1-26-10-20/",
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
