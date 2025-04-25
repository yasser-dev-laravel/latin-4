
import { createContext, useState, useContext, ReactNode } from "react";

// نموذج بيانات الفرع
export interface Branch {
  id: number;
  code: string;
  name: string;
  governorate: string;
  address: string;
}

// البيانات التجريبية للفروع
const initialBranches: Branch[] = [
  { id: 1, code: "CAI01", name: "فرع القاهرة الرئيسي", governorate: "القاهرة", address: "وسط البلد، شارع 26 يوليو" },
  { id: 2, code: "ALX01", name: "فرع الإسكندرية", governorate: "الإسكندرية", address: "سموحة، شارع فوزي معاذ" },
  { id: 3, code: "GIZ01", name: "فرع الجيزة", governorate: "الجيزة", address: "المهندسين، شارع جامعة الدول العربية" },
  { id: 4, code: "MNS01", name: "فرع المنصورة", governorate: "الدقهلية", address: "شارع الجمهورية" },
  { id: 5, code: "ASW01", name: "فرع أسوان", governorate: "أسوان", address: "شارع كورنيش النيل" },
];

interface BranchesContextType {
  branches: Branch[];
  addBranch: (branch: Omit<Branch, "id">) => void;
  updateBranch: (branch: Branch) => void;
  deleteBranch: (id: number) => void;
}

// إنشاء السياق
export const BranchesContext = createContext<BranchesContextType | undefined>(undefined);

// مزود السياق
export const BranchesProvider = ({ children }: { children: ReactNode }) => {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);

  // إضافة فرع جديد
  const addBranch = (branchData: Omit<Branch, "id">) => {
    const newId = branches.length > 0 ? Math.max(...branches.map(branch => branch.id)) + 1 : 1;
    const newBranch = { ...branchData, id: newId };
    setBranches([...branches, newBranch]);
  };

  // تحديث بيانات فرع
  const updateBranch = (updatedBranch: Branch) => {
    setBranches(branches.map(branch => 
      branch.id === updatedBranch.id ? updatedBranch : branch
    ));
  };

  // حذف فرع
  const deleteBranch = (id: number) => {
    setBranches(branches.filter(branch => branch.id !== id));
  };

  return (
    <BranchesContext.Provider value={{ branches, addBranch, updateBranch, deleteBranch }}>
      {children}
    </BranchesContext.Provider>
  );
};

// Hook للوصول للسياق
export const useBranches = () => {
  const context = useContext(BranchesContext);
  if (context === undefined) {
    throw new Error("useBranches must be used within a BranchesProvider");
  }
  return context;
};
