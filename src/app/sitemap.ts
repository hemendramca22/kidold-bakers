import { MetadataRoute } from "next";
import { getAllStories } from "@/data/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kidoldbakers.com";
  const stories = getAllStories();

  const storyEntries: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${baseUrl}/stories/${story.slug}`,
    lastModified: new Date(story.dateISO),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/design-my-cake`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stories`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
    ...storyEntries,
  ];
}
