import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { httpApi } from "@/infra/http/httpApi";
import { type CourseFormData, getErrorMessage } from "@/utils";

interface UpdateCourseParams {
  slug: string;
  data: Partial<CourseFormData>;
}

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slug, data }: UpdateCourseParams) => {
      const response = await httpApi.put(`/courses/${slug}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Curso atualizado com sucesso");

      queryClient.invalidateQueries({ queryKey: ["my-courses", "courses"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Erro ao atualizar curso"));
    },
  });
};
