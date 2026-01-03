import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Palette, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

/* =======================
   IMPORT DES IMAGES (PROVISOIRES)
======================= */
import moderne01 from "@/assets/images/cv-templates/moderne/moderne-1.jpg";
import moderne02 from "@/assets/images/cv-templates/moderne/moderne-2.jpg";
import moderne03 from "@/assets/images/cv-templates/moderne/moderne-3.jpg";

import classique01 from "@/assets/images/cv-templates/classique/classique-1.jpg";
import classique02 from "@/assets/images/cv-templates/classique/classique-2.jpg";
import classique03 from "@/assets/images/cv-templates/classique/classique-3.jpg";

import pro01 from "@/assets/images/cv-templates/pro/pro-1.jpg";
import pro02 from "@/assets/images/cv-templates/pro/pro-2.jpg";
import pro03 from "@/assets/images/cv-templates/pro/pro-3.jpg";



/* =======================
   TYPES
======================= */
type Category = "Tous" | "Moderne" | "Classique" | "Professionnel";
type ColorFilter = "Tous" | "Bleu" | "Noir" | "Violet" | "Clair" | "Rouge" | "Vert";

interface Model {
    id: string;
    name: string;
    category: Category;
    colors: ColorFilter[];
    image: string;
}

/* =======================
   DATA PROVISOIRE
======================= */
const MODELS: Model[] = [
  { id: "1", name: "Moderne 01", category: "Moderne", colors: ["Bleu", "Clair"], image: moderne01 },
  { id: "2", name: "Moderne 02", category: "Moderne", colors: ["Violet", "Noir"], image: moderne02 },
  { id: "3", name: "Moderne 03", category: "Moderne", colors: ["Bleu", "Noir"], image: moderne03 },

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
];

/* =======================
   PAGE
======================= */
export default function Modeles() {
    const [selectedCategory, setSelectedCategory] = useState<Category>("Tous");
    const [selectedColor, setSelectedColor] = useState<ColorFilter>("Tous");
    const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

    const filteredModels = MODELS.filter((model) => {
        const matchCategory = selectedCategory === "Tous" || model.category === selectedCategory;
        const matchColor = selectedColor === "Tous" || model.colors.includes(selectedColor);
        return matchCategory && matchColor;
    });

    return (
        <>
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 dark:hidden bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]" />
                <div className="absolute inset-0 hidden dark:block bg-black [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />
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
                            Sélectionnez un modèle de CV adapté à votre profil. Vous pourrez le personnaliser ensuite.
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

                        <div className="hidden md:block w-px h-8 bg-border" />

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
                                <ModelCard
                                    key={model.id}
                                    model={model}
                                    isSelected={selectedModelId === model.id}
                                    onSelect={() => setSelectedModelId(model.id)}
                                />
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

/* =======================
   CARD
======================= */
function ModelCard({
    model,
    isSelected,
    onSelect,
}: {
    model: Model;
    isSelected: boolean;
    onSelect: () => void;
}) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
                "group relative rounded-xl overflow-hidden border cursor-pointer transition",
                isSelected ? "ring-2 ring-primary" : "hover:border-primary"
            )}
            onClick={onSelect}
        >
            <div className="aspect-[1/1.414] relative">
                <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button size="sm">
                        {isSelected ? "Sélectionné" : "Choisir"}
                    </Button>
                </div>

                {isSelected && (
                    <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-1.5">
                        <Check className="w-4 h-4" />
                    </div>
                )}
            </div>

            <div className="p-4 border-t flex justify-between items-center">
                <h3 className="font-semibold">{model.name}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-muted">
                    {model.category}
                </span>
            </div>
        </motion.div>
    );
}
