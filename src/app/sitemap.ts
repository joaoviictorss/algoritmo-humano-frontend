import type { MetadataRoute } from "next";
import type { CoursesResponse } from "@/types";
import { env } from "@/utils";

async function fetchCourses(): Promise<CoursesResponse["courses"]> {
  const apiUrl = env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return [];
  }

  try {
    const url = new URL("/courses", apiUrl);
    url.searchParams.set("limit", "50");
    url.searchParams.set("status", "ACTIVE");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    const data: CoursesResponse = await response.json();
    return data.courses || [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.NEXT_PUBLIC_BASE_URL;

  const courses = await fetchCourses();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl ?? "",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/gerenciar-cursos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const courseUrls: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${baseUrl}/cursos/${course.slug}`,
    lastModified: new Date(course.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...courseUrls];
}
