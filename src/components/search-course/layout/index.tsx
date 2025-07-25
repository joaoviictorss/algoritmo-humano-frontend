/** biome-ignore-all lint/style/noNestedTernary: Using ternary operator */
"use client";

import { Search, X } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CourseSearchLayoutProps } from "../data";

export const CourseSearch = ({
  isOpen,
  selectedIndex,
  inputValue,
  filteredCourses,
  isLoading,
  debouncedSearchQuery,
  inputRef,
  listRef,
  dropdownRef,
  onInputChange,
  onInputFocus,
  onKeyDown,
  onCourseSelect,
  onClearSearch,
  onMouseEnter,
  onMouseDown,
}: CourseSearchLayoutProps) => {
  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          autoComplete="off"
          className="w-full pr-8"
          id="search"
          leftIcon={<Search size={16} />}
          onChange={onInputChange}
          onFocus={onInputFocus}
          onKeyDown={onKeyDown}
          placeholder="Pesquisar curso..."
          ref={inputRef}
          shouldShowError={false}
          value={inputValue}
        />
        {inputValue && (
          <Button
            className="-translate-y-1/2 absolute top-1/2 right-2 h-6 w-6 hover:bg-zinc-100"
            onClick={onClearSearch}
            size="icon"
            variant="ghost"
          >
            <X size={14} />
          </Button>
        )}
      </div>

      {isOpen && inputValue.trim() && (
        <div
          className="absolute top-full right-0 left-0 z-50 mt-1 max-h-80 overflow-y-auto rounded-md border border-zinc-200 bg-white shadow-lg"
          ref={dropdownRef}
        >
          {isLoading ? (
            <div className="p-3 text-center text-sm text-zinc-500">
              Pesquisando...
            </div>
          ) : filteredCourses.length > 0 ? (
            <ul className="py-1" ref={listRef}>
              {filteredCourses.map((course, index) => (
                <li key={course.id}>
                  <button
                    className={cn(
                      "w-full px-3 py-3 text-left text-sm transition-colors hover:bg-zinc-50 focus:bg-zinc-50 focus:outline-none",
                      selectedIndex === index && "bg-zinc-50"
                    )}
                    onClick={(e) => onCourseSelect(course, e)}
                    onMouseDown={onMouseDown}
                    onMouseEnter={() => onMouseEnter(index)}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {course.imageUrl ? (
                          <div className="relative h-12 w-16 overflow-hidden rounded-md bg-zinc-100">
                            <Image
                              alt={course.title}
                              className="object-cover"
                              fill
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                const fallback = target.parentElement
                                  ?.nextElementSibling as HTMLElement;
                                if (fallback) {
                                  fallback.classList.remove("hidden");
                                }
                              }}
                              sizes="64px"
                              src={course.imageUrl}
                            />
                          </div>
                        ) : null}

                        {/* Fallback quando não há imagem */}
                        <div
                          className={cn(
                            "flex h-12 w-16 items-center justify-center rounded-md bg-zinc-100",
                            course.imageUrl ? "hidden" : "flex"
                          )}
                        >
                          <Search className="text-zinc-400" size={16} />
                        </div>
                      </div>

                      {/* Conteúdo do curso */}
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium text-zinc-900">
                          {course.title}
                        </div>
                        {course.description && (
                          <div className="mt-1 line-clamp-2 text-xs text-zinc-500 leading-relaxed">
                            {course.description}
                          </div>
                        )}

                        {course.author && (
                          <div className="mt-1 text-xs text-zinc-400">
                            Por: {course.author.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : debouncedSearchQuery.trim() ? (
            <div className="p-4 text-center text-sm text-zinc-500">
              <div>Nenhum curso encontrado!</div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
