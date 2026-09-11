export type StoryCategory =
  | "Cake Guides"
  | "Celebration Trends"
  | "Eggless Baking"
  | "Jaunpur Stories"
  | "Gifting Ideas";

export type StoryContentBlock =
  | { type: "paragraph"; value: string }
  | { type: "heading"; value: string }
  | { type: "subheading"; value: string }
  | { type: "quote"; value: string; author?: string }
  | { type: "callout"; title?: string; value: string }
  | { type: "list"; items: string[] };

export interface StoryArticle {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: StoryCategory;
  coverImage: string;
  imageAlt: string;
  publishedAt: string;
  dateISO: string;
  readingTime: string;
  featured: boolean;
  popular: boolean;
  author: {
    name: string;
    role: string;
  };
  tags: string[];
  content: StoryContentBlock[];
  relatedSlugs: string[];
  metaTitle: string;
  metaDescription: string;
}
