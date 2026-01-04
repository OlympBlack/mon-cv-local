import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { CVData } from "@/types";
import Navbar from "@/components/navbar";
import { cvModels } from "@/data/cvModels";
import EditorPanel from "@/components/cv/EditorPanel";
import PreviewWrapper from "@/components/cv/PreviewWrapper";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Footer from "../../components/footer";


export default function ModeleEditor() {
  const { modelId } = useParams();
  const model = modelId ? cvModels[modelId] : null;

  // Fonction pour obtenir les données par défaut
  const getDefaultData = (): CVData => ({
    fullName: "Toto Jules",
    title: "Développeur Web",
    color: model?.defaultColor || "#4f46e6",
    contact: {
      phone: "+229 01 00 00 00 00",
      email: "toto.pierre@example.com",
      address: "Cotonou, Bénin",
    },
    about: "Passionné par le développement web, je crée des applications modernes et performantes.",
    experiences: [
      {
        role: "Développeur Senior",
        company: "Tech Solutions",
        startDate: "2020-01",
        endDate: "",
        isCurrent: true,
        description: "Développement d'applications web full-stack, gestion d'équipe et mise en place de CI/CD.",
      },
    ],
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Node.js", level: 80 },
    ],
    languages: ["Français", "Anglais"],
    hobbies: ["Photography", "Voyages"],
    references: [],
    education: [
      {
        degree: "Master Informatique",
        school: "Université d'Abomey Calavi",
        startDate: "2018-09",
        endDate: "2020-06",
        isCurrent: false,
      }
    ],
    certifications: [],
    tools: [],
    objective: "",
  });

  const [cvData, setCvData] = useState<CVData>(() => {
    // 1. Tenter de récupérer les données locales
    try {
      const saved = localStorage.getItem("cv_auto_save_v1");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Erreur lecture localStorage", e);
    }
    // 2. Sinon, retourner les données par défaut
    return getDefaultData();
  });

  // Sauvegarde automatique à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem("cv_auto_save_v1", JSON.stringify(cvData));
    } catch (e) {
      console.error("Erreur sauvegarde localStorage", e);
    }
  }, [cvData]);

  const [showResetModal, setShowResetModal] = useState(false);

  const handleReset = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    const def = getDefaultData();
    setCvData(def);
    localStorage.removeItem("cv_auto_save_v1");
    setShowResetModal(false);
  };

  if (!model) {
    return <div className="py-32 text-center">Modèle introuvable</div>;
  }

  const Template = model.component;

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        {/* Light */}
        <div className="absolute inset-0 -z-10 dark:hidden h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
        {/* Dark */}
        <div className="absolute inset-0 -z-10 hidden dark:block h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      </div>

      <div className="flex flex-col min-h-screen lg:h-screen mb-10 lg:mb-0 lg:overflow-hidden">
        <Navbar />

        <main className="flex-1 lg:overflow-hidden pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:h-full">

            {/* Colonne gauche : Formulaire */}
            <div className="lg:col-span-5 xl:col-span-4 lg:h-full lg:overflow-y-auto border-r border-gray-200 dark:border-gray-800 scrollbar-hide">
              <div className="p-6">
                <EditorPanel data={cvData} onChange={setCvData} onReset={handleReset} />
              </div>
            </div>

            {/* Colonne droite : Preview */}
            <div className="lg:col-span-7 xl:col-span-8 lg:h-full flex flex-col relative lg:overflow-y-auto scrollbar-hide">
              <div className="flex-1 flex items-start justify-center p-8 lg:p-12">
                <PreviewWrapper>
                  <Template data={cvData} />
                </PreviewWrapper>
              </div>

            </div>

          </div>
        </main>
      </div>
      {/* RESET MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6 border dark:border-gray-800 scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                <TriangleAlert className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold dark:text-white">Réinitialiser le CV ?</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Êtes-vous sûr de vouloir tout effacer ? Cette action est irréversible et supprimera toutes vos données actuelles.
                </p>
              </div>
              <div className="flex gap-3 w-full pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowResetModal(false)}
                >
                  Annuler
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={confirmReset}
                >
                  Tout effacer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
