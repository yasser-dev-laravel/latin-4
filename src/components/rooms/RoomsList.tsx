import { useState } from "react";
import { Plus, Building, Search, Edit, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useBranches } from "@/contexts/BranchesContext";

const initialRooms = [
  { id: 1, number: "101", name: "قاعة المستقبل", type: "قاعة عامة", capacity: 30, location: "الدور الأول", branchId: 1 },
  { id: 2, number: "102", name: "قاعة التميز", type: "قاعة عامة", capacity: 25, location: "الدور الأول", branchId: 1 },
  { id: 3, number: "L1", name: "معمل اللغات 1", type: "معمل لغات", capacity: 20, location: "الدور الثاني", branchId: 2 },
  { id: 4, number: "C1", name: "معمل الكمبيوتر 1", type: "معمل كمبيوتر", capacity: 15, location: "الدور الثاني", branchId: 3 },
  { id: 5, number: "C2", name: "معمل الكمبيوتر 2", type: "معمل كمبيوتر", capacity: 15, location: "الدور الثاني", branchId: 3 },
];

const RoomsList = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");
  const { branches } = useBranches();

  // filter rooms depending on search and branch
  const filteredRooms = rooms.filter(
    (room) => {
      const matchesSearch =
        room.name.includes(searchQuery) ||
        room.number.includes(searchQuery) ||
        room.type.includes(searchQuery) ||
        room.location.includes(searchQuery);

      const matchesBranch =
        selectedBranchId === "" ||
        room.branchId === Number(selectedBranchId);

      return matchesSearch && matchesBranch;
    }
  );

  const getBranchName = (branchId: number) => {
    const branch = branches.find((b) => b.id === branchId);
    return branch ? branch.name : "-";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">القاعات والمعامل</h1>
        <Link
          to="/rooms/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>إضافة قاعة</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث عن قاعة..."
              className="w-full pl-4 pr-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            className="border border-input rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary min-w-[140px]"
            value={selectedBranchId}
            onChange={e => setSelectedBranchId(e.target.value)}
          >
            <option value="">جميع الفروع</option>
            {branches.map(branch => (
              <option value={branch.id} key={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
          <select className="border border-input rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">جميع الأنواع</option>
            <option value="قاعة عامة">قاعة عامة</option>
            <option value="معمل لغات">معمل لغات</option>
            <option value="معمل كمبيوتر">معمل كمبيوتر</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-right py-3 px-4 font-medium">رقم القاعة</th>
                <th className="text-right py-3 px-4 font-medium">اسم القاعة</th>
                <th className="text-right py-3 px-4 font-medium">النوع</th>
                <th className="text-right py-3 px-4 font-medium">السعة</th>
                <th className="text-right py-3 px-4 font-medium">المكان</th>
                <th className="text-right py-3 px-4 font-medium">الفرع</th>
                <th className="text-right py-3 px-4 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4">{room.number}</td>
                  <td className="py-3 px-4">{room.name}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        room.type === "معمل كمبيوتر"
                          ? "bg-blue-100 text-blue-800"
                          : room.type === "معمل لغات"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {room.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">{room.capacity} طالب</td>
                  <td className="py-3 px-4">{room.location}</td>
                  <td className="py-3 px-4">{getBranchName(room.branchId)}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-8">
            <Building className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">لا توجد قاعات</h3>
            <p className="text-muted-foreground">لم يتم العثور على قاعات تطابق معايير البحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsList;
