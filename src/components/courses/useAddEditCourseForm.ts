import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CourseFormValues, courseSchema } from "./courseValidation";
import { categories } from "./courseCategories";
import { Course } from "./CoursesList";
import { CourseLevel } from "./CourseLevelsList";

type UseAddEditCourseFormProps = {
  course?: Course;
  isEditing?: boolean;
  open: boolean;
};

export function useAddEditCourseForm({
  course,
  isEditing = false,
  open,
}: UseAddEditCourseFormProps) {
  const [courseLevels, setCourseLevels] = useState<CourseLevel[]>([]);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      active: true,
    },
  });

  useEffect(() => {
    if (course && isEditing) {
      form.reset({
        name: course.name,
        description: course.description,
        categoryId: course.categoryId,
        active: course.active,
      });

      setCourseLevels(course.levels || []);
    } else {
      form.reset({
        name: "",
        description: "",
        categoryId: "",
        active: true,
      });

      // إضافة المستوى الافتراضي للمستوى الأول
      setCourseLevels([{
        id: Date.now().toString(),
        courseId: "",
        level: 1,
        name: "المستوى الأول",
        code: "",
        description: "",
        duration: 0,
        price: 0,
        isActive: true
      }]);
    }
    // eslint-disable-next-line
  }, [course, isEditing, form, open]);

  const updateLevels = (updatedLevels: CourseLevel[]) => setCourseLevels(updatedLevels);

  const initializeLevels = (course?: Course) => {
    if (course) {
      setCourseLevels(course.levels || []);
    } else {
      // إضافة المستوى الافتراضي للمستوى الأول
      setCourseLevels([{
        id: Date.now().toString(),
        courseId: "",
        level: 1,
        name: "المستوى الأول",
        code: "",
        description: "",
        duration: 0,
        price: 0,
        isActive: true
      }]);
    }
  };

  const handleAddLevel = () => {
    const newLevelNumber = courseLevels.length + 1;
    const newLevel: CourseLevel = {
      id: Date.now().toString(),
      courseId: "",
      level: newLevelNumber,
      name: `المستوى ${newLevelNumber}`,
      code: "",
      description: "",
      duration: 0,
      price: 0,
      isActive: true
    };
    setCourseLevels([...courseLevels, newLevel]);
  };

  return { form, courseLevels, updateLevels, setCourseLevels, initializeLevels, handleAddLevel };
}
