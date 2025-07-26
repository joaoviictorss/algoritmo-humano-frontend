import z from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  description: z.string().min(1, "Descrição é obrigatória"),
  imageUrl: z.url("URL da imagem inválida"),
  duration: z
    .number("Duração é obrigatória")
    .min(1, "Duração deve ser maior que 0"),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE").optional(),
});

export type CourseFormData = z.infer<typeof courseSchema>;
