
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Lead } from "./LeadsList";
import { MessageSquare, Send } from "lucide-react";

interface WhatsappMessagingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead | null;
  leads: Lead[];
  onSend: (leadIds: string[], message: string) => void;
}

const WhatsappMessagingDialog = ({
  isOpen,
  onOpenChange,
  lead,
  leads,
  onSend,
}: WhatsappMessagingDialogProps) => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [templates, setTemplates] = useState([
    {
      id: "1",
      name: "دعوة لدورة إنجليزي",
      content: "مرحبا {name}، نود دعوتك لحضور دورة اللغة الإنجليزية الجديدة التي تبدأ يوم الأحد القادم. للاستفسار يرجى التواصل معنا.",
    },
    {
      id: "2",
      name: "عرض خاص - دورة كمبيوتر",
      content: "مرحبا {name}، لدينا عرض خاص على دورة الكمبيوتر هذا الشهر. خصم 20% لمن يسجل قبل نهاية الأسبوع. للتفاصيل يرجى التواصل معنا.",
    },
    {
      id: "3",
      name: "متابعة عميل",
      content: "مرحبا {name}، نود الاطمئنان عليك ومعرفة إذا كان لديك أي استفسارات حول الدورات التي تحدثنا عنها سابقاً. نحن في انتظار ردك.",
    }
  ]);
  
  // عند فتح النافذة، قم بتعيين العميل المحدد إذا كان موجودًا
  useEffect(() => {
    if (isOpen) {
      if (lead) {
        setSelectedLeads([lead.id]);
      } else {
        setSelectedLeads([]);
      }
    }
  }, [isOpen, lead]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(leads.map(l => l.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelectLead = (leadId: string, checked: boolean) => {
    if (checked) {
      setSelectedLeads([...selectedLeads, leadId]);
    } else {
      setSelectedLeads(selectedLeads.filter(id => id !== leadId));
    }
  };

  const handleApplyTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setMessage(template.content);
    }
  };

  const handleSendMessage = () => {
    if (selectedLeads.length > 0 && message.trim()) {
      onSend(selectedLeads, message);
    }
  };

  // تحضير قائمة العملاء المرشحة للعرض
  const filteredLeads = leads.filter(l => l.status !== "converted");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {lead ? `إرسال رسالة واتساب إلى ${lead.name}` : "إرسال رسائل واتساب جماعية"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {!lead && (
            <div className="rounded-md border p-4">
              <div className="mb-2 flex items-center">
                <Checkbox
                  id="select-all"
                  checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <label htmlFor="select-all" className="mr-2 text-sm font-medium">
                  تحديد الكل ({filteredLeads.length})
                </label>
              </div>
              
              <div className="mt-2 max-h-[200px] overflow-y-auto space-y-2">
                {filteredLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center">
                    <Checkbox
                      id={`lead-${lead.id}`}
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={(checked) => handleSelectLead(lead.id, checked as boolean)}
                    />
                    <label htmlFor={`lead-${lead.id}`} className="mr-2 text-sm">
                      {lead.name} ({lead.phone})
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <label className="mb-2 block text-sm font-medium">قوالب الرسائل</label>
            <div className="flex flex-wrap gap-2">
              {templates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleApplyTemplate(template.id)}
                >
                  {template.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium">نص الرسالة</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب نص الرسالة هنا..."
              className="min-h-[120px]"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              استخدم {"{name}"} لإضافة اسم العميل في الرسالة
            </p>
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
            onClick={handleSendMessage}
            disabled={selectedLeads.length === 0 || !message.trim()}
          >
            <Send className="mr-2 h-4 w-4" />
            إرسال ({selectedLeads.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsappMessagingDialog;
