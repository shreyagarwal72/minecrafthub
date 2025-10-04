import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WorldsPage from "./pages/WorldsPage";
import AddonsPage from "./pages/AddonsPage";
import ShadersPage from "./pages/ShadersPage";
import DownloadsPage from "./pages/DownloadsPage";
import PatchPage from "./pages/PatchPage";
import FAQPage from "./pages/FAQPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/worlds" element={<WorldsPage />} />
          <Route path="/addons" element={<AddonsPage />} />
          <Route path="/shaders" element={<ShadersPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/patch" element={<PatchPage />} />
          <Route path="/faq" element={<FAQPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
