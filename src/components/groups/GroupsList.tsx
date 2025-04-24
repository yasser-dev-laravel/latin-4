
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

// Sample mock data
const initialGroups: Group[] = [
  {
    id: "1",
    name: "مجموعة إنجليزي متقدم",
    code: "ENG-ADV-001",
    courseId: "1",
    courseName: "إنجليزي محادثة",
    level: "متقدم",
    instructorId: "1",
    instructorName: "د. نهى عبد الرحمن",
    roomId: "2", 
    roomName: "قاعة 2",
    startDate: new Date("2025-05-01"),
    days: ["السبت", "الاثنين", "الأربعاء"],
    startTime: "18:00",
    endDate: new Date("2025-06-15"),
    status: "active",
    students: 12,
    studentsData: [
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
    ],
  },
  {
    id: "2",
    name: "مجموعة حاسب آلي مبتدئ",
    code: "COMP-BEG-002",
    courseId: "2",
    courseName: "أساسيات الحاسب",
    level: "مبتدئ",
    instructorId: "2",
    instructorName: "أ. سامي السيد",
    roomId: "1",
    roomName: "معمل 1",
    startDate: new Date("2025-05-15"),
    days: ["الأحد", "الثلاثاء"],
    startTime: "16:00",
    endDate: new Date("2025-07-01"),
    status: "waiting",
    students: 8,
    studentsData: [
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
    ],
  },
];

const GroupsList = () => {
  const { toast } = useToast();
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter((group) => group.id !== groupId));
    toast({
      title: "تم حذف المجموعة",
      description: "تم حذف المجموعة بنجاح",
    });
  };

  const handleSaveGroup = (group: Group) => {
    if (selectedGroup) {
      // Edit existing group
      setGroups(
        groups.map((g) => (g.id === group.id ? group : g))
      );
      toast({
        title: "تم تعديل المجموعة",
        description: "تم تعديل المجموعة بنجاح",
      });
    } else {
      // Add new group
      setGroups([...groups, { ...group, id: Date.now().toString() }]);
      toast({
        title: "تم إضافة المجموعة",
        description: "تم إضافة المجموعة بنجاح",
      });
    }
    setIsDialogOpen(false);
  };

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
