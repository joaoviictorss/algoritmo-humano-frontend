import { useQuery } from "@tanstack/react-query";
import { httpApi } from "@/infra/http/httpApi";
import type { GetMyCoursesProps, MyCoursesResponse } from "@/types/course";

export const useGetMyCourses = (props: GetMyCoursesProps = {}) => {
  const { title, status } = props;

  const query = useQuery({
    queryKey: ["my-courses", title, status],
    queryFn: async (): Promise<MyCoursesResponse> => {
      const { data: responseData } = await httpApi.get("/me/courses", {
        params: {
          title: title || undefined,
          status,
        },
      });
      return responseData;
    },
  });

  return {
    courses: query.data?.courses || [],
    ...query,
  };
};
