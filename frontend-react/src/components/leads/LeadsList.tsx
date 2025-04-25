
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import LeadsToolbar from "./LeadsToolbar";
import LeadTableRow from "./LeadTableRow";
import AddEditLeadDialog from "./AddEditLeadDialog";
import ImportLeadsDialog from "./ImportLeadsDialog";
import WhatsappMessagingDialog from "./WhatsappMessagingDialog";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  course?: string;
  source?: string;
  status: "new" | "contacted" | "interested" | "not-interested" | "converted";
  createdAt: string;
  lastContactDate?: string;
  notes?: string;
}

// بيانات تجريبية للعملاء
const initialLeads: Lead[] = [
  {
    id: "1",
    name: "أحمد محمد",
    phone: "01012345678",
    email: "ahmed@example.com",
    course: "دورة انجليزي متقدم",
    source: "فيسبوك",
    status: "new",
    createdAt: "2025-04-10",
    notes: "مهتم بالكورسات المسائية",
  },
  {
    id: "2",
    name: "سارة أحمد",
    phone: "01123456789",
    email: "sara@example.com",
    course: "دورة كمبيوتر",
    source: "إنستجرام",
    status: "contacted",
    createdAt: "2025-04-15",
    lastContactDate: "2025-04-18",
  },
  {
    id: "3",
    name: "محمود علي",
    phone: "01234567890",
    course: "دورة محاسبة",
    source: "موقع الويب",
    status: "interested",
    createdAt: "2025-04-12",
    lastContactDate: "2025-04-19",
    notes: "يفضل الحصص الصباحية",
  },
];

const LeadsList = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isWhatsappDialogOpen, setIsWhatsappDialogOpen] = useState(false);

  // تصفية العملاء بناءً على البحث والفلتر
  const filteredLeads = leads.filter(
    (lead) => {
      const matchesSearch = 
        lead.name.includes(searchQuery) ||
        lead.phone.includes(searchQuery) ||
        (lead.email && lead.email.includes(searchQuery)) ||
        (lead.course && lead.course.includes(searchQuery));
      
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    }
  );

  const handleAddLead = () => {
    setSelectedLead(null);
    setIsAddEditDialogOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsAddEditDialogOpen(true);
  };

  const handleDeleteLead = (leadId: string) => {
    setLeads(leads.filter((lead) => lead.id !== leadId));
    toast({
      title: "تم حذف العميل",
      description: "تم حذف العميل بنجاح",
    });
  };

  const handleSaveLead = (lead: Lead) => {
    if (selectedLead) {
      // تعديل عميل موجود
      setLeads(
        leads.map((l) => (l.id === lead.id ? lead : l))
      );
      toast({
        title: "تم تعديل العميل",
        description: "تم تعديل بيانات العميل بنجاح",
      });
    } else {
      // إضافة عميل جديد
      setLeads([...leads, { ...lead, id: Date.now().toString() }]);
      toast({
        title: "تم إضافة العميل",
        description: "تم إضافة العميل بنجاح",
      });
    }
    setIsAddEditDialogOpen(false);
  };

  const handleImportLeads = (importedLeads: Lead[]) => {
    const newLeads = importedLeads.map((lead) => ({
      ...lead,
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0],
      status: "new" as const
    }));
    
    setLeads([...leads, ...newLeads]);
    setIsImportDialogOpen(false);
    
    toast({
      title: "تم استيراد العملاء",
      description: `تم استيراد ${newLeads.length} عميل بنجاح`,
    });
  };

  const handleOpenWhatsappMessaging = (lead?: Lead) => {
    setSelectedLead(lead || null);
    setIsWhatsappDialogOpen(true);
  };

  const handleSendWhatsappMessage = (leadIds: string[], message: string) => {
    // في التطبيق الحقيقي، هنا سيتم إرسال الرسائل إلى واتساب
    // لكن في هذا النموذج سنقوم فقط بتحديث تاريخ آخر اتصال
    
    const today = new Date().toISOString().split('T')[0];
    
    setLeads(leads.map((lead) => {
      if (leadIds.includes(lead.id)) {
        return {
          ...lead,
          lastContactDate: today,
          status: lead.status === "new" ? "contacted" : lead.status
        };
      }
      return lead;
    }));
    
    setIsWhatsappDialogOpen(false);
    
    toast({
      title: "تم إرسال الرسائل",
      description: `تم إرسال الرسائل إلى ${leadIds.length} عميل بنجاح`,
    });
  };

  const handleConvertToStudent = (lead: Lead) => {
    // هنا سنحذف العميل من قائمة العملاء ثم نفتح شاشة إضافة طالب جديد
    setLeads(leads.filter((l) => l.id !== lead.id));
    
    // نفتح صفحة الطلاب مع البيانات المملوءة مسبقًا
    // في التطبيق الحقيقي سنقوم بتحويل المستخدم إلى صفحة إضافة طالب
    // مع ملأ البيانات الأولية من بيانات العميل
    
    toast({
      title: "تم تحويل العميل إلى طالب",
      description: "سيتم نقلك إلى صفحة إضافة طالب جديد",
    });
    
    // تأخير لإظهار الرسالة قبل الانتقال
    setTimeout(() => {
      window.location.href = "/students";
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <LeadsToolbar
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onAdd={handleAddLead}
        onImport={() => setIsImportDialogOpen(true)}
        onBulkMessage={() => handleOpenWhatsappMessaging()}
      />

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الاسم</TableHead>
              <TableHead>رقم الهاتف</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>الكورس المطلوب</TableHead>
              <TableHead>المصدر</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>تاريخ الإضافة</TableHead>
              <TableHead>آخر تواصل</TableHead>
              <TableHead>إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <LeadTableRow
                  key={lead.id}
                  lead={lead}
                  onEdit={handleEditLead}
                  onDelete={handleDeleteLead}
                  onMessage={() => handleOpenWhatsappMessaging(lead)}
                  onConvert={handleConvertToStudent}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-24 text-center text-muted-foreground"
                >
                  لا يوجد عملاء
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AddEditLeadDialog
        isOpen={isAddEditDialogOpen}
        onOpenChange={setIsAddEditDialogOpen}
        lead={selectedLead}
        onSave={handleSaveLead}
      />

      <ImportLeadsDialog
        isOpen={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
        onImport={handleImportLeads}
      />

      <WhatsappMessagingDialog
        isOpen={isWhatsappDialogOpen}
        onOpenChange={setIsWhatsappDialogOpen}
        lead={selectedLead}
        leads={leads}
        onSend={handleSendWhatsappMessage}
      />
    </div>
  );
};

export default LeadsList;
