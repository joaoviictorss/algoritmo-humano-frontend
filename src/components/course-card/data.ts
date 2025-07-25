import type { Course } from "@/types";

export interface CourseCardProps {
  course?: Course;
  variant?: "default" | "progress" | "skeleton";
}

export interface IDefaultCourseCardLayout
  extends Pick<CourseCardProps, "course"> {}

export interface IProgressCourseCardLayout
  extends Pick<CourseCardProps, "course"> {}

export interface ISkeletonCourseCardLayout {}
