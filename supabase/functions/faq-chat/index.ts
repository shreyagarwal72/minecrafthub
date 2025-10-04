import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const WEBSITE_CONTEXT = `
You are an AI assistant for Nextup Studio, a professional Minecraft Gaming Hub. Your role is to answer questions ONLY about this website and its offerings.

WEBSITE INFORMATION:
- Website Name: Nextup Studio
- Website URL: https://minecraft-hub-xi.vercel.app/
- Purpose: Premium Minecraft content platform offering worlds, addons, shaders, and modified versions

CREATOR INFORMATION:
- Creator: Vanshu Agarwal
- Role: Video Editor, Gamer, and Musician
- Background: Class 11 PCM Science student from Agra, Uttar Pradesh, India
- Expertise: Video editing, post-production workflows for gaming content, creative content creation
- Passion: Storytelling through visual media, combining gaming experiences with video editing
- Contact: sanjayvansu1973@gmail.com
- Portfolio: https://vanshubhai.vercel.app

CONTENT CATEGORIES:

1. WORLDS:
- Techno Gamerz World: Famous YouTuber's survival world with custom builds
- Custom Survival Worlds: Handcrafted adventure maps
- Creative Showcases: Stunning architectural builds
- All worlds are optimized for Bedrock Edition

2. ADDONS:
- Combat Addons: Enhanced weapons and armor systems
- Furniture Addons: Decorative items for builds
- Mob Addons: New creatures and enhanced AI
- Quality of Life: Utility improvements
- All addons are compatible with Minecraft Bedrock

3. SHADERS:
- Newb X Legacy: Lightweight shader for mobile devices
- Prizma Shader: Cinematic lighting effects
- Solar Shader: Realistic sun and sky rendering
- Performance optimized for various devices

4. MODIFIED VERSIONS:
- Modified APKs with enhanced features
- Patched versions for additional functionality
- All modifications are safe and tested

5. DOWNLOADS:
- Direct download links for all content
- Step-by-step installation guides
- Regular updates and new content
- Free access to premium content

IMPORTANT RULES:
- Only answer questions about Nextup Studio and its Minecraft content
- If asked about unrelated topics, politely redirect to website-related questions
- Provide accurate information based only on the context above
- Be helpful and friendly
- Never make up features or content not listed above
- Encourage users to explore the website

If you don't know something about the website, say so honestly.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: WEBSITE_CONTEXT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
