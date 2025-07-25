/** biome-ignore-all lint/nursery/noShadow: Using for search params */
"use client";

import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { httpApi } from "@/infra/http/httpApi";
import type { CoursesResponse, GetCoursesProps } from "@/types";

export const useGetCourses = (props: GetCoursesProps = {}) => {
  const {
    title,
    status,
    initialSortBy = "createdAt",
    initialSortOrder = "desc",
    initialLimit = 10,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(initialLimit);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSortBy, setCurrentSortBy] = useState(initialSortBy);
  const [currentSortOrder, setCurrentSortOrder] = useState(initialSortOrder);

  const [inputValue, setInputValue] = useState("");
  const debounceRef = useRef<NodeJS.Timeout>(null);

  const handleSearchInputChange = useCallback(
    (value: string) => {
      setInputValue(value);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        setSearchTerm(value);
        if (value !== searchTerm) {
          setCurrentPage(1);
        }
      }, 500);
    },
    [searchTerm]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const queryKey = useMemo(
    () => [
      "courses",
      title,
      status,
      currentSortBy,
      currentSortOrder,
      currentPage,
      currentLimit,
      searchTerm,
    ],
    [
      title,
      status,
      currentSortBy,
      currentSortOrder,
      currentPage,
      currentLimit,
      searchTerm,
    ]
  );

  const query = useQuery({
    queryKey,
    queryFn: async (): Promise<CoursesResponse> => {
      const { data: responseData } = await httpApi.get("/courses", {
        params: {
          title: title || searchTerm || undefined,
          status,
          sortBy: currentSortBy,
          sortOrder: currentSortOrder,
          page: currentPage,
          limit: currentLimit,
        },
      });
      return responseData;
    },
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });

  const handleNextPage = useCallback(() => {
    if (query.data?.pagination.hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [query.data?.pagination.hasNext]);

  const handlePreviousPage = useCallback(() => {
    if (query.data?.pagination.hasPrev) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [query.data?.pagination.hasPrev]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const handlePerRowsChange = useCallback((newPerPage: number, newPage = 1) => {
    setCurrentLimit(newPerPage);
    setCurrentPage(newPage);
  }, []);

  const handleSortChange = useCallback(
    (
      sortBy: "title" | "createdAt" | "updatedAt" | "duration",
      sortOrder: "asc" | "desc" = "desc"
    ) => {
      setCurrentSortBy(sortBy);
      setCurrentSortOrder(sortOrder);
      setCurrentPage(1);
    },
    []
  );

  return {
    courses: query.data?.courses || [],
    pagination: query.data?.pagination,

    ...query,

    currentPage,
    currentLimit,
    searchTerm,
    currentSortBy,
    currentSortOrder,

    inputValue,
    setInputValue: handleSearchInputChange,
    setSearchTerm,

    handleNextPage,
    handlePreviousPage,
    handlePageChange,
    handlePerRowsChange,

    handleSortChange,
    setCurrentSortBy,
    setCurrentSortOrder,
  };
};
