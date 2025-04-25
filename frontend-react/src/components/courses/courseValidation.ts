
import { z } from "zod";

export const courseSchema = z.object({
  name: z.string().min(3, { message: "يجب أن يكون اسم الكورس 3 أحرف على الأقل" }),
  description: z.string().min(10, { message: "يجب أن يكون الوصف 10 أحرف على الأقل" }),
  categoryId: z.string().min(1, { message: "يجب اختيار قسم" }),
  active: z.boolean().default(true),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
