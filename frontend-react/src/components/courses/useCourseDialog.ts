import { useState, useEffect } from "react";
import { CourseLevel } from "./CourseLevelsList";
import { Course } from "./CoursesList";
import { calculateCourseTotals } from "./coursesUtils";
import { useAddEditCourseForm } from "./useAddEditCourseForm";
import { useCourses } from "@/contexts/CoursesContext";
import { CourseFormValues } from "./courseValidation";

// Dialog state and update logic for Courses
export const useCourseDialog = (courses: Course[], setCourses: (c: Course[]) => void, setFilteredCourses: (c: Course[]) => void, toast: any) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const { form, courseLevels, updateLevels, setCourseLevels, initializeLevels, handleAddLevel } = useAddEditCourseForm({
    open: isAddOpen || isEditOpen
  });

  useEffect(() => {
    if (selectedCourse) {
      form.reset(selectedCourse);
      initializeLevels(selectedCourse);
    } else {
      form.reset({});
      initializeLevels();
    }
  }, [selectedCourse, form, initializeLevels]);

  const handleAddCourse = async (data: CourseFormValues) => {
    try {
      const courseId = Date.now().toString();
      const updatedLevels = courseLevels.map(level => ({
        ...level,
        courseId,
        code: `${courseId}-${level.level}`
      }));

      const newCourse: Course = {
        ...data,
        id: courseId,
        levels: updatedLevels,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedCourses = [...courses, newCourse];
      setCourses(updatedCourses);
      setFilteredCourses(updatedCourses);
      setIsAddOpen(false);
      toast({
        title: "تم إضافة الكورس",
        description: `تم إضافة كورس "${data.name}" بنجاح`,
      });
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleEditCourse = (updatedCourse: Course) => {
    const { duration, price } = calculateCourseTotals(updatedCourse);
    const finalCourse = { ...updatedCourse, duration, price };
    const updatedCourses = courses.map((course) =>
      course.id === finalCourse.id ? finalCourse : course
    );
    setCourses(updatedCourses);
    setFilteredCourses(updatedCourses);
    setIsEditOpen(false);
    setSelectedCourse(null);
    toast({
      title: "تم تعديل الكورس",
      description: `تم تعديل كورس "${updatedCourse.name}" بنجاح`,
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm("هل أنت متأكد من رغبتك في حذف هذا الكورس؟")) {
      const courseToDelete = courses.find((course) => course.id === courseId);
      const updatedCourses = courses.filter((course) => course.id !== courseId);
      setCourses(updatedCourses);
      setFilteredCourses(updatedCourses);
      toast({
        title: "تم حذف الكورس",
        description: courseToDelete
          ? `تم حذف كورس "${courseToDelete.name}" بنجاح`
          : "تم الحذف بنجاح",
      });
    }
  };

  const openEditDialog = (course: Course) => {
    setSelectedCourse(course);
    setIsEditOpen(true);
  };

  const handleUpdateLevels = (courseId: string, updatedLevels: CourseLevel[]) => {
    const totalDuration = updatedLevels.reduce(
      (sum, level) => sum + (level.lecturesCount * level.lectureDuration), 
      0
    );
    const totalPrice = updatedLevels.reduce(
      (sum, level) => sum + level.price, 
      0
    );
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          levels: updatedLevels,
          duration: totalDuration,
          price: totalPrice
        };
      }
      return course;
    });
    setCourses(updatedCourses);
    setFilteredCourses(updatedCourses);
  };

  return {
    isAddOpen,
    setIsAddOpen,
    isEditOpen,
    setIsEditOpen,
    selectedCourse,
    setSelectedCourse,
    handleAddCourse,
    handleEditCourse,
    handleDeleteCourse,
    openEditDialog,
    handleUpdateLevels,
  }
}
