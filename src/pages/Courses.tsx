import React, { useEffect, useState } from "react";
import { useCourses } from "../hooks/useCourses";
import { Course } from "../types/course";
import { useAuth } from "../contexts/AuthContext";
import { Plus, BookOpen, Search, Edit, Trash } from "lucide-react";

const Courses: React.FC = () => {
  const { courses, loading, error, fetchCourses } = useCourses();
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>("");

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleAddCourse = () => {
    setSelectedCourse(null);
    // TODO: فتح نافذة إضافة دورة جديدة
  };

  const handleEditCourse = (course: any) => {
    setSelectedCourse(course as Course);
    // TODO: فتح نافذة تعديل الدورة
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الدورة؟")) {
      // TODO: تنفيذ عملية الحذف
      console.log("حذف الدورة رقم:", courseId);
    }
  };

  // filter courses depending on search and level
  const filteredCourses = courses.filter(
    (course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel =
        selectedLevelFilter === "" ||
        course.levels.some(level => level.name === selectedLevelFilter);

      return matchesSearch && matchesLevel;
    }
  );

  // Get unique level names for filtering
  const levelNames = Array.from(new Set(
    courses.flatMap(course => course.levels.map(level => level.name))
  ));

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">جاري تحميل الدورات...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8 text-red-500">
          <p>حدث خطأ أثناء تحميل الدورات</p>
          <p className="text-sm">{error}</p>
          <button 
            className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md"
            onClick={() => fetchCourses()}
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pr-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">الدورات</h1>
        {user?.role === "ADMIN" && (
          <button
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
            onClick={handleAddCourse}
          >
            <Plus className="h-5 w-5" />
            <span>إضافة دورة</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border p-4 pr-2 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث عن دورة..."
              className="w-full pl-4 pr-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            className="border border-input rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedLevelFilter}
            onChange={e => setSelectedLevelFilter(e.target.value)}
          >
            <option value="">جميع المستويات</option>
            {levelNames.map(levelName => (
              <option value={levelName} key={levelName}>
                {levelName}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-right py-3 px-3 pr-2 font-medium">اسم الدورة</th>
                <th className="text-right py-3 px-3 pr-2 font-medium">الوصف</th>
                <th className="text-right py-3 px-3 pr-2 font-medium">المستويات</th>
                <th className="text-right py-3 px-3 pr-2 font-medium">عدد المستويات</th>
                <th className="text-right py-3 px-3 pr-2 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course: any) => (
                <tr key={course.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-3 pr-2 font-medium">{course.name}</td>
                  <td className="py-3 px-3 pr-2 max-w-xs truncate">{course.description}</td>
                  <td className="py-3 px-3 pr-2">
                    <div className="flex flex-wrap gap-1">
                      {course.levels.map((level: any) => (
                        <span
                          key={level.id}
                          className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                        >
                          {level.name} - {level.code}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3 pr-2">{course.levels.length}</td>
                  <td className="py-3 px-3 pr-2">
                    <div className="flex gap-2">
                      {user?.role === "ADMIN" && (
                        <>
                          <button 
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            onClick={() => handleEditCourse(course)}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button className="text-sm text-primary hover:underline">
                        عرض التفاصيل
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-2 text-lg font-medium">لا توجد دورات</h3>
            <p className="text-muted-foreground">لم يتم العثور على دورات تطابق معايير البحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
