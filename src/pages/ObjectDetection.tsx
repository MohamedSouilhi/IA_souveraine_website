
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { HardHat } from "@/components/ui/hard-hat";
import { Headphones, Cog, Glasses } from "lucide-react";

const ObjectDetection = () => {
  const navigate = useNavigate();
  const [selectedObjects, setSelectedObjects] = useState<Record<string, boolean>>({
    "Casque": false,
    "Écouteurs": false,
    "Gilet": false,
    "Sans Casque": false,
    "Sans Écouteurs": false,
    "Sans Gilet": false,
    "Sans Lunettes": false,
    "Lunettes": false,
  });

  const handleCheckboxChange = (objectName: string) => {
    setSelectedObjects(prev => ({
      ...prev,
      [objectName]: !prev[objectName]
    }));
  };

  const handleSelectAll = () => {
    const areAllSelected = Object.values(selectedObjects).every(value => value);
    
    const newState = Object.keys(selectedObjects).reduce((acc, key) => {
      acc[key] = !areAllSelected;
      return acc;
    }, {} as Record<string, boolean>);
    
    setSelectedObjects(newState);
  };

  const handleStartDetection = () => {
    const selected = Object.entries(selectedObjects)
      .filter(([_, isSelected]) => isSelected)
      .map(([name]) => name);
    
    if (selected.length === 0) {
      toast.error("Veuillez sélectionner au moins un objet.");
      return;
    }
    
    toast.success(`Détection activée pour : ${selected.join(", ")}`);
    // Normalement ici, vous lanceriez le processus de détection
  };

  const getObjectIcon = (objectName: string) => {
    switch(objectName) {
      case "Casque": return HardHat;
      case "Écouteurs": return Headphones;
      case "Gilet": return Cog; // Replaced Vest with Cog as a substitute
      case "Lunettes": return Glasses;
      case "Sans Casque": return HardHat;
      case "Sans Écouteurs": return Headphones;
      case "Sans Gilet": return Cog; // Replaced Vest with Cog as a substitute
      case "Sans Lunettes": return Glasses;
      default: return null;
    }
  };

  const atLeastOneSelected = Object.values(selectedObjects).some(val => val);
  const allSelected = Object.values(selectedObjects).every(val => val);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Sélectionnez les objets à détecter</h2>
        <Button 
          variant="outline" 
          onClick={handleSelectAll}
          className={allSelected ? "bg-blue-100" : ""}
        >
          {allSelected ? "Tout désélectionner" : "Tout sélectionner"}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {Object.keys(selectedObjects).map(objectName => {
          const ObjectIcon = getObjectIcon(objectName);
          return (
            <div 
              key={objectName}
              className="flex items-center space-x-2 border p-3 rounded-md"
            >
              <Checkbox 
                id={objectName} 
                checked={selectedObjects[objectName]}
                onCheckedChange={() => handleCheckboxChange(objectName)}
              />
              <label
                htmlFor={objectName}
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2"
              >
                {ObjectIcon && <ObjectIcon className="h-5 w-5 text-gray-500" />}
                {objectName}
              </label>
            </div>
          );
        })}
      </div>
      
      {/* Boutons de navigation */}
      <div className="flex justify-end gap-4 mt-8">
        <Button 
          variant="outline"
          onClick={() => navigate("/source-selection")}
        >
          Retour à la sélection de source
        </Button>
        <Button 
          variant="destructive"
          onClick={() => navigate("/login")}
        >
          Quitter
        </Button>
        <Button 
          onClick={handleStartDetection}
          disabled={!atLeastOneSelected}
        >
          Démarrer la détection
        </Button>
      </div>
    </div>
  );
};

export default ObjectDetection;
