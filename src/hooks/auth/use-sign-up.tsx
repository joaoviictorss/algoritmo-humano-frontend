import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { httpApi } from "@/infra/http/httpApi";
import type { ISignUpRequest, ISignUpResponse } from "@/types";
import { getErrorMessage } from "@/utils";

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ISignUpRequest): Promise<ISignUpResponse> => {
      const response = await httpApi.post("/users", data);
      return response.data;
    },

    onSuccess: (data) => {
      toast.success(data.displayMessage || "Conta criada com sucesso");

      router.push("/sign-in");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Erro ao criar conta"));
    },
  });
};
