export type CourseStatus = "ACTIVE" | "INACTIVE";

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  duration: number;
  status: CourseStatus;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string | null;
    email: string;
  };
  
}

export interface CoursesResponse {
  courses: Course[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface GetCoursesProps {
  title?: string;
  status?: CourseStatus;
  initialSortBy?: "title" | "createdAt" | "updatedAt" | "duration";
  initialSortOrder?: "asc" | "desc";
  initialLimit?: number;
}

export interface GetMyCoursesProps {
  title?: string;
  status?: CourseStatus;
}

export interface MyCoursesResponse {
  courses: Course[];
}
