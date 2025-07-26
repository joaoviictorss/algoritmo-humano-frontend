import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { httpApi } from "@/infra/http/httpApi";
import { getErrorMessage } from "@/utils";

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slug: string) => {
      await httpApi.delete(`/courses/${slug}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Erro ao deletar curso"));
    },
  });
};
