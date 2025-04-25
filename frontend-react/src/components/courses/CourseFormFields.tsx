
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";
import { CourseFormValues } from "./courseValidation";
import { categories } from "./courseCategories";

export function CourseFormFields({
  control,
}: {
  control: Control<CourseFormValues>;
}) {
  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>اسم الكورس</FormLabel>
            <FormControl>
              <Input placeholder="أدخل اسم الكورس" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="categoryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>القسم</FormLabel>
            <FormControl>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                {...field}
              >
                <option value="" disabled>
                  اختر القسم
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>وصف الكورس</FormLabel>
            <FormControl>
              <Textarea
                placeholder="أدخل وصفًا للكورس"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="active"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">الحالة</FormLabel>
              <FormDescription>
                {field.value ? "الكورس نشط ومتاح للطلاب" : "الكورس غير نشط"}
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
