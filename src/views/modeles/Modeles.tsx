import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Palette, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useNavigate } from "react-router-dom";

/* =======================
   IMAGES
======================= */
import moderne01 from "@/assets/images/cv-templates/Moderne/moderne-1.jpg";
import moderne02 from "@/assets/images/cv-templates/Moderne/moderne-2.jpg";
import moderne03 from "@/assets/images/cv-templates/Moderne/moderne-3.jpg";

import classique01 from "@/assets/images/cv-templates/Classique/classique-1.jpg";
import classique02 from "@/assets/images/cv-templates/Classique/classique-2.jpg";
import classique03 from "@/assets/images/cv-templates/Classique/classique-3.jpg";

import pro01 from "@/assets/images/cv-templates/Pro/pro-1.jpg";
import pro02 from "@/assets/images/cv-templates/Pro/pro-2.jpg";
import pro03 from "@/assets/images/cv-templates/Pro/pro-3.jpg";

/* =======================
   TYPES
======================= */
type Category = "Tous" | "Moderne" | "Classique" | "Professionnel";
type ColorFilter =
  | "Tous"
  | "Bleu"
  | "Noir"
  | "Violet"
  | "Clair"
  | "Rouge"
  | "Vert"
  | "Jaune";

interface Model {
  id: string;
  name: string;
  category: Category;
  colors: ColorFilter[];
  image: string;
}

/* =======================
   DATA
======================= */
const MODELS: Model[] = [
  { id: "1", name: "Moderne 01", category: "Moderne", colors: ["Vert", "Clair"], image: moderne01 },
  { id: "2", name: "Moderne 02", category: "Moderne", colors: ["Violet", "Clair"], image: moderne02 },
  { id: "3", name: "Moderne 03", category: "Moderne", colors: ["Jaune", "Noir"], image: moderne03 },

  { id: "4", name: "Classique 01", category: "Classique", colors: ["Noir", "Clair"], image: classique01 },
  { id: "5", name: "Classique 02", category: "Classique", colors: ["Vert", "Clair"], image: classique02 },
  { id: "6", name: "Classique 03", category: "Classique", colors: ["Noir", "Clair"], image: classique03 },

  { id: "7", name: "Pro 01", category: "Professionnel", colors: ["Bleu", "Noir"], image: pro01 },
  { id: "8", name: "Pro 02", category: "Professionnel", colors: ["Noir", "Clair"], image: pro02 },
  { id: "9", name: "Pro 03", category: "Professionnel", colors: ["Violet", "Noir"], image: pro03 },
];

const CATEGORIES: Category[] = ["Tous", "Moderne", "Classique", "Professionnel"];

const COLORS: { name: ColorFilter; class: string }[] = [
  { name: "Tous", class: "bg-gradient-to-br from-gray-200 to-gray-400" },
  { name: "Bleu", class: "bg-blue-500" },
  { name: "Noir", class: "bg-black" },
  { name: "Violet", class: "bg-purple-500" },
  { name: "Clair", class: "bg-gray-100 border border-gray-300" },
  { name: "Rouge", class: "bg-red-500" },
  { name: "Vert", class: "bg-emerald-500" },
  { name: "Jaune", class: "bg-yellow-400" },
];

/* =======================
   PAGE
======================= */
export default function Modeles() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category>("Tous");
  const [selectedColor, setSelectedColor] = useState<ColorFilter>("Tous");

  const filteredModels = MODELS.filter((model) => {
    const matchCategory = selectedCategory === "Tous" || model.category === selectedCategory;
    const matchColor = selectedColor === "Tous" || model.colors.includes(selectedColor);
    return matchCategory && matchColor;
  });

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        {/* Light */}
        <div className="absolute inset-0 -z-10 dark:hidden h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
        {/* Dark */}
        <div className="absolute inset-0 -z-10 hidden dark:block h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      </div>
      <div className="relative min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow py-24 px-4 max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-extrabold"
            >
              Choisissez votre modèle
            </motion.h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sélectionnez un modèle de CV et commencez la création.
            </p>
          </div>

          {/* Filtres */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-card/60 backdrop-blur p-6 rounded-2xl border">
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  className="rounded-full px-6"
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Palette className="w-4 h-4" />
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    "w-8 h-8 rounded-full transition-all",
                    color.class,
                    selectedColor === color.name && "ring-2 ring-primary scale-110"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredModels.map((model) => (
                <motion.div
                  key={model.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => navigate(`/modeles/${model.id}`)}
                  className="group rounded-xl overflow-hidden border cursor-pointer hover:border-primary"
                >
                  <div className="aspect-[1/1.414] relative">
                    <img
                      src={model.image}
                      alt={model.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                      <Button size="sm">Utiliser ce modèle</Button>
                    </div>
                  </div>

                  <div className="p-4 border-t flex justify-between items-center">
                    <h3 className="font-semibold">{model.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted">
                      {model.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredModels.length === 0 && (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                <LayoutTemplate className="w-16 h-16 mx-auto mb-4 opacity-30" />
                Aucun modèle trouvé
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
