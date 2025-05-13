
import { Home, History, Settings, Info, Camera } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";

// On utilise directement l'URL du logo pour éviter les erreurs d'importation
const AtosLogoUrl = "https://logo-logos.com/2016/11/Atos_logo.png";

const Navigation = () => {
  const location = useLocation();

  // Fonction pour déterminer si un lien est actif
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={AtosLogoUrl} alt="Logo Atos" className="h-8 w-auto" />
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 ${
                  isActive("/") ? "bg-gray-800 font-semibold" : ""
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Accueil</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/history"
                className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 ${
                  isActive("/history") ? "bg-gray-800 font-semibold" : ""
                }`}
              >
                <History className="h-4 w-4" />
                <span>Historique</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/settings"
                className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 ${
                  isActive("/settings") ? "bg-gray-800 font-semibold" : ""
                }`}
              >
                <Settings className="h-4 w-4" />
                <span>Paramètres</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/about"
                className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 ${
                  isActive("/about") ? "bg-gray-800 font-semibold" : ""
                }`}
              >
                <Info className="h-4 w-4" />
                <span>À propos</span>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/source-selection"
                className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-800 ${
                  isActive("/source-selection") ? "bg-gray-800 font-semibold" : ""
                }`}
              >
                <Camera className="h-4 w-4" />
                <span>Détection</span>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Navigation;
