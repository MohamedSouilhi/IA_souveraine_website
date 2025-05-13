
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, ScanText, Database, File } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import TextDetectionLayout from '@/components/TextDetection/TextDetectionLayout';
import FileUploader from '@/components/FileUploader';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TextDetectionScan = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [selectedExistingFile, setSelectedExistingFile] = useState<string | null>(null);

  // Exemple de fichiers existants dans la base de données
  const existingFiles = [
    { id: '1', name: 'document-1.pdf', date: '2025-05-01' },
    { id: '2', name: 'facture-client.pdf', date: '2025-05-02' },
    { id: '3', name: 'contrat-2025.pdf', date: '2025-05-03' },
    { id: '4', name: 'scan-recu.jpg', date: '2025-05-04' },
  ];

  // Cette fonction gère le téléchargement du fichier
  const handleFileUpload = () => {
    setIsExtracting(true);
    // Simulation de l'extraction de texte
    setTimeout(() => {
      const sampleText = "Ceci est un exemple de texte extrait d'un document.\n\nLe système OCR a pu détecter ce texte à partir de l'image ou du PDF téléchargé.\n\nVous pouvez maintenant rechercher des mots ou phrases dans ce texte comme 'exemple', 'système', ou 'texte'.\n\nCe document contient des informations importantes concernant le projet ABC. La référence du dossier est XYZ-2025-04.";
      setExtractedText(sampleText);
      setIsExtracting(false);
      toast({
        title: "Texte extrait avec succès",
        description: "Le texte a été extrait du document. Vous pouvez maintenant effectuer des recherches.",
      });
    }, 2000);
  };

  // Cette fonction gère la sélection d'un fichier existant
  const handleExistingFileSelect = (fileId: string) => {
    setSelectedExistingFile(fileId);
    setIsExtracting(true);
    
    // Simulation de l'extraction de texte du fichier existant
    setTimeout(() => {
      const selectedFileData = existingFiles.find(file => file.id === fileId);
      const sampleText = `Ceci est le contenu extrait du fichier "${selectedFileData?.name}".\n\nCe document a été traité le ${selectedFileData?.date}.\n\nIl contient des informations importantes relatives au dossier client.\n\nLa référence du document est REF-${fileId}-2025.\n\nVous pouvez rechercher des termes comme 'dossier', 'client', ou 'référence'.`;
      
      setExtractedText(sampleText);
      setIsExtracting(false);
      toast({
        title: "Fichier chargé avec succès",
        description: `Le texte a été extrait de ${selectedFileData?.name}. Vous pouvez maintenant effectuer des recherches.`,
      });
    }, 1500);
  };

  // Cette fonction simule une recherche dans le texte extrait
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    if (!extractedText) {
      toast({
        title: "Aucun texte disponible",
        description: "Veuillez d'abord télécharger et traiter un document.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulation d'une recherche dans le texte extrait
    setTimeout(() => {
      // Recherche de correspondances dans le texte extrait
      const query = searchQuery.toLowerCase();
      if (extractedText.toLowerCase().includes(query)) {
        const matches = [];
        const paragraphs = extractedText.split('\n\n');
        
        for (let i = 0; i < paragraphs.length; i++) {
          if (paragraphs[i].toLowerCase().includes(query)) {
            matches.push({
              id: i + 1,
              filename: selectedExistingFile 
                ? existingFiles.find(f => f.id === selectedExistingFile)?.name || "document.pdf"
                : "document-traité.pdf",
              date: new Date().toISOString().split('T')[0],
              match: `"${query}"`,
              context: paragraphs[i],
            });
          }
        }
        
        setSearchResults(matches);
      } else {
        setSearchResults([]);
        toast({
          title: "Aucun résultat trouvé",
          description: `Aucune occurrence de "${searchQuery}" trouvée dans le document.`,
        });
      }
      
      setIsSearching(false);
    }, 1000);
  };

  return (
    <TextDetectionLayout activePage="scan">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Recherche de Texte</h1>
        
        {/* File Selection Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Document Source</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="existing" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="existing">Fichiers existants</TabsTrigger>
                <TabsTrigger value="upload">Nouveau fichier</TabsTrigger>
              </TabsList>
              
              <TabsContent value="existing" className="space-y-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <Database className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-muted-foreground">
                      Sélectionnez un fichier déjà traité
                    </span>
                  </div>
                  
                  <Select
                    value={selectedExistingFile || ''}
                    onValueChange={handleExistingFileSelect}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choisissez un fichier..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {existingFiles.map((file) => (
                          <SelectItem key={file.id} value={file.id}>
                            <div className="flex items-center">
                              <File className="h-4 w-4 mr-2 text-blue-500" />
                              <span>{file.name}</span>
                              <span className="ml-2 text-xs text-muted-foreground">
                                ({file.date})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                  {selectedExistingFile && isExtracting ? (
                    <div className="flex items-center justify-center p-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Chargement du fichier...</span>
                    </div>
                  ) : null}
                </div>
              </TabsContent>
              
              <TabsContent value="upload" className="space-y-4">
                <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <Upload className="h-8 w-8 mb-2 text-gray-500 dark:text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    Téléchargez une image ou un PDF pour extraire le texte
                  </p>
                  <FileUploader onUpload={handleFileUpload} />
                </div>
                
                {isExtracting ? (
                  <div className="flex items-center justify-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-2">Extraction du texte en cours...</span>
                  </div>
                ) : null}
              </TabsContent>
            </Tabs>
            
            {extractedText ? (
              <div className="p-3 bg-muted rounded-md mt-4">
                <p className="text-sm mb-2 font-medium">Aperçu du texte extrait:</p>
                <p className="text-sm text-muted-foreground">
                  {extractedText.length > 150 
                    ? `${extractedText.substring(0, 150)}...` 
                    : extractedText}
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>
        
        {/* Search Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Rechercher dans le Texte Extrait</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Entrez une phrase ou des mots à rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={!extractedText || isExtracting}
              />
              <Button 
                onClick={handleSearch} 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!searchQuery.trim() || isSearching || !extractedText || isExtracting}
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Recherche...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <span>Rechercher</span>
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        <Card>
          <CardHeader>
            <CardTitle>Résultats de Recherche</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              {isSearching ? (
                <div className="flex items-center justify-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((result) => (
                    <Card key={result.id} className="p-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{result.filename}</h3>
                          <p className="text-sm text-muted-foreground">{result.date}</p>
                        </div>
                        <div className="rounded-md bg-muted p-3 mb-2">
                          <p className="text-sm" dangerouslySetInnerHTML={{
                            __html: result.context.replace(
                              new RegExp(`(${searchQuery})`, 'gi'),
                              '<span class="bg-blue-900 text-white px-1">$1</span>'
                            )
                          }} />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Voir document
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div className="text-center py-10 text-muted-foreground">
                  Aucun résultat trouvé pour votre recherche
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  {extractedText ? 
                    "Utilisez la barre de recherche ci-dessus pour rechercher des mots ou phrases" : 
                    "Sélectionnez d'abord un document pour extraire du texte"}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </TextDetectionLayout>
  );
};

export default TextDetectionScan;
