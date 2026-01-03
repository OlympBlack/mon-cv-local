import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { cvModels } from "@/data/cvModels";
import EditorPanel from "@/components/cv/EditorPanel";
import PreviewWrapper from "@/components/cv/PreviewWrapper";

export default function ModeleEditor() {
  const { modelId } = useParams();
  const model = modelId ? cvModels[modelId] : null;

  const [cvData, setCvData] = useState({
    fullName: "Jean Dupont",
    title: "Développeur Web",
    color: "#4f46e5",
  });

  if (!model) {
    return <div className="py-32 text-center">Modèle introuvable</div>;
  }

  const Template = model.component;

  return (
    <>
      <Navbar />

      <main className="min-h-screen max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Colonne gauche : formulaire */}
        <EditorPanel data={cvData} onChange={setCvData} />

        {/* Colonne droite : preview */}
        <PreviewWrapper>
          <Template data={cvData} />
        </PreviewWrapper>

      </main>

      <Footer />
    </>
  );
}
