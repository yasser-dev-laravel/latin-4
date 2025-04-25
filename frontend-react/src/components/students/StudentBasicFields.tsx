
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface Props {
  control: Control<any>;
}

const StudentBasicFields = ({ control }: Props) => (
  <>
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>الكود</FormLabel>
            <FormControl>
              <Input placeholder="كود الطالب" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>الاسم</FormLabel>
            <FormControl>
              <Input placeholder="اسم الطالب" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>البريد الإلكتروني</FormLabel>
            <FormControl>
              <Input placeholder="البريد الإلكتروني" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>الهاتف</FormLabel>
            <FormControl>
              <Input placeholder="رقم الهاتف" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <FormField
      control={control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>العنوان</FormLabel>
          <FormControl>
            <Input placeholder="العنوان" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

export default StudentBasicFields;
