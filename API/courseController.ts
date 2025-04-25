import apiClient from '../src/api/apiClient';
import { Course, CourseLevel } from '../src/types/course';

class CourseController {
  // جلب جميع الدورات
  async getAllCourses() {
    try {
      const response = await apiClient.get('/courses');
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  // جلب دورة محددة
  async getCourseById(id: number) {
    try {
      const response = await apiClient.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching course ${id}:`, error);
      throw error;
    }
  }

  // إنشاء دورة جديدة
  async createCourse(courseData: Partial<Course>) {
    try {
      const response = await apiClient.post('/courses', courseData);
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  }

  // تحديث دورة موجودة
  async updateCourse(id: number, courseData: Partial<Course>) {
    try {
      const response = await apiClient.put(`/courses/${id}`, courseData);
      return response.data;
    } catch (error) {
      console.error(`Error updating course ${id}:`, error);
      throw error;
    }
  }

  // حذف دورة
  async deleteCourse(id: number) {
    try {
      await apiClient.delete(`/courses/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting course ${id}:`, error);
      throw error;
    }
  }

  // إضافة مستوى جديد للدورة
  async addLevel(courseId: number, levelData: Partial<CourseLevel>) {
    try {
      const response = await apiClient.post(`/courses/${courseId}/levels`, levelData);
      return response.data;
    } catch (error) {
      console.error(`Error adding level to course ${courseId}:`, error);
      throw error;
    }
  }

  // تحديث مستوى موجود
  async updateLevel(levelId: number, levelData: Partial<CourseLevel>) {
    try {
      const response = await apiClient.put(`/courses/levels/${levelId}`, levelData);
      return response.data;
    } catch (error) {
      console.error(`Error updating level ${levelId}:`, error);
      throw error;
    }
  }

  // حذف مستوى
  async deleteLevel(levelId: number) {
    try {
      await apiClient.delete(`/courses/levels/${levelId}`);
      return true;
    } catch (error) {
      console.error(`Error deleting level ${levelId}:`, error);
      throw error;
    }
  }

  // جلب مستويات دورة محددة
  async getCourseLevels(courseId: number) {
    try {
      const response = await apiClient.get(`/courses/${courseId}/levels`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching levels for course ${courseId}:`, error);
      throw error;
    }
  }
}

export default new CourseController(); 