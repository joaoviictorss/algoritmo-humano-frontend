import { CheckCircle2, Play } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Lesson {
  title: string;
  duration: string;
  completed: boolean;
}

interface Module {
  module: string;
  duration: string;
  lessons: Lesson[];
}

interface CourseContentAccordionProps {
  courseContent: Module[];
}

export default function CourseContentAccordion({
  courseContent,
}: CourseContentAccordionProps) {
  const totalLessons = courseContent.reduce(
    (total, module) => total + module.lessons.length,
    0
  );
  const totalDuration = courseContent.reduce((total, module) => {
    const [hours, minutes] = module.duration.split("h ");
    const moduleHours = Number.parseInt(hours, 10);
    const moduleMinutes = Number.parseInt(minutes.replace("min", ""), 10);
    return total + moduleHours * 60 + moduleMinutes;
  }, 0);

  const formatTotalDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="mb-4 font-semibold text-lg">Conteúdo do Curso</h3>

      <div className="mb-4 text-muted-foreground text-sm">
        <p>
          {courseContent.length} módulos • {totalLessons} aulas •{" "}
          {formatTotalDuration(totalDuration)} de conteúdo
        </p>
      </div>

      <Accordion className="w-full" type="multiple">
        {courseContent.map((module, moduleIndex) => (
          <AccordionItem key={moduleIndex} value={`module-${moduleIndex}`}>
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex flex-col items-start gap-1">
                <span className="font-medium">{module.module}</span>
                <span className="text-muted-foreground text-sm">
                  {module.lessons.length} aulas • {module.duration}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {module.lessons.map((lesson, lessonIndex) => (
                  <div
                    className="flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted/50"
                    key={lessonIndex}
                  >
                    <div className="flex-shrink-0">
                      {lesson.completed ? (
                        <CheckCircle2 className="text-primary" size={16} />
                      ) : (
                        <Play className="text-muted-foreground" size={16} />
                      )}
                    </div>
                    <div className="min-w-0 flex-grow">
                      <p
                        className={`truncate font-medium text-sm ${
                          lesson.completed
                            ? "text-muted-foreground line-through"
                            : ""
                        }`}
                      >
                        {lesson.title}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-muted-foreground text-xs">
                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
