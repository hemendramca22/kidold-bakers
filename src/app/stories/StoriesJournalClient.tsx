"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StoryArticle, StoryCategory } from "@/types/story";
import { STORY_CATEGORIES } from "@/data/stories";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import {
  SearchIcon,
  BookOpenIcon,
  CalendarIcon,
  ReadingTimeIcon,
  CakeStudioIcon,
  WhatsAppIcon,
  SparklesIcon,
  ChevronDownIcon,
} from "@/components/icons";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";

interface StoriesJournalClientProps {
  initialStories: StoryArticle[];
  featuredStory: StoryArticle;
  popularStories: StoryArticle[];
}

export function StoriesJournalClient({
  initialStories,
  featuredStory,
  popularStories,
}: StoriesJournalClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | "All">("All");

  // Filtered stories based on category and search query
  const filteredStories = useMemo(() => {
    return initialStories.filter((story) => {
      const matchesCategory =
        selectedCategory === "All" || story.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        story.title.toLowerCase().includes(query) ||
        story.excerpt.toLowerCase().includes(query) ||
        story.category.toLowerCase().includes(query) ||
        story.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialStories, selectedCategory, searchQuery]);

  return (
    <div className="pt-28 pb-20 sm:pt-32 sm:pb-24">
      <Container>
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-brand-chocolate-light/70 dark:text-brand-cream/60">
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
            <li aria-current="page" className="font-bold text-brand-chocolate dark:text-brand-cream">
              Bakery Journal
            </li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header className="max-w-3xl mb-10 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/15 dark:bg-brand-gold/20 border border-brand-gold/40 text-brand-chocolate-dark dark:text-brand-gold-sparkle text-xs font-bold mb-3 shadow-tactile-sm">
            <BookOpenIcon className="w-3.5 h-3.5 text-brand-gold" />
            <span>Bakery Journal &amp; Editorial</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-chocolate dark:text-brand-cream tracking-tight leading-[1.15]">
            Celebration Guides, Confectionery Trends &amp; Jaunpur Stories
          </h1>
          <p className="mt-4 text-base sm:text-lg text-brand-chocolate/80 dark:text-brand-cream/80 leading-relaxed font-sans">
            Explore expert guides on choosing the perfect celebration cakes, the science of 100% pure vegetarian eggless baking, and sweet memories crafted at our Line Bazaar ovens.
          </p>

          {/* Quick Internal Links Strip */}
          <div className="mt-6 flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="font-bold text-brand-chocolate-light/70 dark:text-brand-cream/60 mr-1">
              Jump to:
            </span>
            <a
              href="/#signature-cakes"
              className="btn-3d-tactile px-3 py-1.5 rounded-full border border-brand-border/80 dark:border-brand-gold/30 bg-white/70 dark:bg-black/30 hover:border-brand-gold text-brand-chocolate dark:text-brand-cream transition-colors"
            >
              Signature Cakes
            </a>
            <a
              href="/#categories"
              className="btn-3d-tactile px-3 py-1.5 rounded-full border border-brand-border/80 dark:border-brand-gold/30 bg-white/70 dark:bg-black/30 hover:border-brand-gold text-brand-chocolate dark:text-brand-cream transition-colors"
            >
              Categories
            </a>
            <Link
              href="/design-my-cake"
              className="btn-3d-tactile px-3 py-1.5 rounded-full border border-brand-crimson/30 bg-brand-crimson/10 hover:bg-brand-crimson/20 text-brand-crimson dark:text-[#FFAAB5] font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <CakeStudioIcon className="w-3.5 h-3.5 text-brand-crimson" />
              <span>Design My Cake Studio</span>
            </Link>
            <a
              href="/#visit-us"
              className="btn-3d-tactile px-3 py-1.5 rounded-full border border-brand-border/80 dark:border-brand-gold/30 bg-white/70 dark:bg-black/30 hover:border-brand-gold text-brand-chocolate dark:text-brand-cream transition-colors"
            >
              Visit Bakery
            </a>
          </div>
        </header>

        {/* Search & Topic Filters Bar */}
        <section aria-label="Journal search and category filters" className="mb-12 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="w-4 h-4 text-brand-chocolate-light/60 dark:text-brand-cream/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories, cake guides, trends..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#1D0F0A] border border-brand-border/80 dark:border-brand-gold/30 text-sm text-brand-chocolate dark:text-brand-cream placeholder:text-brand-chocolate-light/50 dark:placeholder:text-brand-cream/40 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all shadow-tactile-sm"
                aria-label="Search stories"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brand-chocolate-light/70 hover:text-brand-chocolate dark:text-brand-cream/60 dark:hover:text-brand-cream"
                  aria-label="Clear search"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results Count */}
            <div className="text-xs text-brand-chocolate-light/70 dark:text-brand-cream/60 font-medium">
              Showing {filteredStories.length} {filteredStories.length === 1 ? "article" : "articles"}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1" role="tablist" aria-label="Article categories">
            {STORY_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn-3d-tactile px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-[#2C1810] text-[#FFFDF7] border border-[#2C1810] shadow-tactile dark:metallic-gold-surface dark:text-[#1A0A04] dark:font-black dark:border-brand-gold/80"
                      : "border border-brand-border/80 dark:border-brand-gold/30 bg-white/70 dark:bg-black/30 text-brand-chocolate/85 dark:text-brand-cream/80 hover:bg-brand-gold/15 dark:hover:bg-brand-gold/20"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* Featured Story Showcase (Visible when not actively searching) */}
        {!searchQuery && selectedCategory === "All" && featuredStory && (
          <section aria-labelledby="featured-story-heading" className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <SparklesIcon className="w-4 h-4 text-brand-gold" />
              <h2
                id="featured-story-heading"
                className="text-xs font-extrabold uppercase tracking-wider text-brand-gold dark:text-brand-gold-sparkle"
              >
                Featured Story
              </h2>
            </div>

            <Card className="metallic-card-rim overflow-hidden bg-white dark:bg-[#1D0F0A] border border-brand-gold/40 dark:border-brand-gold/35 shadow-tactile hover:shadow-tactile-hover transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Image Box */}
                <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[340px] overflow-hidden">
                  <SafeImage
                    src={featuredStory.coverImage}
                    alt={featuredStory.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2C1810]/90 text-white backdrop-blur-md border border-brand-gold/40 shadow-tactile-sm">
                      {featuredStory.category}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs text-brand-chocolate-light/70 dark:text-brand-cream/60">
                      <span className="flex items-center gap-1.5">
                        <CalendarIcon className="w-3.5 h-3.5 text-brand-gold" />
                        {featuredStory.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <ReadingTimeIcon className="w-3.5 h-3.5 text-brand-gold" />
                        {featuredStory.readingTime}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-chocolate dark:text-brand-cream leading-tight hover:text-brand-crimson dark:hover:text-brand-gold transition-colors">
                      <Link href={`/stories/${featuredStory.slug}`}>
                        {featuredStory.title}
                      </Link>
                    </h3>

                    <p className="text-sm sm:text-base text-brand-chocolate/80 dark:text-brand-cream/80 leading-relaxed font-sans">
                      {featuredStory.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-border/60 dark:border-brand-gold/20 flex items-center justify-between">
                    <div className="text-xs">
                      <span className="block font-bold text-brand-chocolate dark:text-brand-cream">
                        {featuredStory.author.name}
                      </span>
                      <span className="text-brand-chocolate-light/70 dark:text-brand-cream/60 text-[11px]">
                        {featuredStory.author.role}
                      </span>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      href={`/stories/${featuredStory.slug}`}
                      className="text-xs shadow-tactile-sm"
                    >
                      Read Story →
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Stories Grid */}
        <section aria-labelledby="all-stories-heading" className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-brand-border/60 dark:border-brand-gold/20">
            <h2
              id="all-stories-heading"
              className="text-lg font-bold font-serif text-brand-chocolate dark:text-brand-cream"
            >
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory === "All"
                ? "Latest Journal Stories"
                : `${selectedCategory} Articles`}
            </h2>
          </div>

          {filteredStories.length === 0 ? (
            <div className="py-16 text-center space-y-4 rounded-3xl bg-white/60 dark:bg-black/20 border border-brand-border/60 dark:border-brand-gold/20 p-8">
              <BookOpenIcon className="w-10 h-10 text-brand-gold/50 mx-auto" />
              <h3 className="text-lg font-bold text-brand-chocolate dark:text-brand-cream">
                No stories found
              </h3>
              <p className="text-sm text-brand-chocolate-light/80 dark:text-brand-cream/70 max-w-md mx-auto">
                We couldn&apos;t find any stories matching your query. Try resetting your filters or exploring our other categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="btn-3d-tactile px-4 py-2 rounded-full text-xs font-bold bg-brand-gold/20 text-brand-chocolate dark:text-brand-gold hover:bg-brand-gold/30 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredStories.map((story) => (
                <Card
                  key={story.slug}
                  className="metallic-card-rim overflow-hidden bg-white dark:bg-[#1D0F0A] border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile hover:shadow-tactile-hover transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Cover Image */}
                    <div className="relative w-full h-48 sm:h-52 overflow-hidden">
                      <SafeImage
                        src={story.coverImage}
                        alt={story.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#2C1810]/85 text-white backdrop-blur-md border border-brand-gold/30 shadow-tactile-sm">
                          {story.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 space-y-2.5">
                      <div className="flex items-center gap-3 text-[11px] text-brand-chocolate-light/70 dark:text-brand-cream/60">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3 text-brand-gold" />
                          {story.publishedAt}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <ReadingTimeIcon className="w-3 h-3 text-brand-gold" />
                          {story.readingTime}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-brand-chocolate dark:text-brand-cream leading-snug group-hover:text-brand-crimson dark:group-hover:text-brand-gold transition-colors line-clamp-2">
                        <Link href={`/stories/${story.slug}`}>
                          {story.title}
                        </Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-brand-chocolate/75 dark:text-brand-cream/75 leading-relaxed line-clamp-3">
                        {story.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-brand-border/40 dark:border-brand-gold/15 flex items-center justify-between">
                    <span className="text-[11px] text-brand-chocolate-light/70 dark:text-brand-cream/60">
                      By {story.author.name}
                    </span>

                    <Link
                      href={`/stories/${story.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-crimson dark:text-brand-gold hover:underline"
                    >
                      <span>Read Story</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </Card>
              ))}

              {/* Graceful "More Confectionery Stories Coming Soon" Card */}
              {!searchQuery && (
                <Card className="metallic-card-rim rounded-3xl border-2 border-dashed border-brand-gold/50 dark:border-brand-gold/35 bg-brand-gold/5 dark:bg-black/25 p-6 sm:p-7 flex flex-col justify-between items-center text-center space-y-4 hover:border-brand-gold hover:bg-brand-gold/10 transition-all min-h-[380px] shadow-tactile-sm">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 dark:bg-brand-gold/25 border border-brand-gold/40 flex items-center justify-center text-brand-gold shrink-0 mt-2 shadow-2xs">
                    <SparklesIcon className="w-6 h-6" />
                  </div>

                  <div className="space-y-2.5">
                    <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-brand-gold/20 text-brand-chocolate dark:text-brand-gold border border-brand-gold/30">
                      Oven Chronicles in Progress
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-chocolate dark:text-brand-cream">
                      More Confectionery Stories Coming Soon
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-chocolate/75 dark:text-brand-cream/70 leading-relaxed max-w-xs mx-auto">
                      Our Jaunpur bakers are penning deep dives into milestone anniversary towers, seasonal mango patisserie, and heirloom eggless techniques.
                    </p>
                  </div>

                  <div className="pt-2 w-full border-t border-brand-border/40 dark:border-brand-gold/15">
                    <a
                      href={getWhatsAppInquiryUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-3d-tactile w-full py-2.5 px-4 rounded-xl border border-brand-gold/40 bg-white/80 dark:bg-brand-chocolate-dark/80 text-xs font-bold text-brand-chocolate dark:text-brand-gold hover:border-brand-gold transition-colors inline-flex items-center justify-center gap-1.5 shadow-tactile-sm"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>Suggest a Topic on WhatsApp</span>
                    </a>
                  </div>
                </Card>
              )}
            </div>
          )}
        </section>

        {/* Bottom CTA: Inspired by something you saw? -> Design My Cake */}
        <section aria-label="Custom cake inquiry CTA" className="mt-16 sm:mt-20">
          <div className="relative rounded-3xl overflow-hidden border-2 border-brand-gold/50 bg-gradient-to-r from-brand-chocolate via-[#3A1E14] to-brand-chocolate-dark text-white p-8 sm:p-12 shadow-chocolate-tactile">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-gold/25 border border-brand-gold/50 text-brand-gold-sparkle">
                <SparklesIcon className="w-3.5 h-3.5" />
                Custom Celebration Studio
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Inspired by something you saw?
              </h2>

              <p className="text-sm sm:text-base text-brand-cream/85 leading-relaxed">
                Bring your dream celebration cake to life. Use our 4-step interactive customizer to select sponge flavors, fillings, tiers, dietary preferences, or upload your inspiration blueprint.
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
    </div>
  );
}
