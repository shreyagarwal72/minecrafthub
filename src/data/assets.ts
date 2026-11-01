import customAddonPack from "@/assets/custom-addon-pack.jpg";
import minecraft3DPack from "@/assets/minecraft-3d-pack.jpg";
import solarShaderPreview from "@/assets/solar-shader-preview.jpg";
import newbShaderPreview from "@/assets/newb-shader-preview.jpg";
import prizmaShaderPreview from "@/assets/prizma-shader-preview.jpg";
import bslShaderPreview from "@/assets/bsl-shader-preview.jpg";
import introWelcome from "@/assets/intro-welcome.jpg";
import introWorlds from "@/assets/intro-worlds.jpg";
import introAddons from "@/assets/intro-addons.jpg";
import introShaders from "@/assets/intro-shaders.jpg";
import survivalWorld from "@/assets/survival-world.jpg";
import combatAddon from "@/assets/combat-addon.jpg";
import shaders from "@/assets/shaders.jpg";
import minecraftOfficial from "@/assets/minecraft-official.jpg";
import minecraftPreview from "@/assets/minecraft-main-preview-updated.jpg";

/** Images referenced by key from src/data/content.ts */
const BUNDLED: Record<string, string> = {
  customAddonPack,
  minecraft3DPack,
  solar: solarShaderPreview,
  newb: newbShaderPreview,
  prizma: prizmaShaderPreview,
  bsl: bslShaderPreview,
};

/** Returns a bundled asset for a known key, otherwise the value itself (a URL / public path). */
export const resolveImage = (keyOrUrl: string): string => BUNDLED[keyOrUrl] ?? keyOrUrl;

export const intro = { introWelcome, introWorlds, introAddons, introShaders };
export const showcase = { survivalWorld, combatAddon, shaders, minecraftOfficial, minecraftPreview };
