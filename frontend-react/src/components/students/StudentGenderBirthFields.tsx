
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Control } from "react-hook-form";
import { cn } from "@/lib/utils";

interface Props {
  control: Control<any>;
}

const StudentGenderBirthFields = ({ control }: Props) => (
  <div className="grid grid-cols-2 gap-4">
    <FormField
      control={control}
      name="gender"
      render={({ field }) => (
        <FormItem>
          <FormLabel>النوع</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="اختر النوع" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="male">ذكر</SelectItem>
              <SelectItem value="female">أنثى</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={control}
      name="birthDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>تاريخ الميلاد</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-right font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "yyyy/MM/dd")
                  ) : (
                    <span>اختر التاريخ</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

export default StudentGenderBirthFields;
