import { useState, useEffect } from "react";
import { Course } from "./CoursesList";

export function useCoursesSearch(courses: Course[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  const handleSearch = (query: string, courses: Course[]) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) =>
          course.name.toLowerCase().includes(query.toLowerCase()) ||
          course.category.toLowerCase().includes(query.toLowerCase()) ||
          course.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  return {
    searchQuery,
    filteredCourses,
    setFilteredCourses,
    setSearchQuery,
    handleSearch,
  };
}
