
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

interface Props {
  control: Control<any>;
}

const StudentNotesField = ({ control }: Props) => (
  <FormField
    control={control}
    name="notes"
    render={({ field }) => (
      <FormItem>
        <FormLabel>ملاحظات</FormLabel>
        <FormControl>
          <Textarea placeholder="ملاحظات" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default StudentNotesField;
