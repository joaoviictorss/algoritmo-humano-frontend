import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { httpApi } from "@/infra/http/httpApi";
import type { ISignInRequest, ISignInResponse } from "@/types";

export const useSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ISignInRequest): Promise<ISignInResponse> => {
      const response = await httpApi.post("/sessions/password", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      router.push("/");
    },
  });
};
