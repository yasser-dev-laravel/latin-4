import { useState } from "react";
import { Plus, Building, Search, Edit, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useBranches } from "../../contexts/BranchesContext";

const BranchesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { branches, deleteBranch } = useBranches();
  const navigate = useNavigate();
  
  // تصفية الفروع بناءً على مصطلح البحث
  const filteredBranches = branches.filter(branch => 
    branch.name.includes(searchQuery) || 
    branch.code.includes(searchQuery) ||
    branch.governorate.includes(searchQuery) ||
    branch.address.includes(searchQuery)
  );

  const handleEdit = (id: number) => {
    // سيتم تنفيذ هذا لاحقًا
    toast({
      title: "هذه الميزة قيد التطوير",
      description: "سيتم إضافة تعديل الفروع قريبا",
      variant: "default",
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الفرع؟")) {
      deleteBranch(id);
      toast({
        title: "تم حذف الفرع بنجاح",
        variant: "default",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">الفروع</h1>
        <Link 
          to="/branches/new" 
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>إضافة فرع</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث عن فرع..."
              className="w-full pl-4 pr-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select className="border border-input rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">جميع المحافظات</option>
            <option value="القاهرة">القاهرة</option>
            <option value="الإسكندرية">الإسكندرية</option>
            <option value="الجيزة">الجيزة</option>
            <option value="الدقهلية">الدقهلية</option>
            <option value="أسوان">أسوان</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-right py-3 px-4 font-medium">كود الفرع</th>
                <th className="text-right py-3 px-4 font-medium">اسم الفرع</th>
                <th className="text-right py-3 px-4 font-medium">المحافظة</th>
                <th className="text-right py-3 px-4 font-medium">العنوان</th>
                <th className="text-right py-3 px-4 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map((branch) => (
                <tr key={branch.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4">{branch.code}</td>
                  <td className="py-3 px-4">{branch.name}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {branch.governorate}
                    </span>
                  </td>
                  <td className="py-3 px-4">{branch.address}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button 
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        onClick={() => handleEdit(branch.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        onClick={() => handleDelete(branch.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredBranches.length === 0 && (
          <div className="text-center py-8">
            <Building className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">لا توجد فروع</h3>
            <p className="text-muted-foreground">لم يتم العثور على فروع تطابق معايير البحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BranchesList;
