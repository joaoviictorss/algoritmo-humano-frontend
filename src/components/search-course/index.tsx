/** biome-ignore-all lint/style/noNestedTernary: Using ternary operator */
"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedFilter, useGetCourses } from "@/hooks";
import type { Course } from "@/types";
import { CourseSearch as Layout } from "./layout";

export const CourseSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { inputValue, setInputValue } = useDebouncedFilter((value) => {
    setDebouncedSearchQuery(value);
    setSelectedIndex(-1);
  }, 300);

  const { courses, isLoading } = useGetCourses({
    title: debouncedSearchQuery.trim() || undefined,
    initialLimit: 8,
    status: "ACTIVE",
  });

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const handleCourseSelect = useCallback(
    (course: Course, event?: React.MouseEvent) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      setIsOpen(false);
      setSelectedIndex(-1);
      setInputValue("");
      setDebouncedSearchQuery("");

      router.push(`/cursos/${course.slug}`);

      if (inputRef.current) {
        inputRef.current.blur();
      }
    },
    [router, setInputValue]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        inputRef.current &&
        !inputRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredCourses.length === 0) {
      if (e.key === "Enter" && inputValue.trim()) {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCourses.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCourses.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && filteredCourses[selectedIndex]) {
          handleCourseSelect(filteredCourses[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  const clearSearch = () => {
    setInputValue("");
    setDebouncedSearchQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const layoutProps = {
    isOpen,
    selectedIndex,
    inputValue,
    filteredCourses,
    isLoading,
    debouncedSearchQuery,
    inputRef,
    listRef,
    dropdownRef,
    onInputChange: handleInputChange,
    onInputFocus: handleInputFocus,
    onKeyDown: handleKeyDown,
    onCourseSelect: handleCourseSelect,
    onClearSearch: clearSearch,
    onMouseEnter: handleMouseEnter,
    onMouseDown: handleMouseDown,
  };

  return <Layout {...layoutProps} />;
};
