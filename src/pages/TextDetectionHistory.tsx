import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom'; // Add for navigation
import TextDetectionHeader from '@/components/TextDetection/TextDetectionHeader';
import TextDetectionSidebar from '@/components/TextDetection/TextDetectionSidebar';
import TextDetectionFooter from '@/components/TextDetection/TextDetectionFooter';

const TextDetectionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('filename');
  const [darkMode, setDarkMode] = useState(true);
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/history/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status !== 'success') {
          throw new Error('API response status is not success');
        }

        const mappedItems = data.results.map(item => ({
          id: item.id,
          filename: item.filename,
          date: item.created_at.includes('T') ? item.created_at.split('T')[0] : item.created_at.split(' ')[0],
          textLength: item.text.length,
          text: item.text, // Add text for download
          status: 'Completed'
        }));

        setHistoryItems(mappedItems);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const downloadText = (filename, text) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_extracted_text.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

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
      <TextDetectionHeader darkMode={darkMode} toggleTheme={toggleTheme} />
      <div className="flex flex-1 bg-white dark:bg-[#0B0F17]">
        <TextDetectionSidebar activePage="history" />
        <main className="flex-1 p-5 bg-background text-foreground overflow-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Historique des Extractions de Texte</h1>
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
                {loading ? (
                  <div className="text-center py-10 text-muted-foreground">
                    Chargement des données...
                  </div>
                ) : error ? (
                  <div className="text-center py-10 text-red-500">
                    Erreur: {error}
                  </div>
                ) : (
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
                                <Button size="sm" variant="outline" onClick={() => downloadText(item.filename, item.text)}>
                                  <Download className="h-4 w-4 mr-1" />
                                  Texte
                                </Button>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate(`/history/${item.id}`)}>
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
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <TextDetectionFooter />
    </div>
  );
};

export default TextDetectionHistory;