
import { Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  searchQuery: string;
  onSearch: (query: string) => void;
  onAdd: () => void;
}

const StudentsToolbar = ({ searchQuery, onSearch, onAdd }: Props) => (
  <div className="flex justify-between">
    <div className="relative md:w-96">
      <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="بحث عن طالب..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-12"
      />
    </div>
    <Button onClick={onAdd}>
      <UserPlus className="ml-2 h-4 w-4" />
      إضافة طالب جديد
    </Button>
  </div>
);

export default StudentsToolbar;
