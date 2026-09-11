import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllStories, getStoryBySlug, getRelatedStories } from "@/data/stories";
import { businessData } from "@/data/business";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import {
  CalendarIcon,
  ReadingTimeIcon,
  CakeStudioIcon,
  WhatsAppIcon,
  SparklesIcon,
  CheckIcon,
} from "@/components/icons";
import { SocialShareBar } from "./SocialShareBar";
import { ReadingProgressBar } from "@/components/features/stories/ReadingProgressBar";
import { TableOfContents } from "@/components/features/stories/TableOfContents";
import { StoryTimeline } from "@/components/features/stories/StoryTimeline";
import { LocalJaunpurBadge } from "@/components/features/stories/LocalJaunpurBadge";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getAllStories().map((story) => ({
    slug: story.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const story = getStoryBySlug(params.slug);
  if (!story) {
    return {
      title: "Story Not Found | KidOld Bakers",
    };
  }

  const pageUrl = `https://kidoldbakers.com/stories/${story.slug}`;
  const imageUrl = `https://kidoldbakers.com${story.coverImage}`;

  return {
    title: `${story.metaTitle}`,
    description: story.metaDescription,
    keywords: story.tags,
    authors: [{ name: story.author.name }],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: story.title,
      description: story.metaDescription,
      url: pageUrl,
      siteName: "KidOld Bakers",
      type: "article",
      publishedTime: story.dateISO,
      authors: [story.author.name],
      tags: story.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: story.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.metaDescription,
      images: [imageUrl],
    },
  };
}

export default function StoryArticlePage({ params }: PageProps) {
  const story = getStoryBySlug(params.slug);
  if (!story) {
    notFound();
  }

  const relatedStories = getRelatedStories(story.slug, 2);
  const pageUrl = `https://kidoldbakers.com/stories/${story.slug}`;

  // Extract headings for Table of Contents
  const headings = story.content
    .filter((block) => block.type === "heading")
    .map((block) => ({
      id: block.value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      text: block.value,
    }));

  // Article JSON-LD Schema with LocalBusiness reference
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.title,
    description: story.metaDescription,
    image: `https://kidoldbakers.com${story.coverImage}`,
    datePublished: story.dateISO,
    dateModified: story.dateISO,
    author: {
      "@type": "Person",
      name: story.author.name,
      jobTitle: story.author.role,
    },
    publisher: {
      "@type": "Bakery",
      name: businessData.name,
      image: "https://kidoldbakers.com/images/brand/kidold-logo-clean.png",
      telephone: businessData.phoneRaw,
      email: businessData.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${businessData.addressLine}, ${businessData.landmark}, ${businessData.area}`,
        addressLocality: businessData.city,
        addressRegion: businessData.state,
        postalCode: businessData.pincode,
        addressCountry: "IN",
      },
    },
    about: {
      "@type": "Bakery",
      name: businessData.name,
      telephone: businessData.phoneRaw,
      address: {
        "@type": "PostalAddress",
        streetAddress: businessData.addressLine,
        addressLocality: businessData.city,
        addressRegion: businessData.state,
        postalCode: businessData.pincode,
        addressCountry: "IN",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  // Breadcrumbs JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://kidoldbakers.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bakery Journal",
        item: "https://kidoldbakers.com/stories",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: story.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <ReadingProgressBar />

      <section className="hidden" aria-hidden="true">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </section>

      <article className="pt-28 pb-20 sm:pt-32 sm:pb-24">
        <Container>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-brand-chocolate-light/70 dark:text-brand-cream/60">
              <li>
                <Link
                  href="/"
                  className="hover:text-brand-crimson dark:hover:text-brand-gold transition-colors font-medium"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="select-none text-brand-gold/60">
                /
              </li>
              <li>
                <Link
                  href="/stories"
                  className="hover:text-brand-crimson dark:hover:text-brand-gold transition-colors font-medium"
                >
                  Bakery Journal
                </Link>
              </li>
              <li aria-hidden="true" className="select-none text-brand-gold/60">
                /
              </li>
              <li
                aria-current="page"
                className="font-bold text-brand-chocolate dark:text-brand-cream truncate max-w-[220px] sm:max-w-md"
              >
                {story.title}
              </li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="max-w-3xl mx-auto text-left space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-brand-gold/20 text-brand-chocolate dark:text-brand-gold border border-brand-gold/40 shadow-tactile-sm">
                {story.category}
              </span>
              <div className="flex items-center gap-3 text-xs text-brand-chocolate-light/70 dark:text-brand-cream/60">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-3.5 h-3.5 text-brand-gold" />
                  {story.publishedAt}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ReadingTimeIcon className="w-3.5 h-3.5 text-brand-gold" />
                  {story.readingTime}
                </span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-chocolate dark:text-brand-cream tracking-tight leading-[1.18]">
              {story.title}
            </h1>

            <p className="text-lg sm:text-xl text-brand-chocolate/80 dark:text-brand-cream/80 font-serif italic leading-relaxed">
              {story.subtitle}
            </p>

            {/* Author Byline */}
            <div className="pt-3 flex items-center gap-3 border-t border-brand-border/60 dark:border-brand-gold/20">
              <div className="w-10 h-10 rounded-full medallion-convex-3d bg-brand-gold/25 text-brand-chocolate dark:text-brand-gold flex items-center justify-center font-bold font-serif text-sm border border-brand-gold/50 shrink-0">
                KB
              </div>
              <div>
                <span className="block text-sm font-bold text-brand-chocolate dark:text-brand-cream">
                  {story.author.name}
                </span>
                <span className="text-xs text-brand-chocolate-light/70 dark:text-brand-cream/60">
                  {story.author.role} • Dev Palace, Line Bazaar, Jaunpur
                </span>
              </div>
            </div>
          </header>

          {/* Hero Cover Image Frame */}
          <div className="max-w-4xl mx-auto mb-10 rounded-3xl overflow-hidden border-2 border-brand-gold/40 shadow-tactile relative min-h-[300px] sm:min-h-[460px]">
            <SafeImage
              src={story.coverImage}
              alt={story.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-xs text-white/90 italic drop-shadow-md">
              {story.imageAlt}
            </div>
          </div>

          {/* Article Main Layout: Content + TOC */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Table of Contents Sticky Sidebar (Desktop lg) */}
            {headings.length > 0 && (
              <aside className="hidden lg:block lg:col-span-4 sticky top-24">
                <TableOfContents headings={headings} />
              </aside>
            )}

            {/* Main Article Body */}
            <div className={headings.length > 0 ? "lg:col-span-8" : "max-w-3xl mx-auto"}>
              {/* Mobile Table of Contents */}
              {headings.length > 0 && (
                <div className="lg:hidden mb-6">
                  <TableOfContents headings={headings} />
                </div>
              )}

              {/* Social Share Bar (Top) */}
              <SocialShareBar title={story.title} url={pageUrl} />

              {/* Render Body Content */}
              <div className="py-6 space-y-6 text-brand-chocolate/85 dark:text-brand-cream/85 leading-relaxed font-sans text-base sm:text-lg">
                {story.content.map((block, index) => {
                  if (block.type === "paragraph") {
                    return (
                      <p key={index} className="leading-relaxed">
                        {block.value}
                      </p>
                    );
                  }

                  if (block.type === "heading") {
                    const headingId = block.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "");

                    return (
                      <h2
                        key={index}
                        id={headingId}
                        className="scroll-mt-28 font-serif text-2xl sm:text-3xl font-bold text-brand-chocolate dark:text-brand-cream pt-6 pb-1 border-l-4 border-brand-crimson dark:border-brand-gold pl-3"
                      >
                        {block.value}
                      </h2>
                    );
                  }

                  if (block.type === "subheading") {
                    return (
                      <h3
                        key={index}
                        className="font-serif text-xl sm:text-2xl font-bold text-brand-chocolate dark:text-brand-cream pt-4"
                      >
                        {block.value}
                      </h3>
                    );
                  }

                  if (block.type === "quote") {
                    return (
                      <blockquote
                        key={index}
                        className="my-8 p-6 sm:p-8 rounded-2xl bg-brand-gold/10 dark:bg-brand-gold/15 border-l-4 border-brand-gold italic font-serif text-lg sm:text-xl text-brand-chocolate dark:text-brand-gold-sparkle shadow-tactile-sm relative"
                      >
                        <span className="text-4xl text-brand-gold/40 absolute top-2 left-3 font-serif select-none">
                          “
                        </span>
                        <p className="pl-6">&ldquo;{block.value}&rdquo;</p>
                        {block.author && (
                          <footer className="mt-3 text-right text-xs font-bold font-sans uppercase tracking-wider not-italic text-brand-chocolate-light dark:text-brand-gold/90">
                            — {block.author}
                          </footer>
                        )}
                      </blockquote>
                    );
                  }

                  if (block.type === "callout") {
                    return (
                      <div
                        key={index}
                        className="my-8 p-6 rounded-2xl bg-white dark:bg-[#1D0F0A] border border-brand-gold/50 shadow-tactile space-y-2"
                      >
                        {block.title && (
                          <div className="flex items-center gap-2 font-bold text-brand-crimson dark:text-brand-gold text-sm uppercase tracking-wide">
                            <SparklesIcon className="w-4 h-4" />
                            <span>{block.title}</span>
                          </div>
                        )}
                        <p className="text-sm sm:text-base text-brand-chocolate/85 dark:text-brand-cream/85 leading-relaxed">
                          {block.value}
                        </p>
                      </div>
                    );
                  }

                  if (block.type === "list") {
                    return (
                      <ul key={index} className="my-6 space-y-3 pl-2">
                        {block.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3 text-sm sm:text-base">
                            <span className="w-5 h-5 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                              <CheckIcon className="w-3.5 h-3.5" />
                            </span>
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  return null;
                })}
              </div>

              {/* Story Timeline (Milestones for Flagship Article) */}
              {story.slug === "the-story-of-kidold-bakers-jaunpur-custom-celebration-cakes" && (
                <StoryTimeline />
              )}

              {/* Local Jaunpur Hub Badge (Verified Contact & Directions) */}
              <LocalJaunpurBadge />

              {/* Social Share Bar (Bottom) */}
              <SocialShareBar title={story.title} url={pageUrl} />

              {/* Tags Cloud */}
              <div className="pt-6 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-brand-chocolate-light/70 dark:text-brand-cream/60 mr-1">
                  Topics:
                </span>
                {story.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-brand-cream-biscuit/40 dark:bg-black/30 text-brand-chocolate dark:text-brand-cream border border-brand-border/70 dark:border-brand-gold/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Bio Box */}
              <div className="mt-8 p-6 rounded-3xl bg-white dark:bg-[#1D0F0A] border border-brand-gold/35 shadow-tactile flex items-start gap-4">
                <div className="w-12 h-12 rounded-full medallion-convex-3d bg-brand-gold/25 text-brand-chocolate dark:text-brand-gold flex items-center justify-center font-bold font-serif text-lg shrink-0 border border-brand-gold/50">
                  KB
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-brand-chocolate dark:text-brand-cream">
                    {story.author.name}
                  </h4>
                  <p className="text-xs text-brand-chocolate-light/70 dark:text-brand-cream/60">
                    {story.author.role} at KidOld Bakers
                  </p>
                  <p className="text-xs text-brand-chocolate/80 dark:text-brand-cream/80 pt-1 leading-relaxed">
                    Crafting daily sweet memories, 100% pure vegetarian celebrations, and bespoke tiered masterpieces at Line Bazaar, Dev Palace, Jaunpur.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Stories Section */}
          {relatedStories.length > 0 && (
            <section aria-labelledby="related-stories-heading" className="max-w-4xl mx-auto mt-16 sm:mt-20">
              <div className="flex items-center justify-between pb-3 border-b border-brand-border/60 dark:border-brand-gold/20 mb-8">
                <h2
                  id="related-stories-heading"
                  className="font-serif text-2xl font-bold text-brand-chocolate dark:text-brand-cream"
                >
                  Related Stories &amp; Guides
                </h2>
                <Link
                  href="/stories"
                  className="text-xs font-bold text-brand-crimson dark:text-brand-gold hover:underline"
                >
                  View All Journal Articles →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedStories.map((rel) => (
                  <Card
                    key={rel.slug}
                    className="metallic-card-rim overflow-hidden bg-white dark:bg-[#1D0F0A] border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile hover:shadow-tactile-hover transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative w-full h-44 overflow-hidden">
                        <SafeImage
                          src={rel.coverImage}
                          alt={rel.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#2C1810]/85 text-white backdrop-blur-md border border-brand-gold/30">
                            {rel.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <div className="text-[10px] text-brand-chocolate-light/70 dark:text-brand-cream/60">
                          {rel.publishedAt} • {rel.readingTime}
                        </div>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-brand-chocolate dark:text-brand-cream leading-snug group-hover:text-brand-crimson dark:group-hover:text-brand-gold transition-colors line-clamp-2">
                          <Link href={`/stories/${rel.slug}`}>{rel.title}</Link>
                        </h3>
                        <p className="text-xs text-brand-chocolate/75 dark:text-brand-cream/75 line-clamp-2">
                          {rel.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <Link
                        href={`/stories/${rel.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-brand-crimson dark:text-brand-gold hover:underline"
                      >
                        <span>Read Story</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Bottom Customizer Studio CTA */}
          <section aria-label="Custom cake inquiry CTA" className="max-w-4xl mx-auto mt-16 sm:mt-20">
            <div className="relative rounded-3xl overflow-hidden border-2 border-brand-gold/50 bg-gradient-to-r from-brand-chocolate via-[#3A1E14] to-brand-chocolate-dark text-white p-8 sm:p-12 shadow-chocolate-tactile text-center sm:text-left">
              <div className="max-w-2xl space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-gold/25 border border-brand-gold/50 text-brand-gold-sparkle">
                  <SparklesIcon className="w-3.5 h-3.5" />
                  You Imagine. We Bake.
                </span>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  Inspired by the KidOld Story?
                </h2>

                <p className="text-sm sm:text-base text-brand-cream/85 leading-relaxed">
                  Turn your celebration vision into a handcrafted centerpiece. Design your sponge, fillings, and tiers, or consult with our master decorators on WhatsApp.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    href="/design-my-cake"
                    leftIcon={<CakeStudioIcon className="w-4 h-4 text-brand-gold" />}
                    className="shadow-tactile"
                  >
                    Design My Cake Studio
                  </Button>
                  <Button
                    variant="gold"
                    size="md"
                    href={getWhatsAppInquiryUrl()}
                    isExternal
                    leftIcon={<WhatsAppIcon className="w-4 h-4 text-brand-chocolate" />}
                  >
                    Consult Baker on WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </article>
    </>
  );
}
