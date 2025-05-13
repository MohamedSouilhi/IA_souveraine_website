
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Detection {
  id: string;
  filename: string;
  created_at: string;
  model: string;
  numDetections: number;
  avgConfidence: number;
  duration: number;
  extractedText: string;
  annotatedImages: string[];
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detection: Detection | null;
}

export default function DetectionDetailModal({ open, onOpenChange, detection }: Props) {
  if (!detection) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="flex flex-col gap-4 max-h-[75vh] overflow-auto">
          <h2 className="text-xl font-bold mb-2">
            Détails de la Détection&nbsp;: {detection.filename}
          </h2>
          <div>
            <div className="flex items-center gap-4 flex-wrap text-sm text-gray-700">
              <span className="bg-green-100 text-green-800 rounded px-2 py-1">
                Nombre de détections&nbsp;: {detection.numDetections}
              </span>
              <span className="bg-blue-100 text-blue-800 rounded px-2 py-1">Confiance moyenne&nbsp;: {detection.avgConfidence}</span>
              <span className="bg-yellow-100 text-yellow-800 rounded px-2 py-1">Temps de traitement&nbsp;: {detection.duration}s</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mt-4 mb-2">Texte Extrait :</h3>
            <textarea readOnly value={detection.extractedText} className="w-full min-h-[120px] border rounded p-2 bg-gray-50 text-sm resize-none" />
          </div>
          <div>
            <h3 className="font-semibold mt-4 mb-2">Images Annotées :</h3>
            <div className="flex flex-wrap gap-3">
              {detection.annotatedImages?.length ? (
                detection.annotatedImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Annotation ${i + 1}`}
                    className="rounded border max-h-44 shadow"
                  />
                ))
              ) : (
                <span className="text-gray-500 text-sm">Aucune image annotée disponible.</span>
              )}
            </div>
          </div>
          <div className="flex gap-3 mt-5 flex-wrap justify-end">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <Download className="w-4 h-4 mr-1" /> Télécharger le Texte
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Download className="w-4 h-4 mr-1" /> Télécharger les Images
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
