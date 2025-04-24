import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, addMonths } from "date-fns";
import { Calendar as CalendarIcon, Clock, Search, X } from "lucide-react";
import { Group } from "./GroupsList";
import { Course } from "../courses/CoursesList";
import { useCourses } from "@/contexts/CoursesContext";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Student } from "../students/StudentsList";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  group: Group | null;
  onSave: (group: Group) => void;
}

// Mock data for select options
const courses = [
  { id: "1", name: "إنجليزي محادثة" },
  { id: "2", name: "أساسيات الحاسب" },
  { id: "3", name: "Excel متقدم" },
];

const instructors = [
  { id: "1", name: "د. نهى عبد الرحمن" },
  { id: "2", name: "أ. سامي السيد" },
];

const rooms = [
  { id: "1", name: "معمل 1" },
  { id: "2", name: "قاعة 2" },
  { id: "3", name: "قاعة 3" },
];

// بيانات تجريبية للطلاب
const mockStudents: Student[] = [
  {
    id: "1",
    code: "STD-001",
    name: "أحمد محمد علي",
    email: "ahmed@example.com",
    phone: "01012345678",
    gender: "male",
    status: "active",
    registrationDate: "2023-01-15",
    groups: [{ id: "1", name: "مجموعة إنجليزي متقدم" }],
  },
  {
    id: "2",
    code: "STD-002",
    name: "سارة أحمد حسن",
    email: "sara@example.com",
    phone: "01123456789",
    gender: "female",
    status: "active",
    registrationDate: "2023-02-10",
    groups: [],
  },
  {
    id: "3",
    code: "STD-003",
    name: "محمود خالد",
    email: "mahmoud@example.com",
    phone: "01234567890",
    gender: "male",
    status: "inactive",
    registrationDate: "2023-03-05",
    groups: [{ id: "2", name: "مجموعة حاسب آلي مبتدئ" }],
  },
  {
    id: "4",
    code: "STD-004",
    name: "فاطمة عبد الرحمن",
    email: "fatma@example.com",
    phone: "01111222333",
    gender: "female",
    status: "active",
    registrationDate: "2023-04-10",
    groups: [],
  },
  {
    id: "5",
    code: "STD-005",
    name: "حسن علي محمد",
    email: "hassan@example.com",
    phone: "01555666777",
    gender: "male",
    status: "active",
    registrationDate: "2023-05-15",
    groups: [],
  },
];

const levels = ["مبتدئ", "متوسط", "متقدم"];

const weekDays = [
  { id: "السبت", label: "السبت" },
  { id: "الأحد", label: "الأحد" },
  { id: "الاثنين", label: "الاثنين" },
  { id: "الثلاثاء", label: "الثلاثاء" },
  { id: "الأربعاء", label: "الأربعاء" },
  { id: "الخميس", label: "الخميس" },
  { id: "الجمعة", label: "الجمعة" },
];

const statusOptions = [
  { id: "active", label: "نشطة" },
  { id: "waiting", label: "انتظار" },
  { id: "postponed", label: "مؤجلة" },
  { id: "cancelled", label: "ملغية" },
  { id: "finished", label: "منتهية" },
];

// Form validation schema
const groupSchema = z.object({
  name: z.string().min(3, { message: "يجب أن يكون الاسم 3 أحرف على الأقل" }),
  code: z.string().min(3, { message: "يجب أن يكون الكود 3 أحرف على الأقل" }),
  courseId: z.string({ required_error: "يجب اختيار الكورس" }),
  level: z.string({ required_error: "يجب اختيار المستوى" }),
  instructorId: z.string({ required_error: "يجب اختيار المحاضر" }),
  roomId: z.string({ required_error: "يجب اختيار القاعة" }),
  startDate: z.date({ required_error: "يجب اختيار تاريخ البداية" }),
  days: z.array(z.string()).min(1, { message: "يجب اختيار يوم واحد على الأقل" }),
  startTime: z.string().min(1, { message: "يجب تحديد وقت البداية" }),
  status: z.enum(["active", "waiting", "postponed", "cancelled", "finished"], {
    required_error: "يجب اختيار الحالة",
  }),
});

