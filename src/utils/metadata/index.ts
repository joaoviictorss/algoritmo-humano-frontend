import type { Metadata } from "next";
import { env } from "@/utils";

const baseUrl = env.NEXT_PUBLIC_BASE_URL;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl as string),
  title: {
    default: "Algoritmo Humano - Cursos de Tecnologia",
    template: "%s | Algoritmo Humano",
  },
  description:
    "Uma plataforma para criadores de conteúdo e consultores possam vender seus cursos e treinamentos dentro de suas comunidades.",
  keywords: [
    "cursos de tecnologia",
    "desenvolvimento web",
    "frontend",
    "backend",
    "javascript",
    "react",
    "nextjs",
    "nodejs",
    "python",
    "devops",
    "algoritmo humano",
    "tecnologia",
    "educação online",
  ],
  authors: [
    {
      name: "Algoritmo Humano",
      url: baseUrl,
    },
  ],
  creator: "Algoritmo Humano",
  publisher: "Algoritmo Humano",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: baseUrl,
    siteName: "Algoritmo Humano",
    title: "Algoritmo Humano - Cursos de Tecnologia",
    description:
      "Aprenda programação e tecnologia com os melhores cursos online. Frontend, Backend, DevOps e muito mais.",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Algoritmo Humano - Cursos de Programação",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@algoritmohumano",
    creator: "@algoritmohumano",
    title: "Algoritmo Humano - Cursos de Programação e Tecnologia",
    description:
      "Aprenda programação e tecnologia com os melhores cursos online. Frontend, Backend, DevOps e muito mais.",
    images: [`${baseUrl}/og-image.png`],
  },
  verification: {
    // TODO: ADICIONAR CODIGO DE VERIFICAÇÃO
    // google:
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      "pt-BR": baseUrl,
    },
  },
  category: "education",
  classification: "Educação e Tecnologia",
  applicationName: "Algoritmo Humano",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export function createMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const ogImage = image ? `${baseUrl}${image}` : `${baseUrl}/og-image.png`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : defaultMetadata.keywords,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type,
      url: fullUrl,
      title: title || (defaultMetadata.title as string),
      description: description || (defaultMetadata.description as string),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || "Algoritmo Humano",
        },
      ],
      siteName: "Algoritmo Humano",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: title || (defaultMetadata.title as string),
      description: description || (defaultMetadata.description as string),
      images: [ogImage],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}
