import { Github, Twitter, Instagram, Linkedin } from "lucide-react";
import logo from "../assets/images/logo.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="bg-[#1a0b3f] text-white py-10 rounded-lg m-2"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">

        <div className="flex flex-col gap-4 items-center">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-lg">MON</h1>
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <span className="font-bold text-lg">LOCAL</span>
          </div>
          <p className="text-gray-300 text-sm">
            Créez et téléchargez facilement votre CV professionnel grâce à notre outil rapide et simple.
          </p>
          <div className="flex gap-3 mt-2 justify-center">
            <a href="#" className="bg-purple-600 p-2 rounded-full text-white hover:bg-purple-700"><Github size={20} /></a>
            <a href="#" className="bg-purple-600 p-2 rounded-full text-white hover:bg-purple-700"><Twitter size={20} /></a>
            <a href="#" className="bg-purple-600 p-2 rounded-full text-white hover:bg-purple-700"><Instagram size={20} /></a>
            <a href="#" className="bg-purple-600 p-2 rounded-full text-white hover:bg-purple-700"><Linkedin size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Ressources</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white">Articles</a></li>
            <li><a href="#" className="hover:text-white">Exemples de CV</a></li>
            <li><a href="#" className="hover:text-white">Vérificateur de CV</a></li>
            <li><a href="#" className="hover:text-white">Format de CV</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Produit</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white">Modèles de CV</a></li>
            <li><a href="#" className="hover:text-white">Avis</a></li>
            <li><Link to="/about" className="hover:text-white">À propos</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><a href="#" className="hover:text-white">Contactez-nous</a></li>
            <li><a href="#" className="hover:text-white">Conditions d'utilisation</a></li>
            <li><a href="#" className="hover:text-white">Confidentialité</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 border-t border-gray-700 pt-4 text-gray-400 text-sm text-center">
        © {new Date().getFullYear()} MON CV LOCAL, Tous droits réservés
      </div>
    </motion.footer>
  );
}
