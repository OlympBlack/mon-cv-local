import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Vérifie si un choix a déjà été fait
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleChoice = (choice: "accepted" | "refused") => {
        localStorage.setItem("cookie_consent", choice);
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
                >
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                        <div className="flex-1 text-sm text-gray-700 dark:text-gray-300 text-left">
                            <p>
                                Ce site utilise des cookies pour vous offrir la meilleure expérience utilisateur possible.
                                Nous ne stockons aucune donnée personnelle sensible sans votre accord.
                                En savoir plus dans notre{" "}
                                <Link to="/privacy-policy" className="font-medium underline underline-offset-4 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                    Politique de confidentialité
                                </Link>.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                            <Button
                                variant="outline"
                                onClick={() => handleChoice("refused")}
                                className="w-full sm:w-auto min-w-[120px] dark:text-white dark:border-white"
                            >
                                Refuser
                            </Button>
                            <Button
                                onClick={() => handleChoice("accepted")}
                                className="w-full sm:w-auto min-w-[120px] bg-purple-600 hover:bg-purple-700 text-white border-none"
                            >
                                Accepter
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
