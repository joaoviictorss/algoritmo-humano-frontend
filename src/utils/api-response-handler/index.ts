interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
      displayMessage?: string;
      errors?: Array<{
        field: string;
        message: string;
      }>;
    };
  };
}

export const getErrorMessage = (error: ApiError, fallback: string): string => {
  return (
    error.response?.data?.displayMessage ||
    error.response?.data?.message ||
    fallback
  );
};
