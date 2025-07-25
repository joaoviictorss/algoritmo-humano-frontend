"use client";

import { ListFilter, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import {
  CourseCard,
  Dropdown,
  type DropdownOption,
  Pagination,
} from "@/components";
import { Button } from "@/components/ui/button";
import { useGetCourses } from "@/hooks";

export default function Home() {
  const {
    courses,
    pagination,
    isFetching,
    currentSortBy,
    currentSortOrder,
    handleSortChange,
    handlePageChange,
    handleNextPage,
    handlePreviousPage,
  } = useGetCourses({
    initialLimit: 8,
    status: "ACTIVE",
  });

  const sortByOptions: DropdownOption[] = [
    {
      id: "title",
      label: "Título",
      selected: currentSortBy === "title",
      action: () => handleSortChange("title", currentSortOrder),
    },
    {
      id: "createdAt",
      label: "Data de Criação",
      selected: currentSortBy === "createdAt",
      action: () => handleSortChange("createdAt", currentSortOrder),
    },
    {
      id: "updatedAt",
      label: "Última Atualização",
      selected: currentSortBy === "updatedAt",
      action: () => handleSortChange("updatedAt", currentSortOrder),
    },
    {
      id: "duration",
      label: "Duração",
      selected: currentSortBy === "duration",
      action: () => handleSortChange("duration", currentSortOrder),
    },
  ];

  const toggleSortOrder = () => {
    const newOrder = currentSortOrder === "asc" ? "desc" : "asc";
    handleSortChange(currentSortBy, newOrder);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl">Cursos</h1>

        <div className="flex items-center space-x-2">
          <Button
            className="flex items-center gap-2"
            onClick={toggleSortOrder}
            variant="outline"
          >
            <ListFilter
              className={`transition-transform duration-300 ease-in-out ${
                currentSortOrder === "asc" ? "rotate-180" : "rotate-0"
              }`}
              size={20}
            />
          </Button>

          <Dropdown align="end" options={sortByOptions}>
            <Button className="flex items-center gap-2" variant="outline">
              <SlidersHorizontal size={20} />
              Filtros
            </Button>
          </Dropdown>
        </div>
      </div>

      <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(325px,1fr))]">
        {isFetching
          ? Array.from({ length: 8 }, (_, index) => (
              <CourseCard key={index} variant="skeleton" />
            ))
          : courses.map((course) => (
              <Link href={`/cursos/${course.slug}`} key={course.id}>
                <CourseCard course={course} />
              </Link>
            ))}
      </div>
      {pagination && (
        <div className="flex w-full justify-end">
          <Pagination
            onNextPage={handleNextPage}
            onPageChange={handlePageChange}
            onPreviousPage={handlePreviousPage}
            pagination={pagination}
          />
        </div>
      )}
    </div>
  );
}
