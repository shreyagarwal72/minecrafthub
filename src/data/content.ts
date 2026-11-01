/**
 * Single source of truth for every download link, version and piece of
 * catalogue content on the site.
 *
 * Link sources were re-checked on 1 Nov 2026. `checked: false` marks links that
 * point at a third-party file host (MediaFire / Drive / CDN) which could not be
 * verified from here – they are kept as-is from the previous version of the site.
 */

export interface ChangelogItem {
  title: string;
  items: string[];
}

export interface VersionInfo {
  version: string;
  musicLink: string;
  noMusicLink: string;
  updateDate: string;
  pageUrl: string;
  changelog: ChangelogItem[];
}

export interface BetaVersionInfo {
  version: string;
  downloadLink: string;
  updateDate: string;
  pageUrl: string;
  changelog?: ChangelogItem[];
}

const MCPEDL = "https://mcpedl.org";
const apkPage = (slug: string) => `${MCPEDL}/minecraft-pe-${slug}-apk/`;

/* ------------------------------------------------------------------ */
/* Minecraft Bedrock builds                                            */
/* ------------------------------------------------------------------ */

export const RELEASE: VersionInfo = {
  version: "26.60",
  pageUrl: apkPage("26-60"),
  musicLink: `${apkPage("26-60")}#download-link`,
  noMusicLink: `${apkPage("26-60")}#download-link`,
  updateDate: "2026-10-27",
  changelog: [
    {
      title: "New Features",
      items: [
        "Ice Caves – new caves that form beneath cold Overworld biomes (experimental toggle)",
        "Frostbite zombie – applies Freezing; its Ice Balls can be used for Freezing potions (experimental)",
        "Building: trapdoors keep their direction while the place button is held",
        "Pistons can now push Shulkers",
      ],
    },
    {
      title: "Fixes & Technical",
      items: [
        "600+ fixes, 89 of them from player reports",
        "Touch controls: visual stuttering fixed",
        "Realms: world uploads and downloads are faster and more reliable",
        "Pausing during a dimension change no longer leaves you stuck on the loading screen",
      ],
    },
  ],
};

export const BETA: BetaVersionInfo = {
  version: "26.70.22",
  pageUrl: apkPage("26-70-22"),
  downloadLink: `${apkPage("26-70-22")}#download-link`,
  updateDate: "2026-10-28",
  changelog: [
    {
      title: "Preview build",
      items: ["Official Beta & Preview notes are posted on feedback.minecraft.net (link below)."],
    },
  ],
};

export const BETA_NOTES_URL =
  "https://feedback.minecraft.net/hc/en-us/articles/49967647452685-Minecraft-Beta-Preview-26-70-22";

export const OFFICIAL = {
  googlePlay: "https://play.google.com/store/apps/details?id=com.mojang.minecraftpe",
  minecraftNet: "https://www.minecraft.net/en-us/download",
  changelog26_50: "https://www.minecraft.net/en-us/article/minecraft--bedrock-edition-26-50-changelog",
};

/** Approximate download sizes taken from the source page (Xbox+servers builds). */
export const SIZES = { music: "~750 MB", noMusic: "~380 MB" };

export interface ArchiveVersion {
  version: string;
  codename: string;
  releaseDate: string;
  description: string;
  highlights: string[];
  downloadLink: string;
  icon: IconName;
  latest?: boolean;
}

