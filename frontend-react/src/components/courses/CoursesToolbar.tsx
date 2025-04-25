import { Search, Book } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  searchQuery: string;
  onSearch: (query: string) => void;
  onAdd: () => void;
}

const CoursesToolbar = ({ searchQuery, onSearch, onAdd }: Props) => {
  console.log("onAdd function:", onAdd); // للتحقق من دالة الإضافة
  
  return (
    <div className="flex justify-between">
      <div className="relative md:w-96">
        <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="بحث عن كورس..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-12"
        />
      </div>
      <Button 
        onClick={() => {
          console.log("Add button clicked"); // للتحقق من النقر على الزر
          onAdd();
        }}
      >
        <Book className="ml-2 h-4 w-4" />
        إضافة كورس جديد
      </Button>
    </div>
  );
};

export default CoursesToolbar;
