
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import TextDetectionHeader from '@/components/TextDetection/TextDetectionHeader';
import TextDetectionSidebar from '@/components/TextDetection/TextDetectionSidebar';
import TextDetectionFooter from '@/components/TextDetection/TextDetectionFooter';

const TextDetectionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('filename'); // 'filename' or 'date'
  const [darkMode, setDarkMode] = useState(true);
  
  // Apply dark mode by default when component mounts
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  
  // Sample history data - in a real application, this would come from an API or context
  const historyItems = [
    {
      id: 1,
      filename: "invoice-april-2025.pdf",
      date: "2025-04-29",
      textLength: 1245,
      status: "Completed"
    },
    {
      id: 2,
      filename: "contract-revision-3.docx",
      date: "2025-04-28",
      textLength: 3456,
      status: "Completed"
    },
    {
      id: 3,
      filename: "business-card-scan.jpg",
      date: "2025-04-27",
      textLength: 124,
      status: "Completed"
    }
  ];

  // Filter items based on search term
  const filteredItems = historyItems.filter(item => {
    if (!searchTerm) return true;
    
    if (searchType === 'filename') {
      return item.filename.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return item.date.includes(searchTerm);
    }
  });

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
      {/* Header */}
      <TextDetectionHeader darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Main Content */}
      <div className="flex flex-1 bg-white dark:bg-[#0B0F17]">
        {/* Left Sidebar */}
        <TextDetectionSidebar activePage="history" />

        {/* Main Content Area */}
        <main className="flex-1 p-5 bg-background text-foreground overflow-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Historique des Extractions de Texte</h1>

            {/* Search Bar */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder={searchType === 'filename' ? "Rechercher par nom de fichier..." : "Rechercher par date (YYYY-MM-DD)..."}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={searchType === 'filename' ? "default" : "outline"}
                      onClick={() => setSearchType('filename')}
                      className={searchType === 'filename' ? "bg-blue-600" : ""}
                    >
                      Nom
                    </Button>
                    <Button
                      variant={searchType === 'date' ? "default" : "outline"}
                      onClick={() => setSearchType('date')}
                      className={searchType === 'date' ? "bg-blue-600" : ""}
                    >
                      Date
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Extractions Récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <Card key={item.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{item.filename}</h3>
                              <p className="text-sm text-muted-foreground">Traité le: {item.date}</p>
                              <p className="text-sm text-muted-foreground">{item.textLength} caractères extraits</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-1" />
                                Texte
                              </Button>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                Voir
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-10 text-muted-foreground">
                        Aucun résultat trouvé pour votre recherche
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Footer */}
      <TextDetectionFooter />
    </div>
  );
};

export default TextDetectionHistory;
