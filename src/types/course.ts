export interface CourseLevel {
  id: number;
  level: number;
  name: string;
  code: string;
  lecturesCount: number;
  lectureDuration: number;
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  active: boolean;
  levels: CourseLevel[];
  createdAt: Date;
  updatedAt: Date;
} 