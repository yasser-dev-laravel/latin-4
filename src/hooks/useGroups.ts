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
  description: string;
  courseId: number;
  teacherId: number;
  isActive: boolean;
  course: {
    id: number;
    name: string;
  };
  teacher: User;
  students: User[];
  createdAt: string;
  updatedAt: string;
}

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/groups');
      setGroups(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch groups');
    } finally {
      setLoading(false);
    }
  }, []);

  const getGroupById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/groups/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch group');
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
      setError(err.response?.data?.error || 'Failed to create group');
      return null;
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
      setError(err.response?.data?.error || 'Failed to update group');
      return null;
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
      setError(err.response?.data?.error || 'Failed to delete group');
      return false;
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
      setError(err.response?.data?.error || 'Failed to add student to group');
      return null;
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
      setError(err.response?.data?.error || 'Failed to remove student from group');
      return null;
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
      setError(err.response?.data?.error || 'Failed to fetch group students');
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
    fetchGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
    addStudent,
    removeStudent,
    getGroupStudents,
  };
}; 