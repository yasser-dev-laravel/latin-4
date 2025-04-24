
import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { Group } from "./GroupsList";

interface Props {
  group: Group;
  onEdit: (group: Group) => void;
  onDelete: (groupId: string) => void;
}

const GroupTableRow = ({ group, onEdit, onDelete }: Props) => {
  const getStatusClass = (status: Group["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "waiting":
        return "bg-yellow-100 text-yellow-800";
      case "postponed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "finished":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: Group["status"]) => {
    switch (status) {
      case "active":
        return "نشطة";
      case "waiting":
        return "انتظار";
      case "postponed":
        return "مؤجلة";
      case "cancelled":
        return "ملغية";
      case "finished":
        return "منتهية";
      default:
        return "";
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{group.name}</TableCell>
      <TableCell>{group.code}</TableCell>
      <TableCell>{group.courseName}</TableCell>
      <TableCell>{group.instructorName}</TableCell>
      <TableCell>{group.roomName}</TableCell>
      <TableCell>{format(group.startDate, "yyyy/MM/dd")}</TableCell>
      <TableCell>{format(group.endDate, "yyyy/MM/dd")}</TableCell>
      <TableCell>
        <span
          className={`px-2 py-1 rounded-full text-xs ${getStatusClass(
            group.status
          )}`}
        >
          {getStatusText(group.status)}
        </span>
      </TableCell>
      <TableCell>{group.students}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => onEdit(group)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-red-500 border-red-300 hover:bg-red-50 hover:text-red-600"
            onClick={() => onDelete(group.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default GroupTableRow;
