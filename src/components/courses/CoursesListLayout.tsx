
import AddEditCourseDialog from "./AddEditCourseDialog";
import CoursesToolbar from "./CoursesToolbar";
import CoursesTable from "./CoursesTable";
import { Course } from "./CoursesList";
import { CourseLevel } from "./CourseLevelsList";

interface CoursesListLayoutProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  onAdd: () => void;
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (courseId: string) => void;
  isAddOpen: boolean;
  setIsAddOpen: (val: boolean) => void;
  isEditOpen: boolean;
  setIsEditOpen: (val: boolean) => void;
  selectedCourse: Course | null;
  onSaveAdd: (course: any) => void;
  onSaveEdit: (course: any) => void;
  onUpdateLevels: (id: string, levels: CourseLevel[]) => void;
}

const CoursesListLayout = ({
  searchQuery,
  onSearch,
  onAdd,
  courses,
  onEdit,
  onDelete,
  isAddOpen,
  setIsAddOpen,
  isEditOpen,
  setIsEditOpen,
  selectedCourse,
  onSaveAdd,
  onSaveEdit,
  onUpdateLevels,
}: CoursesListLayoutProps) => (
  <div className="space-y-6">
    <CoursesToolbar
      searchQuery={searchQuery}
      onSearch={onSearch}
      onAdd={onAdd}
    />
    <CoursesTable
      courses={courses}
      onEdit={onEdit}
      onDelete={onDelete}
    />

    <AddEditCourseDialog
      open={isAddOpen}
      onOpenChange={setIsAddOpen}
      onSave={onSaveAdd}
    />

    {selectedCourse && (
      <AddEditCourseDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSave={onSaveEdit}
        course={selectedCourse}
        onUpdateLevels={levels => onUpdateLevels(selectedCourse.id, levels)}
        isEditing
      />
    )}
  </div>
);

export default CoursesListLayout;
