import React from 'react';

interface ResultsSectionProps {
  isProcessing: boolean;
  extractedText: string;
  error: string | null;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ isProcessing, extractedText, error }) => {
  return (
    <div className="mb-6">
      {isProcessing && <p>Traitement en cours...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {extractedText && !isProcessing && (
        <div>
          <h3 className="text-lg font-semibold">Texte extrait :</h3>
          <pre className="bg-black-100 p-2 rounded">{extractedText}</pre>
        </div>
      )}
    </div>
  );
};

export default ResultsSection;