
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { OpenAccountSection } from "@/components/sections/open-account-section";
import { LoanProductsSection } from "@/components/sections/loan-products-section";
import { SmartCardSection } from "@/components/sections/smart-card-section";
import { ApplicationStatusSection } from "@/components/sections/application-status-section";
import { CustomerCareSection } from "@/components/sections/customer-care-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ClientOnly } from "@/components/client-only";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ClientOnly>
          <HeroSection />
        </ClientOnly>
        <OpenAccountSection />
        <LoanProductsSection />
        <SmartCardSection />
        <ClientOnly>
          <ApplicationStatusSection />
        </ClientOnly>
        <CustomerCareSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
