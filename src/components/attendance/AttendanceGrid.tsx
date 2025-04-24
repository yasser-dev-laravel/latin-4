
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Group } from "../groups/GroupsList";
import { Button } from "@/components/ui/button";
import AttendanceSessionDialog from "./AttendanceSessionDialog";

interface Props {
  selectedDate: Date;
}

// Mock rooms data
const rooms = [
  { id: "1", name: "معمل 1" },
  { id: "2", name: "قاعة 2" },
  { id: "3", name: "قاعة 3" },
  { id: "4", name: "معمل 2" },
];

// Mock time slots data
const timeSlots = [
  "08:00",
  "10:00",
  "12:00",
  "14:00",
  "16:00",
  "18:00",
  "20:00",
];

// Import the groups from the GroupsList component
import { useState as useStateMock } from "react"; // Dummy import to simulate actual import
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
      {
        id: "2",
        code: "STD-002",
        name: "سارة أحمد",
        email: "sara@example.com",
        phone: "01123456789",
        gender: "female",
        status: "active",
        registrationDate: "2023-02-20",
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
      {
        id: "4",
        code: "STD-004",
        name: "فاطمة علي",
        email: "fatma@example.com",
        phone: "01098765432",
        gender: "female",
        status: "active",
        registrationDate: "2023-04-10",
        groups: [{ id: "2", name: "مجموعة حاسب آلي مبتدئ" }],
      },
    ],
  },
];

// Function to get Arabic day name
const getArabicDayName = (date: Date): string => {
  const days = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  return days[date.getDay()];
};

// Function to check if group is active on selected date and time
const isGroupActiveAt = (group: Group, date: Date, timeSlot: string): boolean => {
  // Check if the date is between start and end dates
  const isWithinDateRange =
    group.startDate <= date && date <= group.endDate;

  // Check if the day matches group's scheduled days
  const dayName = getArabicDayName(date);
  const isDayMatch = group.days.includes(dayName);

  // Check if the time slot matches group's start time
  const isTimeMatch = group.startTime === timeSlot;

  // Group is active if all conditions are met
  return isWithinDateRange && isDayMatch && isTimeMatch && group.status === "active";
};

const AttendanceGrid = ({ selectedDate }: Props) => {
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const selectedDayName = getArabicDayName(selectedDate);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">الوقت / القاعة</th>
            {rooms.map((room) => (
              <th key={room.id} className="p-3 border">
                {room.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((timeSlot) => (
            <tr key={timeSlot}>
              <td className="p-3 border font-medium text-center">{timeSlot}</td>
              {rooms.map((room) => {
                // Find active groups for this room and time slot
                const activeGroups = groups.filter(
                  (group) =>
                    group.roomId === room.id &&
                    isGroupActiveAt(group, selectedDate, timeSlot)
                );

                return (
                  <td key={room.id} className="p-2 border text-center">
                    {activeGroups.length > 0 ? (
                      activeGroups.map((group) => (
                        <Button
                          key={group.id}
                          variant="outline"
                          className="w-full mb-1 bg-blue-50 text-blue-800 hover:bg-blue-100"
                          onClick={() => {
                            setSelectedGroup(group);
                            setIsSessionDialogOpen(true);
                          }}
                        >
                          {group.name}
                          <br />
                          <span className="text-xs">
                            {group.instructorName}
                          </span>
                        </Button>
                      ))
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedGroup && (
        <AttendanceSessionDialog
          group={selectedGroup}
          date={selectedDate}
          isOpen={isSessionDialogOpen}
          onOpenChange={setIsSessionDialogOpen}
          onComplete={(updatedGroup) => {
            setGroups(
              groups.map((g) => (g.id === updatedGroup.id ? updatedGroup : g))
            );
            setIsSessionDialogOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default AttendanceGrid;
