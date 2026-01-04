import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import ProfilTestimonial from "../../assets/images/testimonial.jpg";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const testimonials: Testimonial[] = [
    {
      name: "Arie Hylkema",
      role: "Product Manager, Qnet",
      image: ProfilTestimonial,
      text: "Simple to use. The user interface is really nice. I didn't feel burdened by the formats offered. The end product looks great.",
      rating: 5,
    },
    {
      name: "Mark",
      role: "Product Manager, Qnet",
      image: ProfilTestimonial,
      text: "Great site for quickly building a good looking resume. I've been using it for years and I've gotten 3 jobs over the last 7 years or so using resumes generated here.",
      rating: 5,
    },
    {
      name: "Sophie Martin",
      role: "Développeuse Full Stack",
      image: ProfilTestimonial,
      text: "Interface intuitive et résultats professionnels. J'ai créé mon CV en moins de 30 minutes et j'ai reçu plusieurs entretiens.",
      rating: 5,
    },
    {
      name: "Jean Dupont",
      role: "Designer UI/UX",
      image: ProfilTestimonial,
      text: "Les templates sont modernes et élégants. J'ai pu personnaliser chaque détail pour refléter ma personnalité.",
      rating: 5,
    },
  ];

  // 📱 Gestion responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // tablette
      } else {
        setItemsPerPage(3); // desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="bg-gray-50 dark:bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ils ont réussi gratuitement avec MON CV LOCAL
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
              Découvrez les témoignages de professionnels qui ont boosté leur
              carrière grâce à notre générateur de CV.
            </p>
          </div>

          {/* Boutons (en bas sur mobile) */}
          <div className="flex gap-3 self-start md:self-auto">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 flex items-center justify-center transition-all ${currentIndex === 0
                ? "border-gray-300 text-gray-300 dark:border-gray-700 dark:text-gray-700"
                : "border-gray-300 text-gray-600 hover:border-purple-600 hover:text-purple-600 dark:border-gray-600 dark:text-gray-400 dark:hover:border-purple-400 dark:hover:text-purple-400"
                }`}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-all ${currentIndex >= maxIndex
                ? "bg-purple-300 text-white"
                : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)
                }%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`flex-shrink-0 px-3 ${itemsPerPage === 1
                  ? "w-full"
                  : itemsPerPage === 2
                    ? "w-1/2"
                    : "w-1/3"
                  }`}
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-sm h-full">
                  <div className="text-5xl text-gray-200 dark:text-gray-800 font-serif mb-4">"</div>

                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base mb-4">
                    {testimonial.text}
                  </p>

                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${index === currentIndex
                ? "w-6 bg-purple-600"
                : "w-2 bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </div >
  );
}
