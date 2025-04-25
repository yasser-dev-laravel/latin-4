
import { Calendar } from "lucide-react";

// هذه بيانات تجريبية - ستأتي من واجهة برمجة التطبيق في التطبيق الحقيقي
const upcomingGroups = [
  { 
    id: 1, 
    name: "إنجليزي مستوى 1", 
    room: "قاعة 101", 
    instructor: "أحمد محمد", 
    date: "اليوم - 14:00", 
    students: 12 
  },
  { 
    id: 2, 
    name: "تصميم جرافيك", 
    room: "معمل 2", 
    instructor: "سارة أحمد", 
    date: "اليوم - 16:30", 
    students: 8 
  },
  { 
    id: 3, 
    name: "برمجة للمبتدئين", 
    room: "معمل كمبيوتر 3", 
    instructor: "محمد علي", 
    date: "غدًا - 10:00", 
    students: 15 
  },
  { 
    id: 4, 
    name: "فرنسي مستوى 2", 
    room: "قاعة 105", 
    instructor: "مريم خالد", 
    date: "غدًا - 13:00", 
    students: 10 
  },
];

const UpcomingGroups = () => {
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">المجموعات القادمة</h2>
        <button className="text-primary text-sm hover:underline">عرض الكل</button>
      </div>
      <div className="space-y-3">
        {upcomingGroups.map((group) => (
          <div key={group.id} className="p-3 border border-border rounded-md hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{group.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {group.room} • {group.instructor}
                </p>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 ml-1 text-primary" />
                <span>{group.date}</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 text-sm">
              <span className="text-muted-foreground">الطلاب: {group.students}</span>
              <button className="px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors">
                تسجيل الحضور
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingGroups;
