
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import placeholderImages from "@/app/lib/placeholder-images.json";

export function HeroSection() {
  const heroImage = placeholderImages["hero-background"];
  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center text-white">
       <Image
        src={heroImage.src}
        alt="Cityscape background"
        fill
        className="object-cover"
        priority
        data-ai-hint={heroImage.hint}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative container text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight">
            Banking Made <span className="text-accent">Smarter</span>, Not Harder
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Experience a new era of banking with personalized services, seamless digital access, and expert financial guidance. Your future starts with Nexus Bank.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/open-account">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform duration-300 hover:scale-105">
                Open Account
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="secondary" className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm shadow-lg transition-transform duration-300 hover:scale-105">
                Login to Nexus Bank
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
