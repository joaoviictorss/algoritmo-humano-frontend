import type { Course } from "@/types";

export interface CourseSearchProps {}

export interface CourseSearchLayoutProps extends CourseSearchProps {
  isOpen: boolean;
  selectedIndex: number;
  inputValue: string;
  filteredCourses: Course[];
  isLoading: boolean;
  debouncedSearchQuery: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  listRef: React.RefObject<HTMLUListElement | null>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onCourseSelect: (course: Course, event?: React.MouseEvent) => void;
  onClearSearch: () => void;
  onMouseEnter: (index: number) => void;
  onMouseDown: (e: React.MouseEvent) => void;
}
