import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface FAQProps {
  items: {
    question: string;
    answer: string;
  }[];
}

export default function FAQ({ items }: FAQProps) {
  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5"
          >
            <h2 className="text-3xl font-bold mb-2 leading-tight">Questions fréquentes</h2>

            <div className="p-6 rounded-xl bg-[#D5DBE5] dark:bg-gray-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-black dark:border-white flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Support par chat en direct</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Disponible 24/7. Aucun robot.</p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#D5DBE5] dark:bg-gray-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-black dark:border-white flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Centre d'aide</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Consultez nos tutoriels.</p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#D5DBE5] dark:bg-gray-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-black dark:border-white flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Réserver une démo</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Échange individuel avec un expert.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full space-y-2">
              {items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-300 dark:border-gray-700 last:border-none">
                  <AccordionTrigger className="text-gray-900 dark:text-white text-lg font-medium py-4 hover:no-underline hover:text-gray-600 dark:hover:text-gray-300">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
