import { FileText, Layout, Download, ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Link } from "react-router-dom";



const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.5
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function HowItWorks() {
  const steps = [

    {
      icon: Layout,
      title: "Sélectionnez un modèle",
      description:
        "Choisissez un modèle et personnalisez votre CV en fonction de votre style et de votre personnalité."
    },
    {
      icon: FileText,
      title: "Entrez vos détails",
      description:
        "Commencez par remplir les sections pertinentes qui constituent le contenu de votre CV."
    },
    {
      icon: Download,
      title: "Téléchargez votre CV",
      description:
        "Téléchargez votre CV rapidement et modifiez-le à tout moment."
    }
  ];

  return (
    <div className="py-16 ">
      <div className="">

        {/* TITRE */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
        >
          <motion.h2
            variants={item}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Comment ça marche ?
          </motion.h2>

          <motion.p
            variants={item}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Obtenez le CV parfait en trois étapes simples. Entrez vos détails,
            sélectionnez un modèle et téléchargez !
          </motion.p>
        </motion.div>

        {/* STEPS */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 md:gap-16 relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;

            return (
              <motion.div
                key={index}
                variants={item}
                className="relative hover:border hover:border-purple-600 hover:rounded-xl"
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-purple-600" strokeWidth={2} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="absolute -top-4 -right-4 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {index + 1}
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-10 transform -translate-y-1/2 z-0">
                    <ArrowRight className="w-8 h-8 text-purple-300" strokeWidth={2} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* BUTTON */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          
          <Link to="/modeles">
            <InteractiveHoverButton> Créer mon CV gratuit</InteractiveHoverButton>
          </Link>
          
        </motion.div>

        {/* VIDEO */}
        <motion.div
          className="mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/2LOACxh43ko"
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>

      </div>
    </div >
  );
}
