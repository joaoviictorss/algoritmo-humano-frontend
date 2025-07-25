"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetMyCourses } from "@/hooks/courses/use-get-my-courses";
import type { Course } from "@/types/course";
import { MyCoursesTable, type TableAction } from "./components/table";

const ManageCoursesPage = () => {
  const { courses, isFetching } = useGetMyCourses();

  const handleEditCourse = (course: Course) => {
    // Implementar navegação para edição
    console.log("Editar curso:", course);
    // router.push(`/courses/${course.id}/edit`);
  };

  const handleDeleteCourse = (course: Course) => {
    // Implementar modal de confirmação e deletar
    console.log("Deletar curso:", course);
    // Aqui você pode abrir um modal de confirmação
  };

  const handleArchiveCourse = (course: Course) => {
    // Implementar mudança de status para ARCHIVED
    console.log("Arquivar curso:", course);
  };

  const handleViewCourse = (course: Course) => {
    // Implementar visualização do curso
    console.log("Ver curso:", course);
    // router.push(`/courses/${course.slug}`);
  };

  const handlePublishCourse = (course: Course) => {
    // Implementar mudança de status para PUBLISHED
    console.log("Publicar curso:", course);
  };

  const tableActions: TableAction[] = [
    {
      label: "Ver curso",
      onClick: handleViewCourse,
    },
    {
      label: "Editar",
      onClick: handleEditCourse,
    },
    {
      label: "Publicar",
      onClick: handlePublishCourse,
    },
    {
      label: "Arquivar",
      onClick: handleArchiveCourse,
    },
    {
      label: "Deletar",
      onClick: handleDeleteCourse,
      variant: "destructive",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Seus cursos</h1>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Criar novo curso
        </Button>
      </div>

      <MyCoursesTable
        actions={tableActions}
        data={courses}
        isLoading={isFetching}
        searchPlaceholder="Buscar por título do curso..."
      />
    </div>
  );
};

export default ManageCoursesPage;
