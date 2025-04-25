
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CourseLevel } from "./CourseLevelsList";

// حذف حقل الاسم من السكيما
const levelSchema = z.object({
  lecturesCount: z.coerce.number().positive({ message: "يجب إدخال عدد محاضرات صحيح" }),
  lectureDuration: z.coerce.number().positive({ message: "يجب إدخال مدة محاضرة صحيحة" }),
  price: z.coerce.number().nonnegative({ message: "يجب إدخال سعر صحيح" }),
});

type LevelFormValues = z.infer<typeof levelSchema>;

interface CourseLevelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (level: any) => void;
  level?: CourseLevel;
  isEditing?: boolean;
  autoLevelName?: number;
}

const CourseLevelDialog = ({
  open,
  onOpenChange,
  onSave,
  level,
  isEditing = false,
  autoLevelName,
}: CourseLevelDialogProps) => {
  const form = useForm<LevelFormValues>({
    resolver: zodResolver(levelSchema),
    defaultValues: {
      lecturesCount: 1,
      lectureDuration: 1,
      price: 0,
    },
  });

  // تحديث قيم النموذج عند الفتح/التعديل
  useEffect(() => {
    if (level && isEditing) {
      form.reset({
        lecturesCount: level.lecturesCount,
        lectureDuration: level.lectureDuration,
        price: level.price,
      });
    } else {
      form.reset({
        lecturesCount: 1,
        lectureDuration: 1,
        price: 0,
      });
    }
  }, [level, isEditing, form, open]);

  // عند الحفظ، لا ترسل name بل يتم توليده في parent
  const onSubmit = (values: LevelFormValues) => {
    onSave(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? `تعديل مستوى رقم ${autoLevelName}` : `إضافة مستوى رقم ${autoLevelName}`}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "قم بتغيير بيانات المستوى ثم اضغط حفظ"
              : "أدخل بيانات المستوى الجديد ثم اضغط حفظ"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <div className="mb-2">
              <FormLabel>اسم المستوى (يحدد تلقائياً)</FormLabel>
              <div className="bg-muted rounded px-2 py-1 text-sm">{autoLevelName}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lecturesCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عدد المحاضرات</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lectureDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مدة المحاضرة (ساعة)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>السعر (ج.م)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                إلغاء
              </Button>
              <Button type="submit">حفظ</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseLevelDialog;

