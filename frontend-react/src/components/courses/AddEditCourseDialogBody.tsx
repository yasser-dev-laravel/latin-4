import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import CourseLevelsList, { CourseLevel } from "@/components/courses/CourseLevelsList";
import { categories } from "./courseCategories";
import { CourseFormFields } from "./CourseFormFields";
import { Course } from "./CoursesList";
import { CourseFormValues } from "./courseValidation";
import { useAddEditCourseForm } from "./useAddEditCourseForm";
import { Form } from "@/components/ui/form";
import * as Label from "@radix-ui/react-label";

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
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <div className="grid gap-2">
          <CourseFormFields control={form.control} />
        </div>

        <div className="grid gap-2">
          <Label.Root className="text-right block font-medium">المستويات</Label.Root>
          <CourseLevelsList
            courseId={tempCourseId}
            courseName={courseName}
            levels={courseLevels}
            onLevelsChange={handleLevelsChange}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            variant="outline"
          >
            إلغاء
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (form.formState.isValid) {
                const formData = form.getValues();
                onSubmit(formData);
              }
            }}
          >
            حفظ
          </Button>
        </DialogFooter>
      </Form>
    </div>
  );
}
