import CoursesListUI from "./CoursesListUI";
import { useCoursesSearch } from "./useCoursesSearch";
import { Course } from "@/types/course";

// Export this hook for reuse in UI
export { useCoursesSearch };
// Re-export Course type for backward compatibility
export type { Course };

const CoursesList = () => {
  return <CoursesListUI />;
};

export default CoursesList;
