
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface Props {
  control: Control<any>;
}

const StudentStatusDateFields = ({ control }: Props) => (
  <div className="grid grid-cols-2 gap-4">
    <FormField
      control={control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>الحالة</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="inactive">غير نشط</SelectItem>
              <SelectItem value="pending">معلق</SelectItem>
              <SelectItem value="graduated">خريج</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="registrationDate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>تاريخ التسجيل</FormLabel>
          <FormControl>
            <Input type="date" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

export default StudentStatusDateFields;
