import z from "zod";

export const SignInFormSchema = z.object({
  email: z.email({ message: "Email inválido" }).trim(),
  password: z.string(),
});

export type signInSchema = z.infer<typeof SignInFormSchema>;

export const SignUpFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Nome deve ter no mínimo 2 caracteres" })
      .trim(),
    email: z.string().email({ message: "Email inválido" }).trim(),
    password: z
      .string()
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
      .trim(),
    confirmPassword: z
      .string()
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

export type signUpSchema = z.infer<typeof SignUpFormSchema>;