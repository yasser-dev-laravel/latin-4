
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Lead } from "./LeadsList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// نموذج التحقق من صحة البيانات
const leadSchema = z.object({
  name: z.string().min(3, { message: "يجب أن يكون الاسم 3 أحرف على الأقل" }),
  phone: z.string().min(11, { message: "يجب إدخال رقم هاتف صحيح" }),
  email: z.string().email({ message: "يجب إدخال بريد إلكتروني صحيح" }).optional().or(z.literal("")),
  course: z.string().optional(),
  source: z.string().optional(),
  status: z.enum(["new", "contacted", "interested", "not-interested", "converted"], {
    required_error: "يجب اختيار الحالة",
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof leadSchema>;

const AddEditLeadDialog = ({ isOpen, onOpenChange, lead, onSave }: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead | null;
  onSave: (lead: Lead) => void;
}) => {
  // تهيئة النموذج بالقيم الافتراضية أو بيانات العميل الحالي
  const form = useForm<FormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      course: "",
      source: "",
      status: "new",
      notes: "",
    },
  });

  // تحديث قيم النموذج عند تعديل عميل موجود
  useEffect(() => {
    if (lead) {
      form.reset({
        name: lead.name,
        phone: lead.phone,
        email: lead.email || "",
        course: lead.course || "",
        source: lead.source || "",
        status: lead.status,
        notes: lead.notes || "",
      });
    } else {
      form.reset({
        name: "",
        phone: "",
        email: "",
        course: "",
        source: "",
        status: "new",
        notes: "",
      });
    }
  }, [lead, form]);

  const onSubmit = (data: FormValues) => {
    // إنشاء كائن العميل
    const newLead: Lead = {
      id: lead?.id || Date.now().toString(),
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      course: data.course || undefined,
      source: data.source || undefined,
      status: data.status,
      createdAt: lead?.createdAt || new Date().toISOString().split('T')[0],
      lastContactDate: lead?.lastContactDate,
      notes: data.notes,
    };

    onSave(newLead);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {lead ? "تعديل بيانات العميل" : "إضافة عميل جديد"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم</FormLabel>
                    <FormControl>
                      <Input placeholder="اسم العميل" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الهاتف</FormLabel>
                    <FormControl>
                      <Input placeholder="رقم الهاتف" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input placeholder="البريد الإلكتروني (اختياري)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الكورس المطلوب</FormLabel>
                    <FormControl>
                      <Input placeholder="الكورس المطلوب (اختياري)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المصدر</FormLabel>
                    <FormControl>
                      <Input placeholder="المصدر (اختياري)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الحالة</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الحالة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new">جديد</SelectItem>
                        <SelectItem value="contacted">تم التواصل</SelectItem>
                        <SelectItem value="interested">مهتم</SelectItem>
                        <SelectItem value="not-interested">غير مهتم</SelectItem>
                        <SelectItem value="converted">تم التحويل</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات</FormLabel>
                  <FormControl>
                    <Textarea placeholder="ملاحظات (اختياري)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-4">
              <Button type="submit">{lead ? "تعديل" : "إضافة"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditLeadDialog;
