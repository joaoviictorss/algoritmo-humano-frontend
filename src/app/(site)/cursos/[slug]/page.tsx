import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Course } from "@/types";
import { createMetadata, env } from "@/utils";
import CourseClient from "./components/course-client";

type Props = {
  params: { slug: string };
};

async function getCourse(slug: string): Promise<Course | null> {
  const apiUrl = env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("API URL não configurada");
  }

  try {
    const response = await fetch(`${apiUrl}/courses/${slug}`, {
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return createMetadata({
      title: "Curso não encontrado",
      description:
        "O curso que você procura não foi encontrado ou não está mais disponível.",
      noIndex: true,
    });
  }

  return createMetadata({
    title: `${course.title} - Curso Online`,
    description: `${course.description}. Aprenda com ${
      course.author?.name || "nossos especialistas"
    }. Duração: ${Math.round(course.duration / 60)} horas.`,
    keywords: [
      course.title.toLowerCase(),
      "curso online",
      "programação",
      "desenvolvimento web",
      course.author?.name?.toLowerCase() || "",
      ...course.title.toLowerCase().split(" "),
    ].filter(Boolean),
    image: course.imageUrl || "/og-course-default.png",
    url: `/cursos/${course.slug}`,
    type: "article",
  });
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  return <CourseClient course={course} />;
}
