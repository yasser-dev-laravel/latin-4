
import { Course } from "./CoursesList";

// Initial Courses (same data as before)
export const initialCourses: Course[] = [
  {
    id: "1",
    name: "البرمجة بلغة بايثون",
    duration: 36,
    price: 3500,
    description: "دورة تعلم مباديء البرمجة باستخدام لغة بايثون",
    categoryId: "1",
    category: "برمجة",
    active: true,
    levels: [
      {
        id: "101",
        courseId: "1",
        level: 1,
        name: "أساسيات البرمجة بلغة بايثون",
        lecturesCount: 12,
        lectureDuration: 1.5,
        price: 1500,
        code: "1-1"
      },
      {
        id: "102",
        courseId: "1",
        level: 2,
        name: "البرمجة المتقدمة بلغة بايثون",
        lecturesCount: 12,
        lectureDuration: 1.5,
        price: 2000,
        code: "1-2"
      },
    ]
  },
  {
    id: "2",
    name: "تطوير واجهات المستخدم",
    duration: 48,
    price: 4200,
    description: "دورة تطوير واجهات المستخدم باستخدام React",
    categoryId: "1",
    category: "برمجة",
    active: true,
    levels: [
      {
        id: "201",
        courseId: "2",
        level: 1,
        name: "أساسيات HTML و CSS",
        lecturesCount: 8,
        lectureDuration: 1.5,
        price: 1200,
        code: "2-1"
      },
      {
        id: "202",
        courseId: "2",
        level: 2,
        name: "أساسيات JavaScript",
        lecturesCount: 10,
        lectureDuration: 1.5,
        price: 1500,
        code: "2-2"
      },
      {
        id: "203",
        courseId: "2",
        level: 3,
        name: "تطوير واجهات المستخدم باستخدام React",
        lecturesCount: 12,
        lectureDuration: 1.5,
        price: 1500,
        code: "2-3"
      }
    ]
  },
  {
    id: "3",
    name: "اللغة الإنجليزية - مستوى متقدم",
    duration: 60,
    price: 2800,
    description: "دورة متقدمة في اللغة الإنجليزية للمحادثة والكتابة",
    categoryId: "2",
    category: "لغات",
    active: true,
    levels: [
      {
        id: "301",
        courseId: "3",
        level: 1,
        name: "اللغة الإنجليزية - المستوى المتوسط",
        lecturesCount: 20,
        lectureDuration: 1.5,
        price: 1200,
        code: "3-1"
      },
      {
        id: "302",
        courseId: "3",
        level: 2,
        name: "اللغة الإنجليزية - المستوى المتقدم",
        lecturesCount: 20,
        lectureDuration: 1.5,
        price: 1600,
        code: "3-2"
      }
    ]
  },
  {
    id: "4",
    name: "تصميم الجرافيك",
    duration: 36,
    price: 3200,
    description: "دورة تصميم جرافيك باستخدام أدوات Adobe",
    categoryId: "3",
    category: "تصميم",
    active: false,
    levels: []
  },
];

// Helper: calculate totals based on levels
export function calculateCourseTotals(course: Course) {
  if (!course.levels || course.levels.length === 0) {
    return { duration: course.duration, price: course.price };
  }
  const totalDuration = course.levels.reduce(
    (sum, level) => sum + (level.lecturesCount * level.lectureDuration),
    0
  );
  const totalPrice = course.levels.reduce(
    (sum, level) => sum + level.price,
    0
  );
  return { duration: totalDuration, price: totalPrice };
}
