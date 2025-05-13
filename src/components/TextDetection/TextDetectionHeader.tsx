
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TextDetectionHeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const TextDetectionHeader: React.FC<TextDetectionHeaderProps> = ({ 
  darkMode, 
  toggleTheme 
}) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white dark:bg-[#0B0F17] text-foreground dark:text-white p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-4">
        <img 
          src="https://logo-logos.com/2016/11/Atos_logo.png" 
          alt="Atos Logo" 
          className="h-8"
        />
        <h1 className="text-2xl font-bold">Text Detection System</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="text-foreground dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
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
  );
};

export default TextDetectionHeader;
