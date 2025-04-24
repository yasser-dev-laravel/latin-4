
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CourseLevel } from "./CourseLevelsList";

interface CourseLevelTableProps {
  levels: CourseLevel[];
  onEdit: (level: CourseLevel) => void;
  onDelete: (levelId: string) => void;
}

const CourseLevelTable = ({ levels, onEdit, onDelete }: CourseLevelTableProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>المستوى</TableHead>
        <TableHead>الاسم</TableHead>
        <TableHead>عدد المحاضرات</TableHead>
        <TableHead>مدة المحاضرة (ساعة)</TableHead>
        <TableHead>المدة الكلية</TableHead>
        <TableHead>السعر (ج.م)</TableHead>
        <TableHead>الكود</TableHead>
        <TableHead>إجراءات</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {levels.map((level) => (
        <TableRow key={level.id}>
          <TableCell className="font-medium">{level.level}</TableCell>
          <TableCell>{level.name}</TableCell>
          <TableCell>{level.lecturesCount}</TableCell>
          <TableCell>{level.lectureDuration}</TableCell>
          <TableCell>{level.lecturesCount * level.lectureDuration} ساعة</TableCell>
          <TableCell>{level.price} ج.م</TableCell>
          <TableCell dir="ltr">{level.code}</TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onEdit(level)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-red-500 border-red-300 hover:bg-red-50 hover:text-red-600"
                onClick={() => onDelete(level.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default CourseLevelTable;
