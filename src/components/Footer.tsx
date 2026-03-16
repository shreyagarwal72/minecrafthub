import { Github, Twitter, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/shreyagarwal72", label: "GitHub" },
    { icon: Twitter, href: "https://instagram.com/vanshu_ag_72", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/@nextupstudioyt", label: "YouTube" },
    { icon: Mail, href: "mailto:contact@nextupstudio.com", label: "Email" },
  ];

  return (
    <footer className="mt-20 border-t border-border/30" style={{ background: 'hsl(220 30% 7% / 0.6)', backdropFilter: 'blur(16px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-3">Nextup Studio</h3>
            <p className="text-muted-foreground text-sm mb-5 max-w-md leading-relaxed">
              Your ultimate destination for Minecraft worlds, addons, shaders, and downloads.
              Creating amazing experiences for the Minecraft community.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2.5 rounded-xl text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'hsl(220 25% 12% / 0.5)', border: '1px solid hsl(220 20% 20% / 0.3)' }}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 tracking-wide uppercase">Contact</h4>
            <div className="space-y-1.5 text-muted-foreground text-sm">
              <p>Email: sanjayvansu1973@gmail.com</p>
              <p>YouTube: @nextupstudioyt</p>
              <p>Instagram: @vanshu_ag_72</p>
              <p>GitHub: shreyagarwal72</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">© 2025 Nextup Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
