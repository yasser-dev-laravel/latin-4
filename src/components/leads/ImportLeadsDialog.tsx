
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lead } from "./LeadsList";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImportLeadsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (leads: Lead[]) => void;
}

const ImportLeadsDialog = ({ isOpen, onOpenChange, onImport }: ImportLeadsDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // تحقق من أن الملف هو إكسل
      if (!selectedFile.name.endsWith('.xlsx') && !selectedFile.name.endsWith('.xls') && !selectedFile.name.endsWith('.csv')) {
        toast({
          title: "خطأ في الملف",
          description: "الرجاء اختيار ملف إكسل (.xlsx, .xls) أو ملف CSV",
          variant: "destructive",
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleImport = () => {
    if (!file) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار ملف أولاً",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // محاكاة عملية معالجة ملف إكسل
    // في التطبيق الحقيقي، ستستخدم مكتبة مثل xlsx لقراءة الملف
    setTimeout(() => {
      // إنشاء عملاء وهميين للتوضيح
      const mockImportedLeads: Lead[] = [
        {
          id: `import-${Date.now()}-1`,
          name: "محمد عبدالله",
          phone: "01045678901",
          email: "mohamed@example.com",
          course: "دورة لغة إنجليزية",
          source: "استيراد ملف",
          status: "new",
          createdAt: new Date().toISOString().split('T')[0]
        },
        {
          id: `import-${Date.now()}-2`,
          name: "فاطمة علي",
          phone: "01156789012",
          course: "دورة حاسب آلي",
          source: "استيراد ملف",
          status: "new",
          createdAt: new Date().toISOString().split('T')[0]
        },
        {
          id: `import-${Date.now()}-3`,
          name: "خالد محمود",
          phone: "01267890123",
          email: "khaled@example.com",
          course: "دورة محاسبة",
          source: "استيراد ملف",
          status: "new",
          createdAt: new Date().toISOString().split('T')[0]
        }
      ];
      
      setIsLoading(false);
      onImport(mockImportedLeads);
      
      // إعادة تعيين حالة الملف
      setFile(null);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>استيراد عملاء من ملف إكسل</DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            <Upload className="h-10 w-10 text-gray-400" />
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                اختر ملف إكسل (.xlsx, .xls) أو CSV
              </p>
              <p className="text-xs text-muted-foreground">
                يجب أن يحتوي الملف على الأعمدة التالية: الاسم، رقم الهاتف، البريد الإلكتروني (اختياري)، الكورس المطلوب (اختياري)
              </p>
            </div>
            
            <div className="mt-2">
              <Input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            
            {file && (
              <p className="text-sm font-medium text-green-600">
                تم اختيار: {file.name}
              </p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleImport}
            disabled={!file || isLoading}
          >
            {isLoading ? "جاري الاستيراد..." : "استيراد العملاء"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportLeadsDialog;
