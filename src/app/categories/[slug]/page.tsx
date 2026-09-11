import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge, VegIndicator } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import { CardTiltWrapper } from "@/components/ui/CardTiltWrapper";
import { WhatsAppIcon, FreshBakerIcon } from "@/components/icons";
import { catalogService } from "@/services/catalogService";
import { resolveCatalogImage } from "@/types/category";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";

interface CategorySlugPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const categories = catalogService.getCategoriesSync();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategorySlugPageProps): Promise<Metadata> {
  const category = await catalogService.getCategoryBySlug(params.slug);
  if (!category) {
    return {
      title: "Category Not Found | KidOld Bakers",
    };
  }

  return {
    title: `${category.name} | KidOld Bakers Jaunpur`,
    description: `${category.description} Baked fresh daily in Line Bazaar, Jaunpur. 100% pure eggless vegetarian items.`,
    keywords: [
      `${category.name} jaunpur`,
      `kidold ${category.slug}`,
      "line bazaar bakery jaunpur",
      "pure veg cafe jaunpur",
    ],
  };
}

export default async function CategorySlugPage({ params }: CategorySlugPageProps) {
  const { slug } = params;

  // Dedicated routes take precedence if accessed directly via dynamic route
  if (slug === "pre-made-cakes") {
    redirect("/categories/pre-made-cakes");
  }
  if (slug === "custom-cakes") {
    redirect("/categories/custom-cakes");
  }
  if (slug === "pastries") {
    redirect("/categories/pastries");
  }

  const category = await catalogService.getCategoryBySlug(slug);
  if (!category) {
    notFound();
  }

  const products = catalogService.getProductsSync({ categoryId: category.id });
  const heroImage = resolveCatalogImage(category.image, category.name);

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
              {category.name}
            </li>
          </ol>
        </nav>

        {/* Category Hero Banner */}
        <div className="mb-12 p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="gold" className="font-bold text-xs shadow-tactile-sm">
                  {category.badge || "Supporting Menu"}
                </Badge>
                <Badge variant="neutral" className="text-xs border-brand-border dark:border-brand-gold/30">
                  100% Pure Veg
                </Badge>
                <span className="text-xs uppercase tracking-wider font-bold text-brand-apricot dark:text-brand-gold">
                  {category.itemCountDescription}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-chocolate dark:text-brand-cream">
                {category.name}
              </h1>
              <p className="text-sm font-semibold text-brand-apricot dark:text-brand-gold">
                {category.tagline}
              </p>
              <p className="text-sm text-brand-chocolate/75 dark:text-brand-cream/80 leading-relaxed max-w-xl">
                {category.description}
              </p>
              <div className="pt-2 flex items-center space-x-2 text-xs text-brand-chocolate/70 dark:text-brand-cream/70">
                <FreshBakerIcon className="w-4 h-4 text-brand-apricot dark:text-brand-gold" />
                <span>Prepared to order at our Line Bazaar counter</span>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden shadow-tactile">
                <SafeImage
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fallbackLabel={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Items */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((item) => {
              const itemImage = resolveCatalogImage(item.image, item.name);
              const defaultSize = item.weightOptions?.[0] || "Fresh Serving";
              const inquiryUrl = getWhatsAppInquiryUrl({
                cakeName: `${item.name} (${defaultSize})`,
                categoryName: category.name,
              });

              return (
                <CardTiltWrapper key={item.id} className="h-full">
                  <Card className="group flex flex-col h-full bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile dark:shadow-[0_12px_32px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(245,197,66,0.2)] hover:border-brand-gold/60 dark:hover:border-brand-gold transition-all duration-300">
                    <div className="relative h-56 w-full overflow-hidden bg-brand-cream-warm dark:bg-[#150A06]">
                      <SafeImage
                        src={itemImage.src}
                        alt={itemImage.alt}
                        fallbackLabel={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                        <VegIndicator />
                        {item.isSignature && (
                          <Badge variant="gold" className="font-bold text-[10px] shadow-tactile-sm">
                            House Pick
                          </Badge>
                        )}
                      </div>

                      {item.servingGuidance && (
                        <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                          <span className="text-[11px] font-semibold tracking-wide bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-white/90">
                            {item.servingGuidance}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-brand-chocolate dark:text-brand-cream group-hover:text-brand-crimson dark:group-hover:text-brand-gold transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-brand-chocolate/75 dark:text-brand-cream/80 mt-2 leading-relaxed">
                          {item.shortDescription}
                        </p>

                        {/* Flavor / Ingredient Notes */}
                        {item.flavorNotes && item.flavorNotes.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {item.flavorNotes.map((note, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-brand-cream dark:bg-[#2A150D] text-brand-chocolate/80 dark:text-brand-cream/80 border border-brand-border/40 dark:border-brand-gold/15"
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Options */}
                        {item.weightOptions && item.weightOptions.length > 0 && (
                          <div className="mt-3 text-[11px] text-brand-chocolate/70 dark:text-brand-cream/70">
                            <span className="font-bold">Available in: </span>
                            {item.weightOptions.join(" • ")}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-brand-border/50 dark:border-brand-gold/20">
                        <a
                          href={inquiryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-3d-tactile w-full py-2.5 px-4 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-tactile-sm flex items-center justify-center space-x-2"
                        >
                          <WhatsAppIcon className="w-4 h-4" />
                          <span>Order on WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </Card>
                </CardTiltWrapper>
              );
            })}
          </div>
        ) : (
          <div className="p-10 rounded-2xl bg-white dark:bg-[#1D0F0A] text-center border border-brand-border/60 dark:border-brand-gold/30">
            <p className="text-base text-brand-chocolate/80 dark:text-brand-cream/80">
              Fresh daily batch in preparation. Inquire at our Line Bazaar counter or message us directly on WhatsApp.
            </p>
            <div className="mt-6">
              <a
                href={getWhatsAppInquiryUrl({ categoryName: category.name })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d-tactile inline-flex items-center px-6 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider shadow-tactile-sm"
              >
                <WhatsAppIcon className="w-4 h-4 mr-2" />
                Ask Availability on WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/categories"
            className="text-xs font-bold text-brand-chocolate dark:text-brand-gold hover:text-brand-crimson transition-colors"
          >
            ← Back to All Categories
          </Link>
        </div>
      </Container>
    </div>
  );
}
