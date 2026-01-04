import Moderne01 from "@/templates/moderne/Moderne01";
import Moderne02 from "@/templates/moderne/Moderne02";
import Moderne03 from "@/templates/moderne/Moderne03";
import Classique01 from "@/templates/classique/Classique01";
import Classique02 from "@/templates/classique/Classique02";
import Classique03 from "@/templates/classique/Classique03";
import Pro01 from "@/templates/pro/Pro01";
import Pro02 from "@/templates/pro/Pro02";
import Pro03 from "@/templates/pro/Pro03";

export const cvModels: Record<string, any> = {
  "1": { name: "Moderne 01", component: Moderne01, defaultColor: "#2563EB" }, // Blue
  "2": { name: "Moderne 02", component: Moderne02, defaultColor: "#16A34A" }, // Green
  "3": { name: "Moderne 03", component: Moderne03, defaultColor: "#D946EF" }, // Fuchsia
  "4": { name: "Classique 01", component: Classique01, defaultColor: "#0EA5E9" }, // Sky
  "5": { name: "Classique 02", component: Classique02, defaultColor: "#EAB308" }, // Yellow
  "6": { name: "Classique 03", component: Classique03, defaultColor: "#F97316" }, // Orange
  "7": { name: "Pro 01", component: Pro01, defaultColor: "#DC2626" }, // Red
  "8": { name: "Pro 02", component: Pro02, defaultColor: "#0D9488" }, // Teal
  "9": { name: "Pro 03", component: Pro03, defaultColor: "#7C3AED" }, // Violet
};
