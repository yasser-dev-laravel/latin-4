import CoursesListUI from "./CoursesListUI";
import { useCoursesSearch } from "./useCoursesSearch";

export interface Course {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  categoryId: string;
  category: string;
  active: boolean;
  levels: import("./CourseLevelsList").CourseLevel[];
  createdAt?: string;
  updatedAt?: string;
}

// Export this hook for reuse in UI
export { useCoursesSearch };

const CoursesList = () => {
  return <CoursesListUI />;
};

export default CoursesList;
