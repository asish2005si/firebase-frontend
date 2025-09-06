import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { OpenAccountSection } from "@/components/sections/open-account-section";
import { PersonalizedOffersSection } from "@/components/sections/personalized-offers-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <OpenAccountSection />
        <PersonalizedOffersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
