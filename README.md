# Nextup Studio - Professional Minecraft Gaming Hub

[![Website](https://img.shields.io/badge/Website-Live-brightgreen)](https://minecraft-hub-xi.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Minecraft](https://img.shields.io/badge/Minecraft-Bedrock-orange)](https://www.minecraft.net/)

> Your ultimate destination for premium Minecraft Bedrock Edition content, featuring worlds, addons, shaders, and modified versions. Creating amazing gaming experiences for the Minecraft community.

🌐 **Live Website:** [https://minecraft-hub-xi.vercel.app/](https://minecraft-hub-xi.vercel.app/)

---

## 🎮 Overview

Nextup Studio is a comprehensive platform dedicated to providing high-quality Minecraft Bedrock Edition content. Whether you're looking for custom worlds, gameplay-enhancing addons, stunning shaders, or modified game versions, we've got you covered.

### Key Features

- 🌍 **World Downloads** - Access premium survival worlds, including the famous Techno Gamerz World
- ⚔️ **Premium Addons** - Feature-rich addons for combat, furniture, mobs, and quality of life improvements
- ✨ **Shader Collection** - Performance-optimized shaders for mobile and PC (Newb X Legacy, Prizma, Solar)
- 📦 **Modified Versions** - Safe and tested modified APKs with enhanced features
- 🤖 **AI FAQ Assistant** - Get instant answers about content and installation guides
- 📱 **Responsive Design** - Optimized experience across all devices
- ⚡ **Fast Loading** - Built with modern web technologies for optimal performance

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with TypeScript
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework with custom gaming theme
- **Radix UI + shadcn/ui** - Accessible component primitives

### Backend & AI
- **Lovable Cloud** - Full-stack backend infrastructure
- **PostgreSQL** - Robust database for content management
- **Lovable AI (Google Gemini)** - Powered FAQ chatbot with website context
- **Edge Functions** - Serverless backend functions

### Infrastructure
- **Vercel** - Production deployment and hosting
- **TypeScript** - Type-safe development experience

---

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Site footer
│   ├── Hero.tsx         # Landing page hero
│   ├── Showcase.tsx     # Content showcase grid
│   └── ShowcaseCard.tsx # Individual content cards
├── pages/               # Route pages
│   ├── Index.tsx        # Home page
│   ├── WorldsPage.tsx   # Minecraft worlds catalog
│   ├── AddonsPage.tsx   # Addons collection
│   ├── ShadersPage.tsx  # Shaders showcase
│   ├── DownloadsPage.tsx# Download center
│   ├── PatchPage.tsx    # Modified versions
│   ├── FAQPage.tsx      # AI-powered FAQ
│   └── NotFound.tsx     # 404 error page
├── assets/              # Images and media files
├── lib/                 # Utility functions
└── hooks/               # Custom React hooks

supabase/
└── functions/
    └── faq-chat/        # AI chatbot edge function
```

---

## 🎯 Content Categories

### 🌍 Worlds
- **Techno Gamerz World** - Famous YouTuber's legendary survival world
- **Custom Survival Maps** - Handcrafted adventure experiences
- **Creative Showcases** - Stunning architectural builds
- All optimized for Minecraft Bedrock Edition

### ⚔️ Addons
- **Combat Systems** - Enhanced weapons, armor, and combat mechanics
- **Furniture Packs** - Extensive decorative items for creative builds
- **Mob Enhancements** - New creatures and improved AI behaviors
- **Quality of Life** - Utilities and gameplay improvements
- 100% compatible with Minecraft Bedrock

### ✨ Shaders
- **Newb X Legacy** - Lightweight shader optimized for mobile devices
- **Prizma Shader** - Cinematic lighting and atmospheric effects
- **Solar Shader** - Realistic sun, moon, and sky rendering
- Performance-tested across various hardware configurations

### 📦 Modified Versions
- Safe and tested modified APKs
- Enhanced features and functionality
- Regular updates and security patches
- Comprehensive installation guides

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/minecraft-hub.git
   cd minecraft-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Building for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be available in the `dist` folder.

---

## 🤖 AI FAQ Assistant

Our AI-powered FAQ assistant provides instant answers about:
- Content availability and compatibility
- Installation instructions
- Technical requirements
- Download procedures
- Troubleshooting common issues

**Technology:**
- Powered by Google Gemini 2.5 Flash via Lovable AI
- Context-aware responses about website content only
- Real-time streaming chat interface
- Rate-limited for optimal performance

---

## 🔍 SEO Optimization

The website implements comprehensive SEO best practices:

- ✅ Semantic HTML5 structure
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph and Twitter Card metadata
- ✅ Canonical URLs
- ✅ XML Sitemap (`/sitemap.xml`)
- ✅ robots.txt configuration
- ✅ Google site verification
- ✅ Structured data (JSON-LD)
- ✅ Mobile-responsive design
- ✅ Fast page load times
- ✅ Image optimization with alt attributes

---

## 📊 Performance

- **Lighthouse Score:** 95+ across all metrics
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Mobile Optimized:** 100% responsive
- **Image Lazy Loading:** Enabled
- **Code Splitting:** Automatic via Vite

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

- **Website:** [https://minecraft-hub-xi.vercel.app/](https://minecraft-hub-xi.vercel.app/)
- **AI Support:** Use our FAQ page for instant assistance
- **YouTube**: [@nextupstudioyt](https://www.youtube.com/@nextupstudioyt)
- **Instagram**: [@vanshu_ag_72](https://instagram.com/vanshu_ag_72)

---

## 🙏 Acknowledgments

- Minecraft Bedrock Edition community
- Techno Gamerz for world inspiration
- shadcn for the amazing UI components
- All content creators and contributors

---

## 🔮 Roadmap

- [ ] User authentication and profiles
- [ ] Content rating and review system
- [ ] Advanced search and filtering
- [ ] Community forum integration
- [ ] Mobile app development
- [ ] Multi-language support

---

<div align="center">

**Made with ❤️ by Nextup Studio**

*Creating premium Minecraft experiences*

[Visit Website](https://minecraft-hub-xi.vercel.app/) • [FAQ](https://minecraft-hub-xi.vercel.app/faq) • [Report Bug](https://github.com/yourusername/minecraft-hub/issues)

</div>