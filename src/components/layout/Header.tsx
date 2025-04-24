
import { useState } from "react";
import { Bell, Search } from "lucide-react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white border-b border-border h-16 flex items-center px-4 gap-4">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="بحث..."
          className="w-full pl-10 pr-12 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-muted relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
