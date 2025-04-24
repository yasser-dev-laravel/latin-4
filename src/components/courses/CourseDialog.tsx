import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAddEditCourseForm } from '@/contexts/AddEditCourseFormContext';
import { CourseLevelsList } from '@/components/CourseLevelsList';

const CourseDialog = ({ open, onClose, course }) => {
  const { form, courseLevels, updateLevels, setCourseLevels, handleAddLevel } = useAddEditCourseForm();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{course ? "تعديل الكورس" : "إضافة كورس جديد"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الكورس</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف الكورس</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">المستويات</h3>
                <Button type="button" onClick={handleAddLevel}>
                  إضافة مستوى
                </Button>
              </div>
              <CourseLevelsList
                levels={courseLevels}
                onUpdate={updateLevels}
              />
            </div>
            <DialogFooter>
              <Button type="submit">حفظ</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDialog; 