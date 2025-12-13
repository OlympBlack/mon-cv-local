import { FileText, Mail, Briefcase, Grid } from "lucide-react";
import cv_template from "../../assets/images/cv_template.jpg";

export default function CreativeTools() {
  const tools = [
    {
      icon: FileText,
      title: "CV",
      description:
        "Générez facilement des CV professionnels et profitez d’une édition illimitée pour des mises à jour en continu.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Mail,
      title: "Lettre de motivation",
      description:
        "Créez des lettres de motivation convaincantes qui complètent parfaitement votre CV.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Briefcase,
      title: "Offres d'emploi",
      description:
        "Trouvez et postulez aux offres d’emploi correspondant à vos compétences et votre expérience.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Grid,
      title: "Candidatures",
      description:
        "Suivez et gérez toutes vos candidatures en un seul endroit.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-purple-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg mx-auto">
              <div className="from-indigo-900 bg-purple-900 px-6 py-4 flex items-center justify-between">
                <h3 className="text-white text-xl font-semibold">Curriculum vitæ</h3>
                <button className="w-8 h-8 bg-white/20 rounded flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  ×
                </button>
              </div>

              <div className="p-6 bg-gray-50">
                <div className="bg-white rounded-lg shadow-sm p-6 min-h-[500px] flex items-center justify-center">
                  <img
                    src={cv_template}
                    alt="Aperçu du CV"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-12">
              <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Essayez Nos Outils Créatifs
              </h4>
              <p className="text-lg text-gray-600 leading-relaxed">
                Créez instantanément des CV professionnels grâce à notre
                générateur de CV, parfaitement intégré avec vos outils
                préférés.
              </p>
            </div>

            <div className="space-y-6">
              {tools.map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`${tool.bgColor} rounded-lg p-3 flex-shrink-0`}
                      >
                        <IconComponent
                          className={`w-6 h-6 ${tool.iconColor}`}
                          strokeWidth={2}
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {tool.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