export const ARCHIVE: ArchiveVersion[] = [
  {
    version: "26.60",
    codename: "Ice Caves",
    releaseDate: "Oct 2026",
    description: "Experimental Ice Caves and the Frostbite zombie, over 600 fixes, faster Realms uploads and smoother touch controls.",
    highlights: ["Ice Caves", "Frostbite Zombie", "Realms Speed", "600+ Fixes"],
    downloadLink: apkPage("26-60"),
    icon: "diamond",
    latest: true,
  },
  {
    version: "26.50",
    codename: "Wilderness Bound",
    releaseDate: "Sep 2026",
    description: "Game Drop 3: Abandoned Camps, the Dappled Forest biome, Straw Beds, sit-able Cushions and wool & concrete stairs and slabs.",
    highlights: ["Abandoned Camps", "Dappled Forest", "Straw Beds", "Cushions"],
    downloadLink: apkPage("26-50"),
    icon: "lapis",
  },
  {
    version: "1.21.132",
    codename: "Tricky Trials",
    releaseDate: "Jan 2026 (final 1.21 build)",
    description: "Trial Chambers, the Breeze mob, new copper and tuff blocks, the mace weapon and ominous events.",
    highlights: ["Trial Chambers", "Breeze Mob", "Mace Weapon", "Ominous Trials"],
    downloadLink: apkPage("1-21-132"),
    icon: "obsidian",
  },
  {
    version: "1.20.81",
    codename: "Trails & Tales",
    releaseDate: "Apr 2024 (final 1.20 build)",
    description: "Cherry blossom biomes, archaeology, armor trims, bamboo and hanging signs, camels and sniffers.",
    highlights: ["Cherry Blossoms", "Archaeology", "Armor Trims", "Camels"],
    downloadLink: apkPage("1-20-81"),
    icon: "planks",
  },
  {
    version: "1.19.83",
    codename: "The Wild Update",
    releaseDate: "May 2023 (final 1.19 build)",
    description: "Deep Dark biome, Ancient Cities, the Warden, Mangrove Swamps, Frogs, Allays and mud blocks.",
    highlights: ["Deep Dark", "Warden", "Mangrove Swamp", "Allays"],
    downloadLink: apkPage("1-19-83"),
    icon: "sand",
  },
  {
    version: "1.18.32",
    codename: "Caves & Cliffs: Part II",
    releaseDate: "May 2022 (final 1.18 build)",
    description: "Massive world-generation overhaul with new mountain and cave biomes plus increased world height and depth.",
    highlights: ["New Caves", "Mountain Biomes", "World Height", "Lush Caves"],
    downloadLink: apkPage("1-18-32"),
    icon: "cobble",
  },
];

/* ------------------------------------------------------------------ */
/* Catalogue                                                           */
/* ------------------------------------------------------------------ */

export type IconName = "grass" | "planks" | "glowstone" | "diamond" | "obsidian" | "lapis" | "cobble" | "netherrack" | "sand";

export interface Addon {
  title: string;
  image: string; // public path, or key of a bundled asset ("customAddonPack" | "minecraft3DPack")
  description: string;
  downloadLink: string;
  downloadText: string;
  source: string;
  meta?: string;
  videoLink?: string;
  checked: boolean;
}

