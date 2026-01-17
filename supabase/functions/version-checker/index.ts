import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MCPE_PLANET_URL = "https://mcpe-planet.com/downloads/";

async function fetchLatestVersion(): Promise<{
  version: string;
  musicLink: string;
  noMusicLink: string;
  updateDate: string;
}> {
  try {
    console.log("Fetching latest Minecraft version from mcpe-planet.com...");
    
    const response = await fetch(MCPE_PLANET_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();
    
    // Parse for latest release version (look for pattern like "MCPE 1.21.132")
    const releaseMatch = html.match(/MCPE\s+(\d+\.\d+\.\d+)\s*\([^)]*Latest\s+Rele[a]?se/i);
    
    let version = "1.21.132"; // fallback
    if (releaseMatch && releaseMatch[1]) {
      version = releaseMatch[1];
    }

    // Construct download links based on version
    const versionSlug = version.replace(/\./g, "-");
    const musicLink = `https://mcpe-planet.com/wp-content/uploads/version/minecraft-${versionSlug}-music.apk`;
    const noMusicLink = `https://mcpe-planet.com/wp-content/uploads/version/minecraft-${versionSlug}.apk`;

    console.log(`Found latest version: ${version}`);

    return {
      version,
      musicLink,
      noMusicLink,
      updateDate: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching version:", error);
    // Return current known version as fallback
    return {
      version: "1.21.132",
      musicLink: "https://mcpe-planet.com/wp-content/uploads/version/minecraft-1-21-132-music.apk",
      noMusicLink: "https://mcpe-planet.com/wp-content/uploads/version/minecraft-1-21-132.apk",
      updateDate: new Date().toISOString(),
    };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const versionInfo = await fetchLatestVersion();

    return new Response(JSON.stringify(versionInfo), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Version checker error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        version: "1.21.132",
        musicLink: "https://mcpe-planet.com/wp-content/uploads/version/minecraft-1-21-132-music.apk",
        noMusicLink: "https://mcpe-planet.com/wp-content/uploads/version/minecraft-1-21-132.apk",
        updateDate: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
