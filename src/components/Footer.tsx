import { Github, Twitter, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/shreyagarwal72", label: "GitHub" },
    { icon: Twitter, href: "https://instagram.com/vanshu_ag_72", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/@nextupstudioyt", label: "YouTube" },
    { icon: Mail, href: "mailto:contact@nextupstudio.com", label: "Email" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Worlds", href: "/worlds" },
    { name: "Addons", href: "/addons" },
    { name: "Shaders", href: "/shaders" },
    { name: "Downloads", href: "/downloads" },
  ];

  return (
    <footer className="bg-gaming-surface/50 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">Nextup Studio</h3>
            <p className="text-gaming-text-muted mb-6 max-w-md">
              Your ultimate destination for Minecraft worlds, addons, shaders, and downloads. 
              Creating amazing experiences for the Minecraft community.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg bg-gaming-elevated hover:bg-primary/20 text-gaming-text-muted hover:text-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gaming-text mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gaming-text-muted hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-gaming-text mb-4">Support</h4>
            <ul className="space-y-2 text-gaming-text-muted">
              <li>
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  Installation Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gaming-text-muted text-sm">
            © 2024 Nextup Studio. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gaming-text-muted hover:text-primary text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gaming-text-muted hover:text-primary text-sm transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;