
import React, { useState, useEffect } from 'react';
import TextDetectionHeader from './TextDetectionHeader';
import TextDetectionSidebar from './TextDetectionSidebar';
import TextDetectionFooter from './TextDetectionFooter';

interface TextDetectionLayoutProps {
  children: React.ReactNode;
  activePage: 'detection' | 'history' | 'scan';
}

const TextDetectionLayout: React.FC<TextDetectionLayoutProps> = ({ 
  children, 
  activePage 
}) => {
  const [darkMode, setDarkMode] = useState(true);
  
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

  return (
    <div className="min-h-screen flex flex-col dark:bg-[#0B0F17]">
      <TextDetectionHeader darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <div className="flex flex-1 bg-white dark:bg-[#0B0F17]">
        <TextDetectionSidebar activePage={activePage} />
        
        <main className="flex-1 p-6 bg-background text-foreground overflow-auto">
          {children}
        </main>
      </div>
      
      <TextDetectionFooter />
    </div>
  );
};

export default TextDetectionLayout;
