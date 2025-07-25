import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutAction } from "@/actions/auth";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await logoutAction();
    },
    onSuccess: () => {
      toast.success("Logout realizado com sucesso");

      queryClient.invalidateQueries();

      router.push("/sign-in");
    },
    onError: () => {
      toast.error("Erro ao fazer logout");
    },
  });
};
