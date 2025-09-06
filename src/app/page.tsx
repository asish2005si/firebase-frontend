
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { OpenAccountSection } from "@/components/sections/open-account-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ClientOnly } from "@/components/client-only";
import { LoanSection } from "@/components/sections/loan-section";
import { SmartCardSection } from "@/components/sections/smart-card-section";
import { Chatbot } from "@/components/chatbot/chatbot";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ClientOnly>
          <HeroSection />
          <OpenAccountSection />
          <LoanSection />
          <SmartCardSection />
          <ContactSection />
          <Chatbot />
        </ClientOnly>
      </main>
      <Footer />
    </div>
  );
}
