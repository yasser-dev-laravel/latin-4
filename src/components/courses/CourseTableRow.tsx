
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { Course } from "./CoursesList";

interface Props {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (courseId: string) => void;
}

const CourseTableRow = ({ course, onEdit, onDelete }: Props) => (
  <TableRow>
    <TableCell className="font-medium">{course.name}</TableCell>
    <TableCell>{course.category}</TableCell>
    <TableCell>{course.duration}</TableCell>
    <TableCell>{course.price} ج.م</TableCell>
    <TableCell>
      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">
        {course.levels?.length || 0}
      </span>
    </TableCell>
    <TableCell>
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          course.active
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {course.active ? "نشط" : "غير نشط"}
      </span>
    </TableCell>
    <TableCell>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onEdit(course)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="text-red-500 border-red-300 hover:bg-red-50 hover:text-red-600"
          onClick={() => onDelete(course.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </TableCell>
  </TableRow>
);

export default CourseTableRow;
