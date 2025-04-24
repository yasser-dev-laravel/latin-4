import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useCourses } from "../hooks/useCourses";
import { Course } from "../types/course";
import { useAuth } from "../contexts/AuthContext";

const Courses: React.FC = () => {
  const { courses, loading, error, fetchCourses } = useCourses();
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleAddCourse = () => {
    setSelectedCourse(null);
    // TODO: فتح نافذة إضافة دورة جديدة
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    // TODO: فتح نافذة تعديل الدورة
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الدورة؟")) {
      // TODO: تنفيذ عملية الحذف
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>جاري التحميل...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" component="h1">
          الدورات
        </Typography>
        {user?.role === "ADMIN" && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddCourse}
          >
            إضافة دورة جديدة
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {course.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {course.levels.map((level) => (
                    <Chip
                      key={level.id}
                      label={`${level.name} - ${level.code}`}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                {user?.role === "ADMIN" && (
                  <>
                    <IconButton
                      size="small"
                      onClick={() => handleEditCourse(course)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
                <Button size="small" color="primary">
                  عرض التفاصيل
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Courses;
