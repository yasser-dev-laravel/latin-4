import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Course } from "@/components/courses/CoursesList";
import apiClient from "@/api/apiClient";

interface CoursesContextType {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export function CoursesProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/courses');
      setCourses(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CoursesContext.Provider value={{ courses, setCourses, loading, error, fetchCourses }}>
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
} 