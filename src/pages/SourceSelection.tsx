
import { useState } from "react";
import { Camera, Network, Video, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const SourceSelection = () => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [ipCameraUrl, setIpCameraUrl] = useState("");
  const [showIpInput, setShowIpInput] = useState(false);
  const navigate = useNavigate();

  const handleSelectSource = (source: string) => {
    setSelectedSource(source);
    if (source === "ip-camera") {
      setShowIpInput(true);
    } else {
      setShowIpInput(false);
      if (source === "webcam") {
        toast.success("Webcam connected!");
      }
    }
  };

  const handleIpCameraConnect = () => {
    if (ipCameraUrl.trim() === "" || !ipCameraUrl.startsWith("rtsp://")) {
      toast.error("Invalid URL. Please try again.");
      return;
    }
    toast.success("IP Camera connected!");
  };

  const handleFileUpload = (type: string) => {
    const input = document.createElement("input");
    input.type = "file";
    
    if (type === "video") {
      input.accept = "video/*";
    } else {
      input.accept = "image/*";
    }
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast.success(`${type === "video" ? "Video" : "Image"} loaded: ${file.name}`);
      }
    };
    
    input.click();
  };

  const handleNext = () => {
    if (selectedSource) {
      navigate("/object-detection");
    } else {
      toast.error("Please select a video source.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Choose Video Source</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Webcam */}
        <Card 
          className={`cursor-pointer transition-all hover:border-blue-500 ${
            selectedSource === "webcam" ? "border-blue-500 ring-2 ring-blue-500" : ""
          }`}
          onClick={() => handleSelectSource("webcam")}
        >
          <CardContent className="flex flex-col items-center justify-center p-6 h-[150px]">
            <Camera className="h-12 w-12 mb-2" />
            <h3 className="font-bold text-lg">Use Webcam</h3>
            <p className="text-sm text-gray-500">Default camera on your device</p>
          </CardContent>
        </Card>
        
        {/* IP Camera */}
        <Card 
          className={`cursor-pointer transition-all hover:border-blue-500 ${
            selectedSource === "ip-camera" ? "border-blue-500 ring-2 ring-blue-500" : ""
          }`}
          onClick={() => handleSelectSource("ip-camera")}
        >
          <CardContent className="flex flex-col items-center justify-center p-6 h-[150px]">
            <Network className="h-12 w-12 mb-2" />
            <h3 className="font-bold text-lg">Use IP Camera</h3>
            <p className="text-sm text-gray-500">Enter URL for streaming</p>
          </CardContent>
        </Card>
        
        {/* Video File */}
        <Card 
          className={`cursor-pointer transition-all hover:border-blue-500 ${
            selectedSource === "video-file" ? "border-blue-500 ring-2 ring-blue-500" : ""
          }`}
          onClick={() => {
            handleSelectSource("video-file");
            handleFileUpload("video");
          }}
        >
          <CardContent className="flex flex-col items-center justify-center p-6 h-[150px]">
            <Video className="h-12 w-12 mb-2" />
            <h3 className="font-bold text-lg">Load Video File</h3>
            <p className="text-sm text-gray-500">MP4, AVI, etc.</p>
          </CardContent>
        </Card>
        
        {/* Image File */}
        <Card 
          className={`cursor-pointer transition-all hover:border-blue-500 ${
            selectedSource === "image-file" ? "border-blue-500 ring-2 ring-blue-500" : ""
          }`}
          onClick={() => {
            handleSelectSource("image-file");
            handleFileUpload("image");
          }}
        >
          <CardContent className="flex flex-col items-center justify-center p-6 h-[150px]">
            <Image className="h-12 w-12 mb-2" />
            <h3 className="font-bold text-lg">Load Image File</h3>
            <p className="text-sm text-gray-500">JPEG, PNG, etc.</p>
          </CardContent>
        </Card>
      </div>
      
      {/* IP Camera Input */}
      {showIpInput && (
        <div className="mb-6">
          <div className="flex gap-2 mb-2">
            <Input
              type="text"
              placeholder="Enter IP Camera URL (e.g., rtsp://...)"
              value={ipCameraUrl}
              onChange={(e) => setIpCameraUrl(e.target.value)}
            />
            <Button 
              onClick={handleIpCameraConnect}
              disabled={!ipCameraUrl.trim()}
            >
              Connect
            </Button>
          </div>
        </div>
      )}
      
      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <Button 
          variant="destructive"
          onClick={() => navigate("/login")}
        >
          Quit
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!selectedSource}
        >
          Proceed to Object Detection
        </Button>
      </div>
    </div>
  );
};

export default SourceSelection;
