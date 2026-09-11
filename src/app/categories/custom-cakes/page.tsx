import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { catalogService } from "@/services/catalogService";
import { CustomCakesClient } from "./CustomCakesClient";

export const metadata: Metadata = {
  title: "Custom Designer Cakes & Bespoke Tiers | KidOld Bakers Jaunpur",
  description:
    "Explore 10 celebration custom cake styles in Jaunpur: Milestone Birthdays, Romantic Anniversaries, Cartoon Themes, Multi-Tier Wedding Banquets, Floral Cascades, and Edible Photo Cakes.",
  keywords: [
    "custom cakes jaunpur",
    "designer cakes jaunpur",
    "wedding cake line bazaar",
    "birthday custom cake jaunpur",
    "kidold cake customizer",
  ],
};

export default function CustomCakesPage() {
  const products = catalogService
    .getProductsSync()
    .filter((p) => p.categoryId === "custom-cakes");

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
              Custom Cakes
            </li>
          </ol>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <SectionHeading
            badge="Hero Priority • Artisan Studio"
            title="Custom Celebration Cakes"
            subtitle="You imagine. We bake. From whimsical kids' cartoon tiers to grand multi-tiered wedding banquets, our master decorators sculpt your dreams into edible art."
            align="center"
          />
        </div>

        {/* Client Component with 3D Studio Bridge & 10 Styles */}
        <CustomCakesClient products={products} />
      </Container>
    </div>
  );
}
