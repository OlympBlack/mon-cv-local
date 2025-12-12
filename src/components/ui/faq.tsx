import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Accordion = ({ children, type, className }: any) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className={className}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          isOpen: openItem === child.props.value,
          onToggle: () => setOpenItem(openItem === child.props.value ? null : child.props.value)
        })
      )}
    </div>
  );
};

const AccordionItem = ({ value, children, isOpen, onToggle }: any) => {
  return (
    <div data-value={value} className="border-b border-gray-300">
      {React.Children.map(children, child =>
        React.cloneElement(child, { isOpen, onToggle })
      )}
    </div>
  );
};

const AccordionTrigger = ({ children, className, isOpen, onToggle }: any) => {
  return (
    <button 
      className={`flex items-center justify-between py-6 font-normal text-xl w-full text-left ${className || ''}`}
      type="button"
      onClick={onToggle}
    >
      {children}
      <ChevronDown 
        className={`h-5 w-5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
  );
};

const AccordionContent = ({ children, className, isOpen }: any) => {
  return (
    <div 
      className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <div className={`pb-6 pt-0 ${className || ''}`}>{children}</div>
    </div>
  );
};

export default function FAQ() {
  return (
    <section className="w-full py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Questions<br />fréquentes
            </h2>

            <div className="p-8 rounded-2xl bg-[#D5DBE5] flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">Support par chat en direct</h3>
                <p className="text-gray-700 text-base">Disponible 24/7. Aucun robot.</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#D5DBE5] flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">Centre d'aide</h3>
                <p className="text-gray-700 text-base">Consultez nos tutoriels.</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#D5DBE5] flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">Réserver une démo</h3>
                <p className="text-gray-700 text-base">Échange individuel avec un expert.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Accordion */}
          <div className="flex flex-col justify-start pt-20 mt-20">
            <Accordion type="single" collapsible className="w-full">

              <AccordionItem value="item-1">
                <AccordionTrigger className="text-gray-900">
                  Comment créer mon CV professionnel ?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-base leading-relaxed">
                  Une fois inscrit, vous accédez à notre générateur de CV intuitif. Choisissez parmi nos modèles professionnels, remplissez vos informations et notre IA vous aide à optimiser votre contenu pour maximiser vos chances.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-gray-900">
                  Les modèles de CV sont-ils gratuits ?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-base leading-relaxed">
                  Oui, nous proposons plusieurs modèles gratuits de qualité professionnelle. Des modèles premium avec des fonctionnalités avancées sont également disponibles.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-gray-900">
                  Puis-je télécharger mon CV en PDF ?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-base leading-relaxed">
                  Absolument ! Vous pouvez télécharger votre CV en format PDF haute qualité, prêt à être envoyé aux recruteurs ou imprimé.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-gray-900">
                  L'IA peut-elle m'aider à améliorer mon contenu ?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-base leading-relaxed">
                  Oui, notre assistant IA analyse votre CV et vous propose des suggestions personnalisées pour améliorer vos descriptions, mettre en valeur vos compétences et adapter votre CV au poste visé.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-gray-900">
                  Puis-je créer plusieurs versions de mon CV ?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-base leading-relaxed">
                  Bien sûr ! Vous pouvez créer et sauvegarder plusieurs versions de votre CV pour les adapter à différents postes ou secteurs d'activité.
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}