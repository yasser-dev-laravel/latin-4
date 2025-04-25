import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import GroupsToolbar from "./GroupsToolbar";
import GroupTableRow from "./GroupTableRow";
import AddEditGroupDialog from "./AddEditGroupDialog";
import { useGroups } from "@/hooks/useGroups";
import { Student } from "../students/StudentsList";

export interface Group {
  id: string;
  name: string;
  code: string;
  courseId: string;
  courseName: string;
  level: string;
  instructorId: string;
  instructorName: string;
  roomId: string;
  roomName: string;
  startDate: Date;
  days: string[];
  startTime: string;
  endDate: Date;
  status: "active" | "waiting" | "postponed" | "cancelled" | "finished";
  students: number;
  studentsData?: Student[];
}

const GroupsList = () => {
  const { toast } = useToast();
  const { groups, loading, error, refetch, createGroup, updateGroup, deleteGroup } = useGroups();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Filter groups based on search query
  const filteredGroups = groups.filter(
    (group) =>
      group.name.includes(searchQuery) ||
      group.code.includes(searchQuery) ||
      group.courseName.includes(searchQuery) ||
      group.instructorName.includes(searchQuery)
  );

  const handleAddGroup = () => {
    setSelectedGroup(null);
    setIsDialogOpen(true);
  };

  const handleEditGroup = (group: Group) => {
    setSelectedGroup(group);
    setIsDialogOpen(true);
  };

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await deleteGroup(parseInt(groupId));
      toast({
        title: "تم حذف المجموعة",
        description: "تم حذف المجموعة بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حذف المجموعة",
        variant: "destructive",
      });
    }
  };

  const handleSaveGroup = async (group: Group) => {
    try {
      if (selectedGroup) {
        // Edit existing group
        await updateGroup(parseInt(group.id), group);
        toast({
          title: "تم تعديل المجموعة",
          description: "تم تعديل المجموعة بنجاح",
        });
      } else {
        // Add new group
        await createGroup(group);
        toast({
          title: "تم إضافة المجموعة",
          description: "تم إضافة المجموعة بنجاح",
        });
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حفظ المجموعة",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-4">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <GroupsToolbar
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onAdd={handleAddGroup}
      />

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الاسم</TableHead>
              <TableHead>الكود</TableHead>
              <TableHead>الكورس</TableHead>
              <TableHead>المحاضر</TableHead>
              <TableHead>القاعة</TableHead>
              <TableHead>تاريخ البداية</TableHead>
              <TableHead>تاريخ النهاية</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الطلاب</TableHead>
              <TableHead>إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group) => (
                <GroupTableRow
                  key={group.id}
                  group={group}
                  onEdit={handleEditGroup}
                  onDelete={handleDeleteGroup}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="h-24 text-center text-muted-foreground"
                >
                  لا توجد مجموعات
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AddEditGroupDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        group={selectedGroup}
        onSave={handleSaveGroup}
      />
    </div>
  );
};

export default GroupsList;
