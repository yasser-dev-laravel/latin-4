import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Course } from "@/types/course";
import apiClient from "@/api/apiClient";

interface CoursesContextType {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  addCourse: (course: Partial<Course>) => Promise<Course | null>;
  updateCourse: (id: number, course: Partial<Course>) => Promise<Course | null>;
  deleteCourse: (id: number) => Promise<boolean>;
  addLevel: (courseId: number, level: any) => Promise<any>;
  updateLevel: (levelId: number, level: any) => Promise<any>;
  deleteLevel: (levelId: number) => Promise<boolean>;
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
    } catch (err: any) {
      setError(err.response?.data?.error || 'فشل في جلب الدورات');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (courseData: Partial<Course>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/courses', courseData);
      setCourses(prev => [...prev, response.data]);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'فشل في إنشاء الدورة');
      console.error('Error creating course:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (id: number, courseData: Partial<Course>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.put(`/courses/${id}`, courseData);
      setCourses(prev => prev.map(course => 
        course.id === id ? response.data : course
      ));
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'فشل في تحديث الدورة');
      console.error('Error updating course:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/courses/${id}`);
      setCourses(prev => prev.filter(course => course.id !== id));
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'فشل في حذف الدورة');
      console.error('Error deleting course:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addLevel = async (courseId: number, levelData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post(`/courses/${courseId}/levels`, levelData);
      
      // تحديث قائمة الكورسات مع المستوى الجديد
      setCourses(prev => prev.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            levels: [...course.levels, response.data]
          };
        }
        return course;
      }));
      
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'فشل في إضافة المستوى');
      console.error('Error adding level:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateLevel = async (levelId: number, levelData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.put(`/courses/levels/${levelId}`, levelData);
      
      // تحديث قائمة الكورسات مع المستوى المحدث
      setCourses(prev => prev.map(course => {
        return {
          ...course,
          levels: course.levels.map(level => 
            level.id === levelId ? response.data : level
          )
        };
      }));
      
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'فشل في تحديث المستوى');
      console.error('Error updating level:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteLevel = async (levelId: number) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/courses/levels/${levelId}`);
      
      // تحديث قائمة الكورسات بعد حذف المستوى
      setCourses(prev => prev.map(course => {
        return {
          ...course,
          levels: course.levels.filter(level => level.id !== levelId)
        };
      }));
      
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'فشل في حذف المستوى');
      console.error('Error deleting level:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CoursesContext.Provider value={{ 
      courses, 
      setCourses, 
      loading, 
      error, 
      fetchCourses,
      addCourse,
      updateCourse,
      deleteCourse,
      addLevel,
      updateLevel,
      deleteLevel
    }}>
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