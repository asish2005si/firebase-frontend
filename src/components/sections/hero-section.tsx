
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import placeholderImages from "@/app/lib/placeholder-images.json";

export function HeroSection() {
  const heroImage = placeholderImages["hero-background"];
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center text-background">
       <Image
        src={heroImage.src}
        alt="Abstract digital grid background"
        fill
        className="object-cover"
        priority
        data-ai-hint={heroImage.hint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight text-white">
            Banking Made <span className="text-accent">Smarter</span>, Not Harder
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Empower your finances with cutting-edge digital banking, personalized insights, and real-time account access — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/open-account">
              <Button size="lg" className="bg-gradient-to-r from-amber-400 to-amber-500 text-primary-foreground hover:from-amber-500 hover:to-amber-500 shadow-lg transition-transform duration-300 hover:scale-105 rounded-full px-8">
                Open Account
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm shadow-lg transition-transform duration-300 hover:scale-105 rounded-full px-8">
                Login to Nexus Bank
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