export const ADDONS: Addon[] = [
  {
    title: "Raiyon's Java Combat Addon",
    image: "/images/2.gif",
    description:
      "Bring Java Edition combat to Bedrock: sweeping edge attacks, shield blocking, attack cooldown, critical hits and advanced PvP mechanics.",
    downloadLink: "https://mcpedl.com/raiyons-java-combat-addon/",
    downloadText: "Download Java Combat",
    source: "MCPEDL",
    meta: "v2.6.5 · updated 24 Oct 2026 · 1.21.132 / 26.0",
    checked: true,
  },
  {
    title: "Minecraft 3D Texture Pack",
    image: "minecraft3DPack",
    description:
      "Realistic 3D depth on blocks and items without sacrificing performance.",
    downloadLink: "https://mcpedl.com/leaving/?url=https%3A%2F%2Fdirect-link.net%2F144609%2Ftexture-pack1&blid=142",
    downloadText: "Download 3D Pack",
    source: "MCPEDL",
    checked: false,
  },
  {
    title: "Java Saturation Addon",
    image: "/images/1.gif",
    description:
      "True Java Edition hunger & saturation mechanics in Bedrock. Never worry about unfair food loss again.",
    downloadLink: "https://mcpedl.com/raiyons-java-saturation-addon/",
    downloadText: "Download Saturation",
    source: "MCPEDL",
    meta: "Official creator release",
    checked: true,
  },
  {
    title: "Actions & Stuff",
    image: "/images/3.jpeg",
    description:
      "Tons of new player animations, emotes and creative tweaks. The addon is now officially available on the Minecraft Marketplace – read the release story below.",
    downloadLink: "https://www.sportskeeda.com/minecraft/minecraft-actions-stuff-add-on-finally-releases-bedrock-marketplace",
    downloadText: "Read Release Info",
    source: "Sportskeeda",
    meta: "Now on the Minecraft Marketplace",
    checked: true,
  },
  {
    title: "Raiyon Dynamic Lighting",
    image: "/images/4.jpg",
    description:
      "Real moving light sources! Hold a torch, lantern or fire and the world around you lights up instantly.",
    downloadLink: "https://mcpedl.com/raiyons-dynamic-light-addon/",
    downloadText: "Download Lighting",
    source: "MCPEDL",
    meta: "Official creator release",
    checked: true,
  },
  {
    title: "Raiyon's Useful Offhand",
    image: "/images/5.gif",
    description:
      "Real dual wielding in Bedrock Edition! Use shields, food, totems, arrows and more in your offhand.",
    downloadLink: "https://www.9minecraft.net/?p=719444",
    downloadText: "Download Offhand",
    source: "9Minecraft",
    meta: "Listed for 26.x and 1.21",
    checked: true,
  },
  {
    title: "Ty-el's UI Pack v1.2.0",
    image: "https://img.youtube.com/vi/5CdlEFepD9c/hqdefault.jpg",
    description:
      "A complete, clean, responsive Bedrock UI resource pack with animated menus and advanced controls.",
    videoLink: "https://youtu.be/5CdlEFepD9c?feature=shared",
    downloadLink: "https://mcpedl.com/ty-els-ui-pack/",
    downloadText: "Download UI Pack",
    source: "MCPEDL",
    meta: "Official creator release",
    checked: true,
  },
  {
    title: "Optifine Bedrock",
    image: "/Addons/1.jpeg",
    description:
      "Optifine-style Bedrock client pack with gameplay and performance tweaks.",
    downloadLink: "https://mcpedl.com/optifine-plus-plus-client/",
    downloadText: "Download Optifine",
    source: "MCPEDL",
    meta: "Official creator release",
    checked: true,
  },
  {
    title: "Custom Addon Pack",
    image: "customAddonPack",
    description:
      "Exclusive custom addon pack handcrafted by Nextup Studio – a unique collection of the best features and enhancements. (Link pending update)",
    downloadLink: "https://www.mediafire.com/file/j9n4hsitabze51j/My+addons.mcaddon/file",
    downloadText: "Download Custom Pack",
    source: "Nextup Studio",
    meta: "Link update needed",
    checked: false,
  },
  {
    title: "Better on Bedrock",
    image: "/images/better-on-bedrock.jpg",
    description: "Vast vanilla-plus expansion: new biomes, underground structures, custom bounties, enchantments, and deep exploration.",
    downloadLink: "https://mcpedl.com/better-on-bedrock/",
    downloadText: "Download Better on Bedrock",
    source: "MCPEDL",
    meta: "v1.3 · Bedrock 1.21+ / 26.0+ · verified pack",
    checked: true,
  },
  {
    title: "True Survival - Zombie Apocalypse",
    image: "/images/zombie-apocalypse.jpg",
    description: "Hardcore zombie survival thriller: firearms, infection mechanics, supply drops, and aggressive night hordes.",
    downloadLink: "https://mcpedl.com/true-survival-zombie-apocalypse/",
    downloadText: "Download Zombie Apocalypse",
    source: "MCPEDL",
    meta: "v7.0 · guns, barricades & infection",
    checked: true,
  },
  {
    title: "Origins Bedrock Edition",
    image: "/images/origins-bedrock.jpg",
    description: "Choose your unique origin: Enderian, Merling, Phantom, Elytrian, or Blazeborn. Master unique perks and navigate weaknesses.",
    downloadLink: "https://github.com/Origins-Bedrock/Origins/releases",
    downloadText: "Download Origins",
    source: "GitHub Releases",
    meta: "v1.8.0 · open-source release",
    checked: true,
  },
  {
    title: "Furnicraft Modern Furniture v20",
    image: "/images/furnicraft.jpg",
    description: "Over 500 interactive modern furniture items: functional kitchen stoves, refrigerators, TVs, gaming chairs, and vehicles.",
    downloadLink: "https://mcpedl.com/furnicraft-addon/",
    downloadText: "Download Furnicraft",
    source: "MCPEDL",
    meta: "v20.0 · working furniture & cars",
    checked: true,
  },
  {
    title: "Epic Knights: Shields & Armor",
    image: "/images/epic-knights.jpg",
    description: "Authentic medieval steel plate armor, claymores, halberds, round shields, and jousting lances for epic Bedrock battles.",
    downloadLink: "https://mcpedl.com/epic-knights-addon/",
    downloadText: "Download Epic Knights",
    source: "MCPEDL",
    meta: "v1.5 · historical medieval combat",
    checked: true,
  },
  {
    title: "WorldEdit Bedrock Edition",
    image: "/images/worldedit-bedrock.jpg",
    description: "In-game terraforming and building toolkit for Bedrock. Custom wand selections, fill, copy/paste, and cylinder brushes.",
    downloadLink: "https://github.com/SIsilicon/WorldEdit-BE/releases/latest",
    downloadText: "Download WorldEdit BE",
    source: "GitHub Releases",
    meta: "Official Open Source Project",
    checked: true,
  },

  {
    title: "Mowzie's Mobs Bedrock",
    image: "/images/mowzies-mobs.jpg",
    description: "Battle legendary fantasy bosses: the towering Frostmaw, the armored Ferrous Wroughtnaut, vicious Nagas, and aggressive Foliaaths.",
    downloadLink: "https://mcpedl.com/mowzies-mobs-bedrock-addon/",
    downloadText: "Download Mowzie's Mobs",
    source: "MCPEDL",
    meta: "Official Bedrock port · 3D animated bosses",
    checked: true,
  },
  {
    title: "Tinkers' Construct Bedrock",
    image: "/images/tinkers-construct.jpg",
    description: "Modular tools and custom metal casting! Build multi-block smelteries, pour molten metals, and forge personalized weapons.",
    downloadLink: "https://mcpedl.com/tinkers-construct-bedrock/",
    downloadText: "Download Tinkers'",
    source: "MCPEDL",
    meta: "Smeltery, custom alloy weapons & modifiers",
    checked: true,
  },
  {
    title: "Security Craft Bedrock",
    image: "/images/security-craft.jpg",
    description: "High-tech base defense: keypad doors, laser tripwire alarms, retinal scanners, security cameras, and unbreakable reinforced blocks.",
    downloadLink: "https://mcpedl.com/securitycraft-bedrock/",
    downloadText: "Download Security Craft",
    source: "MCPEDL",
    meta: "Keypad doors, laser alarms & surveillance",
    checked: true,
  },
  {
    title: "More Simple Structures",
    image: "/images/simple-structures.jpg",
    description: "Spawns over 30 new vanilla-friendly structures across every biome: ancient statues, ruins, desert outposts, pirate camps, and hidden loot.",
    downloadLink: "https://mcpedl.com/more-simple-structures/",
    downloadText: "Download Structures",
    source: "MCPEDL",
    meta: "30+ naturally generating world structures",
    checked: true,
  },
  {
    title: "Dragon Mounts 3",
    image: "/images/dragon-mounts.jpg",
    description: "Hatch, raise, and tame elemental dragons: Nether, Ender, Ghost, Forest, and Water dragons with rideable flight and breath attacks.",
    downloadLink: "https://mcpedl.com/dragon-mounts-3/",
    downloadText: "Download Dragon Mounts",
    source: "MCPEDL",
    meta: "Rideable flight, dragon armor & eggs",
    checked: true,
  },
  {
    title: "Mutant Creatures Bedrock",
    image: "/images/mutant-creatures.jpg",
    description: "Face 20x stronger mutant variants of vanilla mobs: Mutant Zombie, Mutant Skeleton, Mutant Creeper, and Mutant Enderman with devastating skills.",
    downloadLink: "https://mcpedl.com/mutant-creatures-addon/",
    downloadText: "Download Mutant Creatures",
    source: "MCPEDL",
    meta: "20x health mutant minibosses with unique drops",
    checked: true,
  },
  {
    title: "Bare Bones Bedrock Texture Pack",
    image: "/images/bare-bones.jpg",
    description: "Official trailer aesthetic for Bedrock! Simplifies textures into vibrant, smooth, clean colors matching official Minecraft animated shorts.",
    downloadLink: "https://mcpedl.com/bare-bones-be/",
    downloadText: "Download Bare Bones",
    source: "MCPEDL",
    meta: "Official Bare Bones port · trailer aesthetic",
    checked: true,
  },
  {
    title: "Faithful 32x Bedrock",
    image: "/images/faithful.jpg",
    description: "The gold-standard HD vanilla texture pack. Doubles default pixel resolution to 32x32 for crystal-clear clarity while keeping the vanilla soul.",
    downloadLink: "https://faithfulpack.net/",
    downloadText: "Download Faithful 32x",
    source: "Official Faithful",
    meta: "32x32 HD vanilla enhanced pack",
    checked: true,
  },
];

