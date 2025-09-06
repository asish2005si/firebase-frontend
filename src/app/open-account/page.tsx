
import Link from "next/link";
import { KycForm } from "@/components/open-account/kyc-form";
import { Landmark } from "lucide-react";

export default function OpenAccountPage() {
  return (
      <div className="flex min-h-screen w-full flex-col items-center bg-background">
        <header className="w-full border-b">
          <div className="container flex h-16 items-center">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <Landmark className="h-6 w-6" />
              <span className="text-xl font-bold font-headline">Nexus Bank</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 w-full container py-8">
            <KycForm />
        </main>
      </div>
  );
}
