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
import { useLectures } from "../hooks/useLectures";
import { Lecture } from "../types/lecture";
import { useAuth } from "../contexts/AuthContext";

const Lectures: React.FC = () => {
  const { lectures, loading, error, fetchLectures } = useLectures();
  const { user } = useAuth();
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  useEffect(() => {
    fetchLectures();
  }, [fetchLectures]);

  const handleAddLecture = () => {
    setSelectedLecture(null);
    // TODO: فتح نافذة إضافة محاضرة جديدة
  };

  const handleEditLecture = (lecture: Lecture) => {
    setSelectedLecture(lecture);
    // TODO: فتح نافذة تعديل المحاضرة
  };

  const handleDeleteLecture = async (lectureId: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه المحاضرة؟")) {
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
          المحاضرات
        </Typography>
        {user?.role === "ADMIN" && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddLecture}
          >
            إضافة محاضرة جديدة
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {lectures.map((lecture) => (
          <Grid item xs={12} sm={6} md={4} key={lecture.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {lecture.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {lecture.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={`المستوى: ${lecture.level.name}`}
                    sx={{ mr: 1, mb: 1 }}
                  />
                  <Chip
                    label={`المعلم: ${lecture.teacher.name}`}
                    sx={{ mr: 1, mb: 1 }}
                  />
                  <Chip
                    label={`المدة: ${lecture.duration} دقيقة`}
                    sx={{ mr: 1, mb: 1 }}
                  />
                </Box>
              </CardContent>
              <CardActions>
                {user?.role === "ADMIN" && (
                  <>
                    <IconButton
                      size="small"
                      onClick={() => handleEditLecture(lecture)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteLecture(lecture.id)}
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

export default Lectures; 