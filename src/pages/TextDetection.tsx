import React, { useState } from 'react';
import axios from 'axios';
import TextDetectionLayout from '@/components/TextDetection/TextDetectionLayout';
import FileUploadSection from '@/components/TextDetection/FileUploadSection';
import ResultsSection from '@/components/TextDetection/ResultsSection';
import ActionButtons from '@/components/TextDetection/ActionButtons';
import { Card, CardContent } from '@/components/ui/card';

const TextDetection: React.FC = () => {
  const [extractedText, setExtractedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle text extraction from uploaded files
  const handleTextExtraction = async (file: File) => {
    if (!file) {
      setError('Veuillez sélectionner un fichier.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setExtractedText('');

    const formData = new FormData();
    formData.append('files', file);

    try {
      const response = await axios.post(
        '/detect-text-multiple/?threshold=0.5&return_images=false', // Chemin relatif avec proxy
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Supposons que la réponse de l'API est structurée comme : { results: [{ detections: [{ text: string, confidence: number, bounding_box: number[] }] }] }
      const detections = response.data.results[0]?.detections || [];
      const extracted = detections.map((d: { text: string }) => d.text).join('\n');
      setExtractedText(extracted);
    } catch (err) {
      setError(`Erreur : ${err.response?.data?.detail || err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <TextDetectionLayout activePage="detection">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Charger un Fichier et Configurer l'OCR</h2>
        
        <FileUploadSection onFileProcessed={handleTextExtraction} />
             <Card>
        <CardContent className="flex flex-col p-6">
        <ResultsSection 
          isProcessing={isProcessing} 
          extractedText={extractedText} 
          error={error} // Passer l'erreur à ResultsSection
        />
        </CardContent>
      </Card>


        <ActionButtons extractedText={extractedText} />
      </div>
    </TextDetectionLayout>
  );
};

export default TextDetection;