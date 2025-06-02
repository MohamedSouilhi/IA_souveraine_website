
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HardHat } from '@/components/ui/hard-hat';
import { FileText, Mic } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleCardClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <header className="py-6 px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl font-bold text-blue-900">Atos</h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
          Choose your path
        </h2>
        <p className="text-gray-600 max-w-2xl text-center mb-12">
          Select one of the options below to continue to your personalized experience
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
          {[
            {
              title: "Casque et Gilet Detection",
              description: "Système de détection automatique de casques et gilets de sécurité",
              bgColor: "bg-blue-600",
              icon: <HardHat />,
              route: "/source-selection"
            },
            {
              title: "Text Detection",
              description: "Détection et reconnaissance de texte dans les images et documents",
              bgColor: "bg-indigo-600",
              icon: <FileText className="w-12 h-12 mb-4 text-white" />,
              route: "/text-detection"
            },

          ].map((card, index) => (
            <motion.div
              key={index}
              className={`${card.bgColor} rounded-xl shadow-lg overflow-hidden cursor-pointer h-80`}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(card.route)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-8 h-full flex flex-col">
                {card.icon}
                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-blue-100 flex-grow">{card.description}</p>
                <div className="mt-auto pt-4">
                  <span className="inline-block bg-white/20 text-white py-2 px-4 rounded-lg text-sm">
                    Select &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="py-6 text-center text-gray-600">
        <p>&copy; 2025 Atos. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
