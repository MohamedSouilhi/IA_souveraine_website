import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import TextDetection from "./pages/TextDetection";
import TextDetectionHistory from "./pages/TextDetectionHistory";
import History from "./pages/History";
import Layout from "./components/Layout";
import SourceSelection from "./pages/SourceSelection";
import ObjectDetection from "./pages/ObjectDetection";
import TextDetectionScan from './pages/TextDetectionScan';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Temporarily redirect /login to /source-selection */}
          <Route path="/login" element={<Navigate to="/source-selection" replace />} />
          
          {/* Text detection system routes */}
          <Route path="/text-detection" element={<TextDetection />} />
          <Route path="/text-detection-history" element={<TextDetectionHistory />} />
          <Route path="/text-detection-scan" element={<TextDetectionScan />} />
          
          {/* Object detection system routes */}
          <Route element={<Layout />}>
            <Route path="/source-selection" element={<SourceSelection />} />
            <Route path="/object-detection" element={<ObjectDetection />} />
            <Route path="/history" element={<History />} />
            <Route path="/detection" element={<Navigate to="/source-selection" replace />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
