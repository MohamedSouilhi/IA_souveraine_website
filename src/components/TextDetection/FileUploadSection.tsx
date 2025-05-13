
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Search } from "lucide-react";
import FileUploader from '@/components/FileUploader';

interface FileUploadSectionProps {
  onFileProcessed?: (text: string) => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({ onFileProcessed }) => {
  // Fonction pour simuler l'extraction de texte lorsqu'un fichier est téléchargé
  const handleFileUpload = () => {
    if (onFileProcessed) {
      // Simuler l'extraction de texte avec un exemple de texte
      const sampleText = "Ceci est un exemple de texte extrait d'un document.\n\nLe système OCR a pu détecter ce texte à partir de l'image téléchargée.\n\nVous pouvez maintenant copier ou télécharger ce texte pour une utilisation ultérieure.";
      onFileProcessed(sampleText);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6 h-[200px]">
          <FileText className="h-12 w-12 mb-2" />
          <h3 className="font-bold text-lg">Charger un Fichier</h3>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Chargez une image ou un PDF pour extraire le texte
          </p>
          <div className="mt-4 w-full">
            <FileUploader onUpload={handleFileUpload} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6 h-[200px]">
          <Search className="h-12 w-12 mb-2" />
          <h3 className="font-bold text-lg">Modèle OCR</h3>
          <div className="space-y-2 mt-3 w-full">
            <div className="flex items-center">
              <input type="radio" id="easyocr" name="ocr" defaultChecked className="mr-2" />
              <label htmlFor="easyocr">EasyOCR (par défaut)</label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="tesseract" name="ocr" disabled className="mr-2" />
              <label htmlFor="tesseract" className="text-muted-foreground">Tesseract (bientôt disponible)</label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploadSection;
