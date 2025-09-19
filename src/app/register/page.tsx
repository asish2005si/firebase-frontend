
import Link from "next/link";
import { RegistrationForm } from "@/components/register/registration-form";
import { Landmark } from "lucide-react";
import { ClientOnly } from "@/components/client-only";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
      <div className="flex min-h-screen w-full flex-col items-center bg-muted/40">
        <header className="w-full bg-background border-b sticky top-0 z-10">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <Landmark className="h-6 w-6" />
              <span className="text-xl font-bold font-headline">Nexus Bank</span>
            </Link>
             <div className="text-sm">
                Already have online access?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                    Login
                </Link>
            </div>
          </div>
        </header>
        <main className="flex-1 w-full container py-8 md:py-12">
            <Suspense fallback={<div>Loading form...</div>}>
                <RegistrationForm />
            </Suspense>
        </main>
      </div>
  );
}
