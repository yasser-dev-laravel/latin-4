import { useState, useCallback, useEffect } from 'react';
import apiClient from '../api/apiClient';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Group {
  id: number;
  name: string;
  code: string;
  courseId: number;
  courseName: string;
  level: string;
  instructorId: number;
  instructorName: string;
  roomId: number;
  roomName: string;
  startDate: string;
  days: string[];
  startTime: string;
  endDate: string;
  status: "active" | "waiting" | "postponed" | "cancelled" | "finished";
  students: number;
  studentsData?: any[];
}

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = useCallback(async () => {
    if (loading) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/groups');
      setGroups(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء جلب المجموعات');
      console.error('API Error:', err.response?.data);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const getGroupById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/groups/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'فشل في جلب المجموعة');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createGroup = useCallback(async (groupData: Partial<Group>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/groups', groupData);
      setGroups(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'فشل في إنشاء المجموعة');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateGroup = useCallback(async (id: number, groupData: Partial<Group>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.put(`/groups/${id}`, groupData);
      setGroups(prev => prev.map(group => 
        group.id === id ? response.data : group
      ));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'فشل في تحديث المجموعة');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteGroup = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/groups/${id}`);
      setGroups(prev => prev.filter(group => group.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'فشل في حذف المجموعة');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addStudent = useCallback(async (groupId: number, studentId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post(`/groups/${groupId}/students/${studentId}`);
      setGroups(prev => prev.map(group => 
        group.id === groupId ? response.data : group
      ));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'فشل في إضافة الطالب للمجموعة');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeStudent = useCallback(async (groupId: number, studentId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.delete(`/groups/${groupId}/students/${studentId}`);
      setGroups(prev => prev.map(group => 
        group.id === groupId ? response.data : group
      ));
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'فشل في إزالة الطالب من المجموعة');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getGroupStudents = useCallback(async (groupId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/groups/${groupId}/students`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'فشل في جلب طلاب المجموعة');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return {
    groups,
    loading,
    error,
    refetch: fetchGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
    addStudent,
    removeStudent,
    getGroupStudents,
  };
}; 