
import { useState } from "react";
import { Plus, Edit, Trash, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const mock = [
  { id: 1, name: "د. نهى عبد الرحمن", nationalId: "29700112245", specialty: "كمبيوتر", qualification: "دكتوراه", paymentType: "مبلغ", pay: 400, courses: "Excel,Word" },
  { id: 2, name: "أ. سامي السيد", nationalId: "29422566541", specialty: "لغات", qualification: "ليسانس آداب", paymentType: "نسبة", pay: 0.20, courses: "انجليزي,فرنسي" },
];
const InstructorsList = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(mock);
  const [form, setForm] = useState({ name: "", nationalId: "", specialty: "", qualification: "", paymentType: "مبلغ", pay: 0, courses: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const filtered = data.filter(i => i.name.includes(search) || i.specialty.includes(search));
  const handleAddOrEdit = () => {
    if (!form.name || !form.nationalId) return;
    if (editingId) setData(data.map(i => i.id === editingId ? { ...form, id: editingId } : i));
    else setData([...data, { ...form, id: Date.now() }]);
    setForm({ name: "", nationalId: "", specialty: "", qualification: "", paymentType: "مبلغ", pay: 0, courses: "" });
    setEditingId(null);
  };
  const handleEdit = (i: any) => { setForm(i); setEditingId(i.id); };
  const handleDelete = (id: number) => {
    setData(data.filter(i => i.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold">المحاضرين</h1>
        <Button onClick={() => setEditingId(null)}><Plus />إضافة محاضر</Button>
      </div>
      <div className="bg-white rounded-lg border p-4 mb-4">
        <div className="flex gap-2 mb-2">
          <Search />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث..." className="border rounded px-2 py-1 flex-1" />
        </div>
        <div className="mb-4 space-y-2">
          <input className="border rounded px-2 py-1" placeholder="الاسم" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <input className="border rounded px-2 py-1" placeholder="الرقم القومي" value={form.nationalId} onChange={e => setForm(f => ({ ...f, nationalId: e.target.value }))} />
          <input className="border rounded px-2 py-1" placeholder="التخصص" value={form.specialty} onChange={e => setForm(f => ({ ...f, specialty: e.target.value }))} />
          <input className="border rounded px-2 py-1" placeholder="المؤهل" value={form.qualification} onChange={e => setForm(f => ({ ...f, qualification: e.target.value }))} />
          <select className="border rounded px-2 py-1" value={form.paymentType} onChange={e => setForm(f => ({ ...f, paymentType: e.target.value }))}>
            <option value="مبلغ">مبلغ</option>
            <option value="نسبة">نسبة</option>
          </select>
          <input type="number" className="border rounded px-2 py-1" placeholder="المبلغ/النسبة" value={form.pay} onChange={e => setForm(f => ({ ...f, pay: Number(e.target.value) }))} />
          <input className="border rounded px-2 py-1" placeholder="الكورسات" value={form.courses} onChange={e => setForm(f => ({ ...f, courses: e.target.value }))} />
          <Button onClick={handleAddOrEdit}>{editingId ? "تعديل" : "إضافة"}</Button>
        </div>
        <table className="w-full border text-right"><thead>
          <tr className="bg-muted/50"><th>الاسم</th><th>القومي</th><th>تخصص</th><th>مؤهل</th><th>الحساب</th><th>القيمة</th><th>الكورسات</th><th>إجراءات</th></tr>
        </thead>
        <tbody>
          {filtered.map(i => (
            <tr key={i.id} className="border-b hover:bg-muted/20">
              <td>{i.name}</td><td>{i.nationalId}</td><td>{i.specialty}</td><td>{i.qualification}</td><td>{i.paymentType}</td><td>{i.pay}</td><td>{i.courses}</td>
              <td><Button size="sm" variant="outline" onClick={() => handleEdit(i)}><Edit /></Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(i.id)}><Trash /></Button></td>
            </tr>
          ))}
        </tbody></table>
        {filtered.length === 0 && <div className="text-center p-4 text-muted-foreground">لا يوجد محاضرين</div>}
      </div>
    </div>
  );
};
export default InstructorsList;
