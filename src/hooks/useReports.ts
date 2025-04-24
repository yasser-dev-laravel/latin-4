import { useState, useCallback } from 'react';
import apiClient from '../api/apiClient';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Course {
  id: number;
  name: string;
  description: string;
}

interface Level {
  id: number;
  name: string;
  course: Course;
}

interface Lecture {
  id: number;
  title: string;
  level: Level;
}

interface Assessment {
  id: number;
  title: string;
  type: 'QUIZ' | 'HOMEWORK' | 'EXAM';
  totalMarks: number;
}

interface StudentPerformance {
  studentId: number;
  student: User;
  totalAssessments: number;
  completedAssessments: number;
  averageMarks: number;
  attendanceRate: number;
  lastActive: string;
}

interface CoursePerformance {
  courseId: number;
  course: Course;
  totalStudents: number;
  activeStudents: number;
  averageAttendance: number;
  averageMarks: number;
  completionRate: number;
}

interface TeacherPerformance {
  teacherId: number;
  teacher: User;
  totalLectures: number;
  totalStudents: number;
  averageAttendance: number;
  averageMarks: number;
  studentSatisfaction: number;
}

export const useReports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStudentPerformance = useCallback(async (studentId: number, courseId?: number) => {
    setLoading(true);
    setError(null);
    try {
      const url = courseId 
        ? `/reports/students/${studentId}/performance?courseId=${courseId}`
        : `/reports/students/${studentId}/performance`;
      const response = await apiClient.get(url);
      return response.data as StudentPerformance;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب أداء الطالب');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCoursePerformance = useCallback(async (courseId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/reports/courses/${courseId}/performance`);
      return response.data as CoursePerformance;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب أداء الدورة');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTeacherPerformance = useCallback(async (teacherId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/reports/teachers/${teacherId}/performance`);
      return response.data as TeacherPerformance;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب أداء المدرس');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAttendanceReport = useCallback(async (params: {
    courseId?: number;
    levelId?: number;
    startDate?: string;
    endDate?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/reports/attendance', { params });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب تقرير الحضور');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAssessmentReport = useCallback(async (params: {
    courseId?: number;
    levelId?: number;
    type?: 'QUIZ' | 'HOMEWORK' | 'EXAM';
    startDate?: string;
    endDate?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/reports/assessments', { params });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب تقرير التقييمات');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getStudentProgress = useCallback(async (studentId: number, courseId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/reports/students/${studentId}/progress/${courseId}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب تقدم الطالب');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getCourseAnalytics = useCallback(async (courseId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/reports/courses/${courseId}/analytics`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب تحليلات الدورة');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const exportReport = useCallback(async (reportType: string, params: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/reports/export/${reportType}`, {
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في تصدير التقرير');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getStudentPerformance,
    getCoursePerformance,
    getTeacherPerformance,
    getAttendanceReport,
    getAssessmentReport,
    getStudentProgress,
    getCourseAnalytics,
    exportReport,
  };
}; 