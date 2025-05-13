
import React, { useState } from 'react';
import TextDetectionLayout from '@/components/TextDetection/TextDetectionLayout';
import FileUploadSection from '@/components/TextDetection/FileUploadSection';
import ResultsSection from '@/components/TextDetection/ResultsSection';
import ActionButtons from '@/components/TextDetection/ActionButtons';

const TextDetection: React.FC = () => {
  const [extractedText, setExtractedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to handle text extraction from uploaded files
  const handleTextExtraction = (text: string) => {
    setIsProcessing(true);
    // Simulate processing delay
    setTimeout(() => {
      setExtractedText(text);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <TextDetectionLayout activePage="detection">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Charger un Fichier et Configurer l'OCR</h2>
        
        <FileUploadSection onFileProcessed={handleTextExtraction} />
        
        <ResultsSection 
          isProcessing={isProcessing} 
          extractedText={extractedText} 
        />

        <ActionButtons extractedText={extractedText} />
      </div>
    </TextDetectionLayout>
  );
};

export default TextDetection;
