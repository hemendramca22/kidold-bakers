import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { catalogService } from "@/services/catalogService";
import { PastriesClient } from "./PastriesClient";

export const metadata: Metadata = {
  title: "Artisan Pastries & Single Slices | KidOld Bakers Jaunpur",
  description:
    "Indulge in freshly baked individual pastry slices in Jaunpur: Belgian Chocolate Truffle, Red Velvet Cream Cheese, Black Forest, Butterscotch, Fruit Gateau, and Blueberry Cheesecake.",
  keywords: [
    "artisan pastries jaunpur",
    "pastry slices line bazaar",
    "pure veg eggless pastries jaunpur",
    "chocolate truffle pastry",
    "kidold bakery desserts",
  ],
};

export default function PastriesPage() {
  const products = catalogService
    .getProductsSync()
    .filter((p) => p.categoryId === "pastries" || p.categoryId === "desserts-pastries");

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
              Pastries
            </li>
          </ol>
        </nav>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <SectionHeading
            badge="Primary Priority • Single Portions"
            title="Artisan Pastries & Slices"
            subtitle="Individual single-portion sweetness baked fresh every morning with 100% pure vegetarian dairy. Enjoy at our cafe counter, in curated dessert boxes, or delivered warm to your doorstep."
            align="center"
          />
        </div>

        {/* Client Component */}
        <PastriesClient products={products} />
      </Container>
    </div>
  );
}
