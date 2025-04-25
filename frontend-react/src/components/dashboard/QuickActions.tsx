
import { Link } from "react-router-dom";
import { 
  Building, 
  Users, 
  Book, 
  Plus, 
  User, 
  Calendar 
} from "lucide-react";

const QuickActions = () => {
  const actions = [
    { 
      name: "إضافة قاعة", 
      href: "/rooms/new", 
      icon: <Building className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-700" 
    },
    { 
      name: "إضافة فرع", 
      href: "/branches/new", 
      icon: <Building className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-700" 
    },
    { 
      name: "إضافة قسم", 
      href: "/departments/new", 
      icon: <Book className="h-5 w-5" />,
      color: "bg-yellow-100 text-yellow-700" 
    },
    { 
      name: "إضافة موظف", 
      href: "/employees/new", 
      icon: <User className="h-5 w-5" />,
      color: "bg-green-100 text-green-700" 
    },
    { 
      name: "إضافة محاضر", 
      href: "/instructors/new", 
      icon: <User className="h-5 w-5" />,
      color: "bg-red-100 text-red-700" 
    },
    { 
      name: "إضافة دورة", 
      href: "/courses/new", 
      icon: <Book className="h-5 w-5" />,
      color: "bg-indigo-100 text-indigo-700" 
    },
    { 
      name: "إضافة عميل", 
      href: "/leads/new", 
      icon: <Users className="h-5 w-5" />,
      color: "bg-pink-100 text-pink-700" 
    },
    { 
      name: "إضافة مجموعة", 
      href: "/groups/new", 
      icon: <Calendar className="h-5 w-5" />,
      color: "bg-cyan-100 text-cyan-700" 
    },
  ];

  return (
    <div className="dashboard-card">
      <h2 className="text-lg font-semibold mb-4">إجراءات سريعة</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((action) => (
          <Link
            key={action.name}
            to={action.href}
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <div className={`p-3 rounded-full ${action.color} mb-3`}>
              {action.icon}
            </div>
            <span className="text-sm text-center">{action.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
