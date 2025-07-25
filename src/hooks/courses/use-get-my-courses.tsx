import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { httpApi } from "@/infra/http/httpApi";
import type { GetMyCoursesProps, MyCoursesResponse } from "@/types/course";

export const useGetMyCourses = (props: GetMyCoursesProps = {}) => {
  const { title, status } = props;

  const queryKey = useMemo(
    () => ["my-courses", title, status],
    [title, status]
  );

  const query = useQuery({
    queryKey,
    queryFn: async (): Promise<MyCoursesResponse> => {
      const { data: responseData } = await httpApi.get("/me/courses", {
        params: {
          title: title || undefined,
          status,
        },
      });
      return responseData;
    },
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });

  return {
    courses: query.data?.courses || [],
    ...query,
  };
};