type FormValues = z.infer<typeof groupSchema>;

const AddEditGroupDialog = ({ isOpen, onOpenChange, group, onSave }: Props) => {
  const { courses } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseLevels, setCourseLevels] = useState<{ id: string; level: number; name: string; code: string }[]>([]);
  // للبحث عن الطلاب
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  // قائمة الطلاب المختارين للمجموعة
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);

  // Initialize form with default values or existing group data
  const form = useForm<FormValues>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: "",
      code: "",
      courseId: "",
      level: "",
      instructorId: "",
      roomId: "",
      startDate: new Date(),
      days: [],
      startTime: "16:00",
      status: "active",
    },
  });

  // Update form values when editing an existing group
  useEffect(() => {
    if (group) {
      form.reset({
        name: group.name,
        code: group.code,
        courseId: group.courseId,
        level: group.level,
        instructorId: group.instructorId,
        roomId: group.roomId,
        startDate: group.startDate,
        days: group.days,
        startTime: group.startTime,
        status: group.status,
      });
      
      // لو كان هناك طلاب محفوظين في المجموعة، نضيفهم للقائمة المختارة
      if (group.studentsData && group.studentsData.length > 0) {
        setSelectedStudents(group.studentsData);
      } else {
        setSelectedStudents([]);
      }
    } else {
      form.reset({
        name: "",
        code: "",
        courseId: "",
        level: "",
        instructorId: "",
        roomId: "",
        startDate: new Date(),
        days: [],
        startTime: "16:00",
        status: "active",
      });
      setSelectedStudents([]);
    }
  }, [group, form]);

  // تحديث المستويات عند اختيار الكورس
  useEffect(() => {
    if (form.getValues("courseId")) {
      const course = courses.find(c => c.id === form.getValues("courseId"));
      if (course) {
        setSelectedCourse(course);
        setCourseLevels(course.levels);
        // اختيار المستوى الأول تلقائياً
        if (course.levels.length > 0) {
          form.setValue("level", course.levels[0].code);
        }
      }
    }
  }, [form.getValues("courseId"), courses]);

  // Calculate end date based on course duration (for this example, using a fixed duration)
  const calculateEndDate = (startDate: Date): Date => {
    // For this example, we'll use a fixed 2-month duration
    return addMonths(startDate, 2);
  };

  // فلترة الطلاب بناءً على البحث
  const filteredStudents = mockStudents.filter(
    (student) =>
      !selectedStudents.some((s) => s.id === student.id) && // استبعاد الطلاب المختارين بالفعل
      (student.name.includes(studentSearchQuery) ||
      student.code.includes(studentSearchQuery) ||
      student.phone.includes(studentSearchQuery))
  );

  // إضافة طالب للمجموعة
  const addStudentToGroup = (student: Student) => {
    setSelectedStudents([...selectedStudents, student]);
  };

  // إزالة طالب من المجموعة
  const removeStudentFromGroup = (studentId: string) => {
    setSelectedStudents(selectedStudents.filter((s) => s.id !== studentId));
  };

  const onSubmit = (data: FormValues) => {
    // Find the course and instructor names
    const course = courses.find((c) => c.id === data.courseId);
    const instructor = instructors.find((i) => i.id === data.instructorId);
    const room = rooms.find((r) => r.id === data.roomId);
    const level = courseLevels.find(l => l.code === data.level);

    // Create the group object
    const newGroup: Group = {
      id: group?.id || Date.now().toString(),
      name: data.name,
      code: level?.code || data.code, // استخدام كود المستوى
      courseId: data.courseId,
      courseName: course?.name || "",
      level: data.level,
      instructorId: data.instructorId,
      instructorName: instructor?.name || "",
      roomId: data.roomId,
      roomName: room?.name || "",
      startDate: data.startDate,
      days: data.days,
      startTime: data.startTime,
      endDate: calculateEndDate(data.startDate),
      status: data.status,
      students: selectedStudents.length,
      studentsData: selectedStudents,
    };

    onSave(newGroup);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>
            {group ? "تعديل مجموعة" : "إضافة مجموعة جديدة"}
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
                    <FormLabel>اسم المجموعة</FormLabel>
                    <FormControl>
                      <Input placeholder="اسم المجموعة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كود المجموعة</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="كود المجموعة" 
                        {...field} 
                        disabled={true} // تعطيل حقل الكود لأنه سيتم تعيينه تلقائياً من كود المستوى
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الكورس</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        const course = courses.find(c => c.id === value);
                        if (course) {
                          setSelectedCourse(course);
                          setCourseLevels(course.levels);
                          if (course.levels.length > 0) {
                            form.setValue("level", course.levels[0].code);
                          }
                        }
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الكورس" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المستوى</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        const level = courseLevels.find(l => l.code === value);
                        if (level) {
                          form.setValue("code", level.code);
                        }
                      }}
                      defaultValue={field.value}
                      disabled={!selectedCourse}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المستوى" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseLevels.map((level) => (
                          <SelectItem key={level.id} value={level.code}>
                            {level.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="instructorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المحاضر</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المحاضر" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {instructors.map((instructor) => (
                          <SelectItem key={instructor.id} value={instructor.id}>
                            {instructor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roomId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>القاعة</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر القاعة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {rooms.map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>تاريخ البداية</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-right font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "yyyy/MM/dd")
                            ) : (
                              <span>اختر التاريخ</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وقت البداية</FormLabel>
                    <div className="flex items-center">
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="days"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>أيام الحضور</FormLabel>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {weekDays.map((day) => (
                      <FormField
                        key={day.id}
                        control={form.control}
                        name="days"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={day.id}
                              className="flex flex-row items-start space-x-2 space-x-reverse space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(day.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, day.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== day.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal mr-2">
                                {day.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
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
                      {statusOptions.map((status) => (
                        <SelectItem
                          key={status.id}
                          value={status.id}
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* قسم الطلاب */}
            <div className="border rounded-md p-4 space-y-4">
              <h3 className="font-medium">الطلاب في المجموعة</h3>
              
              {/* البحث عن الطلاب */}
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن طالب بالاسم أو الكود أو الهاتف..."
                  value={studentSearchQuery}
                  onChange={(e) => setStudentSearchQuery(e.target.value)}
                  className="pl-10 pr-12"
                />
              </div>
              
              {/* قائمة نتائج البحث */}
              {studentSearchQuery && filteredStudents.length > 0 && (
                <div className="border rounded-md">
                  {/* أزرار الإضافة والإلغاء */}
                  <div className="flex justify-end gap-2 p-2 border-b">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStudentSearchQuery("")}
                    >
                      إلغاء
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setStudentSearchQuery("");
                      }}
                    >
                      تم
                    </Button>
                  </div>
                  
                  {/* قائمة الطلاب */}
                  <div className="max-h-40 overflow-y-auto">
                    <ul className="divide-y">
                      {filteredStudents.map((student) => (
                        <li 
                          key={student.id} 
                          className="p-2 hover:bg-muted/50 flex justify-between items-center"
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox 
                              checked={selectedStudents.some(s => s.id === student.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  addStudentToGroup(student);
                                } else {
                                  removeStudentFromGroup(student.id);
                                }
                              }}
                            />
                            <span>{student.name} - {student.code}</span>
                          </div>
                          <span className="text-muted-foreground text-sm">{student.phone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {/* قائمة الطلاب المختارين */}
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedStudents.length === 0 ? (
                  <p className="text-muted-foreground text-sm">لم يتم إضافة طلاب بعد</p>
                ) : (
                  selectedStudents.map((student) => (
                    <Badge 
                      key={student.id}
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {student.name}
                      <button
                        type="button"
                        onClick={() => removeStudentFromGroup(student.id)}
                        className="ml-1 rounded-full p-0.5 hover:bg-muted"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button type="submit">{group ? "تعديل" : "إضافة"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditGroupDialog;
