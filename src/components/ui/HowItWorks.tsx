import { FileText, Layout, Download, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [

    {
      icon: Layout,
      title: "Sélectionnez un modèle",
      description: "Choisissez un modèle et personnalisez votre CV en fonction de votre style et de votre personnalité."
    },
    {
      icon: FileText,
      title: "Entrez vos détails",
      description: "Commencez par remplir les sections pertinentes qui constituent le contenu de votre CV."
    },
    {
      icon: Download,
      title: "Téléchargez votre CV",
      description: "Téléchargez votre CV rapidement et modifiez-le à tout moment."
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Obtenez le CV parfait en trois étapes simples. Entrez vos détails, sélectionnez un modèle et téléchargez !
          </p>
        </div>

        {/* Étapes */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                
                <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  
                  
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-purple-600" strokeWidth={2} />
                    </div>
                  </div>

                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="absolute -top-4 -right-4 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {index + 1}
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2 items-center">
                    <div className="flex items-center">
                      <div className="w-12 h-0.5 bg-gradient-to-r from-purple-300 to-purple-400"></div>
                      <ArrowRight className="w-6 h-6 text-purple-400 -ml-1" strokeWidth={2.5} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg">
            Commencer maintenant
          </button>
        </div>
      </div>
    </div>
  );
}