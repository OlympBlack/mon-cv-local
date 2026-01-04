import { FileText, Mail, Briefcase, Grid } from "lucide-react";
import cv_template from "../assets/images/cv_template.jpg";
import { motion, type Variants } from "framer-motion";

/* ===== Variants réutilisables ===== */
const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const listContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

export default function CreativeTools() {
  const tools = [
    {
      icon: FileText,
      title: "CV",
      description:
        "Générez facilement des CV professionnels et profitez d’une édition illimitée.",
    },
    {
      icon: Mail,
      title: "Lettre de motivation",
      description:
        "Créez des lettres de motivation convaincantes qui complètent votre CV.",
    },
    {
      icon: Briefcase,
      title: "Offres d'emploi",
      description:
        "Trouvez et postulez aux offres correspondant à vos compétences.",
    },
    {
      icon: Grid,
      title: "Candidatures",
      description:
        "Suivez et gérez toutes vos candidatures en un seul endroit.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-purple-50 dark:from-black dark:to-gray-900 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ===== Aperçu CV ===== */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-w-lg mx-auto">
              <div className="bg-purple-900 px-6 py-4 flex items-center justify-between">
                <h3 className="text-white text-xl font-semibold">
                  Curriculum vitæ
                </h3>
                <button className="w-8 h-8 bg-white/20 rounded flex items-center justify-center text-white">
                  ×
                </button>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-700">
                <div className="bg-white rounded-lg shadow-sm p-6 min-h-[500px] flex items-center justify-center">
                  <img
                    src={cv_template}
                    alt="Aperçu du CV"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ===== Texte + outils ===== */}
          <div>
            {/* Titre */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12"
            >
              <h4 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Nos Outils 100% Gratuits
              </h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Créez instantanément des CV et lettres de motivation professionnels sans aucun frais caché.
              </p>
            </motion.div>

            {/* Liste animée */}
            <motion.div
              variants={listContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {tools.map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <motion.div
                    key={index}
                    variants={listItem}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 rounded-lg p-3">
                        <IconComponent
                          className="w-6 h-6 text-purple-600"
                          strokeWidth={2}
                        />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {tool.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>



          </div>
        </div>
      </div>
    </section >
  );
}
