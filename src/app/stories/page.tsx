import type { Metadata } from "next";
import { getAllStories, getFeaturedStory, getPopularStories } from "@/data/stories";
import { StoriesJournalClient } from "./StoriesJournalClient";

export const metadata: Metadata = {
  title: "Bakery Journal | Cake Guides, Celebration Trends & Jaunpur Stories — KidOld Bakers",
  description:
    "Explore editorial insights, cake design guides, 100% pure veg eggless baking secrets, and celebration stories handcrafted by KidOld Bakers in Jaunpur, Uttar Pradesh.",
  keywords: [
    "KidOld Bakers Journal",
    "Bakery Blog Jaunpur",
    "Cake ordering guide Jaunpur",
    "Eggless cake baking science",
    "Celebration cake trends 2025",
    "Custom cakes Jaunpur",
    "Line Bazaar bakery stories",
  ],
  alternates: {
    canonical: "https://kidoldbakers.com/stories",
  },
  openGraph: {
    title: "Bakery Journal | KidOld Bakers Jaunpur",
    description:
      "Artisan celebration guides, eggless baking secrets, and confectionery trends from Jaunpur's premier bakery.",
    url: "https://kidoldbakers.com/stories",
    siteName: "KidOld Bakers",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://kidoldbakers.com/images/hero/hero-celebration-cake.jpg",
        width: 1200,
        height: 630,
        alt: "KidOld Bakers Bakery Journal — Jaunpur, Uttar Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bakery Journal | KidOld Bakers Jaunpur",
    description:
      "Artisan celebration guides, eggless baking secrets, and confectionery trends from Jaunpur.",
    images: ["https://kidoldbakers.com/images/hero/hero-celebration-cake.jpg"],
  },
};

export default function StoriesPage() {
  const allStories = getAllStories();
  const featured = getFeaturedStory();
  const popular = getPopularStories();

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
    ],
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "KidOld Bakers Bakery Journal",
    description:
      "Artisanal baking guides, celebration cake trends, and sweet family stories in Jaunpur, UP.",
    url: "https://kidoldbakers.com/stories",
    publisher: {
      "@type": "Organization",
      name: "KidOld Bakers",
      logo: {
        "@type": "ImageObject",
        url: "https://kidoldbakers.com/images/brand/kidold-logo-clean.png",
      },
    },
    blogPost: allStories.map((story) => ({
      "@type": "BlogPosting",
      headline: story.title,
      description: story.excerpt,
      url: `https://kidoldbakers.com/stories/${story.slug}`,
      datePublished: story.dateISO,
      author: {
        "@type": "Person",
        name: story.author.name,
      },
      image: `https://kidoldbakers.com${story.coverImage}`,
    })),
  };

  return (
    <>
      <section className="hidden" aria-hidden="true">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
      </section>

      <StoriesJournalClient
        initialStories={allStories}
        featuredStory={featured}
        popularStories={popular}
      />
    </>
  );
}
