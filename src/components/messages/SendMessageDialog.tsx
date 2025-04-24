
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
import { Send } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface SendMessageDialogProps {
  onSend: (data: { sendType: string; sendTarget: string; messageBody: string }) => void;
}

const SendMessageDialog = ({ onSend }: SendMessageDialogProps) => {
  const [open, setOpen] = useState(false);
  const [sendType, setSendType] = useState("");
  const [sendTarget, setSendTarget] = useState("");
  const [messageBody, setMessageBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend({ sendType, sendTarget, messageBody });
    setOpen(false);
    setSendType("");
    setSendTarget("");
    setMessageBody("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <Send size={20} />
          <span>إرسال رسالة</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-right">إرسال رسالة للطلاب</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4 mt-2"
          onSubmit={handleSubmit}
          dir="rtl"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-right" htmlFor="send-type">
              إرسال إلى حسب
            </label>
            <Select
              value={sendType}
              onValueChange={setSendType}
              required
            >
              <SelectTrigger id="send-type">
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="group">المجموعة</SelectItem>
                <SelectItem value="department">القسم</SelectItem>
                <SelectItem value="branch">الفرع</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-right" htmlFor="send-target">
              اسم المجموعة/القسم/الفرع
            </label>
            <Input
              id="send-target"
              value={sendTarget}
              onChange={e => setSendTarget(e.target.value)}
              placeholder="أدخل اسم الفئة"
              required
              disabled={!sendType}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-right" htmlFor="message-body">
              نص الرسالة
            </label>
            <Textarea
              id="message-body"
              value={messageBody}
              onChange={e => setMessageBody(e.target.value)}
              placeholder="أدخل نص الرسالة هنا"
              required
              rows={5}
            />
          </div>
          <DialogFooter className="justify-start mt-4">
            <Button type="submit" variant="default">
              إرسال الرسالة
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

export default SendMessageDialog;
