import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductView } from "@/components/ProductView";
import { Problem, HowItWorks, Integrations, Platform, Audience } from "@/components/Sections";
import { Api } from "@/components/Api";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductView />
        <Problem />
        <HowItWorks />
        <Integrations />
        <Platform />
        <Audience />
        <Api />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
