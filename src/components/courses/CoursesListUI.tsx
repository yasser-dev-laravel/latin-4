import CoursesListLayout from "./CoursesListLayout";
import { useCoursesSearch } from "./CoursesList";
import { useCourseDialogs } from "./useCourseDialogs";
import { useCourses } from "@/contexts/CoursesContext";

const CoursesListUI = () => {
  const { courses, loading, error } = useCourses();
  
  const {
    searchQuery,
    filteredCourses,
    setFilteredCourses,
    setSearchQuery,
    handleSearch,
  } = useCoursesSearch(courses);

  const {
    isAddOpen,
    setIsAddOpen,
    isEditOpen,
    setIsEditOpen,
    selectedCourse,
    setSelectedCourse,
    handleAddCourse,
    handleEditCourse,
    handleDeleteCourse,
    openEditDialog,
    handleUpdateLevels,
  } = useCourseDialogs(filteredCourses, setFilteredCourses);

  if (loading) {
    return <div className="text-center py-8">جاري تحميل الدورات...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>حدث خطأ أثناء تحميل الدورات</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <CoursesListLayout
      searchQuery={searchQuery}
      onSearch={query => handleSearch(query, filteredCourses)}
      onAdd={() => setIsAddOpen(true)}
      courses={filteredCourses}
      onEdit={openEditDialog}
      onDelete={handleDeleteCourse}
      isAddOpen={isAddOpen}
      setIsAddOpen={setIsAddOpen}
      isEditOpen={isEditOpen}
      setIsEditOpen={setIsEditOpen}
      selectedCourse={selectedCourse}
      onSaveAdd={handleAddCourse}
      onSaveEdit={handleEditCourse}
      onUpdateLevels={handleUpdateLevels}
    />
  );
};

export default CoursesListUI;
