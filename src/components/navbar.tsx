import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/logo.jpg";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className=" w-full bg-white fixed top-0 left-0 z-50 shadow-md dark:bg-black dark:text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg dark:text-white">MON</h1>
          <img src={logo} alt="Logo" className="h-10 w-auto rounded-full" />
          <h1 className="font-bold text-lg dark:text-white">LOCAL</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium dark:text-gray-300">
          <Link to="/" className={location.pathname === "/" ? "text-purple-600 border-b-2 border-purple-600 pb-1" : "hover:text-gray-900 dark:hover:text-white"}>Accueil</Link>
          <Link to="/modeles" className="hover:text-gray-900 dark:hover:text-white">Modèles</Link>
          <Link to="/faq" className={location.pathname === "/faq" ? "text-purple-600 border-b-2 border-purple-600 pb-1" : "hover:text-gray-900 dark:hover:text-white"}>FAQ</Link>
          <Link to="/about" className={location.pathname === "/about" ? "text-purple-600 border-b-2 border-purple-600 pb-1" : "hover:text-gray-900 dark:hover:text-white"}>About</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          <InteractiveHoverButton>Connecter</InteractiveHoverButton>

          <InteractiveHoverButton>S'inscrire</InteractiveHoverButton>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Ouvrir le menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden px-6 pb-4 flex flex-col gap-4 text-gray-600 font-medium border-t border-gray-200 dark:text-gray-300 dark:border-gray-800">
          <Link to="/" className={location.pathname === "/" ? "text-purple-600 border-b-2 border-purple-600 pb-1" : "hover:text-gray-900 dark:hover:text-white"}>Accueil</Link>
          <Link to="modeles" className="hover:text-gray-900 dark:hover:text-white">Modèles</Link>
          <Link to="/faq" className={location.pathname === "/faq" ? "text-purple-600 border-b-2 border-purple-600 pb-1" : "hover:text-gray-900 dark:hover:text-white"}>FAQ</Link>
          <Link to="/about" className={location.pathname === "/about" ? "text-purple-600 border-b-2 border-purple-600 pb-1" : "hover:text-gray-900 dark:hover:text-white"}>About</Link>

          <div className="flex flex-col gap-2 mt-2">
            <InteractiveHoverButton>Connecter</InteractiveHoverButton>

            <InteractiveHoverButton>S'inscrire</InteractiveHoverButton>
          </div>
        </nav>
      )}
    </header>
  );
}
