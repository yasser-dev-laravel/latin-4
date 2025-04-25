import React from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
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

  console.log("Dialog open state:", open); // للتحقق من حالة الحوار

  if (!open) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[2000] bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[2001] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg sm:max-w-[800px]">
          <Dialog.Title>
            {isEditing ? "تعديل كورس" : "إضافة كورس جديد"}
          </Dialog.Title>
          <Dialog.Description>
            {isEditing
              ? "قم بتعديل بيانات الكورس ثم اضغط حفظ"
              : "أدخل بيانات الكورس الجديد ثم اضغط حفظ"}
          </Dialog.Description>
          <AddEditCourseDialogBody
            form={form}
            courseLevels={courseLevels}
            updateLevels={updateLevels}
            onOpenChange={onOpenChange}
            onSave={onSave}
            course={course}
            isEditing={isEditing}
          />
          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">إغلاق</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddEditCourseDialog;
