import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Trash2, Plus, Download, Printer, Loader2 } from "lucide-react";
import type { CVData } from "@/types";
import { useState } from "react";
// @ts-ignore
import html2pdf from "html2pdf.js";
import { toast } from "react-toastify";

interface EditorPanelProps {
  data: CVData;
  onChange: (newData: CVData) => void;
}

const COLORS = [
  "#000000", // Noir
  "#3b82f6", // Bleu
  "#ef4444", // Rouge
  "#10b981", // Vert
  "#8b5cf6", // Violet
  "#f59e0b", // Jaune
  "#ec4899", // Rose
  "#6366f1", // Indigo
  "#14b8a6", // Teal
  "#f97316", // Orange
];

export default function EditorPanel({ data, onChange }: EditorPanelProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleChange = (field: keyof CVData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleNestedChange = (parent: keyof CVData, field: string, value: string) => {
    onChange({
      ...data,
      [parent]: { ...data[parent as keyof CVData] as any, [field]: value },
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    const element = document.getElementById("cv-preview");
    if (!element) {
      toast.error("Impossible de trouver le CV à exporter.");
      return;
    }

    setIsExporting(true);
    const toastId = toast.loading("Génération du PDF...");

    const opt = {
      margin: 0,
      filename: `CV-${data.fullName.replace(/\s+/g, "_")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    try {
      await html2pdf().set(opt).from(element).save();
      toast.update(toastId, {
        render: "PDF téléchargé avec succès !",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (e) {
      console.error(e);
      toast.update(toastId, {
        render: "Erreur lors de l'export PDF.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Generic list handlers
  const addItem = (field: keyof CVData, item: any) => {
    onChange({ ...data, [field]: [...(data[field] as any[]), item] });
  };

  const updateItem = (field: keyof CVData, index: number, key: string | null, value: any) => {
    const list = [...(data[field] as any[])];
    if (key) {
      list[index] = { ...list[index], [key]: value };
    } else {
      list[index] = value;
    }
    onChange({ ...data, [field]: list });
  };

  const removeItem = (field: keyof CVData, index: number) => {
    const list = [...(data[field] as any[])];
    list.splice(index, 1);
    onChange({ ...data, [field]: list });
  };

  return (
    <div className="space-y-8 pb-20">

      {/* HEADER ACTIONS */}
      <div className="flex items-center justify-between sticky top-0 md:-top-6 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md py-4 border-b dark:border-gray-800 mb-6">
        <h2 className="text-2xl font-bold tracking-tight dark:text-white">Éditeur</h2>
        <div className="flex gap-2">
          <Button
            onClick={handlePrint}
            variant="secondary"
            size="sm"
            className="gap-2 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            title="Imprimer"
          >
            <Printer className="w-4 h-4" /> <span className="hidden sm:inline">Imprimer</span>
          </Button>
          <Button
            onClick={handleExportPDF}
            disabled={isExporting}
            size="sm"
            className="gap-2 bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>{isExporting ? "Génération..." : "Export PDF"}</span>
          </Button>
        </div>
      </div>

      {/* COLOR PICKER */}
      <div className="bg-card border rounded-xl p-4 space-y-3 shadow-sm dark:bg-black dark:border-gray-800">
        <Label>Couleur principale</Label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => handleChange("color", c)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${data.color === c ? "border-primary scale-110 shadow-md" : "border-transparent hover:scale-105"
                }`}
              style={{ backgroundColor: c }}
            />
          ))}
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200 ml-1">
            <input
              type="color"
              value={data.color}
              onChange={(e) => handleChange("color", e.target.value)}
              className="absolute inset-0 w-[150%] h-[150%] -top-1 -left-1 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["infos", "experiences"]} className="w-full space-y-2">

        {/* INFOS PERSONNELLES */}
        <AccordionItem value="infos" className="border rounded-xl px-4 bg-white dark:bg-black dark:border-gray-800 shadow-sm">
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">Informations Personnelles</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="grid gap-3">
              <div>
                <Label className="dark:text-gray-300">Nom complet</Label>
                <Input
                  value={data.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="Jean Dupont"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div>
                <Label className="dark:text-gray-300">Titre du poste</Label>
                <Input
                  value={data.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Développeur Fullstack"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="dark:text-gray-300">Email</Label>
                  <Input
                    value={data.contact.email}
                    onChange={(e) => handleNestedChange("contact", "email", e.target.value)}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <Label className="dark:text-gray-300">Téléphone</Label>
                  <Input
                    value={data.contact.phone}
                    onChange={(e) => handleNestedChange("contact", "phone", e.target.value)}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <Label className="dark:text-gray-300">Adresse</Label>
                <Input
                  value={data.contact.address}
                  onChange={(e) => handleNestedChange("contact", "address", e.target.value)}
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div>
                <Label className="dark:text-gray-300">À propos</Label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  value={data.about}
                  onChange={(e) => handleChange("about", e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* EXPERIENCES */}
        <AccordionItem value="experiences" className="border rounded-xl px-4 bg-white dark:bg-black dark:border-gray-800 shadow-sm">
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">Expériences</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {data.experiences.map((exp, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700 space-y-3 pb-4">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Poste / Rôle"
                    value={exp.role}
                    onChange={(e) => updateItem("experiences", i, "role", e.target.value)}
                    className="font-bold dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                  <Input
                    placeholder="Entreprise"
                    value={exp.company}
                    onChange={(e) => updateItem("experiences", i, "company", e.target.value)}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Période (ex: 2020-2023)"
                    value={exp.date}
                    onChange={(e) => updateItem("experiences", i, "date", e.target.value)}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("experiences", i)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem("experiences", { role: "", company: "", date: "" })}
              className="w-full border-dashed"
            >
              <Plus className="w-4 h-4 mr-2" /> Ajouter une expérience
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* COMPETENCES */}
        <AccordionItem value="skills" className="border rounded-xl px-4 bg-white dark:bg-black dark:border-gray-800 shadow-sm">
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">Compétences</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-2">
              {data.skills.map((skill, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    className="flex-grow dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="Nom (ex: React)"
                    value={skill.name}
                    onChange={(e) => updateItem("skills", i, "name", e.target.value)}
                  />
                  <Input
                    type="number"
                    className="w-20 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="%"
                    min="0" max="100"
                    value={skill.level}
                    onChange={(e) => updateItem("skills", i, "level", parseInt(e.target.value) || 0)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem("skills", i)}
                    className="text-destructive hover:bg-destructive/10 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem("skills", { name: "", level: 50 })}
              className="w-full border-dashed dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Plus className="w-4 h-4 mr-2" /> Ajouter une compétence
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* LANGUAGES */}
        <AccordionItem value="languages" className="border rounded-xl px-4 bg-white dark:bg-black dark:border-gray-800 shadow-sm">
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">Langues</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {data.languages.map((lang, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={lang}
                  onChange={(e) => updateItem("languages", i, null, e.target.value)}
                  placeholder="Langue (ex: Anglais C1)"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem("languages", i)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem("languages", "")}
              className="w-full border-dashed dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Plus className="w-4 h-4 mr-2" /> Ajouter une langue
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* HOBBIES */}
        <AccordionItem value="hobbies" className="border rounded-xl px-4 bg-white dark:bg-black dark:border-gray-800 shadow-sm">
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">Centres d'intérêt</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {data.hobbies.map((hobby, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={hobby}
                  onChange={(e) => updateItem("hobbies", i, null, e.target.value)}
                  placeholder="Loisir"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem("hobbies", i)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem("hobbies", "")}
              className="w-full border-dashed dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Plus className="w-4 h-4 mr-2" /> Ajouter un loisir
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* REFERENCES */}
        <AccordionItem value="references" className="border rounded-xl px-4 bg-white dark:bg-black dark:border-gray-800 shadow-sm">
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">Références</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {data.references.map((ref, i) => (
              <div key={i} className="border p-3 rounded-lg space-y-2 relative bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem("references", i)}
                  className="absolute top-1 right-1 h-6 w-6 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
                <Input
                  placeholder="Nom du référent"
                  value={ref.name}
                  onChange={(e) => updateItem("references", i, "name", e.target.value)}
                  className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <Input
                  placeholder="Contact (Email / Tél)"
                  value={ref.contact}
                  onChange={(e) => updateItem("references", i, "contact", e.target.value)}
                  className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem("references", { name: "", contact: "" })}
              className="w-full border-dashed dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Plus className="w-4 h-4 mr-2" /> Ajouter une référence
            </Button>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
}
