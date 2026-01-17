import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Footer from "@/components/Footer";
import BirthdayCake from "@/components/BirthdayCake";

const Index = () => {
  return (
    <div className="min-h-screen bg-gaming-bg">
      <BirthdayCake />
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
