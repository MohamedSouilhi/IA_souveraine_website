
import { useState, useEffect } from "react";
import { X, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  // Apply dark mode by default when component mounts
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const handleExit = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-[#0B0F17]">
      {/* Header */}
      <header className="bg-white dark:bg-[#0B0F17] text-gray-800 dark:text-white p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <img 
            src="https://logo-logos.com/2016/11/Atos_logo.png" 
            alt="Atos Logo" 
            className="h-8"
          />
          <h1 className="text-2xl font-bold">Object Detection System</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button 
            variant="destructive" 
            size="icon" 
            onClick={() => navigate('/')}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 bg-white dark:bg-[#0B0F17]">
        <Sidebar />
        <main className="flex-1 p-5 bg-white dark:bg-[#0B0F17] text-gray-800 dark:text-white overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#0B0F17] text-gray-500 dark:text-white p-2 text-center text-xs border-t border-gray-200 dark:border-gray-800">
        <p>Powered by xAI - v1.0.0</p>
      </footer>
    </div>
  );
};

export default Layout;
