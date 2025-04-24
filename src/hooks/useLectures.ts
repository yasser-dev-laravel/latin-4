import { useState, useCallback, useEffect } from 'react';
import apiClient from '../api/apiClient';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Lecture {
  id: number;
  title: string;
  description: string;
  content: string;
  levelId: number;
  teacherId: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  level: {
    id: number;
    name: string;
    course: {
      id: number;
      name: string;
    };
  };
  teacher: User;
  createdAt: string;
  updatedAt: string;
}

export const useLectures = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLectures = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/lectures');
      setLectures(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب المحاضرات');
    } finally {
      setLoading(false);
    }
  }, []);

  const getLectureById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/lectures/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب المحاضرة');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createLecture = useCallback(async (lectureData: Partial<Lecture>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/lectures', lectureData);
      setLectures(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في إنشاء المحاضرة');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLecture = useCallback(async (id: number, lectureData: Partial<Lecture>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.put(`/lectures/${id}`, lectureData);
      setLectures(prev => prev.map(lecture => 
        lecture.id === id ? response.data : lecture
      ));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في تحديث المحاضرة');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteLecture = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/lectures/${id}`);
      setLectures(prev => prev.filter(lecture => lecture.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في حذف المحاضرة');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getLecturesByLevel = useCallback(async (levelId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/lectures/level/${levelId}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب محاضرات المستوى');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getLecturesByTeacher = useCallback(async (teacherId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/lectures/teacher/${teacherId}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب محاضرات المدرس');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLectures();
  }, [fetchLectures]);

  return {
    lectures,
    loading,
    error,
    fetchLectures,
    getLectureById,
    createLecture,
    updateLecture,
    deleteLecture,
    getLecturesByLevel,
    getLecturesByTeacher,
  };
}; 