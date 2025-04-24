
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import CourseLevelsList, { CourseLevel } from "./CourseLevelsList";
import { categories } from "./courseCategories";
import { CourseFormFields } from "./CourseFormFields";
import { Course } from "./CoursesList";
import { CourseFormValues } from "./courseValidation";
import { useAddEditCourseForm } from "./useAddEditCourseForm";
import { Form } from "@/components/ui/form";

type Props = {
  form: ReturnType<typeof useAddEditCourseForm>["form"];
  courseLevels: CourseLevel[];
  updateLevels: (levels: CourseLevel[]) => void;
  onOpenChange: (open: boolean) => void;
  onSave: (course: any) => void;
  course?: Course;
  isEditing?: boolean;
};

export default function AddEditCourseDialogBody({
  form,
  courseLevels,
  updateLevels,
  onOpenChange,
  onSave,
  course,
  isEditing,
}: Props) {
  const onSubmit = (values: CourseFormValues) => {
    const category = categories.find((cat) => cat.id === values.categoryId)?.name || "";

    const totalDuration = courseLevels.reduce(
      (sum, level) => sum + (level.lecturesCount * level.lectureDuration),
      0
    );

    const totalPrice = courseLevels.reduce(
      (sum, level) => sum + level.price,
      0
    );

    if (isEditing && course) {
      onSave({
        ...values,
        id: course.id,
        category,
        duration: totalDuration || course.duration,
        price: totalPrice || course.price,
        levels: courseLevels,
      });
    } else {
      onSave({
        ...values,
        category,
        duration: totalDuration || 0,
        price: totalPrice || 0,
        levels: courseLevels,
      });
    }
  };

  const handleLevelsChange = (updatedLevels: CourseLevel[]) => {
    updateLevels(updatedLevels);
  };

  // استخدام معرف مؤقت للكورس الجديد لعرض المستويات
  const tempCourseId = course?.id || "temp-" + Date.now().toString();
  const courseName = form.getValues().name || "الكورس الجديد";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CourseFormFields control={form.control} />

        {/* عرض قائمة المستويات لكل من الكورس الجديد والكورس الموجود */}
        <CourseLevelsList
          courseId={tempCourseId}
          courseName={courseName}
          levels={courseLevels}
          onLevelsChange={handleLevelsChange}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button type="submit">حفظ</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
