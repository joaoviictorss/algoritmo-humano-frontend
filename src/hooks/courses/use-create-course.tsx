import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { httpApi } from "@/infra/http/httpApi";
import { type CourseFormData, getErrorMessage } from "@/utils";

interface CreateCourseResponse {
  message: string;
  displayMessage: string;
}

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateCourseResponse, Error, CourseFormData>({
    mutationFn: async (data: CourseFormData) => {
      const response = await httpApi.post("/courses", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.displayMessage || "Curso criado com sucesso");

      queryClient.invalidateQueries({ queryKey: ["my-courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Erro ao criar curso"));
    },
  });
};
