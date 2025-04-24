import { CourseLevel } from "./course";
import { User } from "./user";

export interface Lecture {
  id: number;
  title: string;
  description: string;
  level: CourseLevel;
  teacher: User;
  startTime: Date;
  duration: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
} 