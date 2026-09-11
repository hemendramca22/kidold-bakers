import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import { CardTiltWrapper } from "@/components/ui/CardTiltWrapper";
import { CakeStudioIcon, WhatsAppIcon, FreshBakerIcon } from "@/components/icons";
import { catalogService } from "@/services/catalogService";
import { resolveCatalogImage } from "@/types/category";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Categories & Artisan Creations | KidOld Bakers Jaunpur",
  description:
    "Explore our complete bakery collection: Pre-Made Celebration Cakes, Bespoke Custom Cakes, Artisan Single-Portion Pastries, and Fresh Savories & Beverages at Line Bazaar, Jaunpur.",
  keywords: [
    "KidOld Bakers categories",
    "pre-made cakes jaunpur",
    "custom cakes jaunpur",
    "pastries jaunpur",
    "bakery cafe line bazaar",
  ],
};

export default function CategoriesPage() {
  const heroCategories = catalogService.getHeroCategoriesSync();
  const primaryCategories = catalogService.getPrimaryCategoriesSync();
  const supportingCategories = catalogService.getSupportingCategoriesSync();

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-[#120905] pt-24 pb-20 transition-colors duration-300">
      <Container>
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-brand-chocolate/70 dark:text-brand-cream/70">
            <li>
              <Link href="/" className="hover:text-brand-crimson dark:hover:text-brand-gold transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-brand-crimson dark:text-brand-gold" aria-current="page">
              Categories
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <SectionHeading
            badge="Culinary Hierarchy"
            title="KidOld Bakers Creations"
            subtitle="Cakes first. Pastries second. Handcrafted bakery savories and cafe refreshments — every item baked 100% pure eggless in Line Bazaar, Jaunpur."
            align="center"
          />
        </div>

        {/* ========================================================
            TIER 1: HERO PRIORITY — CELEBRATION & CUSTOM CAKES
            ======================================================== */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-brand-border/60 dark:border-brand-gold/20">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-crimson animate-pulse" />
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-brand-chocolate dark:text-brand-cream">
                  Cakes <span className="text-sm font-sans font-normal text-brand-apricot dark:text-brand-gold tracking-wide uppercase">(Hero Priority)</span>
                </h2>
              </div>
              <p className="text-sm text-brand-chocolate/75 dark:text-brand-cream/80 mt-1">
                Our centerpiece creations — ready for instant pickup or bespoke engineered to your celebration blueprint.
              </p>
            </div>
            <Link
              href="/design-my-cake"
              className="hidden sm:inline-flex items-center text-xs font-bold text-brand-crimson dark:text-brand-gold hover:underline"
            >
              <CakeStudioIcon className="w-4 h-4 mr-1.5" />
              Open 3D Cake Studio →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {heroCategories.map((cat) => {
              const imageAsset = resolveCatalogImage(cat.image, cat.name);
              const isCustom = cat.slug === "custom-cakes";

              return (
                <CardTiltWrapper key={cat.id} className="category-card-item h-full">
                  <Card className="group flex flex-col h-full bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile dark:shadow-[0_12px_32px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(245,197,66,0.2)] hover:border-brand-gold/60 dark:hover:border-brand-gold transition-all duration-300">
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-brand-cream-warm dark:bg-[#150A06]">
                      <SafeImage
                        src={imageAsset.src}
                        alt={imageAsset.alt}
                        fallbackLabel={cat.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                      {/* Badge */}
                      <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
                        <Badge
                          variant={cat.badgeVariant === "crimson" ? "crimson" : "gold"}
                          className="font-bold shadow-tactile-sm"
                        >
                          {cat.badge || "Hero Priority"}
                        </Badge>
                        <Badge variant="neutral" className="bg-black/50 text-white border-white/30 backdrop-blur-sm text-[11px]">
                          100% Pure Veg
                        </Badge>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                        <span className="text-xs uppercase tracking-wider font-bold metallic-gold-text">
                          {cat.itemCountDescription}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-brand-chocolate dark:text-brand-cream group-hover:text-brand-crimson dark:group-hover:text-brand-gold transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-sm font-semibold text-brand-apricot dark:text-brand-gold mt-1">
                          {cat.tagline}
                        </p>
                        <p className="text-sm text-brand-chocolate/75 dark:text-brand-cream/80 mt-3 leading-relaxed">
                          {cat.description}
                        </p>

                        {/* Subcategory pills */}
                        {cat.subcategories && cat.subcategories.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {cat.subcategories.map((sub) => (
                              <span
                                key={sub.id}
                                className="text-[11px] px-2.5 py-1 rounded-full bg-brand-cream dark:bg-[#2A150D] text-brand-chocolate/80 dark:text-brand-cream/80 border border-brand-border/40 dark:border-brand-gold/20"
                              >
                                {sub.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-brand-border/50 dark:border-brand-gold/20 flex flex-wrap items-center gap-3">
                        <Link
                          href={cat.routeHref || `/categories/${cat.slug}`}
                          className="btn-3d-tactile flex-1 text-center py-2.5 px-4 rounded-full bg-brand-chocolate text-white dark:bg-brand-gold dark:text-brand-chocolate font-bold text-xs uppercase tracking-wider hover:bg-brand-crimson dark:hover:bg-brand-gold-sparkle transition-colors shadow-tactile-sm"
                        >
                          Explore {cat.name} →
                        </Link>
                        {isCustom && (
                          <Link
                            href="/design-my-cake"
                            className="btn-3d-tactile py-2.5 px-4 rounded-full bg-brand-crimson text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-tactile-sm flex items-center"
                          >
                            <CakeStudioIcon className="w-3.5 h-3.5 mr-1.5" />
                            Studio
                          </Link>
                        )}
                      </div>
                    </div>
                  </Card>
                </CardTiltWrapper>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            TIER 2: PRIMARY PRIORITY — ARTISAN PASTRIES
            ======================================================== */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-brand-border/60 dark:border-brand-gold/20">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-brand-chocolate dark:text-brand-cream">
                  Artisan Pastries <span className="text-sm font-sans font-normal text-brand-apricot dark:text-brand-gold tracking-wide uppercase">(Primary Priority)</span>
                </h2>
              </div>
              <p className="text-sm text-brand-chocolate/75 dark:text-brand-cream/80 mt-1">
                Individual single-portion indulgence — authentic pastry slices and desserts baked fresh every morning.
              </p>
            </div>
            <Link
              href="/categories/pastries"
              className="text-xs font-bold text-brand-crimson dark:text-brand-gold hover:underline"
            >
              View All Pastry Slices →
            </Link>
          </div>

          {primaryCategories.map((cat) => {
            const imageAsset = resolveCatalogImage(cat.image, cat.name);

            return (
              <CardTiltWrapper key={cat.id} className="category-card-item">
                <Card className="group overflow-hidden bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile dark:shadow-[0_12px_32px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(245,197,66,0.2)] hover:border-brand-gold/60 dark:hover:border-brand-gold transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="relative h-64 sm:h-80 lg:h-full lg:col-span-5 overflow-hidden bg-brand-cream-warm dark:bg-[#150A06]">
                      <SafeImage
                        src={imageAsset.src}
                        alt={imageAsset.alt}
                        fallbackLabel={cat.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <Badge variant="gold" className="font-bold shadow-tactile-sm">
                          {cat.badge || "Primary Priority"}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                        <span className="text-xs uppercase tracking-wider font-bold metallic-gold-text">
                          {cat.itemCountDescription}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 lg:p-10 lg:col-span-7 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="inline-flex items-center space-x-2 text-xs font-bold text-brand-apricot dark:text-brand-gold uppercase tracking-wider">
                          <FreshBakerIcon className="w-4 h-4" />
                          <span>Single-Serving Daily Fresh Patisserie</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-brand-chocolate dark:text-brand-cream mt-2 group-hover:text-brand-crimson dark:group-hover:text-brand-gold transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-sm font-semibold text-brand-apricot dark:text-brand-gold mt-1">
                          {cat.tagline}
                        </p>
                        <p className="text-sm text-brand-chocolate/75 dark:text-brand-cream/80 mt-3 leading-relaxed">
                          {cat.description}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                          <div className="p-3 rounded-lg bg-brand-cream/60 dark:bg-[#2A150D] border border-brand-border/40 dark:border-brand-gold/15">
                            <span className="block text-xs font-bold text-brand-chocolate dark:text-brand-cream">Chocolate Truffle</span>
                            <span className="text-[11px] text-brand-chocolate/70 dark:text-brand-cream/70">55% Belgian Ganache</span>
                          </div>
                          <div className="p-3 rounded-lg bg-brand-cream/60 dark:bg-[#2A150D] border border-brand-border/40 dark:border-brand-gold/15">
                            <span className="block text-xs font-bold text-brand-chocolate dark:text-brand-cream">Red Velvet</span>
                            <span className="text-[11px] text-brand-chocolate/70 dark:text-brand-cream/70">Cream Cheese Frosting</span>
                          </div>
                          <div className="p-3 rounded-lg bg-brand-cream/60 dark:bg-[#2A150D] border border-brand-border/40 dark:border-brand-gold/15">
                            <span className="block text-xs font-bold text-brand-chocolate dark:text-brand-cream">Black Forest</span>
                            <span className="text-[11px] text-brand-chocolate/70 dark:text-brand-cream/70">Sour Cherries & Flakes</span>
                          </div>
                          <div className="p-3 rounded-lg bg-brand-cream/60 dark:bg-[#2A150D] border border-brand-border/40 dark:border-brand-gold/15">
                            <span className="block text-xs font-bold text-brand-chocolate dark:text-brand-cream">Butterscotch</span>
                            <span className="text-[11px] text-brand-chocolate/70 dark:text-brand-cream/70">Handmade Praline</span>
                          </div>
                          <div className="p-3 rounded-lg bg-brand-cream/60 dark:bg-[#2A150D] border border-brand-border/40 dark:border-brand-gold/15">
                            <span className="block text-xs font-bold text-brand-chocolate dark:text-brand-cream">Fruit Gateau</span>
                            <span className="text-[11px] text-brand-chocolate/70 dark:text-brand-cream/70">Glazed Seasonal Fruits</span>
                          </div>
                          <div className="p-3 rounded-lg bg-brand-cream/60 dark:bg-[#2A150D] border border-brand-border/40 dark:border-brand-gold/15">
                            <span className="block text-xs font-bold text-brand-chocolate dark:text-brand-cream">Cheesecake</span>
                            <span className="text-[11px] text-brand-chocolate/70 dark:text-brand-cream/70">Blueberry Graham Crust</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-brand-border/50 dark:border-brand-gold/20 flex flex-wrap items-center justify-between gap-4">
                        <span className="text-xs text-brand-chocolate/70 dark:text-brand-cream/70 font-medium">
                          Available for counter dining, takeaway boxes & WhatsApp pickup
                        </span>
                        <Link
                          href={cat.routeHref || `/categories/${cat.slug}`}
                          className="btn-3d-tactile py-2.5 px-6 rounded-full bg-brand-chocolate text-white dark:bg-brand-gold dark:text-brand-chocolate font-bold text-xs uppercase tracking-wider hover:bg-brand-crimson dark:hover:bg-brand-gold-sparkle transition-colors shadow-tactile-sm"
                        >
                          Explore Pastry Showcase →
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </CardTiltWrapper>
            );
          })}
        </div>

        {/* ========================================================
            TIER 3: SUPPORTING SAVORIES & BEVERAGES
            ======================================================== */}
        <div>
          <div className="mb-6 pb-3 border-b border-brand-border/60 dark:border-brand-gold/20">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-chocolate/60 dark:bg-brand-cream/60" />
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-brand-chocolate dark:text-brand-cream">
                Savories & Cafe Beverages <span className="text-sm font-sans font-normal text-brand-apricot dark:text-brand-gold tracking-wide uppercase">(Supporting Menu)</span>
              </h2>
            </div>
            <p className="text-sm text-brand-chocolate/75 dark:text-brand-cream/80 mt-1">
              Freshly toasted breads, stone-deck pizzas, crispy Line Bazaar patties, and barista-brewed sips.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {supportingCategories.map((cat) => {
              const imageAsset = resolveCatalogImage(cat.image, cat.name);

              return (
                <CardTiltWrapper key={cat.id} className="category-card-item">
                  <Card className="group flex flex-col h-full bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile dark:shadow-[0_12px_32px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(245,197,66,0.2)] hover:shadow-tactile-hover hover:border-brand-gold/60 dark:hover:border-brand-gold transition-all duration-300">
                    <Link
                      href={cat.routeHref || `/categories/${cat.slug}`}
                      className="flex flex-col h-full"
                    >
                      <div className="relative h-48 w-full overflow-hidden bg-brand-cream-warm dark:bg-[#150A06]">
                        <SafeImage
                          src={imageAsset.src}
                          alt={imageAsset.alt}
                          fallbackLabel={cat.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />

                        {cat.badge && (
                          <div className="absolute top-3 left-3 pointer-events-none">
                            <Badge variant="crimson" className="font-bold shadow-tactile-sm text-[11px]">
                              {cat.badge}
                            </Badge>
                          </div>
                        )}

                        <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                          <span className="text-xs uppercase tracking-wider font-bold metallic-gold-text">
                            {cat.itemCountDescription}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-brand-chocolate dark:text-brand-cream font-sans group-hover:text-brand-crimson dark:group-hover:text-brand-gold transition-colors">
                            {cat.name}
                          </h3>
                          <p className="text-xs font-semibold text-brand-apricot dark:text-brand-gold mt-1">
                            {cat.tagline}
                          </p>
                          <p className="text-sm text-brand-chocolate/75 dark:text-brand-cream/80 mt-2.5 leading-relaxed">
                            {cat.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-brand-border/50 dark:border-brand-gold/20 flex items-center justify-between text-xs font-bold text-brand-chocolate dark:text-brand-gold group-hover:text-brand-crimson dark:group-hover:text-brand-gold-sparkle transition-colors duration-200">
                          <span>View Menu & Inquire</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1 text-brand-crimson dark:text-brand-gold">
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Card>
                </CardTiltWrapper>
              );
            })}
          </div>
        </div>

        {/* Global Inquiries Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-gold/40 text-center max-w-2xl mx-auto shadow-tactile">
          <h3 className="text-xl font-bold font-serif text-brand-chocolate dark:text-brand-cream">
            Planning a Party, Gathering, or Bulk Order in Jaunpur?
          </h3>
          <p className="text-sm text-brand-chocolate/75 dark:text-brand-cream/80 mt-2">
            Speak directly with our head baker to coordinate customized cakes, snack boxes, or fresh party spreads.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={getWhatsAppInquiryUrl({})}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d-tactile inline-flex items-center px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 shadow-tactile-sm"
            >
              <WhatsAppIcon className="w-4 h-4 mr-2" />
              Chat on WhatsApp
            </a>
            <Link
              href="/design-my-cake"
              className="btn-3d-tactile inline-flex items-center px-6 py-3 rounded-full bg-brand-crimson text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 shadow-tactile-sm"
            >
              <CakeStudioIcon className="w-4 h-4 mr-2" />
              Design Custom Cake
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
