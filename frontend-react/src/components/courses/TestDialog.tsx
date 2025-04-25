import React, { useState } from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const TestDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setOpen(true)}
      >
        فتح نافذة اختبار
      </button>

      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <DialogPrimitive.Title className="text-lg font-semibold">
                نافذة اختبار
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-sm text-gray-500">
                هذه نافذة اختبار بسيطة للتأكد من عمل مكون Dialog
              </DialogPrimitive.Description>
            </div>
            <div className="p-4 bg-gray-100 rounded">
              <p>محتوى النافذة</p>
            </div>
            <div className="flex justify-end gap-2">
              <button 
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={() => setOpen(false)}
              >
                إلغاء
              </button>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  console.log('تم النقر على زر الحفظ');
                  setOpen(false);
                }}
              >
                حفظ
              </button>
            </div>
            <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">إغلاق</span>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
};

export default TestDialog;
