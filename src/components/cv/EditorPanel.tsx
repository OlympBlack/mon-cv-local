import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Trash2, Plus, Download, Printer, Loader2, Upload, X, ImageIcon, RotateCcw, LayoutTemplate, Link as LinkIcon } from "lucide-react";
import type { CVData } from "@/types";
import { useState, useRef } from "react";
// @ts-ignore
import html2pdf from "html2pdf.js";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ToolAutocomplete } from "../ToolAutocomplete";

interface EditorPanelProps {
  data: CVData;
  onChange: (newData: CVData) => void;
  onReset?: () => void;
}

const COLORS = [
  "#a73d34",
  "#000000",
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
  "#6366f1",
  "#14b8a6",
  "#f97316",
];

export default function EditorPanel({ data, onChange, onReset }: EditorPanelProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [showCustomTool, setShowCustomTool] = useState(false);
  const [customToolName, setCustomToolName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof CVData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleNestedChange = (parent: keyof CVData, field: string, value: string) => {
    onChange({
      ...data,
      [parent]: { ...data[parent as keyof CVData] as any, [field]: value },
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      toast.error("Veuillez sélectionner une image valide");
      return;
    }

    // Vérifier la taille (5 Mo max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5 Mo");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange("profileImage", reader.result as string);
      toast.success("Photo ajoutée avec succès !");
    };
    reader.onerror = () => {
      toast.error("Erreur lors du chargement de l'image");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    handleChange("profileImage", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Photo supprimée");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    // Cibler le conteneur principal de prévisualisation
    const element = document.getElementById("cv-preview");
    if (!element) {
      toast.error("Impossible de trouver le CV à exporter.");
      return;
    }

    setIsExporting(true);
    const toastId = toast.loading("Génération du PDF en cours...");

    // 1. Clone l'élément pour le manipuler sans impacter l'affichage
    const clone = element.cloneNode(true) as HTMLElement;
    clone.classList.add("pdf-export");

    // Add specific ID for PDF-safe wrapper targeting if needed, 
    // though the class .pdf-export is the main driver.
    // Ensure the clone wrapper background is white
    clone.style.backgroundColor = "white";

    // 2. Positionner le clone visible pour garantir le rendu (z-index élevé)
    // Les navigateurs modernes peuvent ne pas "peindre" les éléments masqués ou z-index négatif.
    clone.style.position = "absolute";
    clone.style.left = "0px";
    clone.style.top = "0px";
    clone.style.zIndex = "9999"; // On top!
    clone.style.width = "794px";
    clone.style.minHeight = "1123px";
    clone.style.transform = "none";
    clone.style.margin = "0";
    clone.style.padding = "0";
    clone.style.backgroundColor = "white"; // Ensure white background
    // Force text colors to black by default handled by CSS, but ensure container is clean

    document.body.appendChild(clone);

    // 3. Enforce !important sur les styles inline critiques
    // Cela permet aux styles inline définis dans le template (couleur principale)
    // de surcharger la règle CSS globale .pdf-export * { color: black !important }
    const enforceInlineImportant = (el: HTMLElement) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT);
      let recipient = walker.currentNode as HTMLElement;

      // Process root element too if needed, though loop starts at root
      // walker.currentNode is root initially, but nextNode moves to children.
      // So we handle root separately or better, use a loop that hits root.
      // efficient walk:
      while (recipient) {
        // Enforce color
        if (recipient.style.color) {
          recipient.style.setProperty('color', recipient.style.color, 'important');
        }
        // Enforce background-color
        if (recipient.style.backgroundColor) {
          recipient.style.setProperty('background-color', recipient.style.backgroundColor, 'important');
        }
        // Enforce border-color
        if (recipient.style.borderColor) {
          recipient.style.setProperty('border-color', recipient.style.borderColor, 'important');
        }
        recipient = walker.nextNode() as HTMLElement;
      }
    };

    enforceInlineImportant(clone);

    // 4. CSS Sanitizer: Remove unsupported colors from stylesheets
    // We only keep layout styles from Tailwind, colors are handled by our reset + inline
    let combinedCss = '';
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        if (sheet.href) return; // Skip external stylesheets if possible to avoid CORS, usually local styles are enough
        const rules = sheet.cssRules;
        if (rules) {
          Array.from(rules).forEach(rule => {
            combinedCss += rule.cssText;
          });
        }
      } catch (e) {
        console.warn('Skipping stylesheet:', e);
      }
    });

    // Strip oklab/oklch entirely by replacing with a fallback or keeping layout only.
    // actually simply replacing them with black/white is safer for the renderer
    // logic: if a rule has oklab, we replace the color with #000000.
    const safeCss = combinedCss.replace(/(oklch|oklab|lab|lch)\([^)]+\)/g, '#000000');

    const safeStyle = document.createElement('style');
    safeStyle.id = "safe-react-pdf-styles";
    safeStyle.innerHTML = safeCss;
    document.head.appendChild(safeStyle);

    const checkImagesLoaded = async (el: HTMLElement) => {
      const images = Array.from(el.querySelectorAll('img'));
      const promises = images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      await Promise.all(promises);
    };

    try {
      await checkImagesLoaded(clone);

      // Wait for layout/paint
      await new Promise(resolve => setTimeout(resolve, 250));

      const opt = {
        margin: 0,
        filename: `CV_${data.fullName.replace(/\s+/g, "_") || "CV"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          // Ignore the safe style if we are using document styles, but we injected it.
          // html2canvas reads from document.
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      // @ts-ignore
      await html2pdf().set(opt).from(clone).save();

      toast.update(toastId, {
        render: "✅ PDF téléchargé avec succès !",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (e: any) {
      console.error("Erreur export PDF:", e);
      toast.update(toastId, {
        render: "❌ Erreur export: " + (e.message || "inconnue"),
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      if (document.body.contains(clone)) {
        document.body.removeChild(clone);
      }
      const safeStyleElement = document.getElementById("safe-react-pdf-styles");
      if (safeStyleElement && safeStyleElement.parentNode) {
        safeStyleElement.parentNode.removeChild(safeStyleElement);
      }
      setIsExporting(false);
    }
  };

  // Generic list handlers
  const addItem = (field: keyof CVData, item: any) => {
    const list = (data[field] as any[]) || [];
    onChange({ ...data, [field]: [...list, item] });
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
      <div className="flex flex-col gap-4 sticky top-0 md:-top-6 z-10 bg-white/90 dark:bg-black/90 backdrop-blur-md py-4 border-b dark:border-gray-800 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight dark:text-white"> Éditeur CV</h2>
          <div className="flex gap-2">
            <Link to="/modeles">
              <Button variant="outline" size="sm" className="gap-2" title="Changer de modèle">
                <LayoutTemplate className="w-4 h-4 dark:text-white" />
                <span className="hidden sm:inline dark:text-white">Modèles</span>
              </Button>
            </Link>
            {onReset && (
              <Button onClick={onReset} variant="ghost" size="sm" className="gap-2 text-destructive hover:bg-destructive/10" title="Réinitialiser tout">
                <RotateCcw className="w-4 h-4 dark:text-white" />
                <span className="hidden sm:inline dark:text-white">Reset</span>
              </Button>
            )}
          </div>
        </div>

        <div className="flex gap-2 w-full">
          <Button
            onClick={handlePrint}
            variant="secondary"
            size="sm"
            className="flex-1 gap-2 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            title="Imprimer le CV"
          >
            <Printer className="w-4 h-4" />
            <span className="inline">Imprimer</span>
          </Button>
          <Button
            onClick={handleExportPDF}
            disabled={isExporting}
            size="sm"
            className="flex-1 gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>{isExporting ? "Génération..." : "Exporter PDF"}</span>
          </Button>
        </div>
      </div>

      {/* COLOR PICKER */}
      <div className="bg-white/60 border rounded-xl p-5 space-y-3 shadow-sm dark:bg-black/60 dark:border-gray-800 backdrop-blur-sm">
        <Label className="text-base font-semibold"> Couleur principale</Label>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => handleChange("color", c)}
              className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${data.color === c
                ? "border-purple-600 scale-110 shadow-lg ring-2 ring-purple-300"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                }`}
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
          <div className="relative">
            <input
              type="color"
              value={data.color}
              onChange={(e) => handleChange("color", e.target.value)}
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 dark:border-gray-600"
              title="Couleur personnalisée"
            />
          </div>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Choisissez une couleur pour personnaliser votre CV
        </p>
      </div>

      <Accordion type="multiple" defaultValue={["infos", "experiences"]} className="w-full space-y-2">

        {/* INFOS PERSONNELLES */}
        <AccordionItem value="infos" className="border rounded-xl px-4 bg-white/60 dark:bg-black/60 dark:border-gray-800 shadow-sm backdrop-blur-sm">
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">
            Informations Personnelles
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="grid gap-4">

              {/* PHOTO DE PROFIL */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-900/50">
                <Label className="dark:text-gray-300 mb-3 block text-sm font-semibold flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Photo de profil
                </Label>

                {data.profileImage ? (
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={data.profileImage}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                      />
                      <Button
                        onClick={handleRemoveImage}
                        size="icon"
                        className="absolute -top-2 -right-2 h-8 w-8 rounded-full shadow-lg bg-red-600 hover:bg-red-700 text-white border-2 border-white transition-transform hover:scale-110"
                        title="Supprimer la photo"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p className="font-semibold mb-1">Photo ajoutée</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-purple-600 hover:text-purple-700 underline"
                      >
                        Changer la photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="profile-upload"
                      className="cursor-pointer block"
                    >
                      <div className="flex flex-col items-center justify-center gap-3 px-6 py-8 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:bg-purple-50 dark:hover:bg-purple-900/20">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                          <Upload className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Cliquez pour télécharger
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            PNG, JPG, JPEG (max 5 Mo)
                          </p>
                        </div>
                      </div>
                    </label>
                    <input
                      ref={fileInputRef}
                      id="profile-upload"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label className="dark:text-gray-300 mb-1.5 block">Nom complet *</Label>
                <Input
                  value={data.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="Ex: GBASSI jc"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div>
                <Label className="dark:text-gray-300 mb-1.5 block">Titre du poste *</Label>
                <Input
                  value={data.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Ex: Développeur Full Stack"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label className="dark:text-gray-300 mb-1.5 block">Email</Label>
                  <Input
                    type="email"
                    value={data.contact.email}
                    onChange={(e) => handleNestedChange("contact", "email", e.target.value)}
                    placeholder="email@exemple.com"
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <Label className="dark:text-gray-300 mb-1.5 block">Téléphone</Label>
                  <Input
                    type="tel"
                    value={data.contact.phone}
                    onChange={(e) => handleNestedChange("contact", "phone", e.target.value)}
                    placeholder="+229 6 12 34 56 78"
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="dark:text-gray-300 mb-1.5 block">Adresse</Label>
                <Input
                  value={data.contact.address}
                  onChange={(e) => handleNestedChange("contact", "address", e.target.value)}
                  placeholder="Ex: 123 Rue de Cotonou, 45001 Cotonou"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>

              <div>
                <Label className="dark:text-gray-300 mb-1.5 block">Objectif professionnel</Label>
                <textarea
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none"
                  value={data.about}
                  onChange={(e) => handleChange("about", e.target.value)}
                  placeholder="Décrivez vos ambitions et ce que vous recherchez..."
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {data.about.length} caractères
                </p>
              </div>

              {/* <div>
                <Label className="dark:text-gray-300 mb-1.5 block">A Propos</Label>
                <textarea
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none"
                  value={data.objective || ""}
                  onChange={(e) => handleChange("objective", e.target.value)}
                  placeholder="Présentez-vous en quelques lignes..."
                />
              </div> */}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* EXPERIENCES */}
        <AccordionItem value="experiences" className="border rounded-xl px-4 bg-white/60 dark:bg-black/60 dark:border-gray-800 shadow-sm backdrop-blur-sm">
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">
            Expériences Professionnelles
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {data.experiences.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p className="mb-2">Aucune expérience ajoutée</p>
                <p className="text-sm">Cliquez sur "Ajouter une expérience" ci-dessous</p>
              </div>
            ) : (
              data.experiences.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-purple-200 dark:border-purple-900 space-y-3 pb-4 bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                  <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center shadow-md">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                      Expérience #{i + 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("experiences", i)}
                      className="text-destructive hover:bg-destructive/10 h-7 w-7"
                      title="Supprimer cette expérience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs mb-1 block">Poste / Rôle *</Label>
                      <Input
                        placeholder="Ex: Développeur Web"
                        value={exp.role}
                        onChange={(e) => updateItem("experiences", i, "role", e.target.value)}
                        className="font-semibold dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-xs mb-1 block">Entreprise *</Label>
                      <Input
                        placeholder="Ex: Tech Company"
                        value={exp.company}
                        onChange={(e) => updateItem("experiences", i, "company", e.target.value)}
                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`exp-current-${i}`}
                        checked={exp.isCurrent}
                        onChange={(e) => updateItem("experiences", i, "isCurrent", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <Label htmlFor={`exp-current-${i}`} className="text-sm cursor-pointer">Toujours en cours (Présent)</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs mb-1 block">Date de début</Label>
                        <Input
                          type="month"
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          value={exp.startDate}
                          onChange={(e) => updateItem("experiences", i, "startDate", e.target.value)}
                        />
                      </div>
                      {!exp.isCurrent && (
                        <div>
                          <Label className="text-xs mb-1 block">Date de fin</Label>
                          <Input
                            type="month"
                            className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            value={exp.endDate}
                            onChange={(e) => updateItem("experiences", i, "endDate", e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs mb-1 block">Description</Label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none"
                      value={exp.description || ""}
                      onChange={(e) => updateItem("experiences", i, "description", e.target.value)}
                      placeholder="Décrivez vos missions, réalisations et compétences développées..."
                    />
                  </div>
                </div>
              ))
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem("experiences", { role: "", company: "", startDate: "", endDate: "", isCurrent: false, description: "" })}
              className="w-full border-dashed border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-400"
            >
              <Plus className="w-4 h-4 mr-2" /> Ajouter une expérience
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* EDUCATION */}
        <AccordionItem value="education" className="border rounded-xl px-4 bg-white/60 dark:bg-black/60 dark:border-gray-800 shadow-sm backdrop-blur-sm">
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">
            Formations & Études
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {(data.education || []).length === 0 ? (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <p>Aucune formation ajoutée</p>
              </div>
            ) : (
              (data.education || []).map((edu, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-purple-200 dark:border-purple-900 space-y-3 pb-4 bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                  <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center shadow-md">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Formation #{i + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeItem("education", i)} className="text-destructive hover:bg-destructive/10 h-7 w-7"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs mb-1 block">Diplôme / Info</Label>
                      <Input placeholder="Ex: Master Informatique" value={edu.degree} onChange={(e) => updateItem("education", i, "degree", e.target.value)} className="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                    </div>
                    <div>
                      <Label className="text-xs mb-1 block">École / Établissement</Label>
                      <Input placeholder="Ex: Université d'Abomey Calavi" value={edu.school} onChange={(e) => updateItem("education", i, "school", e.target.value)} className="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`edu-current-${i}`}
                        checked={edu.isCurrent}
                        onChange={(e) => updateItem("education", i, "isCurrent", e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <Label htmlFor={`edu-current-${i}`} className="text-sm cursor-pointer">Toujours en cours (Présent)</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs mb-1 block">Date de début</Label>
                        <Input
                          type="month"
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          value={edu.startDate}
                          onChange={(e) => updateItem("education", i, "startDate", e.target.value)}
                        />
                      </div>
                      {!edu.isCurrent && (
                        <div>
                          <Label className="text-xs mb-1 block">Date de fin</Label>
                          <Input
                            type="month"
                            className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            value={edu.endDate}
                            onChange={(e) => updateItem("education", i, "endDate", e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            <Button variant="outline" size="sm" onClick={() => addItem("education", { degree: "", school: "", startDate: "", endDate: "", isCurrent: false })} className="w-full border-dashed border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20"><Plus className="w-4 h-4 mr-2" /> Ajouter une formation</Button>
          </AccordionContent>
        </AccordionItem>


        {/* COMPETENCES */}
        <AccordionItem value="skills" className="border rounded-xl px-4 bg-white/60 dark:bg-black/60 dark:border-gray-800 shadow-sm backdrop-blur-sm">
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">
            Compétences
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-3">
              {data.skills.map((skill, i) => (
                <div key={i} className="flex gap-2 items-center bg-gray-50 dark:bg-gray-900/30 p-3 rounded-lg">
                  <Input
                    className="flex-grow dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="Ex: JavaScript"
                    value={skill.name}
                    onChange={(e) => updateItem("skills", i, "name", e.target.value)}
                  />
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      className="w-20 dark:bg-gray-800 dark:border-gray-700 dark:text-white text-center font-semibold"
                      placeholder="%"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => updateItem("skills", i, "level", Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                    />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem("skills", i)}
                    className="text-destructive hover:bg-destructive/10 shrink-0"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem("skills", { name: "", level: 70 })}
              className="w-full border-dashed border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <Plus className="w-4 h-4 mr-2" /> Ajouter une compétence
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* OUTILS */}
        <AccordionItem
          value="tools"
          className="border rounded-xl px-4 bg-white/60 dark:bg-black/60 dark:border-gray-800 shadow-sm backdrop-blur-sm"
        >
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">
            Outils & Logiciels
          </AccordionTrigger>

          <AccordionContent className="space-y-4 pt-2">

            {/* Liste des outils ajoutés */}
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-6">
              {(data.tools || []).map((tool, i) => (
                <div
                  key={i}
                  className="group relative flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 rounded-xl hover:shadow-md transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50/50 dark:hover:bg-purple-900/10 w-12 h-12"
                  title={tool.label}
                >
                  <img
                    src={tool.source === 'custom' && tool.imageUrl ? tool.imageUrl : `https://cdn.simpleicons.org/${tool.id}`}
                    alt={tool.label}
                    className="w-6 h-6 object-contain dark:invert transition-transform hover:scale-110"
                    loading="lazy"
                  />
                  <button
                    onClick={() => removeItem("tools", i)}
                    className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-200 z-10"
                    title="Supprimer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Zone d'ajout (Autocomplete ou Custom) */}
            <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium dark:text-gray-300">Ajouter un outil</Label>
                {!showCustomTool ? (
                  <Button variant="ghost" size="sm" onClick={() => setShowCustomTool(true)} className="text-xs text-purple-600 hover:text-purple-700 h-auto py-1 px-2">
                    + Autre (Custom)
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => setShowCustomTool(false)} className="text-xs text-gray-500 hover:text-gray-700 h-auto py-1 px-2">
                    Retour liste
                  </Button>
                )}
              </div>

              {showCustomTool ? (
                <div className="flex gap-2">
                  <Input
                    value={customToolName}
                    onChange={(e) => setCustomToolName(e.target.value)}
                    placeholder="Nom de l'outil (ex: Photoshop)"
                    className="dark:bg-gray-800 dark:border-gray-700"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && customToolName.trim()) {
                        addItem("tools", {
                          id: `custom-${Date.now()}`,
                          label: customToolName,
                          source: 'custom',
                          imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(customToolName)}&background=random&color=fff&size=128`
                        });
                        setCustomToolName("");
                        setShowCustomTool(false);
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (customToolName.trim()) {
                        addItem("tools", {
                          id: `custom-${Date.now()}`,
                          label: customToolName,
                          source: 'custom',
                          imageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(customToolName)}&background=random&color=fff&size=128`
                        });
                        setCustomToolName("");
                        setShowCustomTool(false);
                      }
                    }}
                    disabled={!customToolName.trim()}
                    size="icon"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="relative pb-2">
                  <ToolAutocomplete
                    onSelect={(tool) =>
                      addItem("tools", {
                        id: tool.id,
                        label: tool.label,
                        source: 'simpleicons'
                      })
                    }
                  />
                </div>
              )}
              <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center">
                {showCustomTool ? "Saisissez le nom pour générer une icône." : "Recherchez parmi +3000 icônes dev & design."}
              </p>
            </div>

          </AccordionContent>
        </AccordionItem>

        {/* RESSOURCES (Liens) */}
        <AccordionItem value="links" className="border rounded-xl px-4 bg-white/60 dark:bg-black/60 dark:border-gray-800 shadow-sm backdrop-blur-sm">
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">
            Ressources
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {(data.links || []).length === 0 ? (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400"><p>Aucun lien ajouté</p></div>
            ) : (
              (data.links || []).map((link, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-purple-200 dark:border-purple-900 space-y-3 pb-4 bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                  <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center shadow-md">
                    <LinkIcon className="w-2 h-2 text-white" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Lien #{i + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeItem("links", i)} className="text-destructive hover:bg-destructive/10 h-7 w-7">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Nom de la ressource (ex: Portfolio)"
                    value={link.name}
                    onChange={(e) => updateItem("links", i, "name", e.target.value)}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white mb-2 font-semibold"
                  />
                  <Input
                    placeholder="URL (ex: https://mon-portfolio.com)"
                    value={link.url}
                    onChange={(e) => updateItem("links", i, "url", e.target.value)}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
              ))
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem("links", { name: "", url: "" })}
              className="w-full border-dashed border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <Plus className="w-4 h-4 mr-2" /> Ajouter un lien
            </Button>
          </AccordionContent>
        </AccordionItem>


        {/* CERTIFICATS */}
        <AccordionItem value="certifications" className="border rounded-xl px-4 bg-white/60 dark:bg-black/60 dark:border-gray-800 shadow-sm backdrop-blur-sm">
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">
            Certificats & Diplômes
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {(data.certifications || []).length === 0 ? (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400"><p>Aucun certificat ajouté</p></div>
            ) : (
              (data.certifications || []).map((cert, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-purple-200 dark:border-purple-900 space-y-3 pb-4 bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                  <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center shadow-md"><div className="w-2 h-2 rounded-full bg-white" /></div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Certificat #{i + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeItem("certifications", i)} className="text-destructive hover:bg-destructive/10 h-7 w-7"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                  <Input placeholder="Nom du certificat" value={cert.name} onChange={(e) => updateItem("certifications", i, "name", e.target.value)} className="dark:bg-gray-800 dark:border-gray-700 dark:text-white mb-2 font-semibold" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Organisme" value={cert.issuer} onChange={(e) => updateItem("certifications", i, "issuer", e.target.value)} className="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                    <Input placeholder="Année" value={cert.year} onChange={(e) => updateItem("certifications", i, "year", e.target.value)} className="dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                  </div>
                </div>
              ))
            )}
            <Button variant="outline" size="sm" onClick={() => addItem("certifications", { name: "", issuer: "", year: "" })} className="w-full border-dashed border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20"><Plus className="w-4 h-4 mr-2" /> Ajouter un certificat</Button>
          </AccordionContent>
        </AccordionItem>

        {/* LANGUAGES */}
        <AccordionItem value="languages" className="border rounded-xl px-4 bg-white/60 dark:bg-black/60 dark:border-gray-800 shadow-sm backdrop-blur-sm">
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">
            Langues
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-2">
              {data.languages.map((lang, i) => (
                <div key={i} className="flex gap-2 bg-gray-50 dark:bg-gray-900/30 p-3 rounded-lg">
                  <Input
                    value={lang}
                    onChange={(e) => updateItem("languages", i, null, e.target.value)}
                    placeholder="Ex: Français (Natif) ou Anglais (C1)"
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
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem("languages", "")}
              className="w-full border-dashed border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <Plus className="w-4 h-4 mr-2" /> Ajouter une langue
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* HOBBIES */}
        <AccordionItem value="hobbies" className="border rounded-xl px-4 bg-white/60 dark:bg-black/60 dark:border-gray-800 shadow-sm backdrop-blur-sm">
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">
            Centres d'intérêt
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-2">
              {data.hobbies.map((hobby, i) => (
                <div key={i} className="flex gap-2 bg-gray-50 dark:bg-gray-900/30 p-3 rounded-lg">
                  <Input
                    value={hobby}
                    onChange={(e) => updateItem("hobbies", i, null, e.target.value)}
                    placeholder="Ex: Photographie, Sport, Lecture..."
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
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addItem("hobbies", "")}
              className="w-full border-dashed border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <Plus className="w-4 h-4 mr-2" /> Ajouter un centre d'intérêt
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* REFERENCES */}
        <AccordionItem value="references" className="border rounded-xl px-4 bg-white/60 dark:bg-black/60 dark:border-gray-800 shadow-sm backdrop-blur-sm">
          <AccordionTrigger className="hover:no-underline dark:text-gray-100">
            Références
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {data.references.map((ref, i) => (
              <div key={i} className="border-2 p-4 rounded-lg space-y-3 relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    Référence #{i + 1}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem("references", i)}
                    className="h-7 w-7 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <Input
                  placeholder="Nom du référent"
                  value={ref.name}
                  onChange={(e) => updateItem("references", i, "name", e.target.value)}
                  className="bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white font-semibold"
                />
                <Input
                  placeholder="Contact (Email ou Téléphone)"
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
              className="w-full border-dashed border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <Plus className="w-4 h-4 mr-2" /> Ajouter une référence
            </Button>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
}