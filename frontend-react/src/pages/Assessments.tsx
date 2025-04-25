import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

// TODO: Replace with actual data from API
const mockAssessments = [
  {
    id: 1,
    title: "اختبار منتصف الفصل",
    type: "امتحان",
    dueDate: "2024-03-15",
    course: "اللغة اللاتينية للمبتدئين",
    status: "مفتوح",
  },
  {
    id: 2,
    title: "واجب الدرس الأول",
    type: "واجب",
    dueDate: "2024-03-10",
    course: "اللغة اللاتينية للمبتدئين",
    status: "مغلق",
  },
];

export default function Assessments() {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          التقييمات
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            // TODO: Implement add assessment functionality
            console.log("Add assessment clicked");
          }}
        >
          إضافة تقييم جديد
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>عنوان التقييم</TableCell>
              <TableCell>النوع</TableCell>
              <TableCell>تاريخ الاستحقاق</TableCell>
              <TableCell>الدورة</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell>الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockAssessments.map((assessment) => (
              <TableRow key={assessment.id}>
                <TableCell>{assessment.title}</TableCell>
                <TableCell>{assessment.type}</TableCell>
                <TableCell>{assessment.dueDate}</TableCell>
                <TableCell>{assessment.course}</TableCell>
                <TableCell>{assessment.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      // TODO: Implement view assessment details
                      console.log(`View assessment ${assessment.id}`);
                    }}
                  >
                    عرض التفاصيل
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 