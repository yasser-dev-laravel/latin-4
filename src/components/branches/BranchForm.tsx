
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useBranches } from "@/contexts/BranchesContext";

interface BranchFormProps {
  initialData?: {
    id?: number;
    code: string;
    name: string;
    governorate: string;
    address: string;
  };
  mode: "create" | "edit";
}

const BranchForm = ({ initialData, mode = "create" }: BranchFormProps) => {
  const navigate = useNavigate();
  const { addBranch, updateBranch } = useBranches();
  
  const [formData, setFormData] = useState({
    code: initialData?.code || "",
    name: initialData?.name || "",
    governorate: initialData?.governorate || "",
    address: initialData?.address || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "create") {
      // إضافة فرع جديد
      addBranch(formData);
      toast({
        title: "تم إضافة الفرع بنجاح",
        variant: "default",
      });
    } else if (initialData?.id) {
      // تحديث الفرع الحالي
      updateBranch({
        id: initialData.id,
        ...formData
      });
      toast({
        title: "تم تحديث بيانات الفرع بنجاح",
        variant: "default",
      });
    }
    
    navigate("/branches");
  };

  const handleCancel = () => {
    navigate("/branches");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === "create" ? "إضافة فرع جديد" : "تعديل بيانات الفرع"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">كود الفرع</Label>
              <Input
                id="code"
                name="code"
                placeholder="مثال: CAI01"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">اسم الفرع</Label>
              <Input
                id="name"
                name="name"
                placeholder="مثال: فرع القاهرة الرئيسي"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="governorate">المحافظة</Label>
              <select
                id="governorate"
                name="governorate"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={formData.governorate}
                onChange={handleChange}
                required
              >
                <option value="">اختر المحافظة</option>
                <option value="القاهرة">القاهرة</option>
                <option value="الإسكندرية">الإسكندرية</option>
                <option value="الجيزة">الجيزة</option>
                <option value="الدقهلية">الدقهلية</option>
                <option value="أسوان">أسوان</option>
                <option value="أسيوط">أسيوط</option>
                <option value="الأقصر">الأقصر</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input
                id="address"
                name="address"
                placeholder="عنوان الفرع التفصيلي"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleCancel}>
            إلغاء
          </Button>
          <div className="flex gap-2">
            {mode === "edit" && (
              <Button type="button" variant="destructive">
                <Trash className="ml-2 h-4 w-4" />
                حذف
              </Button>
            )}
            <Button type="submit">
              <Save className="ml-2 h-4 w-4" />
              حفظ
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default BranchForm;
