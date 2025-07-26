import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { httpApi } from "@/infra/http/httpApi";
import { getErrorMessage } from "@/utils";

export const useChangeCourseStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      slug,
      status,
    }: {
      slug: string;
      status: "ACTIVE" | "INACTIVE";
    }) => {
      await httpApi.put(`/courses/${slug}`, { status });
    },
    onSuccess: (_, { status }) => {
      const action = status === "ACTIVE" ? "publicado" : "arquivado";
      toast.success(`Curso ${action} com sucesso`);
      queryClient.invalidateQueries({ queryKey: ["my-courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error, { status }) => {
      const action = status === "ACTIVE" ? "publicar" : "arquivar";
      toast.error(getErrorMessage(error, `Erro ao ${action} curso`));
    },
  });
};
