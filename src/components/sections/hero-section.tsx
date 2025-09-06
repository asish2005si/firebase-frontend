import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-r from-primary to-secondary">
      <div className="container grid lg:grid-cols-2 gap-8 items-center min-h-[60vh] py-20">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground font-headline tracking-tight">
            Banking Made <span className="text-accent">Smarter</span>, Not Harder
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto lg:mx-0">
            Experience a new era of banking with personalized services, seamless digital access, and expert financial guidance. Your future starts with Smart Bank.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform duration-300 hover:scale-105">
              Open Account
            </Button>
            <Button size="lg" variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg transition-transform duration-300 hover:scale-105">
              Login to Smart Bank
            </Button>
          </div>
        </div>
        <div className="hidden lg:block">
            {/* You can add an illustration or image here */}
        </div>
      </div>
    </section>
  );
}
