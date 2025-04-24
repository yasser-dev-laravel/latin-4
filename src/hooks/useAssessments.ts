import { useState, useCallback, useEffect } from 'react';
import apiClient from '../api/apiClient';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Assessment {
  id: number;
  title: string;
  description: string;
  type: 'QUIZ' | 'HOMEWORK' | 'EXAM';
  totalMarks: number;
  passingMarks: number;
  duration: number; // بالدقائق
  lectureId: number;
  teacherId: number;
  isActive: boolean;
  dueDate: string;
  lecture: {
    id: number;
    title: string;
    level: {
      id: number;
      name: string;
      course: {
        id: number;
        name: string;
      };
    };
  };
  teacher: User;
  createdAt: string;
  updatedAt: string;
}

interface StudentAssessment {
  id: number;
  studentId: number;
  assessmentId: number;
  marks: number;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED';
  submissionDate: string;
  gradingDate: string;
  feedback: string;
  student: User;
  assessment: Assessment;
}

export const useAssessments = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssessments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/assessments');
      setAssessments(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب التقييمات');
    } finally {
      setLoading(false);
    }
  }, []);

  const getAssessmentById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/assessments/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب التقييم');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createAssessment = useCallback(async (assessmentData: Partial<Assessment>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/assessments', assessmentData);
      setAssessments(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في إنشاء التقييم');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAssessment = useCallback(async (id: number, assessmentData: Partial<Assessment>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.put(`/assessments/${id}`, assessmentData);
      setAssessments(prev => prev.map(assessment => 
        assessment.id === id ? response.data : assessment
      ));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في تحديث التقييم');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAssessment = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/assessments/${id}`);
      setAssessments(prev => prev.filter(assessment => assessment.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في حذف التقييم');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAssessmentsByLecture = useCallback(async (lectureId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/assessments/lecture/${lectureId}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب تقييمات المحاضرة');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAssessmentsByTeacher = useCallback(async (teacherId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/assessments/teacher/${teacherId}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب تقييمات المدرس');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitAssessment = useCallback(async (assessmentId: number, studentId: number, submissionData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post(`/assessments/${assessmentId}/submit`, {
        studentId,
        ...submissionData
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في تقديم التقييم');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const gradeAssessment = useCallback(async (assessmentId: number, studentId: number, gradeData: { marks: number; feedback: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post(`/assessments/${assessmentId}/grade/${studentId}`, gradeData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في تقييم الطالب');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getStudentAssessments = useCallback(async (studentId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/assessments/student/${studentId}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'فشل في جلب تقييمات الطالب');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssessments();
  }, [fetchAssessments]);

  return {
    assessments,
    loading,
    error,
    fetchAssessments,
    getAssessmentById,
    createAssessment,
    updateAssessment,
    deleteAssessment,
    getAssessmentsByLecture,
    getAssessmentsByTeacher,
    submitAssessment,
    gradeAssessment,
    getStudentAssessments,
  };
}; 