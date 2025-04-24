import { createContext, useContext, useState, ReactNode } from "react";
import { Course } from "@/components/courses/CoursesList";
import { initialCourses } from "@/components/courses/coursesUtils";

interface CoursesContextType {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export function CoursesProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  return (
    <CoursesContext.Provider value={{ courses, setCourses }}>
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within a CoursesProvider");
  }
  return context;
} 