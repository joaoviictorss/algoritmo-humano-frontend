import type React from "react";
import type { CourseCardProps } from "./data";
import {
  DefaultCourseCard,
  ProgressCourseCard,
  SkeletonCourseCard,
} from "./layout";

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  variant = "default",
}) => {
  const variants = {
    default: <DefaultCourseCard course={course} />,
    progress: <ProgressCourseCard course={course} />,
    skeleton: <SkeletonCourseCard />,
  };

  return variants[variant];
};
