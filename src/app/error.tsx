"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Bakery UI Error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20">
      <Container>
        <div className="max-w-md mx-auto text-center space-y-5 p-8 rounded-3xl bg-white border border-brand-border shadow-bakery">
          <div className="w-16 h-16 rounded-full bg-brand-crimson/10 text-brand-crimson flex items-center justify-center mx-auto text-2xl">
            🧁
          </div>
          <h2 className="text-2xl font-bold font-serif text-brand-chocolate">
            A Little Hiccup in Our Oven
          </h2>
          <p className="text-sm text-brand-chocolate/75 leading-relaxed">
            Something unexpected occurred while serving this page. Please try refreshing or return to our homepage.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" onClick={() => reset()}>
              Try Again
            </Button>
            <Button variant="outline" href="/">
              Back to Home
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
