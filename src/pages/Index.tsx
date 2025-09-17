import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gaming-bg">
      <Header />
      <main>
        <Hero />
        <Showcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