export interface Shader {
  title: string;
  image: string; // key into bundled assets
  description: string;
  downloadLink: string;
  downloadText: string;
  source: string;
  meta?: string;
  checked: boolean;
}

export const SHADERS: Shader[] = [
  {
    title: "Solar Shader",
    image: "solar",
    description:
      "Realistic lighting, beautiful colors and soft shadows – sunlight, smooth skies and better water for Minecraft Bedrock.",
    downloadLink: "https://mcpedl.org/solar-shader-minecraft-pe/",
    downloadText: "Get Solar Shader",
    source: "MCPEDL",
    meta: "Solar & Solar Shaders v2 · 1.19.60 – 1.26.60 · updated Jul 2026",
    checked: true,
  },
  {
    title: "Newb X Legacy",
    image: "newb",
    description:
      "Easy-to-run, clean shader for all devices: sharper shadows, brighter skies, cool water and smooth nights. Always grab the newest .mcpack from the project's releases.",
    downloadLink: "https://github.com/devendrn/newb-x-mcbe/releases/latest",
    downloadText: "Get Newb X Legacy",
    source: "GitHub Releases",
    meta: "Official project · latest release",
    checked: true,
  },
  {
    title: "Prizma Visuals",
    image: "prizma",
    description:
      "Vibrant lighting, rainbow water effects, realistic clouds and dramatic sunsets. The page ships Prizma, Prizma Visuals 2.1 and the new 2.2.",
    downloadLink: "https://mcpedl.org/prizma-shader-minecraft-pe/",
    downloadText: "Get Prizma Visuals",
    source: "MCPEDL",
    meta: "Prizma Visuals 2.2 · up to 1.26.60 · updated Sep 2026",
    checked: true,
  },
  {
    title: "BSL Shader",
    image: "bsl",
    description:
      "Dynamic lighting, reflective water with ripples, swaying foliage, rich saturated colors, soft shadows and atmospheric skies.",
    downloadLink: "https://edge.forgecdn.net/files/7242/567/BSL%20Shader.mcpack?ft=60f413137182722f5983b79001577d51&bd=zp8g30su1g",
    downloadText: "Download BSL Shader",
    source: "CurseForge CDN",
    checked: false,
  },
  {
    title: "F.O.G. Shader (Dynamic Fog & Mist)",
    image: "/images/fog-shader.jpg",
    description: "Real volumetric mist, shifting atmospheric weather fog, and deep oceanic underwater lighting for modern Bedrock.",
    downloadLink: "https://mcpedl.org/fog-shader-minecraft-pe/",
    downloadText: "Get F.O.G. Shader",
    source: "MCPEDL",
    meta: "Render Dragon verified · 1.20 – 1.26",
    checked: true,
  },
  {
    title: "Enchanted HSPE Shaders",
    image: "/images/enchanted-hspe.jpg",
    description: "Vibrant fantasy color grading, waving grass, realistic sun shafts, and reflective puddle effects designed for 60 FPS mobile.",
    downloadLink: "https://mcpedl.org/enchanted-hspe-shaders/",
    downloadText: "Get Enchanted HSPE",
    source: "MCPEDL",
    meta: "Optimized mobile profile · high FPS",
    checked: true,
  },
  {
    title: "Ale Shader v1.2",
    image: "/images/ale-shader.jpg",
    description: "Crisp illumination, warm torchlight, realistic starscapes, and clean water transparency for mobile Bedrock Render Dragon.",
    downloadLink: "https://mcpedl.com/ale-shader/",
    downloadText: "Get Ale Shader",
    source: "MCPEDL",
    meta: "Render Dragon compatible · v1.2",
    checked: true,
  },
  {
    title: "Defined PBR (Ray Tracing RTX)",
    image: "/images/defined-pbr.jpg",
    description: "Official vanilla-matched PBR raytracing material pack with normal maps, height maps, and true specular block reflections.",
    downloadLink: "https://mcpedl.com/defined-pbr-an-rtx-resource-pack/",
    downloadText: "Get Defined PBR (RTX)",
    source: "MCPEDL",
    meta: "DirectX Raytracing (DXR) · 16x/64x vanilla PBR",
    checked: true,
  },

  {
    title: "YSS Render Dragon Shader (YSSBE)",
    image: "/images/yss-shader.jpg",
    description: "Cutting-edge Render Dragon visual pack featuring realistic sun glare, dynamic atmospheric fog, bounce lighting, and mirrored water reflections.",
    downloadLink: "https://mcpedl.com/yss-shader/",
    downloadText: "Get YSS Shader",
    source: "MCPEDL",
    meta: "Render Dragon compatible · PBR reflections",
    checked: true,
  },
  {
    title: "Kamii Shader Ultra",
    image: "/images/kamii-shader.jpg",
    description: "Ultra-optimized lightweight shader engineered specifically for Android & iOS phones: soft shadows, natural sun shafts, and solid 60 FPS.",
    downloadLink: "https://mcpedl.com/kamii-shader/",
    downloadText: "Get Kamii Shader",
    source: "MCPEDL",
    meta: "60 FPS mobile profile · soft shadows",
    checked: true,
  },
  {
    title: "Hyra Shaders PE",
    image: "/images/hyra-shader.jpg",
    description: "Rich saturated fantasy color palettes, animated drifting cloud layers, waving grass and leaves, and transparent tropical ocean depths.",
    downloadLink: "https://mcpedl.com/hyra-shader/",
    downloadText: "Get Hyra Shaders",
    source: "MCPEDL",
    meta: "Fantasy color grading & wave animations",
    checked: true,
  },
  {
    title: "Haptic Shader",
    image: "/images/haptic-shader.jpg",
    description: "Enhanced visual clarity with warm torchlight, realistic star-filled night skies, waving foliage, and sparkling water for Bedrock Render Dragon.",
    downloadLink: "https://mcpedl.com/haptic-shader/",
    downloadText: "Get Haptic Shader",
    source: "MCPEDL",
    meta: "Vibrant day/night cycle · Render Dragon",
    checked: true,
  },
];

