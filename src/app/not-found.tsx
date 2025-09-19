
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Landmark, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-4">
      <div className="max-w-md w-full">
        <Link href="/" className="flex items-center gap-2 justify-center text-primary mb-12">
            <Landmark className="h-8 w-8" />
            <span className="text-3xl font-bold font-headline">Nexus Bank</span>
        </Link>
        <div className="mb-8">
          <SearchX className="h-24 w-24 mx-auto text-destructive" />
        </div>
        <h1 className="text-6xl font-bold text-primary font-headline">404</h1>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">Page Not Found</h2>
        <p className="mt-4 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or maybe you just mistyped the URL.
        </p>
        <div className="mt-8">
          <Link href="/">
            <Button size="lg">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
