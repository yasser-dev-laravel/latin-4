
import BranchForm from "@/components/branches/BranchForm";

const NewBranch = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">إضافة فرع جديد</h1>
        <p className="text-muted-foreground">أدخل بيانات الفرع الجديد</p>
      </div>
      
      <BranchForm mode="create" />
    </div>
  );
};

export default NewBranch;
