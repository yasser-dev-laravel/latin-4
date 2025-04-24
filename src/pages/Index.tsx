
import { 
  Building, 
  Users, 
  Book, 
  Calendar
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import QuickActions from "@/components/dashboard/QuickActions";
import UpcomingGroups from "@/components/dashboard/UpcomingGroups";
import RecentPayments from "@/components/dashboard/RecentPayments";

const Index = () => {
  // هذه بيانات تجريبية ستأتي من واجهة برمجة التطبيق في التطبيق الحقيقي
  const stats = [
    { title: "الطلاب النشطين", value: 452, icon: <Users className="h-6 w-6" />, trend: { value: "8%", positive: true } },
    { title: "المجموعات النشطة", value: 32, icon: <Calendar className="h-6 w-6" />, trend: { value: "12%", positive: true } },
    { title: "الدورات", value: 48, icon: <Book className="h-6 w-6" />, trend: { value: "5%", positive: true } },
    { title: "الفروع", value: 5, icon: <Building className="h-6 w-6" />, trend: { value: "0%", positive: true } },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>
      
      <div className="mb-6">
        <QuickActions />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingGroups />
        <RecentPayments />
      </div>
    </div>
  );
};

export default Index;
