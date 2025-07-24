"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Input } from "@/components";
import { Button } from "@/components/ui/button";
import { useSignIn } from "@/hooks/auth";
import { SignInFormSchema, type signInSchema } from "@/utils/validations";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInSchema>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync } = useSignIn();

  const handleLogin = (data: signInSchema) => {
    mutateAsync(data);
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
          <h1 className="font-semibold text-2xl tracking-tight">
            Bem-vindo de volta
          </h1>

          <p className="text-muted-foreground text-sm">
            Faça login para acessar sua conta e gerenciar seus cursos e
            comunidades.
          </p>
        </div>

        <div className="flex w-full flex-col items-center space-y-4">
          <form
            className="flex w-full flex-col space-y-4"
            onSubmit={handleSubmit(handleLogin)}
          >
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
            <Button>Entrar</Button>
          </form>

          <div className="flex items-center justify-center gap-1">
            <span className="text-muted-foreground text-sm">
              Ainda não tem conta?
            </span>
            <Link className="text-primary" href={"/sign-up"}>
              Cadastre-se
            </Link>
          </div>

          <Link
            className="text-primary text-sm underline-offset-4 hover:underline"
            href="/"
          >
            Voltar para catálogo de cursos
          </Link>
        </div>
      </div>
    </main>
  );
}
