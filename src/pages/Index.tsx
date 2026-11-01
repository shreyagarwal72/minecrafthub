import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import BirthdayCake from "@/components/BirthdayCake";

const Index = () => (
  <Layout flush>
    <BirthdayCake />
    <Hero />
    <Showcase />
  </Layout>
);

export default Index;
