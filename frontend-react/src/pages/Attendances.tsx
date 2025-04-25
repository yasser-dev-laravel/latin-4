
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import AttendanceGrid from "@/components/attendance/AttendanceGrid";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const Attendances = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">الغيابات</h1>
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="ml-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "yyyy/MM/dd")
                ) : (
                  <span>اختر تاريخ</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <Button
            onClick={() => setSelectedDate(new Date())}
            variant="outline"
          >
            اليوم
          </Button>
        </div>
      </div>

      <div className="bg-white border rounded shadow">
        <AttendanceGrid selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default Attendances;
