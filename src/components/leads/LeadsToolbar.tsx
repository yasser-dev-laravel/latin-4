
import { Search, UserPlus, Filter, Upload, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  searchQuery: string;
  onSearch: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onAdd: () => void;
  onImport: () => void;
  onBulkMessage: () => void;
}

const LeadsToolbar = ({
  searchQuery,
  onSearch,
  statusFilter,
  onStatusFilterChange,
  onAdd,
  onImport,
  onBulkMessage,
}: Props) => (
  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
      <div className="relative w-full md:w-96">
        <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="بحث عن عميل..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-12"
        />
      </div>
      
      <div className="w-full md:w-48">
        <Select
          value={statusFilter}
          onValueChange={onStatusFilterChange}
        >
          <SelectTrigger>
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="فلترة حسب الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="new">جديد</SelectItem>
            <SelectItem value="contacted">تم التواصل</SelectItem>
            <SelectItem value="interested">مهتم</SelectItem>
            <SelectItem value="not-interested">غير مهتم</SelectItem>
            <SelectItem value="converted">تم التحويل</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    
    <div className="flex gap-2">
      <Button variant="outline" onClick={onImport}>
        <Upload className="mr-2 h-4 w-4" />
        استيراد من إكسل
      </Button>
      
      <Button variant="outline" onClick={onBulkMessage}>
        <MessageSquare className="mr-2 h-4 w-4" />
        رسائل واتساب
      </Button>
      
      <Button onClick={onAdd}>
        <UserPlus className="mr-2 h-4 w-4" />
        إضافة عميل
      </Button>
    </div>
  </div>
);

export default LeadsToolbar;
