"use client";

import { PlusCircle } from "lucide-react";
import { useState } from "react";

import { ConfirmModal } from "@/components";
import { Button } from "@/components/ui/button";

import {
  useChangeCourseStatus,
  useCreateCourse,
  useDeleteCourse,
  useGetMyCourses,
  useUpdateCourse,
} from "@/hooks";

import type { Course } from "@/types";
import type { CourseFormData } from "@/utils";

import { CreateEditCourseModal } from "./components/create-edit-course-modal";
import { MyCoursesTable, type TableAction } from "./components/table";
import { ViewCourseModal } from "./components/view-course-modal";

const ManageCoursesPage = () => {
  const { courses, isFetching } = useGetMyCourses();
  const [isOpenCreateEditModal, setIsOpenCreateEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [courseToView, setCourseToView] = useState<Course | null>(null);

  const { mutateAsync: createCourse } = useCreateCourse();
  const { mutateAsync: updateCourse } = useUpdateCourse();
  const { mutateAsync: deleteCourse } = useDeleteCourse();
  const { mutate: changeCourseStatus } = useChangeCourseStatus();

  const onOpenCreateCourseModal = () => {
    setSelectedCourse(undefined);
    setIsOpenCreateEditModal(true);
  };

  const onOpenEditCourseModal = (course: Course) => {
    setSelectedCourse(course);
    setIsOpenCreateEditModal(true);
  };

  const handleCreateCourse = async (data: CourseFormData) => {
    await createCourse(data);
    setIsOpenCreateEditModal(false);
  };

  const handleEditCourse = async (data: CourseFormData) => {
    if (!selectedCourse) {
      return;
    }

    await updateCourse({ slug: selectedCourse.slug, data });
    setIsOpenCreateEditModal(false);
    setSelectedCourse(undefined);
  };

  const handleDeleteCourse = (course: Course) => {
    setCourseToDelete(course);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) {
      return;
    }

    await deleteCourse(courseToDelete.slug);
    setIsConfirmModalOpen(false);
    setCourseToDelete(null);
  };

  const handleToggleStatus = (course: Course) => {
    const newStatus = course.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    changeCourseStatus({ slug: course.slug, status: newStatus });
  };

  const handleViewCourse = (course: Course) => {
    setCourseToView(course);
  };

  const tableActions: TableAction[] = [
    {
      id: "view",
      label: "Ver curso",
      onClick: (course) => handleViewCourse(course),
    },
    {
      id: "edit",
      label: "Editar",
      onClick: (course) => onOpenEditCourseModal(course),
    },
    {
      id: "toggle-status",
      label: (course) => (course.status === "ACTIVE" ? "Arquivar" : "Publicar"),
      onClick: (course) => handleToggleStatus(course),
    },
    {
      id: "delete",
      label: "Deletar",
      onClick: (course) => handleDeleteCourse(course),
      variant: "destructive",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Seus cursos</h1>
        </div>
        <Button onClick={onOpenCreateCourseModal}>
          <PlusCircle size={20} />
          Criar novo curso
        </Button>
      </div>

      <MyCoursesTable
        actions={tableActions}
        data={courses}
        isLoading={isFetching}
        searchPlaceholder="Buscar por título do curso..."
      />

      <CreateEditCourseModal
        course={selectedCourse}
        isOpen={isOpenCreateEditModal}
        onClose={() => {
          setIsOpenCreateEditModal(false);
          setSelectedCourse(undefined);
        }}
        onSubmit={selectedCourse ? handleEditCourse : handleCreateCourse}
      />

      <ViewCourseModal
        course={courseToView}
        isOpen={!!courseToView}
        onClose={() => setCourseToView(null)}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message="Tem certeza que deseja deletar este curso? Esta ação não pode ser desfeita."
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar exclusão"
      />
    </div>
  );
};

export default ManageCoursesPage;
