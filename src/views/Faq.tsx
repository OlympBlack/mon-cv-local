import { useState } from "react";
import { X } from "lucide-react"; 
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FAQ from "../components/faq";
import modeles3 from "@/assets/images/modeles-cv.png";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { faqItems } from "@/data/faqs";
import "@/assets/css/home.css";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = faqItems.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetSearch = () => setSearchQuery("");

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 -z-10 dark:hidden h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
        <div className="absolute inset-0 -z-10 hidden dark:block h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow max-w-6xl mx-auto px-6 mt-10 w-full">
          {/* Search Section */}
          <section className="mt-12 text-center">
            <motion.h2 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="font-bold text-3xl mb-6">
              Rechercher une question
            </motion.h2>

            <div className="flex w-full max-w-lg mx-auto items-center gap-3 relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 relative"
              >
                <Input
                  type="text"
                  placeholder="Rechercher une question..."
                  className="py-3 text-lg border-2 focus-visible:ring-black dark:focus-visible:ring-white h-auto rounded-full px-6 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Icon X pour reset */}
                {searchQuery && (
                  <button
                    onClick={resetSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Reset"
                  >
                    <X size={20} />
                  </button>
                )}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className=" rounded-full py-3 px-8 text-lg"
                type="button"
              >
                <InteractiveHoverButton>Rechercher</InteractiveHoverButton>
              </motion.button>
            </div>

            {filteredItems.length === 0 && (
              <p className="mt-4 text-gray-500">Aucun résultat trouvé pour "{searchQuery}"</p>
            )}
          </section>

          {/* FAQ List */}
          <FAQ items={filteredItems} />

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white md:flex rounded-2xl mb-20 mx-auto overflow-hidden shadow-xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="p-10 lg:w-1/2 flex flex-col justify-center items-start"
            >
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">Faites bonne impression avec votre CV</h1>
              <p className="mt-4 text-purple-100 text-lg">Créez et téléchargez instantanément votre CV professionnel grâce à notre outil de création rapide et facile.</p>

              <Button className="mt-8 bg-white text-purple-900 hover:bg-gray-100 border-none px-8 py-6 text-lg rounded-full font-bold shadow-lg transition-transform hover:scale-105">
                CRÉER MON CV
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="hidden lg:flex lg:w-1/2 justify-center items-end bg-purple-800/20"
            >
              <img src={modeles3} alt="Modèles de CV" className="max-h-80 object-contain drop-shadow-2xl translate-y-4" />
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
