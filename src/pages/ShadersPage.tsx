import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import solarShaderPreview from "@/assets/solar-shader-preview.jpg";
import newbShaderPreview from "@/assets/newb-shader-preview.jpg";
import prizmaShaderPreview from "@/assets/prizma-shader-preview.jpg";

const ShadersPage = () => {
  const shaders = [
    {
      title: "Solar Shader",
      image: solarShaderPreview,
      description: "Realistic lighting, beautiful colors, and soft shadows—this shader brings sunlight, smooth skies, and better water to Minecraft Bedrock! Great for screenshots and daily playing.",
      downloadLink: "https://www.mediafire.com/file/nafjf9i03plkupn/Solar-Shader.mcpack/file",
      downloadText: "Download Solar Shader (.mcpack)"
    },
    {
      title: "Newb Shader", 
      image: newbShaderPreview,
      description: "Easy-to-run, clean shader for all devices. Sharper shadows, brighter skies, cool water, and smooth nights. Perfect if you want performance plus better looks!",
      downloadLink: "https://www.mediafire.com/file/cradp8pfknq2pe1/Newb.mcpack/file",
      downloadText: "Download Newb Shader (.mcpack)"
    },
    {
      title: "Prizma Shader",
      image: prizmaShaderPreview,
      description: "Vibrant lighting, rainbow water effects, realistic clouds, and dramatic sunsets. Prizma Shader pushes Minecraft visuals to new levels—perfect for creative builds and survival worlds!",
      downloadLink: "https://www.mediafire.com/file/shader3/Prizma-Shader.mcpack/file",
      downloadText: "Download Prizma Shader (.mcpack)"
    }
  ];

  return (
    <div className="min-h-screen bg-gaming-bg">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gaming-text mb-4">
              <span className="text-glow">Minecraft Shaders</span>
            </h1>
            <p className="text-xl text-gaming-text-muted max-w-2xl mx-auto">
              Transform your Minecraft world with stunning visual enhancements and realistic lighting
            </p>
          </div>

          <div className="space-y-12">
            {shaders.map((shader, index) => (
              <section 
                key={index}
                className="card-gaming p-8 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-full max-w-4xl aspect-video mb-6 rounded-lg overflow-hidden">
                    <img 
                      src={shader.image} 
                      alt={`${shader.title} Preview`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h2 className="text-3xl font-bold text-primary mb-4">{shader.title}</h2>
                  
                  <p className="text-gaming-text-muted mb-6 max-w-2xl text-lg leading-relaxed">
                    {shader.description}
                  </p>
                  
                  <Button asChild className="btn-gaming mb-4">
                    <a 
                      href={shader.downloadLink} 
                      download
                    >
                      {shader.downloadText}
                    </a>
                  </Button>
                  
                  <div className="text-primary text-sm">
                    <strong>How to use:</strong> Download & open the .mcpack file in Minecraft Bedrock. Enable it from Resource Packs.
                  </div>
                </div>
              </section>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gaming-text-muted">
              <strong>Follow:</strong>{" "}
              <a 
                href="https://instagram.com/vanshu_ag_72" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-glow transition-colors"
              >
                @vanshu_ag_72
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShadersPage;