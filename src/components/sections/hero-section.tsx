
import { Button } from "@/components/ui/button";
import { ClientOnly } from "@/components/client-only";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-primary to-secondary">
      <div className="container grid lg:grid-cols-1 gap-8 items-center min-h-[60vh] py-20">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground font-headline tracking-tight">
            Banking Made <span className="text-accent">Smarter</span>, Not Harder
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Experience a new era of banking with personalized services, seamless digital access, and expert financial guidance. Your future starts with Nexus Bank.
          </p>
          <ClientOnly>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/open-account">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform duration-300 hover:scale-105">
                  Open Account
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg transition-transform duration-300 hover:scale-105">
                  Login to Nexus Bank
                </Button>
              </Link>
            </div>
          </ClientOnly>
        </div>
      </div>
    </section>
  );
}
