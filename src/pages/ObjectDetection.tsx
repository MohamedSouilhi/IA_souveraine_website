import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { HardHat } from "@/components/ui/hard-hat";
import { Headphones, Cog, Glasses } from "lucide-react";

const ObjectDetection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedFile = location.state?.selectedFile || null; // Get the file from navigate state

  const [selectedObjects, setSelectedObjects] = useState({
    Casque: false,
    Écouteurs: false,
    Gilet: false,
    "Sans Casque": false,
    "Sans Écouteurs": false,
    "Sans Gilet": false,
    "Sans Lunettes": false,
    Lunettes: false,
  });
  const [history, setHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [detectionResult, setDetectionResult] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:8000/history");
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:8000/alerts");
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchHistory();
    fetchAlerts();
  }, []);

  const handleCheckboxChange = (objectName) => {
    setSelectedObjects((prev) => ({
      ...prev,
      [objectName]: !prev[objectName],
    }));
  };

  const handleSelectAll = () => {
    const areAllSelected = Object.values(selectedObjects).every((value) => value);
    const newState = Object.keys(selectedObjects).reduce((acc, key) => {
      acc[key as keyof typeof selectedObjects] = !areAllSelected;
      return acc;
    }, {} as typeof selectedObjects);
    setSelectedObjects(newState);
  };

  const handleStartDetection = async () => {
    const selected = Object.entries(selectedObjects)
      .filter(([_, isSelected]) => isSelected)
      .map(([name]) => name);

    if (selected.length === 0) {
      toast.error("Veuillez sélectionner au moins un objet.");
      return;
    }

    try {
      const source = localStorage.getItem("selectedSource") || "image-file";
      const formData = new FormData();
      formData.append("confidence", "0.25");
      formData.append("save_results", "true");
      formData.append("target_classes", JSON.stringify(selected));

      let endpoint = "";
      if (source === "webcam") {
        toast.warning("Webcam not fully implemented. Use video/image for now.");
        return;
      } else if (source === "ip-camera") {
        endpoint = "http://localhost:8000/stream";
        const ipCameraUrl = localStorage.getItem("ipCameraUrl") || "";
        if (!ipCameraUrl) {
          throw new Error("No IP Camera URL provided.");
        }
        formData.append("url", ipCameraUrl);
      } else if (source === "video-file") {
        endpoint = "http://localhost:8000/predict/video";
        if (!selectedFile) {
          throw new Error("No video file selected.");
        }
        formData.append("file", selectedFile);
      } else if (source === "image-file") {
        endpoint = "http://localhost:8000/predict/image";
        if (!selectedFile) {
          throw new Error("No image file selected.");
        }
        formData.append("file", selectedFile);
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Detection failed.");
      }

      const result = await response.json();
      setDetectionResult(result);
      toast.success(`Détection terminée pour : ${selected.join(", ")}.`);
      console.log("Detection result:", result);

      const historyResponse = await fetch("http://localhost:8000/history");
      setHistory(await historyResponse.json());
      const alertsResponse = await fetch("http://localhost:8000/alerts");
      setAlerts(await alertsResponse.json());
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la détection.");
      console.error(error);
    }
  };

  const getObjectIcon = (objectName) => {
    switch (objectName) {
      case "Casque":
      case "Sans Casque":
        return HardHat;
      case "Écouteurs":
      case "Sans Écouteurs":
        return Headphones;
      case "Gilet":
      case "Sans Gilet":
        return Cog;
      case "Lunettes":
      case "Sans Lunettes":
        return Glasses;
      default:
        return null;
    }
  };

  const atLeastOneSelected = Object.values(selectedObjects).some((val) => val);
  const allSelected = Object.values(selectedObjects).every((val) => val);

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
        {Object.keys(selectedObjects).map((objectName) => {
          const ObjectIcon = getObjectIcon(objectName);
          return (
            <div key={objectName} className="flex items-center space-x-2 border p-3 rounded-md">
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

      {detectionResult && detectionResult.annotated_image_base64 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Résultat de la détection</h3>
          <img src={detectionResult.annotated_image_base64} alt="Annotated Image" className="max-w-full" />
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Historique des détections</h3>
        {history.length > 0 ? (
          <ul>
            {history.map((item) => (
              <li key={item.id} className="border p-2 mb-2 rounded">
                {item.timestamp}: {item.source_type} - {item.detections.length} objets détectés
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune détection dans l'historique.</p>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Alertes EPI</h3>
        {alerts.length > 0 ? (
          <ul>
            {alerts.map((alert) => (
              <li key={alert.id} className="border p-2 mb-2 rounded bg-red-100">
                {alert.timestamp}: {alert.description} (Sévérité: {alert.severity})
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune alerte active.</p>
        )}
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" onClick={() => navigate("/source-selection")}>
          Retour à la sélection de source
        </Button>
        <Button variant="destructive" onClick={() => navigate("/login")}>
          Quitter
        </Button>
        <Button onClick={handleStartDetection} disabled={!atLeastOneSelected}>
          Démarrer la détection
        </Button>
      </div>
    </div>
  );
};

export default ObjectDetection;