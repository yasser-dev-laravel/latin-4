
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import StudentsToolbar from "./StudentsToolbar";
import StudentTableRow from "./StudentTableRow";
import AddEditStudentDialog from "./AddEditStudentDialog";

export interface Student {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  gender: "male" | "female";
  birthDate?: string;
  status: "active" | "inactive" | "pending" | "graduated";
  registrationDate: string;
  groups: {
    id: string;
    name: string;
  }[];
  notes?: string;
}

// بيانات تجريبية للطلاب
const initialStudents: Student[] = [
  {
    id: "1",
    code: "STD-001",
    name: "أحمد محمد علي",
    email: "ahmed@example.com",
    phone: "01012345678",
    address: "القاهرة، مصر",
    gender: "male",
    birthDate: "1998-05-15",
    status: "active",
    registrationDate: "2023-01-15",
    groups: [{ id: "1", name: "مجموعة إنجليزي متقدم" }],
    notes: "طالب متفوق",
  },
  {
    id: "2",
    code: "STD-002",
    name: "سارة أحمد حسن",
    email: "sara@example.com",
    phone: "01123456789",
    address: "الإسكندرية، مصر",
    gender: "female",
    birthDate: "1999-08-20",
    status: "active",
    registrationDate: "2023-02-10",
    groups: [],
    notes: "",
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
];

const StudentsList = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // تصفية الطلاب بناءً على البحث
  const filteredStudents = students.filter(
    (student) =>
      student.name.includes(searchQuery) ||
      student.code.includes(searchQuery) ||
      student.email.includes(searchQuery) ||
      student.phone.includes(searchQuery)
  );

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsDialogOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter((student) => student.id !== studentId));
    toast({
      title: "تم حذف الطالب",
      description: "تم حذف الطالب بنجاح",
    });
  };

  const handleSaveStudent = (student: Student) => {
    if (selectedStudent) {
      // تعديل طالب موجود
      setStudents(
        students.map((s) => (s.id === student.id ? student : s))
      );
      toast({
        title: "تم تعديل الطالب",
        description: "تم تعديل بيانات الطالب بنجاح",
      });
    } else {
      // إضافة طالب جديد
      setStudents([...students, { ...student, id: Date.now().toString() }]);
      toast({
        title: "تم إضافة الطالب",
        description: "تم إضافة الطالب بنجاح",
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <StudentsToolbar
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onAdd={handleAddStudent}
      />

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الكود</TableHead>
              <TableHead>الاسم</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>الهاتف</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>تاريخ التسجيل</TableHead>
              <TableHead>المجموعات</TableHead>
              <TableHead>إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <StudentTableRow
                  key={student.id}
                  student={student}
                  onEdit={handleEditStudent}
                  onDelete={handleDeleteStudent}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-muted-foreground"
                >
                  لا يوجد طلاب
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AddEditStudentDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        student={selectedStudent}
        onSave={handleSaveStudent}
      />
    </div>
  );
};

export default StudentsList;
