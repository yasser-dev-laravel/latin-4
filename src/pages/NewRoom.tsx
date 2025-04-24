
import RoomForm from "@/components/rooms/RoomForm";
import { useState } from "react";

// نجمع كل القاعات التي تم إضافتها هنا إذا أردت مستقبلا مشاركتها عبر السياق
const NewRoom = () => {
  // سيتم تمرير دالة إضافة من أعلى RoomsList أو يمكن تمريرها عبر سياق إذا أردنا لاحقًا
  const handleAddRoom = (room: any) => {
    // placeholder, سيتم الإضافة عبر الاستدعاء من RoomsList أو سياق
  };

  return (
    <div className="max-w-2xl mx-auto pt-10">
      <RoomForm onSubmit={handleAddRoom} />
    </div>
  );
};

export default NewRoom;
