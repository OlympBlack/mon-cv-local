import { useEffect, useState } from 'react';

export default function ResumeHero() {
  const [swap, setSwap] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSwap(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center px-6 py-10 arond-full">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        
        {/* Contenu texte */}
        <div className="text-white space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Faites bonne impression avec votre CV
          </h1>
          <p className="text-lg md:text-xl text-purple-100">
            Créez facilement et téléchargez instantanément votre CV professionnel
            avec notre outil simple et rapide
          </p>
          <button className="bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors shadow-lg">
            CRÉER MON CV
          </button>
        </div>

        {/* Images de CV avec animation */}
        <div className="relative h-96 md:h-[500px]">
          {/* CV Template 1 - Style Moderne */}
          <div 
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              swap 
                ? 'translate-x-12 translate-y-8 rotate-6 z-10' 
                : '-translate-x-4 -translate-y-4 -rotate-3 z-20'
            }`}
          >
            <div className="bg-white rounded-lg shadow-2xl h-full overflow-hidden">
              {/* Header avec barre colorée */}
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 h-3"></div>
              
              <div className="p-6 space-y-4 text-xs">
                {/* Nom et titre */}
                <div className="text-center border-b pb-3">
                  <h2 className="text-xl font-bold text-gray-800">Sophie Martin</h2>
                  <p className="text-sm text-teal-600 font-semibold">Développeuse Full Stack</p>
                  <p className="text-gray-600 text-xs mt-1">📧 sophie.martin@email.fr | 📱 +33 6 12 34 56 78</p>
                </div>

                {/* Profil */}
                <div>
                  <h3 className="text-sm font-bold text-teal-600 mb-1">PROFIL</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Développeuse passionnée avec 5 ans d'expérience en React et Node.js. 
                    Spécialisée dans la création d'applications web performantes.
                  </p>
                </div>

                {/* Expérience */}
                <div>
                  <h3 className="text-sm font-bold text-teal-600 mb-2">EXPÉRIENCE</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold text-gray-800">Lead Developer</p>
                      <p className="text-gray-600">TechCorp • 2021 - Présent</p>
                      <p className="text-gray-600 text-xs">• Gestion d'équipe de 5 développeurs</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Développeuse Frontend</p>
                      <p className="text-gray-600">StartupXYZ • 2019 - 2021</p>
                    </div>
                  </div>
                </div>

                {/* Compétences */}
                <div>
                  <h3 className="text-sm font-bold text-teal-600 mb-2">COMPÉTENCES</h3>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs">Node.js</span>
                    <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs">TypeScript</span>
                    <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs">MongoDB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CV Template 2 - Style Professionnel */}
          <div 
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              swap 
                ? '-translate-x-4 -translate-y-4 -rotate-3 z-20' 
                : 'translate-x-12 translate-y-8 rotate-6 z-10'
            }`}
          >
            <div className="bg-white rounded-lg shadow-2xl h-full overflow-hidden flex">
              {/* Sidebar gauche */}
              <div className="w-1/3 bg-gradient-to-b from-indigo-600 to-purple-700 p-4 text-white text-xs">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <h3 className="font-bold">Marc Dubois</h3>
                  <p className="text-xs opacity-90">Designer UI/UX</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold mb-1 text-xs">CONTACT</h4>
                    <p className="text-xs opacity-90">Paris, France</p>
                    <p className="text-xs opacity-90">06 98 76 54 32</p>
                  </div>

                  <div>
                    <h4 className="font-bold mb-1 text-xs">LANGUES</h4>
                    <p className="text-xs">Français (Natif)</p>
                    <p className="text-xs">Anglais (C1)</p>
                  </div>

                  <div>
                    <h4 className="font-bold mb-1 text-xs">OUTILS</h4>
                    <p className="text-xs">• Figma</p>
                    <p className="text-xs">• Adobe XD</p>
                    <p className="text-xs">• Sketch</p>
                  </div>
                </div>
              </div>

              {/* Contenu principal */}
              <div className="w-2/3 p-4 space-y-3 text-xs">
                <div>
                  <h3 className="text-sm font-bold text-indigo-700 border-b border-indigo-200 pb-1 mb-2">
                    EXPÉRIENCE PROFESSIONNELLE
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="font-bold text-gray-800">Senior UX Designer</p>
                      <p className="text-gray-600 text-xs">DesignStudio • 2020 - 2024</p>
                      <p className="text-gray-600 text-xs">Conception d'interfaces pour applications mobiles et web</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">UI Designer</p>
                      <p className="text-gray-600 text-xs">Agence Créative • 2018 - 2020</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-indigo-700 border-b border-indigo-200 pb-1 mb-2">
                    FORMATION
                  </h3>
                  <div>
                    <p className="font-bold text-gray-800">Master Design Numérique</p>
                    <p className="text-gray-600 text-xs">École des Beaux-Arts • 2018</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-indigo-700 border-b border-indigo-200 pb-1 mb-2">
                    PROJETS
                  </h3>
                  <p className="text-gray-700 text-xs">
                    Refonte complète de l'application BankApp (500K utilisateurs)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}