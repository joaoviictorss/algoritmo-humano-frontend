import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Course } from "@/types";
import { type CourseFormData, courseSchema } from "@/utils";

interface CreateEditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course?: Course;
  onSubmit: (data: CourseFormData) => void;
  isLoading?: boolean;
}

export const CreateEditCourseModal = ({
  isOpen,
  onClose,
  course,
  onSubmit,
  isLoading = false,
}: CreateEditCourseModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: course?.title || "",
      description: course?.description || "",
      imageUrl: course?.imageUrl || "",
      duration: course?.duration || 0,
      status: course?.status || "ACTIVE",
    },
  });

  useEffect(() => {
    if (course) {
      reset({
        title: course.title || "",
        description: course.description || "",
        imageUrl: course.imageUrl || "",
        duration: course.duration || 0,
        status: course.status || "ACTIVE",
      });
    } else {
      reset({
        title: "",
        description: "",
        imageUrl: "",
        duration: 0,
        status: "ACTIVE",
      });
    }
  }, [course, reset]);

  let buttonText = "Criar curso";

  if (isLoading) {
    buttonText = "Salvando...";
  } else if (course) {
    buttonText = "Atualizar curso";
  }

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog onOpenChange={handleClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {course ? "Editar curso" : "Criar novo curso"}
          </DialogTitle>
          <DialogDescription>
            {course
              ? "Atualizar informações do curso"
              : "Insira as informações do curso"}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Título"
            placeholder="Título do curso"
            {...register("title")}
            error={errors.title?.message}
          />

          <div className="space-y-1">
            <Label className="font-medium text-sm" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              placeholder="Descrição do curso"
              {...register("description")}
              rows={3}
            />
            {errors.description && (
              <span
                className={`mt-1 h-0 overflow-hidden transition-all duration-150 ${
                  errors.description && "h-[1rem]"
                }`}
              >
                <div
                  className={`text-xs opacity-0 ${
                    errors.description && "text-destructive opacity-100"
                  }`}
                >
                  {errors.description.message}
                </div>
              </span>
            )}
          </div>

          <Input
            label="URL da Imagem"
            placeholder="Adicione a URL da imagem do curso"
            {...register("imageUrl")}
            error={errors.imageUrl?.message}
          />

          <Input
            label="Duração (em horas)"
            placeholder="0"
            type="number"
            {...register("duration", { valueAsNumber: true })}
            error={errors.duration?.message}
          />

          <div className="space-y-1">
            <Label className="font-medium text-sm" htmlFor="status">
              Status
            </Label>
            <Select
              onValueChange={(val) =>
                setValue("status", val as "ACTIVE" | "INACTIVE")
              }
              value={watch("status")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Ativo</SelectItem>
                <SelectItem value="INACTIVE">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              disabled={isLoading}
              onClick={handleClose}
              type="button"
              variant="outline"
            >
              Cancelar
            </Button>
            <Button disabled={isLoading} type="submit">
              {buttonText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
