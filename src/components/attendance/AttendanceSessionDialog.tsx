
import { useState, useRef } from "react";
import { format } from "date-fns";
import { Camera, Check } from "lucide-react";
import { Group } from "../groups/GroupsList";
import { Student } from "../students/StudentsList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  group: Group;
  date: Date;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (updatedGroup: Group) => void;
}

interface AttendanceRecord {
  studentId: string;
  present: boolean;
}

interface SessionData {
  id: string;
  date: Date;
  groupId: string;
  attendance: AttendanceRecord[];
  imageUrl?: string;
  completedSession: number;
}

const AttendanceSessionDialog = ({
  group,
  date,
  isOpen,
  onOpenChange,
  onComplete,
}: Props) => {
  const { toast } = useToast();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(
    (group.studentsData || []).map((student) => ({
      studentId: student.id,
      present: true,
    }))
  );
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [completedSessions, setCompletedSessions] = useState(5); // Mock value
  const [totalSessions, setTotalSessions] = useState(10); // Mock value

  const handleToggleAttendance = (studentId: string) => {
    setAttendance(
      attendance.map((record) =>
        record.studentId === studentId
          ? { ...record, present: !record.present }
          : record
      )
    );
  };

  const handleOpenCamera = async () => {
    setIsCameraOpen(true);
    try {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "خطأ",
        description: "حدثت مشكلة في الوصول إلى الكاميرا",
        variant: "destructive",
      });
    }
  };

  const handleCaptureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL("image/png");
        setCapturedImage(imageData);

        // Stop the camera stream
        const stream = video.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        setIsCameraOpen(false);
      }
    }
  };

  const handleSubmit = () => {
    // Calculate new completed sessions count
    const newCompletedSessions = completedSessions + 1;
    
    // Check if we've reached the total number of sessions
    if (newCompletedSessions >= totalSessions) {
      toast({
        title: "تنبيه",
        description: "تم الوصول إلى عدد المحاضرات المطلوبة. يرجى إضافة محاضرات إضافية أو إغلاق المجموعة أو إنشاء مجموعة جديدة.",
      });
    }
    
    // Update completed sessions
    setCompletedSessions(newCompletedSessions);
    
    // Create session data
    const sessionData: SessionData = {
      id: Date.now().toString(),
      date: date,
      groupId: group.id,
      attendance: attendance,
      imageUrl: capturedImage || undefined,
      completedSession: newCompletedSessions,
    };
    
    // In a real app, you would save this to your database
    console.log("Session data:", sessionData);
    
    // Notify success
    toast({
      title: "تم تسجيل الحضور",
      description: `تم تسجيل حضور ${attendance.filter(r => r.present).length} من ${attendance.length} طالب`,
    });
    
    // Call onComplete with the updated group
    const updatedGroup = { ...group, completedSessions: newCompletedSessions };
    onComplete(updatedGroup);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            تسجيل الحضور - {group.name} - {format(date, "yyyy/MM/dd")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 my-4">
          <div className="flex justify-between items-center">
            <div>
              <p><strong>المحاضر:</strong> {group.instructorName}</p>
              <p><strong>القاعة:</strong> {group.roomName}</p>
              <p>
                <strong>المحاضرات المنفذة:</strong> {completedSessions} من {totalSessions}
              </p>
            </div>
            
            <div>
              {!isCameraOpen && !capturedImage ? (
                <Button onClick={handleOpenCamera} className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  التقاط صورة
                </Button>
              ) : capturedImage ? (
                <div className="relative">
                  <img 
                    src={capturedImage} 
                    alt="صورة المحاضرة" 
                    className="h-32 object-cover rounded-md"
                  />
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-1 right-1"
                    onClick={() => setCapturedImage(null)}
                  >
                    تغيير
                  </Button>
                </div>
              ) : null}
            </div>
          </div>

          {isCameraOpen && (
            <div className="flex flex-col items-center">
              <video 
                ref={videoRef} 
                autoPlay 
                className="w-full max-h-64 object-cover rounded-md"
              />
              <canvas ref={canvasRef} className="hidden" />
              <Button 
                className="mt-2" 
                onClick={handleCaptureImage}
              >
                التقاط
              </Button>
            </div>
          )}

          <div className="border rounded-md">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-right">الكود</th>
                  <th className="px-4 py-2 text-right">الاسم</th>
                  <th className="px-4 py-2 text-right">الحضور</th>
                </tr>
              </thead>
              <tbody>
                {(group.studentsData || []).map((student) => {
                  const attendanceRecord = attendance.find(
                    (record) => record.studentId === student.id
                  );
                  
                  return (
                    <tr key={student.id} className="border-t">
                      <td className="px-4 py-2">{student.code}</td>
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center">
                          <Checkbox
                            checked={attendanceRecord?.present || false}
                            onCheckedChange={() => handleToggleAttendance(student.id)}
                            id={`attendance-${student.id}`}
                          />
                          <label 
                            htmlFor={`attendance-${student.id}`}
                            className="ms-2 text-sm font-medium cursor-pointer"
                          >
                            حاضر
                          </label>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            حفظ الحضور
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceSessionDialog;
