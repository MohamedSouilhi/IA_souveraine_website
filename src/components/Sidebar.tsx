
import { Camera, Search, History } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[240px] bg-gray-100 dark:bg-[#0B0F17] text-gray-800 dark:text-white p-4 flex flex-col gap-2 border-r border-gray-200 dark:border-gray-800">
      <NavLink 
        to="/source-selection" 
        className={({ isActive }) => 
          `flex items-center gap-3 p-3 rounded-lg transition-colors ${
            isActive 
              ? "bg-blue-600 text-white" 
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
          }`
        }
      >
        <Camera className="h-5 w-5" />
        <span className="font-medium">Source Selection</span>
      </NavLink>
      
      <NavLink 
        to="/object-detection" 
        className={({ isActive }) => 
          `flex items-center gap-3 p-3 rounded-lg transition-colors ${
            isActive 
              ? "bg-blue-600 text-white" 
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
          }`
        }
      >
        <Search className="h-5 w-5" />
        <span className="font-medium">Object Detection</span>
      </NavLink>

      <NavLink 
        to="/history" 
        className={({ isActive }) => 
          `flex items-center gap-3 p-3 rounded-lg transition-colors ${
            isActive 
              ? "bg-blue-600 text-white" 
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
          }`
        }
      >
        <History className="h-5 w-5" />
        <span className="font-medium">Historique</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
