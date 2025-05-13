
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FileText, History, Search, Home } from "lucide-react";

interface TextDetectionSidebarProps {
  activePage: 'detection' | 'history' | 'scan';
}

const TextDetectionSidebar: React.FC<TextDetectionSidebarProps> = ({ 
  activePage 
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-[240px] bg-gray-100 dark:bg-[#0B0F17] text-gray-800 dark:text-white p-4 flex flex-col gap-2 border-r border-gray-200 dark:border-gray-800">
      <Button 
        variant="ghost" 
        className={`flex items-center justify-start gap-3 p-3 rounded-lg ${
          activePage === 'detection' ? "bg-blue-600 text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
        } w-full`}
        onClick={() => navigate('/text-detection')}
      >
        <FileText className="h-5 w-5" />
        <span className="font-medium">Text Detection</span>
      </Button>
      
      <Button 
        variant="ghost" 
        className={`flex items-center justify-start gap-3 p-3 rounded-lg ${
          activePage === 'history' ? "bg-blue-600 text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
        } w-full`}
        onClick={() => navigate('/text-detection-history')}
      >
        <History className="h-5 w-5" />
        <span className="font-medium">History</span>
      </Button>

      <Button 
        variant="ghost" 
        className={`flex items-center justify-start gap-3 p-3 rounded-lg ${
          activePage === 'scan' ? "bg-blue-600 text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
        } w-full`}
        onClick={() => navigate('/text-detection-scan')}
      >
        <Search className="h-5 w-5" />
        <span className="font-medium">Scan</span>
      </Button>
      
      <Button 
        variant="ghost" 
        className="flex items-center justify-start gap-3 p-3 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 w-full mt-auto"
        onClick={() => navigate('/')}
      >
        <Home className="h-5 w-5" />
        <span className="font-medium">Retour à l'accueil</span>
      </Button>
    </div>
  );
};

export default TextDetectionSidebar;
