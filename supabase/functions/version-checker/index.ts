import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SOURCE = "https://mcpedl.org";
const LISTING = `${SOURCE}/downloading/`;

interface ChangelogItem { title: string; items: string[] }

// Fallbacks – keep in sync with src/data/content.ts
const FALLBACK = {
  release: { version: "26.60", slug: "26-60" },
  beta: { version: "26.70.22", slug: "26-70-22" },
};

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

/**
 * The listing links every build as /minecraft-pe-<version>-apk/ (newest first).
 * Stable releases have two numeric parts (26.60), previews three or more (26.70.22).
 */
function findLatest(html: string) {
  const re = /href="https:\/\/mcpedl\.org\/minecraft-pe-(\d+(?:-\d+)+)-apk\/"/gi;
  let release: string | null = null;
  let beta: string | null = null;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const parts = m[1].split("-");
    if (parts[0] === "1") continue; // legacy 1.x archive entries
    if (!release && parts.length === 2 && Number(parts[0]) < 27) release = m[1];
    if (!beta && parts.length >= 3) beta = m[1];
    if (release && beta) break;
  }
  return { release, beta };
}

const toVersion = (slug: string) => slug.replace(/-/g, ".");
const pageUrl = (slug: string) => `${SOURCE}/minecraft-pe-${slug}-apk/`;

function extractChangelog(html: string): ChangelogItem[] {
  const items = (html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) ?? [])
    .map((li) => li.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim())
    .filter((t) => t.length > 12 && t.length < 220)
    .slice(0, 8);
  return items.length ? [{ title: "What's New", items }] : [];
}

async function fetchLatestVersions() {
  let releaseSlug = FALLBACK.release.slug;
  let betaSlug = FALLBACK.beta.slug;
  let changelog: ChangelogItem[] = [];

  try {
    const found = findLatest(await fetchText(LISTING));
    if (found.release) releaseSlug = found.release;
    if (found.beta) betaSlug = found.beta;
    try {
      changelog = extractChangelog(await fetchText(pageUrl(releaseSlug)));
    } catch (e) {
      console.error("Changelog fetch failed:", e);
    }
  } catch (e) {
    console.error("Listing fetch failed, using fallbacks:", e);
  }

  const now = new Date().toISOString();
  const relPage = pageUrl(releaseSlug);
  const betaPage = pageUrl(betaSlug);
  return {
    release: {
      version: toVersion(releaseSlug),
      musicLink: `${relPage}#download-link`,
      noMusicLink: `${relPage}#download-link`,
      updateDate: now,
      pageUrl: relPage,
      changelog,
    },
    beta: {
      version: toVersion(betaSlug),
      downloadLink: `${betaPage}#download-link`,
      updateDate: now,
      pageUrl: betaPage,
    },
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    return new Response(JSON.stringify(await fetchLatestVersions()), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
