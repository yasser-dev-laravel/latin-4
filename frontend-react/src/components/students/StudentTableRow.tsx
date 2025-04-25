
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { Student } from "./StudentsList";

interface Props {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (studentId: string) => void;
}

const StudentTableRow = ({ student, onEdit, onDelete }: Props) => {
  const getStatusClass = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "graduated":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return "نشط";
      case "inactive":
        return "غير نشط";
      case "pending":
        return "معلق";
      case "graduated":
        return "خريج";
      default:
        return "";
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{student.code}</TableCell>
      <TableCell>{student.name}</TableCell>
      <TableCell>{student.email}</TableCell>
      <TableCell>{student.phone}</TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 rounded-full text-xs ${getStatusClass(
            student.status
          )}`}
        >
          {getStatusText(student.status)}
        </span>
      </TableCell>
      <TableCell>{student.registrationDate}</TableCell>
      <TableCell>{student.groups.length}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => onEdit(student)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-red-500 border-red-300 hover:bg-red-50 hover:text-red-600"
            onClick={() => onDelete(student.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default StudentTableRow;
