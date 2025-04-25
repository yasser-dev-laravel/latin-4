import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourses } from "../hooks/useCourses";
import { Course } from "../types/course";
import { useAuth } from "../contexts/AuthContext";
import { ArrowRight, Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCourseById, deleteCourse } = useCourses();
  const { user } = useAuth();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const courseData = await getCourseById(parseInt(id));
        if (courseData) {
          setCourse(courseData);
        } else {
          setError("لم يتم العثور على الدورة");
        }
      } catch (err) {
        console.error("Error fetching course details:", err);
        setError("حدث خطأ أثناء جلب بيانات الدورة");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, getCourseById]);

  const handleEdit = () => {
    // يمكن تنفيذ هذا لاحقاً - الانتقال إلى صفحة التعديل
    navigate(`/courses/edit/${id}`);
  };

  const handleDelete = async () => {
    if (!id || !course) return;
    
    if (window.confirm(`هل أنت متأكد من حذف دورة "${course.name}"؟`)) {
      try {
        await deleteCourse(parseInt(id));
        toast({
          title: "تم الحذف بنجاح",
          description: `تم حذف دورة "${course.name}" بنجاح`,
        });
        navigate("/courses");
      } catch (err) {
        console.error("Error deleting course:", err);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء حذف الدورة",
          variant: "destructive",
        });
      }
    }
  };

  const handleBack = () => {
    navigate("/courses");
  };

  if (loading) {
    return (
      <div className="p-4 pr-2">
        <div className="text-center py-8">جاري تحميل بيانات الدورة...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="p-4 pr-2">
        <div className="text-center py-8 text-red-500">
          <p>{error || "لم يتم العثور على الدورة"}</p>
          <button 
            className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 mx-auto"
            onClick={handleBack}
          >
            <ArrowRight className="h-5 w-5" />
            <span>العودة إلى الدورات</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pr-2">
      <div className="flex items-center mb-6">
        <button 
          className="bg-muted text-muted-foreground px-3 py-2 rounded-md flex items-center gap-1 hover:bg-muted/80 transition-colors"
          onClick={handleBack}
        >
          <ArrowRight className="h-4 w-4" />
          <span>العودة</span>
        </button>
        <h1 className="text-2xl font-bold mr-4">تفاصيل الدورة</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-primary">{course.name}</h2>
            <p className="text-muted-foreground mt-1">{course.active ? "نشط" : "غير نشط"}</p>
          </div>
          {user?.role === "ADMIN" && (
            <div className="flex gap-2">
              <button 
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                onClick={handleEdit}
              >
                <Edit className="h-5 w-5" />
              </button>
              <button 
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                onClick={handleDelete}
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">الوصف</h3>
          <p className="text-muted-foreground">{course.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">المستويات</h3>
          {course.levels.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-right py-3 px-4 font-medium">المستوى</th>
                    <th className="text-right py-3 px-4 font-medium">الكود</th>
                    <th className="text-right py-3 px-4 font-medium">عدد المحاضرات</th>
                    <th className="text-right py-3 px-4 font-medium">مدة المحاضرة (دقيقة)</th>
                    <th className="text-right py-3 px-4 font-medium">السعر</th>
                    <th className="text-right py-3 px-4 font-medium">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {course.levels.map((level) => (
                    <tr key={level.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-4 font-medium">{level.name}</td>
                      <td className="py-3 px-4">{level.code}</td>
                      <td className="py-3 px-4">{level.lectures_count}</td>
                      <td className="py-3 px-4">{level.lecture_duration} دقيقة</td>
                      <td className="py-3 px-4">{level.price} ج.م</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${level.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {level.is_active ? 'نشط' : 'غير نشط'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">لا توجد مستويات لهذه الدورة</p>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">تاريخ الإنشاء</h4>
              <p>{new Date(course.created_at || '').toLocaleDateString('ar-EG')}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">آخر تحديث</h4>
              <p>{new Date(course.updated_at || '').toLocaleDateString('ar-EG')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
