
import { useState } from "react";
import { Plus, Edit, Trash, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialEmployees = [
  { id: 1, name: "محمد حسن", role: "مشرف", salary: 8000, calcType: "شهري" },
  { id: 2, name: "أحمد علي", role: "محاسب", salary: 6000, calcType: "عمولة" },
];

const EmployeesList = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialEmployees);
  const [form, setForm] = useState({ name: "", role: "", salary: 0, calcType: "شهري" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddOrEdit = () => {
    if (!form.name || !form.role) return;
    if (editingId) {
      setData(data.map(emp => emp.id === editingId ? { ...form, id: editingId } : emp));
      setEditingId(null);
    } else {
      setData([...data, { ...form, id: Date.now() }]);
    }
    setForm({ name: "", role: "", salary: 0, calcType: "شهري" });
  };

  const handleEdit = (emp: any) => {
    setForm(emp);
    setEditingId(emp.id);
  };

  const handleDelete = (id: number) => {
    setData(data.filter(emp => emp.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const filtered = data.filter(e => e.name.includes(search) || e.role.includes(search));
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">الموظفين</h1>
        <Button onClick={() => setEditingId(null)}>
          <Plus /> إضافة موظف
        </Button>
      </div>
      <div className="bg-white rounded-lg border p-4 mb-4">
        <div className="flex gap-2 mb-4">
          <Search />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="بحث..."
            className="border rounded px-2 py-1 flex-1"
          />
        </div>
        <div className="mb-4 space-y-2">
          <input className="border rounded px-2 py-1 mr-2" placeholder="الاسم" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <input className="border rounded px-2 py-1 mr-2" placeholder="الدور" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
          <input type="number" className="border rounded px-2 py-1 mr-2" placeholder="المرتب" value={form.salary} onChange={e => setForm(f => ({ ...f, salary: Number(e.target.value) }))} />
          <select className="border rounded px-2 py-1 mr-2" value={form.calcType} onChange={e => setForm(f => ({ ...f, calcType: e.target.value }))}>
            <option value="شهري">شهري</option>
            <option value="عمولة">عمولة</option>
            <option value="آخر">آخر</option>
          </select>
          <Button onClick={handleAddOrEdit}>{editingId ? "تعديل" : "إضافة"}</Button>
        </div>
        <table className="w-full border text-right">
          <thead>
            <tr className="bg-muted/50"><th>الاسم</th><th>الدور</th><th>المرتب</th><th>طريقة الحساب</th><th>إجراءات</th></tr>
          </thead>
          <tbody>
            {filtered.map(emp => (
              <tr key={emp.id} className="border-b hover:bg-muted/20">
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>{emp.salary}</td>
                <td>{emp.calcType}</td>
                <td>
                  <Button size="sm" variant="outline" onClick={() => handleEdit(emp)}><Edit /></Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(emp.id)}><Trash /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center p-4 text-muted-foreground">لا يوجد موظفين</div>}
      </div>
    </div>
  );
};

export default EmployeesList;
