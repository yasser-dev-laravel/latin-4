
import { useState } from "react";
import { Plus, Grid3X3, Search, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

// البداية: بيانات تجريبية أولية
const mockDepartments = [
  { id: 1, code: "COMP", name: "الكمبيوتر", coursesCount: 12, description: "دورات الكمبيوتر وتكنولوجيا المعلومات" },
  { id: 2, code: "LANG", name: "اللغات", coursesCount: 15, description: "دورات اللغات المختلفة (إنجليزي، فرنسي، إلخ)" },
  { id: 3, code: "KIDS", name: "الأطفال", coursesCount: 8, description: "دورات تعليمية للأطفال" },
  { id: 4, code: "BUS", name: "الأعمال", coursesCount: 6, description: "دورات إدارة الأعمال والتسويق" },
  { id: 5, code: "DES", name: "التصميم", coursesCount: 5, description: "دورات التصميم الجرافيكي" },
];

type Department = typeof mockDepartments[number];

const initialDepartmentForm = {
  id: undefined,
  code: "",
  name: "",
  coursesCount: 0,
  description: "",
};

const DepartmentsList = () => {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [form, setForm] = useState<Omit<Department, "id"> & { id?: number }>(initialDepartmentForm);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // فلترة الأقسام بناءً على نص البحث
  const filteredDepartments = departments.filter((department) =>
    department.name.includes(searchQuery) ||
    department.code.includes(searchQuery) ||
    department.description.includes(searchQuery)
  );

  const resetForm = () => {
    setForm(initialDepartmentForm);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      coursesCount: Number(e.target.value),
    }));
  };

  const handleAddOrEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim() || !form.name.trim()) {
      toast({ title: "يرجى تعبئة جميع الحقول الأساسية", variant: "destructive" });
      return;
    }
    if (editingId) {
      setDepartments((prev) =>
        prev.map((dep) => (dep.id === editingId ? { ...dep, ...form, id: editingId } : dep))
      );
      toast({ title: "تم تحديث القسم بنجاح" });
    } else {
      const newId = departments.length > 0
        ? Math.max(...departments.map((dep) => dep.id)) + 1
        : 1;
      setDepartments((prev) => [...prev, { ...form, id: newId } as Department]);
      toast({ title: "تم إضافة القسم بنجاح" });
    }
    resetForm();
  };

  const handleEdit = (dep: Department) => {
    setForm({ ...dep });
    setEditingId(dep.id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد أنك تريد حذف القسم؟")) {
      setDepartments((prev) => prev.filter((dep) => dep.id !== id));
      toast({ title: "تم حذف القسم بنجاح" });
      if (editingId === id) resetForm();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">الأقسام</h1>
        {/* زر إضافة (يفرّغ حقول النموذج) */}
        <Button
          onClick={resetForm}
          className="flex gap-2"
        >
          <Plus className="h-5 w-5" />
          <span>إضافة قسم</span>
        </Button>
      </div>

      {/* نموذج القسم (إضافة/تعديل) */}
      <form
        onSubmit={handleAddOrEdit}
        className="bg-white rounded-lg border p-4 mb-6 grid grid-cols-1 md:grid-cols-5 gap-2 items-end"
      >
        <div>
          <Label htmlFor="code">كود القسم</Label>
          <Input
            id="code"
            name="code"
            value={form.code}
            onChange={handleChange}
            placeholder="مثال: COMP"
            required
          />
        </div>
        <div>
          <Label htmlFor="name">اسم القسم</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="اسم القسم"
            required
          />
        </div>
        <div>
          <Label htmlFor="coursesCount">عدد الدورات</Label>
          <Input
            id="coursesCount"
            type="number"
            name="coursesCount"
            value={form.coursesCount}
            onChange={handleCountChange}
            min={0}
          />
        </div>
        <div>
          <Label htmlFor="description">الوصف</Label>
          <Input
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="وصف القسم"
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit">{editingId ? "حفظ" : "إضافة"}</Button>
          {editingId && (
            <Button type="button" variant="outline" onClick={resetForm}>
              إلغاء
            </Button>
          )}
        </div>
      </form>

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
              placeholder="بحث عن قسم..."
              className="w-full pl-4 pr-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-right py-3 px-4 font-medium">كود القسم</th>
                <th className="text-right py-3 px-4 font-medium">اسم القسم</th>
                <th className="text-right py-3 px-4 font-medium">عدد الدورات</th>
                <th className="text-right py-3 px-4 font-medium">الوصف</th>
                <th className="text-right py-3 px-4 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.map((department) => (
                <tr key={department.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4">{department.code}</td>
                  <td className="py-3 px-4">{department.name}</td>
                  <td className="py-3 px-4">{department.coursesCount}</td>
                  <td className="py-3 px-4">{department.description}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(department)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(department.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDepartments.length === 0 && (
          <div className="text-center py-8">
            <Grid3X3 className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">لا توجد أقسام</h3>
            <p className="text-muted-foreground">لم يتم العثور على أقسام تطابق معايير البحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentsList;
