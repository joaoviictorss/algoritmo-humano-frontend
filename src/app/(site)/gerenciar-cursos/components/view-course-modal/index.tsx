import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Course } from "@/types";
import { formatDate } from "@/utils";

interface ViewCourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ViewCourseModal = ({
  course,
  isOpen,
  onClose,
}: ViewCourseModalProps) => {
  if (!course) {
    return null;
  }

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Curso</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {course.imageUrl && (
            <div className="relative h-60 w-full overflow-hidden rounded-md">
              <Image
                alt={course.title}
                className="object-cover"
                fill
                src={course.imageUrl || "/placeholder.jpg"}
                unoptimized
              />
            </div>
          )}

          <div className="space-y-1">
            <h3 className="font-semibold text-xl">{course.title}</h3>
            <p className="text-muted-foreground text-sm">{course.slug}</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Descrição</h4>
            <p className="text-muted-foreground text-sm">
              {course.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <h4 className="font-medium">Duração</h4>
              <p className="text-muted-foreground text-sm">
                {course.duration} horas
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-medium">Status</h4>
              <p className="text-muted-foreground text-sm">
                {course.status === "ACTIVE" ? "Ativo" : "Inativo"}
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-medium">Criado em</h4>
              <p className="text-muted-foreground text-sm">
                {formatDate(new Date(course.createdAt))}
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-medium">Atualizado em</h4>
              <p className="text-muted-foreground text-sm">
                {formatDate(new Date(course.updatedAt))}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
