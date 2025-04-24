export type UserRole = "ADMIN" | "TEACHER" | "STUDENT";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
} 