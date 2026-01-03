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
        school: "Université de Paris",
        startDate: "2018-09",
        endDate: "2020-06",
        isCurrent: false,
      }
    ],
    certifications: [],
    tools: [],
    objective: "",
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

      <div className="flex flex-col min-h-screen lg:h-screen mb-10 lg:mb-0 lg:overflow-hidden">
        <Navbar />

        <main className="flex-1 lg:overflow-hidden pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:h-full">

            {/* Colonne gauche : Formulaire */}
            <div className="lg:col-span-5 xl:col-span-4 lg:h-full lg:overflow-y-auto border-r border-gray-200 dark:border-gray-800 scrollbar-hide">
              <div className="p-6">
                <EditorPanel data={cvData} onChange={setCvData} />
              </div>
            </div>

            {/* Colonne droite : Preview */}
            <div className="lg:col-span-7 xl:col-span-8 lg:h-full flex flex-col relative lg:overflow-y-auto scrollbar-hide">
              <div className="flex-1 flex items-start justify-center p-8 lg:p-12">
                <PreviewWrapper>
                  <Template data={cvData} />
                </PreviewWrapper>
              </div>
              {/* Le footer s'affiche ici sur desktop si on le souhaite, ou reste global. 
                  En mode mobile (flux naturel), le footer global (ligne 84) sera visible en bas de page. */}
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
