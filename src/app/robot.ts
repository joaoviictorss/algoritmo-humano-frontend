import type { MetadataRoute } from "next";
import { env } from "@/utils";

export default function robot(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: [],
    },
    sitemap: `${env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
