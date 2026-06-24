import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "http://localhost:3000"; // Replace with your actual production domain

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/private/"], // Add paths you want to hide from search engines
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
