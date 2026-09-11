import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { catalogService } from "@/services/catalogService";
import { PreMadeCakesClient } from "./PreMadeCakesClient";

export const metadata: Metadata = {
  title: "Pre-Made Celebration Cakes | KidOld Bakers Jaunpur",
  description:
    "Explore 14+ freshly baked celebration cakes ready for fast pickup or delivery in Jaunpur: Belgian Chocolate Truffle, Wild Blueberry, Royal Red Velvet, Black Forest, Butterscotch, and more.",
  keywords: [
    "pre-made cakes jaunpur",
    "ready celebration cake jaunpur",
    "birthday cakes line bazaar",
    "pure veg eggless cakes jaunpur",
    "kidold cakes",
  ],
};

export default function PreMadeCakesPage() {
  const products = catalogService
    .getProductsSync()
    .filter((p) => p.categoryId === "pre-made-cakes" || p.categoryId === "celebration-cakes");

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-[#120905] pt-24 pb-20 transition-colors duration-300">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-brand-chocolate/70 dark:text-brand-cream/70">
            <li>
              <Link href="/" className="hover:text-brand-crimson dark:hover:text-brand-gold transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/categories" className="hover:text-brand-crimson dark:hover:text-brand-gold transition-colors">
                Categories
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-brand-crimson dark:text-brand-gold" aria-current="page">
              Pre-Made Cakes
            </li>
          </ol>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <SectionHeading
            badge="Hero Priority • Ready Daily"
            title="Pre-Made Celebration Cakes"
            subtitle="Baked fresh every morning in Line Bazaar with 100% pure vegetarian dairy. Ready for instant store counter pickup or swift doorstep delivery across Jaunpur."
            align="center"
          />
        </div>

        {/* Interactive Client Catalog */}
        <PreMadeCakesClient products={products} />
      </Container>
    </div>
  );
}
