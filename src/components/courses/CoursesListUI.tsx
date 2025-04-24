import CoursesListLayout from "./CoursesListLayout";
import { Course, useCoursesSearch } from "./CoursesList";
import { useCourseDialogs } from "./useCourseDialogs";
import { useCourses } from "@/contexts/CoursesContext";

const CoursesListUI = () => {
  const { courses } = useCourses();
  
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
