import { useCourseDialog } from "./useCourseDialog";
import { CourseLevel } from "./CourseLevelsList";
import { Course } from "./CoursesList";
import { useToast } from "@/hooks/use-toast";
import { useCourses } from "@/contexts/CoursesContext";

export function useCourseDialogs(
  filteredCourses: Course[],
  setFilteredCourses: (c: Course[]) => void
) {
  const { toast } = useToast();
  const { courses, setCourses } = useCourses();
  return useCourseDialog(
    courses,
    setCourses,
    setFilteredCourses,
    toast
  );
}
