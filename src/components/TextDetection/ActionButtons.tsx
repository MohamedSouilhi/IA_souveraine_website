
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  extractedText: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ extractedText }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end gap-4 mt-8">
      <Button 
        variant="destructive"
        onClick={() => navigate('/')}
      >
        Quitter
      </Button>
      <Button 
        onClick={() => navigate('/text-detection-history')}
        disabled={!extractedText}
        className="bg-gray-700 hover:bg-gray-600"
      >
        Voir l'Historique
      </Button>
    </div>
  );
};

export default ActionButtons;
