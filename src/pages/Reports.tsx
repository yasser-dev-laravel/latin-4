import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// TODO: Replace with actual data from API
const mockData = {
  studentProgress: [
    { name: "الأسبوع 1", completed: 85, target: 100 },
    { name: "الأسبوع 2", completed: 90, target: 100 },
    { name: "الأسبوع 3", completed: 95, target: 100 },
    { name: "الأسبوع 4", completed: 88, target: 100 },
  ],
  courseStats: {
    totalStudents: 45,
    averageGrade: 85,
    completionRate: "92%",
    activeAssessments: 3,
  },
};

export default function Reports() {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        التقارير والإحصائيات
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              تقدم الطلاب
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.studentProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" name="المكتمل" fill="#2196f3" />
                <Bar dataKey="target" name="الهدف" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    إحصائيات الدورة
                  </Typography>
                  <Typography variant="body1">
                    إجمالي الطلاب: {mockData.courseStats.totalStudents}
                  </Typography>
                  <Typography variant="body1">
                    متوسط الدرجات: {mockData.courseStats.averageGrade}
                  </Typography>
                  <Typography variant="body1">
                    معدل الإكمال: {mockData.courseStats.completionRate}
                  </Typography>
                  <Typography variant="body1">
                    التقييمات النشطة: {mockData.courseStats.activeAssessments}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    عرض التفاصيل
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              التقارير المتاحة
            </Typography>
            <Grid container spacing={2}>
              {["تقرير تقدم الطلاب", "تقرير الحضور", "تقرير الدرجات", "تقرير الأداء"].map(
                (report) => (
                  <Grid item xs={12} sm={6} md={3} key={report}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{report}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          تحميل
                        </Button>
                        <Button size="small">معاينة</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 