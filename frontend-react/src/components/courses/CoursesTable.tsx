
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CourseTableRow from "./CourseTableRow";
import { Course } from "./CoursesList";

interface CoursesTableProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (courseId: string) => void;
}

const CoursesTable = ({ courses, onEdit, onDelete }: CoursesTableProps) => (
  <Card>
    <CardHeader>
      <CardTitle>قائمة الكورسات</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>اسم الكورس</TableHead>
            <TableHead>القسم</TableHead>
            <TableHead>المدة (ساعة)</TableHead>
            <TableHead>السعر</TableHead>
            <TableHead>عدد المستويات</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>إجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseTableRow
                key={course.id}
                course={course}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10">
                لا توجد كورسات مطابقة لبحثك
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default CoursesTable;
