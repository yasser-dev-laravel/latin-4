
import { Receipt } from "lucide-react";

// هذه بيانات تجريبية - ستأتي من واجهة برمجة التطبيق في التطبيق الحقيقي
const recentPayments = [
  { 
    id: 1, 
    student: "أحمد محمد", 
    course: "إنجليزي مستوى 2", 
    amount: 1500, 
    date: "اليوم، 10:23 ص" 
  },
  { 
    id: 2, 
    student: "سارة خالد", 
    course: "تصميم جرافيك", 
    amount: 2000, 
    date: "اليوم، 09:45 ص" 
  },
  { 
    id: 3, 
    student: "محمد علي", 
    course: "برمجة للمبتدئين", 
    amount: 1800, 
    date: "أمس، 15:30 م" 
  },
  { 
    id: 4, 
    student: "نور أحمد", 
    course: "فرنسي مستوى 1", 
    amount: 1300, 
    date: "أمس، 14:20 م" 
  },
];

const RecentPayments = () => {
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">أحدث المدفوعات</h2>
        <button className="text-primary text-sm hover:underline">عرض الكل</button>
      </div>
      <div className="space-y-3">
        {recentPayments.map((payment) => (
          <div key={payment.id} className="p-3 border border-border rounded-md hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{payment.student}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {payment.course}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-medium text-primary">{payment.amount} ج.م</span>
                <span className="text-xs text-muted-foreground mt-1">{payment.date}</span>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <button className="px-3 py-1 bg-accent text-accent-foreground rounded hover:bg-accent/80 transition-colors text-sm flex items-center">
                <Receipt className="h-4 w-4 ml-1" />
                طباعة الإيصال
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPayments;
