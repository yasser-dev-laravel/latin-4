
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface CreateTemplateDialogProps {
  onSave: (data: { templateName: string; templateBody: string }) => void;
}

const CreateTemplateDialog = ({ onSave }: CreateTemplateDialogProps) => {
  const [open, setOpen] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateBody, setTemplateBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ templateName, templateBody });
    setOpen(false);
    setTemplateName("");
    setTemplateBody("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center gap-2">
          <Plus size={20} />
          <span>إنشاء قالب رسالة جديد</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-right">إنشاء قالب رسالة جديد</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4 mt-2"
          onSubmit={handleSubmit}
          dir="rtl"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-right" htmlFor="template-name">
              اسم القالب
            </label>
            <Input
              id="template-name"
              value={templateName}
              onChange={e => setTemplateName(e.target.value)}
              placeholder="مثال: رسالة ترحيب للطلاب"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-right" htmlFor="template-body">
              نص الرسالة
            </label>
            <Textarea
              id="template-body"
              value={templateBody}
              onChange={e => setTemplateBody(e.target.value)}
              placeholder="أدخل نص الرسالة هنا"
              required
              rows={5}
            />
          </div>
          <DialogFooter className="justify-start mt-4">
            <Button type="submit" variant="default">
              حفظ القالب
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                إلغاء
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTemplateDialog;
