export interface CourseLevel {
  id: number;
  name: string;
  code: string;
  level: number;
  lectures_count: number;
  lecture_duration: number;
  price: number;
  is_active: boolean;
  course_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  category_id?: number;
  active: boolean;
  levels: CourseLevel[];
  created_at?: string;
  updated_at?: string;
}