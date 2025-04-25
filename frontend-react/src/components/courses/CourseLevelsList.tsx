
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CourseLevelDialog from "./CourseLevelDialog";
import CourseLevelTable from "./CourseLevelTable";
import CourseLevelSummary from "./CourseLevelSummary";

export interface CourseLevel {
  id: string;
  courseId: string;
  level: number;
  name: string;
  lecturesCount: number;
  lectureDuration: number;
  price: number;
  code: string;
}

interface CourseLevelsListProps {
  courseId: string;
  courseName: string;
  levels: CourseLevel[];
  onLevelsChange: (levels: CourseLevel[]) => void;
}

const CourseLevelsList = ({ courseId, courseName, levels, onLevelsChange }: CourseLevelsListProps) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | null>(null);
  const { toast } = useToast();

  const totalDuration = levels.reduce((sum, level) => sum + (level.lecturesCount * level.lectureDuration), 0);
  const totalPrice = levels.reduce((sum, level) => sum + level.price, 0);

  // عند إضافة مستوى جديد: الاسم هو الرقم، الكود هو courseId--الاسم
  const handleAddLevel = (newLevel: Omit<CourseLevel, "id" | "courseId" | "level" | "code" | "name">) => {
    const nextLevel = levels.length > 0 
      ? Math.max(...levels.map(l => l.level)) + 1 
      : 1;
    const levelId = Date.now().toString();
    const name = `${nextLevel}`;
    const code = `${courseId}--${name}`;
    const levelWithId: CourseLevel = {
      id: levelId,
      courseId,
      level: nextLevel,
      name,
      code,
      ...newLevel,
    };
    const updatedLevels = [...levels, levelWithId];
    onLevelsChange(updatedLevels);
    setIsAddOpen(false);
    toast({
      title: "تم إضافة المستوى",
      description: `تمت إضافة المستوى رقم "${name}" بنجاح`,
    });
  };

  // عند تعديل مستوى: الاسم يعاد بناءه تلقائيا
  const handleEditLevel = (updatedLevel: Omit<CourseLevel, "id" | "courseId" | "level" | "code" | "name">) => {
    if (!selectedLevel) return;
    const name = `${selectedLevel.level}`;
    const code = `${courseId}--${name}`;
    const fullUpdatedLevel: CourseLevel = {
      ...updatedLevel as CourseLevel,
      id: selectedLevel.id,
      courseId,
      level: selectedLevel.level,
      name,
      code,
    };
    const updatedLevels = levels.map((level) =>
      level.id === fullUpdatedLevel.id ? fullUpdatedLevel : level
    );
    onLevelsChange(updatedLevels);
    setIsEditOpen(false);
    setSelectedLevel(null);
    toast({
      title: "تم تعديل المستوى",
      description: `تم تعديل المستوى رقم "${name}" بنجاح`,
    });
  };

  const handleDeleteLevel = (levelId: string) => {
    if (window.confirm("هل أنت متأكد من رغبتك في حذف هذا المستوى؟")) {
      const levelToDelete = levels.find((level) => level.id === levelId);
      const updatedLevels = levels.filter((level) => level.id !== levelId);
      onLevelsChange(updatedLevels);
      toast({
        title: "تم حذف المستوى",
        description: levelToDelete
          ? `تم حذف المستوى رقم "${levelToDelete.name}" بنجاح`
          : "تم الحذف بنجاح",
      });
    }
  };

  const openEditDialog = (level: CourseLevel) => {
    setSelectedLevel(level);
    setIsEditOpen(true);
  };

  return (
    <div className="mt-6 border rounded-md p-4 bg-muted/30">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">مستويات {courseName}</h3>
        <div className="flex items-center gap-4">
          <CourseLevelSummary totalDuration={totalDuration} totalPrice={totalPrice} />
          <Button onClick={() => setIsAddOpen(true)} variant="outline" size="sm">
            <Plus className="ml-2 h-4 w-4" />
            إضافة مستوى
          </Button>
        </div>
      </div>

      {levels.length > 0 ? (
        <CourseLevelTable
          levels={levels}
          onEdit={openEditDialog}
          onDelete={handleDeleteLevel}
        />
      ) : (
        <div className="text-center py-8 bg-background rounded-md">
          <p className="text-muted-foreground">لا توجد مستويات مضافة بعد</p>
          <p className="text-sm text-muted-foreground">قم بإضافة مستوى جديد من خلال زر "إضافة مستوى"</p>
        </div>
      )}

      <CourseLevelDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSave={handleAddLevel}
        autoLevelName={levels.length > 0 ? Math.max(...levels.map(l => l.level)) + 1 : 1}
      />

      {selectedLevel && (
        <CourseLevelDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onSave={handleEditLevel}
          level={selectedLevel}
          isEditing
          autoLevelName={selectedLevel.level}
        />
      )}
    </div>
  );
};

export default CourseLevelsList;

