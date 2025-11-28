import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Nextup Studio</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Nextup Studio to explore Minecraft worlds, addons, shaders, and more." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
          <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
            {/* 404 Number with Gaming Style */}
            <div className="relative">
              <h1 className="gaming-title text-8xl md:text-9xl font-black mb-4">
                404
              </h1>
              <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-primary to-primary-glow -z-10" />
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Oops! The page you're looking for has wandered off into the void. 
                Let's get you back to exploring amazing Minecraft content.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/">
                <Button className="btn-gaming group">
                  <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Back to Home
                </Button>
              </Link>
              
              <Link to="/downloads">
                <Button className="btn-gaming-outline group">
                  <Search className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Browse Downloads
                </Button>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="pt-12 card-gaming inline-block">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                Popular Pages
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/worlds" className="text-primary hover:text-primary-glow transition-colors text-sm font-medium">
                  Worlds
                </Link>
                <span className="text-border">•</span>
                <Link to="/addons" className="text-primary hover:text-primary-glow transition-colors text-sm font-medium">
                  Addons
                </Link>
                <span className="text-border">•</span>
                <Link to="/shaders" className="text-primary hover:text-primary-glow transition-colors text-sm font-medium">
                  Shaders
                </Link>
                <span className="text-border">•</span>
                <Link to="/patch" className="text-primary hover:text-primary-glow transition-colors text-sm font-medium">
                  Patch Downloads
                </Link>
                <span className="text-border">•</span>
                <Link to="/faq" className="text-primary hover:text-primary-glow transition-colors text-sm font-medium">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NotFound;
