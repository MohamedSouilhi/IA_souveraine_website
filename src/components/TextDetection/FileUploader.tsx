import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploaderProps {
  onUpload: (file: File) => void; // Passe le fichier sélectionné
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onUpload(file); // Passer le fichier à la fonction onUpload
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*,.pdf"
      />
      <label htmlFor="file-upload">
        <Button 
          variant="outline" 
          className="w-full cursor-pointer"
          asChild
        >
          <span>
            <Upload className="mr-2 h-4 w-4" />
            {fileName ? fileName : "Sélectionner un fichier"}
          </span>
        </Button>
      </label>
    </div>
  );
};

export default FileUploader;