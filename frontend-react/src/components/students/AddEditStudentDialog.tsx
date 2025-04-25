
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Student } from "./StudentsList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// استيراد المكونات الجديدة
import StudentBasicFields from "./StudentBasicFields";
import StudentGenderBirthFields from "./StudentGenderBirthFields";
import StudentStatusDateFields from "./StudentStatusDateFields";
import StudentNotesField from "./StudentNotesField";

// نموذج التحقق من صحة البيانات
const studentSchema = z.object({
  code: z.string().min(3, { message: "يجب أن يكون الكود 3 أحرف على الأقل" }),
  name: z.string().min(3, { message: "يجب أن يكون الاسم 3 أحرف على الأقل" }),
  email: z.string().email({ message: "يجب إدخال بريد إلكتروني صحيح" }),
  phone: z.string().min(11, { message: "يجب إدخال رقم هاتف صحيح" }),
  address: z.string().optional(),
  gender: z.enum(["male", "female"], {
    required_error: "يجب اختيار النوع",
  }),
  birthDate: z.date().optional(),
  status: z.enum(["active", "inactive", "pending", "graduated"], {
    required_error: "يجب اختيار الحالة",
  }),
  registrationDate: z.string(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof studentSchema>;

const AddEditStudentDialog = ({ isOpen, onOpenChange, student, onSave }: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  onSave: (student: Student) => void;
}) => {
  // تهيئة النموذج بالقيم الافتراضية أو بيانات الطالب الحالي
  const form = useForm<FormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      code: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      gender: "male",
      status: "active",
      registrationDate: format(new Date(), "yyyy-MM-dd"),
      notes: "",
    },
  });

  // تحديث قيم النموذج عند تعديل طالب موجود
  useEffect(() => {
    if (student) {
      form.reset({
        code: student.code,
        name: student.name,
        email: student.email,
        phone: student.phone,
        address: student.address || "",
        gender: student.gender,
        birthDate: student.birthDate ? new Date(student.birthDate) : undefined,
        status: student.status,
        registrationDate: student.registrationDate,
        notes: student.notes || "",
      });
    } else {
      form.reset({
        code: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "male",
        status: "active",
        registrationDate: format(new Date(), "yyyy-MM-dd"),
        notes: "",
      });
    }
  }, [student, form]);

  const onSubmit = (data: FormValues) => {
    // إنشاء كائن الطالب
    const newStudent: Student = {
      id: student?.id || Date.now().toString(),
      code: data.code,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      gender: data.gender,
      birthDate: data.birthDate ? format(data.birthDate, "yyyy-MM-dd") : undefined,
      status: data.status,
      registrationDate: data.registrationDate,
      groups: student?.groups || [],
      notes: data.notes,
    };

    onSave(newStudent);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {student ? "تعديل بيانات الطالب" : "إضافة طالب جديد"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            {/* الحقول الأساسية */}
            <StudentBasicFields control={form.control} />
            {/* النوع وتاريخ الميلاد */}
            <StudentGenderBirthFields control={form.control} />
            {/* الحالة وتاريخ التسجيل */}
            <StudentStatusDateFields control={form.control} />
            {/* ملاحظات */}
            <StudentNotesField control={form.control} />
            <DialogFooter className="mt-4">
              <Button type="submit">{student ? "تعديل" : "إضافة"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditStudentDialog;
