export type CourseStatus = "ACTIVE" | "INACTIVE";

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  duration: number;
  status: CourseStatus;
  createdAt: string;
  updatedAt: string;
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
