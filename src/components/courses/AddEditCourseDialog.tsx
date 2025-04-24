
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Course } from "./CoursesList";
import { useAddEditCourseForm } from "./useAddEditCourseForm";
import AddEditCourseDialogBody from "./AddEditCourseDialogBody";

interface AddEditCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (course: any) => void;
  onUpdateLevels?: any;
  course?: Course;
  isEditing?: boolean;
}

const AddEditCourseDialog = ({
  open,
  onOpenChange,
  onSave,
  course,
  isEditing = false,
}: AddEditCourseDialogProps) => {
  const { form, courseLevels, updateLevels } = useAddEditCourseForm({ course, isEditing, open });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "تعديل كورس" : "إضافة كورس جديد"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "قم بتعديل بيانات الكورس ثم اضغط حفظ"
              : "أدخل بيانات الكورس الجديد ثم اضغط حفظ"}
          </DialogDescription>
        </DialogHeader>
        <AddEditCourseDialogBody
          form={form}
          courseLevels={courseLevels}
          updateLevels={updateLevels}
          onOpenChange={onOpenChange}
          onSave={onSave}
          course={course}
          isEditing={isEditing}
        />
      </DialogContent>
    </Dialog>
  );
}

export default AddEditCourseDialog;