export interface World {
  title: string;
  images: string[];
  description: string;
  disclaimer?: string;
  downloadLink: string;
  downloadText: string;
  format: string;
  source: string;
  checked: boolean;
}

export const WORLDS: World[] = [
  {
    title: "Waterfall & Villager Map",
    images: ["/myworld/1.jpg", "/myworld/2.jpg", "/myworld/3.jpg", "/myworld/4.jpg", "/myworld/5.jpg"],
    description:
      "Nextup Studio's own Bedrock world: custom biomes, a secret waterfall packed with treasure and a fully automatic villager breeder.",
    downloadLink: "https://drive.google.com/file/d/1CWLSfJrlJPjxc75ISYdlI-XGiHkW9-ot/view?usp=drivesdk",
    downloadText: "Download World",
    format: ".mctemplate",
    source: "Google Drive",
    checked: false,
  },
  {
    title: "Techno Gamerz World",
    images: ["/Op/1.jpg", "/Op/4.jpg", "/Op/2.jpg", "/Op/3.jpg"],
    description:
      "The iconic survival world seen in Techno Gamerz's YouTube series, ready to play on Minecraft Bedrock.",
    disclaimer: "Fan download only; all credit and rights to Techno Gamerz (Ujjwal Chaurasia).",
    downloadLink: "https://www.mediafire.com/file/rrw0dz8ki8w8edg/techno-gamerz-world.mcworld/file",
    downloadText: "Download World",
    format: ".mcworld",
    source: "MediaFire",
    checked: false,
  },
  {
    title: "Skyblock Bedrock Edition",
    images: ["/images/skyblock-pe-1.jpg", "/images/skyblock-pe-2.jpg"],
    description: "Optimized void survival challenge map for Minecraft Bedrock with 12 themed biome islands and custom merchant trading halls.",
    downloadLink: "https://mcpedl.com/skyblock-bedrock-edition/",
    downloadText: "Download Skyblock PE",
    format: ".mcworld",
    source: "MCPEDL",
    checked: true,
  },
  {
    title: "OneBlock PE Survival",
    images: ["/images/oneblock-1.jpg", "/images/oneblock-2.jpg"],
    description: "You spawn on an infinite regenerating block! Mine the block to evolve through 10 progressive world phases from Forest to End.",
    downloadLink: "https://mcpedl.com/one-block-map-1/",
    downloadText: "Download OneBlock",
    format: ".mcworld",
    source: "MCPEDL",
    checked: true,
  },
  {
    title: "Parkour Spiral Bedrock",
    images: ["/images/parkour-spiral-1.jpg", "/images/parkour-spiral-2.jpg"],
    description: "Climb a colossal spiral tower featuring 100 uniquely themed parkour challenges, checkpoint flags, and speedrun timers.",
    downloadLink: "https://mcpedl.com/parkour-spiral-map/",
    downloadText: "Download Parkour Spiral",
    format: ".mcworld",
    source: "MCPEDL",
    checked: true,
  },
  {
    title: "Modern Redstone Smart City",
    images: ["/images/smart-city-1.jpg", "/images/smart-city-2.jpg"],
    description: "Metropolitan megacity featuring automatic redstone subways, functional elevators, keycard hotel rooms, and luxury furnished villas.",
    downloadLink: "https://mcpedl.com/modern-smart-city-map/",
    downloadText: "Download Smart City",
    format: ".mcworld",
    source: "MCPEDL",
    checked: true,
  },

  {
    title: "Grand Medieval Citadel & Castle",
    images: ["/images/medieval-citadel-1.jpg", "/images/medieval-citadel-2.jpg"],
    description: "Colossal coastal medieval fortress with fortified ramparts, a towering royal cathedral, busy marketplace docks, and hidden catacombs.",
    downloadLink: "https://mcpedl.com/medieval-castle-map/",
    downloadText: "Download Citadel",
    format: ".mcworld",
    source: "MCPEDL",
    checked: true,
  },
  {
    title: "Underground Secret Vault Bunker",
    images: ["/images/secret-bunker-1.jpg", "/images/secret-bunker-2.jpg"],
    description: "Multi-level subterranean survival shelter hidden under bedrock with password-locked blast doors, hydroponic crop farms, and auto storage.",
    downloadLink: "https://mcpedl.com/ultimate-secret-bunker/",
    downloadText: "Download Bunker",
    format: ".mcworld",
    source: "MCPEDL",
    checked: true,
  },
  {
    title: "The Mega Dropper Bedrock",
    images: ["/images/mega-dropper-1.jpg", "/images/mega-dropper-2.jpg"],
    description: "30+ high-velocity freefall stages! Dodge obstacles, laser rings, and floating islands at breakneck speed before landing safely in the water.",
    downloadLink: "https://mcpedl.com/mega-dropper-pe/",
    downloadText: "Download Mega Dropper",
    format: ".mcworld",
    source: "MCPEDL",
    checked: true,
  },
  {
    title: "Escape Room: Haunted Manor",
    images: ["/images/escape-manor-1.jpg", "/images/escape-manor-2.jpg"],
    description: "Interactive mystery escape puzzle! Explore a haunted mansion, uncover hidden cipher codes, and solve redstone contraptions to unlock the exit.",
    downloadLink: "https://mcpedl.com/escape-room-manor/",
    downloadText: "Download Escape Manor",
    format: ".mcworld",
    source: "MCPEDL",
    checked: true,
  },
];

export const WORLD_UPDATES = [
  "Techno Gamerz World for Bedrock now ready for instant download!",
  "Hidden Waterfall: adventure treasure spot improved.",
  "Villager Breeder: easiest auto-farming and trading system added.",
  "Site speed and gallery improved for all devices.",
];

export const SOCIAL = {
  github: "https://github.com/shreyagarwal72",
  instagram: "https://instagram.com/hereyourchampion",
  youtube: "https://youtube.com/@nextupstudioyt",
  email: "hereyourchampion@gmail.com",
};

export const SPLASHES = [
  "Now with 26.60!",
  "Free downloads!",
  "Also try Shaders!",
  "Bedrock approved!",
  "100% pixelated!",
  "Addons galore!",
  "Hello, miner!",
  "Back up your worlds!",
  "Ice Caves are cold!",
  "Crafted by Nextup!",
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Compare dotted numeric versions: >0 when a is newer than b. */
export const compareVersions = (a: string, b: string): number => {
  const pa = a.split(".").map((n) => parseInt(n, 10) || 0);
  const pb = b.split(".").map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
};
