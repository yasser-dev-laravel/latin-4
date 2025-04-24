
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useBranches } from "@/contexts/BranchesContext";

interface RoomFormProps {
  onSubmit: (room: any) => void;
}

const initialState = {
  number: "",
  name: "",
  type: "",
  capacity: "",
  location: "",
  branchId: "",
};

const RoomForm = ({ onSubmit }: RoomFormProps) => {
  const [form, setForm] = useState(initialState);
  const { branches } = useBranches();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.number.trim() ||
      !form.name.trim() ||
      !form.type.trim() ||
      !form.capacity ||
      !form.branchId
    ) {
      toast({ title: "يرجى ملء جميع الحقول", variant: "destructive" });
      return;
    }
    onSubmit({
      ...form,
      id: Date.now(), // بشكل مبسط لتجربة الـid
      capacity: Number(form.capacity),
      branchId: Number(form.branchId),
    });
    toast({ title: "تم إضافة القاعة بنجاح" });
    navigate("/rooms");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>إضافة قاعة جديدة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">رقم القاعة</Label>
              <Input
                id="number"
                name="number"
                value={form.number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">اسم القاعة</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">نوع القاعة</Label>
              <select
                id="type"
                name="type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="">اختر النوع</option>
                <option value="قاعة عامة">قاعة عامة</option>
                <option value="معمل لغات">معمل لغات</option>
                <option value="معمل كمبيوتر">معمل كمبيوتر</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">السعة</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                min={1}
                value={form.capacity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">المكان</Label>
              <Input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branchId">الفرع</Label>
              <select
                id="branchId"
                name="branchId"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                value={form.branchId}
                onChange={handleChange}
                required
              >
                <option value="">اختر الفرع</option>
                {branches.map((branch) => (
                  <option value={branch.id} key={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">حفظ</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default RoomForm;
