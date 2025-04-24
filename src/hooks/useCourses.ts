import { useState, useCallback, useEffect } from 'react';
import apiClient from '../api/apiClient';

interface CourseLevel {
  id: number;
  level: number;
  name: string;
  code: string;
  lecturesCount: number;
  lectureDuration: number;
  price: number;
  isActive: boolean;
}

interface Course {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  active: boolean;
  levels: CourseLevel[];
  createdAt: string;
  updatedAt: string;
}

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/courses');
      setCourses(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  }, []);

  const getCourseById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/courses/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch course');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createCourse = useCallback(async (courseData: Partial<Course>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/courses', courseData);
      setCourses(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create course');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCourse = useCallback(async (id: number, courseData: Partial<Course>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.put(`/courses/${id}`, courseData);
      setCourses(prev => prev.map(course => 
        course.id === id ? response.data : course
      ));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update course');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCourse = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/courses/${id}`);
      setCourses(prev => prev.filter(course => course.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete course');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const addLevel = useCallback(async (courseId: number, levelData: Partial<CourseLevel>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post(`/courses/${courseId}/levels`, levelData);
      setCourses(prev => prev.map(course => 
        course.id === courseId 
          ? { ...course, levels: [...course.levels, response.data] }
          : course
      ));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add level');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLevel = useCallback(async (levelId: number, levelData: Partial<CourseLevel>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.put(`/courses/levels/${levelId}`, levelData);
      setCourses(prev => prev.map(course => ({
        ...course,
        levels: course.levels.map(level => 
          level.id === levelId ? response.data : level
        )
      })));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update level');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteLevel = useCallback(async (levelId: number) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/courses/levels/${levelId}`);
      setCourses(prev => prev.map(course => ({
        ...course,
        levels: course.levels.filter(level => level.id !== levelId)
      })));
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete level');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    addLevel,
    updateLevel,
    deleteLevel,
  };
}; 