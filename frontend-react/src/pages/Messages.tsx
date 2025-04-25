import SendMessageDialog from "@/components/messages/SendMessageDialog";
import CreateTemplateDialog from "@/components/messages/CreateTemplateDialog";

const Messages = () => {
  // Handlers to show success (could add toasts here)
  const handleSaveTemplate = (data: { templateName: string; templateBody: string }) => {
    // يمكن إضافة Toast هنا
    // example: toast({ description: "تم حفظ القالب بنجاح" });
  };

  const handleSendMessage = (data: { sendType: string; sendTarget: string; messageBody: string }) => {
    // يمكن إضافة Toast هنا
    // example: toast({ description: "تم إرسال الرسالة بنجاح" });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">الرسائل</h1>
      <div className="flex items-center justify-end gap-2 mb-6">
        <SendMessageDialog onSend={handleSendMessage} />
        <CreateTemplateDialog onSave={handleSaveTemplate} />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="mb-4">من هنا يمكن إنشاء قالب رسالة جديدة أو إرسال رسائل للطلاب حسب المجموعة أو القسم أو الفرع.</p>
        <ul className="list-disc pr-4 space-y-2 text-right">
          <li>إنشاء قالب رسالة جديد</li>
          <li>إرسال رسائل للطلاب حسب المجموعة أو القسم أو الفرع</li>
          <li>متابعة الرسائل المرسلة والتقارير</li>
        </ul>
        <div className="mt-6 text-muted-foreground">
          <span>— سيتم إضافة وظائف وتفاصيل الشاشة حسب طلبك لاحقًا —</span>
        </div>
      </div>
    </div>
  );
};

export default Messages;
