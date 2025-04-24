
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MessageSquare, ArrowRight } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Lead } from "./LeadsList";

interface LeadTableRowProps {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDelete: (leadId: string) => void;
  onMessage: (lead: Lead) => void;
  onConvert: (lead: Lead) => void;
}

const getStatusBadge = (status: Lead["status"]) => {
  switch (status) {
    case "new":
      return <Badge variant="outline">جديد</Badge>;
    case "contacted":
      return <Badge variant="secondary">تم التواصل</Badge>;
    case "interested":
      return <Badge variant="default">مهتم</Badge>;
    case "not-interested":
      return <Badge variant="destructive">غير مهتم</Badge>;
    case "converted":
      return <Badge className="bg-green-500">تم التحويل</Badge>;
    default:
      return <Badge variant="outline">غير معروف</Badge>;
  }
};

const LeadTableRow = ({ lead, onEdit, onDelete, onMessage, onConvert }: LeadTableRowProps) => {
  return (
    <TableRow>
      <TableCell>{lead.name}</TableCell>
      <TableCell dir="ltr" className="text-right">{lead.phone}</TableCell>
      <TableCell>{lead.email || "-"}</TableCell>
      <TableCell>{lead.course || "-"}</TableCell>
      <TableCell>{lead.source || "-"}</TableCell>
      <TableCell>{getStatusBadge(lead.status)}</TableCell>
      <TableCell>{lead.createdAt}</TableCell>
      <TableCell>{lead.lastContactDate || "-"}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onMessage(lead)}
            title="إرسال رسالة واتساب"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(lead)}>
                تعديل البيانات
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive" 
                onClick={() => onDelete(lead.id)}
              >
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            variant="default"
            size="icon"
            onClick={() => onConvert(lead)}
            title="تحويل إلى طالب"
            className="bg-green-500 hover:bg-green-600"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default LeadTableRow;
