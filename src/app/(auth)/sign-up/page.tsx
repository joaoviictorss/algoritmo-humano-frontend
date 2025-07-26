"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Input } from "@/components";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@/hooks";
import { SignUpFormSchema, type signUpSchema } from "@/utils/validations";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpSchema>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: signUp, isPending } = useSignUp();

  const handleSignUp = (data: signUpSchema) => {
    signUp(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mx-auto flex w-full max-w-[350px] flex-col items-center justify-center space-y-6">
        <Image
          alt="Logo"
          className="rounded-sm"
          height={48}
          quality={100}
          src={"/nevoa.png"}
          width={48}
        />

        <div className="space-y-2 text-center">
          <h1 className="font-semibold text-2xl tracking-tight">Criar Conta</h1>

          <p className="text-muted-foreground text-sm">
            Crie sua conta e comece a vender seus cursos e treinamentos dentro
            de suas comunidades.
          </p>
        </div>

        <div className="flex w-full flex-col items-center space-y-4">
          <form
            className="flex w-full flex-col space-y-4"
            onSubmit={handleSubmit(handleSignUp)}
          >
            <Input
              id="name"
              label="Nome"
              placeholder="Insira seu nome completo"
              {...register("name")}
              error={errors.name?.message}
              required
            />
            <Input
              id="email"
              label="Email"
              placeholder="Insira seu email"
              {...register("email")}
              error={errors.email?.message}
              required
            />
            <Input
              id="password"
              label="Senha"
              placeholder="Insira sua senha"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              required
            />
            <Input
              id="confirmPassword"
              label="Confirmar Senha"
              placeholder="Confirme sua senha"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              required
            />
            <Button disabled={isPending} type="submit">
              {isPending && <Loader2 className="mr-2 animate-spin" size={20} />}
              {isPending ? "Criando..." : "Criar Conta"}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-1">
            <span className="text-muted-foreground text-sm">
              Já tem uma conta?
            </span>
            <Link className="text-primary" href={"/sign-in"}>
              Faça login
            </Link>
          </div>

          <Link className="text-primary text-sm" href="/">
            Voltar para catálogo de cursos
          </Link>
        </div>
      </div>
    </main>
  );
}
