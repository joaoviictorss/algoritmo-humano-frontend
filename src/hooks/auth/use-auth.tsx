"use client";

import { useQuery } from "@tanstack/react-query";
import { httpApi } from "@/infra/http/httpApi";
import type { IUser } from "@/types/user";

export const useAuth = () => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: async (): Promise<IUser | null> => {
      try {
        const { data } = await httpApi.get("/profile");

        return data.user;
      } catch {
        return null;
      }
    },
  });

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    refetch,
  };
};
