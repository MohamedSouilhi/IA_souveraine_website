
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, RefreshCcw, Search, Trash2, Eye, Filter, CircleCheck, Percent, CircleX } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Mock data for object detections
const mockDetections = [
  {
    id: "1",
    timestamp: "2025-04-17T14:37:15",
    source: "Caméra 1",
    detectedObjects: [
      { name: "Casque", count: 3 },
      { name: "Gilet", count: 2 },
      { name: "Lunettes", count: 1 },
    ],
    duration: "3.5s",
    status: "100%",
  },
  {
    id: "2",
    timestamp: "2025-04-17T11:25:03",
    source: "Caméra 2",
    detectedObjects: [
      { name: "Sans Casque", count: 1 },
      { name: "Sans Gilet", count: 2 },
    ],
    duration: "2.8s",
    status: "Less than 50%",
  },
  {
    id: "3",
    timestamp: "2025-04-16T09:17:22",
    source: "Caméra 3",
    detectedObjects: [
      { name: "Casque", count: 2 },
    ],
    duration: "2.1s",
    status: "More than 50%",
  },
  {
    id: "4",
    timestamp: "2025-04-15T16:45:39",
    source: "Caméra 1",
    detectedObjects: [
      { name: "Sans Casque", count: 2 },
      { name: "Sans Lunettes", count: 1 },
    ],
    duration: "3.2s",
    status: "Less than 50%",
  },
];

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function History() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Get unique sources and statuses for filters
  const uniqueSources = Array.from(new Set(mockDetections.map(det => det.source)));
  const uniqueStatuses = Array.from(new Set(mockDetections.map(det => det.status)));

  // Filter detections based on search, date, source, and status
  const filtered = mockDetections.filter(det => {
    // Text search (object names or source)
    const matchesSearch = 
      search === "" || 
      det.source.toLowerCase().includes(search.toLowerCase()) ||
      det.detectedObjects.some(obj => obj.name.toLowerCase().includes(search.toLowerCase())) ||
      det.status.toLowerCase().includes(search.toLowerCase());
    
    // Date filter
    const matchesDate = 
      !selectedDate || 
      new Date(det.timestamp).toDateString() === selectedDate.toDateString();
    
    // Source filter
    const matchesSource = 
      !sourceFilter || 
      det.source === sourceFilter;
    
    // Status filter
    const matchesStatus = 
      !statusFilter || 
      det.status === statusFilter;
    
    return matchesSearch && matchesDate && matchesSource && matchesStatus;
  });

  // Sort filtered results
  const sortedDetections = [...filtered].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sort === "newest" ? dateB - dateA : dateA - dateB;
  });

  const handleDelete = (id: string) => {
    toast.success("Détection supprimée avec succès");
    // In a real app, you would delete the detection here
  };

  const handleView = (id: string) => {
    // In a real app, you would navigate to the detection details page
    toast.info("Affichage des détails de la détection");
  };

  const clearFilters = () => {
    setSelectedDate(undefined);
    setSourceFilter(null);
    setStatusFilter(null);
    toast.info("Tous les filtres ont été réinitialisés");
  };

  // Helper function to render status badges with appropriate styling and icons
  const renderStatusBadge = (status: string) => {
    switch(status) {
      case "100%":
        return (
          <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30 flex items-center gap-1">
            <CircleCheck className="h-3.5 w-3.5" />
            <span>100%</span>
          </Badge>
        );
      case "Less than 50%":
        return (
          <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-500/30 flex items-center gap-1">
            <CircleX className="h-3.5 w-3.5" />
            <span>Less than 50%</span>
          </Badge>
        );
      case "More than 50%":
        return (
          <Badge variant="outline" className="bg-orange-500/20 text-orange-300 border-orange-500/30 flex items-center gap-1">
            <Percent className="h-3.5 w-3.5" />
            <span>More than 50%</span>
          </Badge>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-white">
        Historique des Détections
      </h1>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
        <div className="flex-1 flex items-center bg-[#1A1F2C] rounded-lg border border-gray-800 px-3 py-2 shadow-sm max-w-md">
          <Search className="text-gray-400 mr-2" size={20} />
          <Input
            type="text"
            placeholder="Rechercher par source, objet ou status..."
            className="border-none focus-visible:ring-0 shadow-none p-0 text-sm bg-transparent text-white placeholder:text-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Date picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "bg-[#1A1F2C] border border-gray-800 text-white hover:bg-[#242B3D] transition-colors",
                !selectedDate && "text-gray-400"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Filtrer par date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#1A1F2C] border border-gray-800">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              className="bg-[#1A1F2C] text-white"
            />
            {selectedDate && (
              <div className="p-3 border-t border-gray-800">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-gray-400 hover:text-white"
                  onClick={() => setSelectedDate(undefined)}
                >
                  Effacer la date
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {/* Source filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "bg-[#1A1F2C] border border-gray-800 text-white hover:bg-[#242B3D] transition-colors min-w-[140px]",
                !sourceFilter && "text-gray-400"
              )}
            >
              {sourceFilter || "Filtrer par source"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#1A1F2C] border border-gray-800 text-white">
            {uniqueSources.map((source) => (
              <DropdownMenuItem 
                key={source}
                className="hover:bg-[#242B3D] cursor-pointer"
                onClick={() => setSourceFilter(source)}
              >
                {source}
              </DropdownMenuItem>
            ))}
            {sourceFilter && (
              <>
                <DropdownMenuItem 
                  className="border-t border-gray-800 hover:bg-[#242B3D] cursor-pointer text-gray-400"
                  onClick={() => setSourceFilter(null)}
                >
                  Effacer le filtre
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "bg-[#1A1F2C] border border-gray-800 text-white hover:bg-[#242B3D] transition-colors min-w-[140px]",
                !statusFilter && "text-gray-400"
              )}
            >
              {statusFilter || "Filtrer par status"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#1A1F2C] border border-gray-800 text-white">
            {uniqueStatuses.map((status) => (
              <DropdownMenuItem 
                key={status}
                className="hover:bg-[#242B3D] cursor-pointer"
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
            {statusFilter && (
              <>
                <DropdownMenuItem 
                  className="border-t border-gray-800 hover:bg-[#242B3D] cursor-pointer text-gray-400"
                  onClick={() => setStatusFilter(null)}
                >
                  Effacer le filtre
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort select */}
        <select
          className="border border-gray-800 rounded-lg px-4 py-2 text-sm bg-[#1A1F2C] text-white cursor-pointer hover:bg-[#242B3D] transition-colors"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Plus récent</option>
          <option value="oldest">Plus ancien</option>
        </select>

        {/* Action buttons */}
        <div className="flex gap-2">
          {(selectedDate || sourceFilter || statusFilter) && (
            <Button
              variant="secondary"
              size="sm"
              onClick={clearFilters}
              className="bg-[#1A1F2C] text-white hover:bg-[#242B3D] transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Effacer filtres
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              toast.success("Données rafraîchies");
            }}
            className="bg-[#1A1F2C] text-white hover:bg-[#242B3D] transition-colors"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Rafraîchir
          </Button>
        </div>
      </div>

      {/* Results table */}
      <div className="overflow-auto rounded-lg border border-gray-800 bg-[#1A1F2C]">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-300">Date et Heure</TableHead>
              <TableHead className="text-gray-300">Source</TableHead>
              <TableHead className="text-gray-300">Objets Détectés</TableHead>
              <TableHead className="text-gray-300">Durée</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDetections.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="text-center text-gray-400 py-4"
                >
                  Aucune détection trouvée.
                </TableCell>
              </TableRow>
            ) : (
              sortedDetections.map((det) => (
                <TableRow key={det.id} className="border-gray-800 hover:bg-[#242B3D] transition-colors">
                  <TableCell className="text-gray-300">
                    {formatDateTime(det.timestamp)}
                  </TableCell>
                  <TableCell className="text-gray-300">{det.source}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {det.detectedObjects.map((obj, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300"
                        >
                          {obj.name} ({obj.count})
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{det.duration}</TableCell>
                  <TableCell>
                    {renderStatusBadge(det.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="secondary"
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        onClick={() => handleView(det.id)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        className="hover:bg-red-700 transition-colors"
                        onClick={() => handleDelete(det.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
