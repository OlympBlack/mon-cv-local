import { useParams } from "react-router-dom";
import { useState } from "react";
import type { CVData } from "@/types";
import Navbar from "@/components/navbar";
import { cvModels } from "@/data/cvModels";
import EditorPanel from "@/components/cv/EditorPanel";
import PreviewWrapper from "@/components/cv/PreviewWrapper";
import Footer from "../../components/footer";


export default function ModeleEditor() {
  const { modelId } = useParams();
  const model = modelId ? cvModels[modelId] : null;

  const [cvData, setCvData] = useState<CVData>({
    fullName: "Jean Dupont",
    title: "Développeur Web",
    color: "#4f46e5",
    contact: {
      phone: "+33 6 12 34 56 78",
      email: "jean.dupont@example.com",
      address: "Paris, France",
    },
    about: "Passionné par le développement web, je crée des applications modernes et performantes.",
    experiences: [
      {
        role: "Développeur Senior",
        company: "Tech Solutions",
        date: "2020 - Présent",
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
  });

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
    
    <div className="flex flex-col h-screen dark:bg-black mb-10">
      <Navbar />

      <main className="flex-1 overflow-hidden pt-20">
        <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-0">

          {/* Colonne gauche : Formulaire (Scrollable) */}
          <div className="lg:col-span-5 xl:col-span-4 h-full overflow-y-auto border-r bg-white dark:bg-black dark:border-gray-800 scrollbar-hide">
            <div className="p-6">
              <EditorPanel data={cvData} onChange={setCvData} />
            </div>
          </div>

          {/* Colonne droite : Preview (Fixe avec fond contrasté) */}
          <div className="lg:col-span-7 xl:col-span-8 h-full bg-slate-100/50 dark:bg-black flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="flex-1 overflow-auto flex items-start justify-center p-8 lg:p-12">
              <PreviewWrapper>
                <Template data={cvData} />
              </PreviewWrapper>
            </div>
          </div>

        </div>
      </main>
    </div>
    <Footer />
    </>
  );
}
