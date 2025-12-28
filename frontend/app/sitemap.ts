import type { MetadataRoute } from "next";

import { featuredArticles } from "@/lib/site-data";

const baseUrl = "https://trinixjournal.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about-us",
    "/manuscript-submission",
    "/archive",
    "/editorial-board",
    "/journal-policy",
    "/publication-ethics",
    "/search",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: "2025-09-01",
  }));

  const articleRoutes = featuredArticles.map((article) => ({
    url: `${baseUrl}/article/${article.id}`,
    lastModified: "2025-09-01",
  }));

  return [...staticRoutes, ...articleRoutes];
}
