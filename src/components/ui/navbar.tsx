import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/images/logo.jpg";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className=" w-full bg-white fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <h1 className="font-bold text-lg">LOCAL</h1>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <Link to="/" className={location.pathname === "/" ? "text-purple-600 border-b-2 border-purple-600 pb-1" : "hover:text-gray-900"}>Accueil</Link>
          <Link to="#" className="hover:text-gray-900">Modèles</Link>
          <Link to="/faq" className={location.pathname === "/faq" ? "text-purple-600 border-b-2 border-purple-600 pb-1" : "hover:text-gray-900"}>FAQ</Link>
          <Link to="#" className="hover:text-gray-900">About</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-full hover:text-white hover:bg-black">
            Se connecter
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:text-white hover:bg-black">
            S’inscrire
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Ouvrir le menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden px-6 pb-4 flex flex-col gap-4 text-gray-600 font-medium border-t border-gray-200">
          <Link to="/" className={location.pathname === "/" ? "text-purple-600 border-b-2 border-purple-600 pb-1" : "hover:text-gray-900"}>Accueil</Link>
          <Link to="#" className="hover:text-gray-900">Modèles</Link>
          <Link to="/faq" className={location.pathname === "/faq" ? "text-purple-600 border-b-2 border-purple-600 pb-1" : "hover:text-gray-900"}>FAQ</Link>
          <Link to="#" className="hover:text-gray-900">About</Link>

          <div className="flex flex-col gap-2 mt-2">
            <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-full hover:text-white hover:bg-black">
              Se connecter
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:text-white hover:bg-black">
              S’inscrire
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
