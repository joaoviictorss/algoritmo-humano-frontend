import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signInAction } from "@/actions/auth";
import { httpApi } from "@/infra/http/httpApi";
import type { ISignInRequest, ISignInResponse } from "@/types";
import { getErrorMessage } from "@/utils";

export const useSignIn = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ISignInRequest): Promise<ISignInResponse> => {
      const response = await httpApi.post("/sessions/password", data);
      return response.data;
    },

    onSuccess: async (data) => {
      if (data.token) {
        await signInAction(data.token);

        toast.success("Login realizado com sucesso");

        queryClient.invalidateQueries({
          queryKey: ["auth", "user"],
        });

        router.push("/");
      }
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Erro ao fazer login"));
    },
  });
};
