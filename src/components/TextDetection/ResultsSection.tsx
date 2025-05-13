
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

interface ResultsSectionProps {
  isProcessing: boolean;
  extractedText: string;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  isProcessing, 
  extractedText 
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  // Fonction pour télécharger le texte en tant que fichier .txt
  const handleDownload = () => {
    if (!extractedText) return;
    
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'texte_extrait.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Téléchargement réussi",
      description: "Le texte a été téléchargé avec succès.",
    });
  };

  // Fonction pour copier le texte dans le presse-papiers
  const handleCopy = async () => {
    if (!extractedText) return;
    
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      toast({
        title: "Texte copié",
        description: "Le texte a été copié dans le presse-papiers.",
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le texte.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Résultats de l'Extraction</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {isProcessing ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : extractedText ? (
            <Textarea
              value={extractedText}
              readOnly
              className="min-h-[250px] resize-none bg-muted border-none"
            />
          ) : (
            <div className="text-center text-muted-foreground py-10">
              Aucun texte extrait. 
              <br />
              Chargez un fichier pour commencer.
            </div>
          )}
        </ScrollArea>

        <div className="flex justify-end mt-4 gap-4">
          <Button 
            variant="outline"
            onClick={handleCopy}
            disabled={!extractedText}
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copié
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copier le Texte
              </>
            )}
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700" 
            onClick={handleDownload}
            disabled={!extractedText}
          >
            <Download className="mr-2 h-4 w-4" />
            Télécharger le Texte
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsSection;
