import { Request, Response } from 'express';
import { Course, CourseLevel } from '../types/course';
import apiClient from '../api/apiClient';

class CourseController {
  // جلب جميع الدورات
  async getAllCourses(req: Request, res: Response) {
    try {
      const response = await apiClient.get('/courses');
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'فشل في جلب الدورات' });
    }
  }

  // جلب دورة محددة
  async getCourseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await apiClient.get(`/courses/${id}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'فشل في جلب الدورة' });
    }
  }

  // إنشاء دورة جديدة
  async createCourse(req: Request, res: Response) {
    try {
      const courseData: Partial<Course> = req.body;
      const response = await apiClient.post('/courses', courseData);
      res.status(201).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'فشل في إنشاء الدورة' });
    }
  }

  // تحديث دورة موجودة
  async updateCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const courseData: Partial<Course> = req.body;
      const response = await apiClient.put(`/courses/${id}`, courseData);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'فشل في تحديث الدورة' });
    }
  }

  // حذف دورة
  async deleteCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await apiClient.delete(`/courses/${id}`);
      res.json({ message: 'تم حذف الدورة بنجاح' });
    } catch (error) {
      res.status(500).json({ error: 'فشل في حذف الدورة' });
    }
  }

  // إضافة مستوى جديد للدورة
  async addLevel(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      const levelData: Partial<CourseLevel> = req.body;
      const response = await apiClient.post(`/courses/${courseId}/levels`, levelData);
      res.status(201).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'فشل في إضافة المستوى' });
    }
  }

  // تحديث مستوى موجود
  async updateLevel(req: Request, res: Response) {
    try {
      const { levelId } = req.params;
      const levelData: Partial<CourseLevel> = req.body;
      const response = await apiClient.put(`/courses/levels/${levelId}`, levelData);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'فشل في تحديث المستوى' });
    }
  }

  // حذف مستوى
  async deleteLevel(req: Request, res: Response) {
    try {
      const { levelId } = req.params;
      await apiClient.delete(`/courses/levels/${levelId}`);
      res.json({ message: 'تم حذف المستوى بنجاح' });
    } catch (error) {
      res.status(500).json({ error: 'فشل في حذف المستوى' });
    }
  }
}

export default new CourseController(); 