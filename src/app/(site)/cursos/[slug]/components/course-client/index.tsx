"use client";

import { ChevronLeft, CirclePlay, Clock, Play, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks";
import type { Course } from "@/types";
import {
  authorData,
  courseContent,
  faqData,
  learningItems,
  reviewsData,
} from "@/utils";
import CourseContentAccordion from "../course-accordion";
import { AuthorTab, FAQTab, OverviewTab, ReviewsTab } from "../tabs";

export default function CourseClient({ course }: { course: Course }) {
  const [activeTab, setActiveTab] = useState("overview");

  const isMobile = useIsMobile();

  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      {/* Título e informações básicas */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div className="flex gap-4">
          <Button
            onClick={() => router.push("/")}
            size={"icon"}
            variant={"outline"}
          >
            <ChevronLeft />
          </Button>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-2 sm:justify-start sm:gap-3">
              <h1 className="font-semibold text-xl tracking-normal sm:text-2xl">
                {course.title}
              </h1>

              <Badge className="mt-1" variant={"outline"}>
                UI/UX Design
              </Badge>
            </div>

            <div className="hidden items-center gap-3 text-muted-foreground text-sm sm:flex">
              <div className="flex items-center gap-2">
                <CirclePlay className="text-primary" size={16} />
                <span>38 Lições</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="text-primary" size={16} />
                <span>{course.duration} H</span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="text-primary" size={16} />
                <span>4.5 (126 reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto flex w-full flex-col gap-2 lg:w-fit lg:flex-row lg:justify-end ">
          <Button className="w-full lg:w-fit" variant="outline">
            Compartilhar
          </Button>
          <Button className="w-full lg:w-fit">Se inscrever</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr]">
        {/* Coluna esquerda */}
        <div className="space-y-4">
          <div className="group relative aspect-video cursor-pointer rounded-lg bg-muted">
            <Image
              alt={`Imagem do curso ${course.title}`}
              className="rounded-lg object-cover"
              fill
              priority
              src={course.imageUrl || "/placeholder.jpg"}
              unoptimized
            />
            {/* Botão de play no hover */}
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
                <Play
                  className="ml-1 text-primary"
                  fill="currentColor"
                  size={24}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setActiveTab("overview")}
              size={isMobile ? "sm" : "default"}
              variant={activeTab === "overview" ? "default" : "ghost"}
            >
              Overview
            </Button>
            <Button
              onClick={() => setActiveTab("autor")}
              size={isMobile ? "sm" : "default"}
              variant={activeTab === "autor" ? "default" : "ghost"}
            >
              Autor
            </Button>
            <Button
              onClick={() => setActiveTab("faq")}
              size={isMobile ? "sm" : "default"}
              variant={activeTab === "faq" ? "default" : "ghost"}
            >
              FAQ
            </Button>
            <Button
              onClick={() => setActiveTab("reviews")}
              size={isMobile ? "sm" : "default"}
              variant={activeTab === "reviews" ? "default" : "ghost"}
            >
              Reviews
            </Button>
          </div>

          {activeTab === "overview" && (
            <OverviewTab
              description={course.description}
              learningItems={learningItems}
            />
          )}

          {activeTab === "autor" && <AuthorTab author={authorData} />}

          {activeTab === "faq" && <FAQTab faqs={faqData} />}

          {activeTab === "reviews" && <ReviewsTab reviews={reviewsData} />}
        </div>

        {/* Coluna direita - Conteúdo do Curso */}
        <div className="space-y-4">
          <CourseContentAccordion courseContent={courseContent} />
        </div>
      </div>
    </div>
  );
}
