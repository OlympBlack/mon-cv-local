import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Palette, LayoutTemplate } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

// --- Types & Mock Data ---

type Category = "Tous" | "Moderne" | "Classique" | "Professionnel";
type ColorFilter = "Tous" | "Bleu" | "Noir" | "Violet" | "Clair" | "Rouge" | "Vert";

interface Model {
    id: string;
    name: string;
    category: Category;
    colors: ColorFilter[];
    imagePlaceholderColor: string; // Temporary placeholder style
}

const MODELS: Model[] = [
    { id: "1", name: "Moderne 01", category: "Moderne", colors: ["Bleu", "Clair"], imagePlaceholderColor: "bg-blue-100 dark:bg-blue-900" },
    { id: "2", name: "Classique 01", category: "Classique", colors: ["Noir", "Clair"], imagePlaceholderColor: "bg-gray-100 dark:bg-gray-800" },
    { id: "3", name: "Pro 01", category: "Professionnel", colors: ["Bleu", "Noir"], imagePlaceholderColor: "bg-slate-200 dark:bg-slate-800" },
    { id: "4", name: "Moderne 02", category: "Moderne", colors: ["Violet", "Noir"], imagePlaceholderColor: "bg-purple-100 dark:bg-purple-900" },
    { id: "5", name: "Créatif 01", category: "Moderne", colors: ["Rouge", "Clair"], imagePlaceholderColor: "bg-red-100 dark:bg-red-900" },
    { id: "6", name: "Simple 01", category: "Classique", colors: ["Vert", "Clair"], imagePlaceholderColor: "bg-green-100 dark:bg-green-900" },
    { id: "7", name: "Tech 01", category: "Professionnel", colors: ["Noir", "Bleu"], imagePlaceholderColor: "bg-cyan-100 dark:bg-cyan-900" },
    { id: "8", name: "Artiste 01", category: "Moderne", colors: ["Violet", "Clair"], imagePlaceholderColor: "bg-fuchsia-100 dark:bg-fuchsia-900" },
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

// --- Components ---

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
                {/* Light */}
                <div className="absolute inset-0 -z-10 dark:hidden h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
                {/* Dark */}
                <div className="absolute inset-0 hidden dark:block h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            </div>

            <div className="relative z-10 min-h-screen flex flex-col">
                <Navbar />

                <main className="flex-grow py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto space-y-12">

                        {/* Header */}
                        <div className="text-center space-y-4">
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl font-extrabold tracking-tight sm:text-5xl"
                            >
                                Choisissez votre modèle
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                            >
                                Explorez notre collection de templates professionnels. Filtrez par style ou par couleur pour trouver celui qui vous correspond le mieux.
                            </motion.p>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border shadow-sm">

                            {/* Category Filter */}
                            <div className="flex flex-wrap justify-center gap-2">
                                {CATEGORIES.map((cat) => (
                                    <Button
                                        key={cat}
                                        variant={selectedCategory === cat ? "default" : "outline"}
                                        onClick={() => setSelectedCategory(cat)}
                                        className="rounded-full px-6 transition-all duration-300"
                                    >
                                        {cat}
                                    </Button>
                                ))}
                            </div>

                            <div className="h-8 w-px bg-border hidden md:block" />

                            {/* Color Filter */}
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-muted-foreground mr-2 flex items-center gap-2">
                                    <Palette className="w-4 h-4" /> Couleurs
                                </span>
                                {COLORS.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        title={color.name}
                                        className={cn(
                                            "w-8 h-8 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none ring-offset-2 ring-offset-background",
                                            color.class,
                                            selectedColor === color.name ? "ring-2 ring-primary scale-110" : "hover:ring-2 hover:ring-ring/50"
                                        )}
                                        aria-label={`Filtrer par couleur ${color.name}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <AnimatePresence mode="popLayout">
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
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="col-span-full text-center py-20 text-muted-foreground"
                                >
                                    <LayoutTemplate className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                    <p>Aucun modèle ne correspond à vos filtres.</p>
                                    <Button
                                        variant="link"
                                        onClick={() => { setSelectedCategory("Tous"); setSelectedColor("Tous"); }}
                                        className="mt-2"
                                    >
                                        Réinitialiser les filtres
                                    </Button>
                                </motion.div>
                            )}
                        </div>

                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

// --- Subcomponent: Model Card ---

function ModelCard({ model, isSelected, onSelect }: { model: Model; isSelected: boolean; onSelect: () => void }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "group relative bg-card rounded-xl overflow-hidden border cursor-pointer transition-all duration-300",
                isSelected
                    ? "ring-2 ring-primary border-primary shadow-lg shadow-primary/10"
                    : "border-border hover:border-primary/50 hover:shadow-md"
            )}
            onClick={onSelect}
        >
            {/* Placeholder Image Area */}
            <div className={cn(
                "aspect-[1/1.414] w-full relative overflow-hidden transition-colors duration-500",
                model.imagePlaceholderColor
            )}>
                {/* Overlay Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Center Content / Preview Text */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none select-none">
                    <span className="text-4xl font-black text-foreground/10 uppercase -rotate-45 tracking-widest">
                        CV Preview
                    </span>
                </div>

                {/* Selection Checkmark */}
                {isSelected && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg z-10"
                    >
                        <Check className="w-4 h-4" />
                    </motion.div>
                )}

                {/* Hover Action Button */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center pb-6">
                    <Button
                        variant={isSelected ? "secondary" : "default"}
                        className="shadow-lg font-medium"
                        onClick={(e) => {
                            e.stopPropagation(); // Avoid double trigger if needed, though card click does same
                            onSelect();
                        }}
                    >
                        {isSelected ? "Modèle sélectionné" : "Sélectionner ce modèle"}
                    </Button>
                </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 bg-card border-t border-border">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-foreground tracking-tight">{model.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium border border-border/50">
                        {model.category}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}