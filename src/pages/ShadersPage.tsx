import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import solarShaderPreview from "@/assets/solar-shader-preview.jpg";
import newbShaderPreview from "@/assets/newb-shader-preview.jpg";
import prizmaShaderPreview from "@/assets/prizma-shader-preview.jpg";
import bslShaderPreview from "@/assets/bsl-shader-preview.jpg";

const ShadersPage = () => {
  const shaders = [
    { title: "Solar Shader", image: solarShaderPreview, description: "Realistic lighting, beautiful colors, and soft shadows—this shader brings sunlight, smooth skies, and better water to Minecraft Bedrock!", downloadLink: "https://www.mediafire.com/file/nafjf9i03plkupn/Solar-Shader.mcpack/file", downloadText: "Download Solar Shader (.mcpack)" },
    { title: "Newb Shader", image: newbShaderPreview, description: "Easy-to-run, clean shader for all devices. Sharper shadows, brighter skies, cool water, and smooth nights.", downloadLink: "https://www.mediafire.com/file/cradp8pfknq2pe1/Newb.mcpack/file", downloadText: "Download Newb Shader (.mcpack)" },
    { title: "Prizma Shader", image: prizmaShaderPreview, description: "Vibrant lighting, rainbow water effects, realistic clouds, and dramatic sunsets. Pushes Minecraft visuals to new levels!", downloadLink: "https://www.mediafire.com/file/lw7k9vzvj9yxkt8/Prizma.mcpack/file", downloadText: "Download Prizma Shader (.mcpack)" },
    { title: "BSL Shader", image: bslShaderPreview, description: "Dynamic lighting, reflective water with ripples, swaying foliage, rich saturated colors, soft shadows, and atmospheric skies.", downloadLink: "https://edge.forgecdn.net/files/7242/567/BSL%20Shader.mcpack?ft=60f413137182722f5983b79001577d51&bd=zp8g30su1g", downloadText: "Download BSL Shader (.mcpack)" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
              <span className="text-glow">Minecraft Shaders</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform your Minecraft world with stunning visual enhancements and realistic lighting
            </p>
          </div>

          <div className="space-y-8">
            {shaders.map((shader, index) => (
              <section key={index} className="card-gaming glass-shine p-6 animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-full max-w-4xl aspect-video mb-5 rounded-xl overflow-hidden">
                    <img src={shader.image} alt={`${shader.title} Preview`} className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary mb-3">{shader.title}</h2>
                  <p className="text-muted-foreground mb-5 max-w-2xl text-sm leading-relaxed">{shader.description}</p>
                  <Button asChild className="btn-gaming mb-3">
                    <a href={shader.downloadLink} download>{shader.downloadText}</a>
                  </Button>
                  <p className="text-primary text-xs">
                    <strong>How to use:</strong> Download & open the .mcpack file in Minecraft Bedrock. Enable it from Resource Packs.
                  </p>
                </div>
              </section>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-muted-foreground text-sm">
              <strong>Follow:</strong>{" "}
              <a href="https://instagram.com/vanshu_ag_72" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@vanshu_ag_72</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShadersPage;
