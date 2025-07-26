import { ArrowLeft, BookOpen, Search } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Curso não encontrado - 404 | Algoritmo Humano",
  description:
    "O curso que você procura não foi encontrado. Explore outros cursos disponíveis na nossa plataforma.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CourseNotFound() {
  return (
    <div className="flex items-center justify-center rounded-md bg-background p-6">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Ícone de erro */}
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-muted">
          <Search className="text-primary" size={32} />
        </div>

        {/* Título e descrição */}
        <div className="space-y-2">
          <h1 className="font-bold text-2xl">Curso não encontrado</h1>
          <p className="text-muted-foreground">
            O curso que você está procurando não existe ou foi removido.
          </p>
        </div>

        {/* Card com sugestões */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <BookOpen size={20} />O que você pode fazer:
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-left text-muted-foreground text-sm">
              <li>• Verificar se o link está correto</li>
              <li>• Explorar outros cursos disponíveis</li>
              <li>• Usar a busca para encontrar o que procura</li>
              <li>• Entrar em contato conosco se precisar de ajuda</li>
            </ul>
          </CardContent>
        </Card>

        {/* Botões de ação */}
        <div className="space-y-3">
          <Button asChild className="w-full" variant="outline">
            <Link className="flex items-center gap-2" href="/">
              <ArrowLeft size={20} />
              Voltar para home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
