import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FAQ from "../components/faq";
import HowItWorks from "../components/HowItWorks";
import CreativeTools from "../components/tools";

import modeles1 from "@/assets/images/cv_template.jpg";
import modeles2 from "@/assets/images/CV-Template-01.jpg";
import modeles3 from "@/assets/images/modeles-cv.png";
import { motion } from "framer-motion"


import "@/assets/css/home.css";
import { faqItems } from "@/data/faqs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ReactTyped } from "react-typed";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

export default function Home() {
  return (
    <>

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        {/* Light */}
        <div className="absolute inset-0 -z-10 dark:hidden h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
        {/* Dark */}
        <div className="absolute inset-0 hidden dark:block h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* -------hero----------- */}
        <div className="hero  text-white flex flex-col-reverse md:flex-row justify-center items-center  md:gap-0 px-5 md:px-0 pt-12 md:pt-32">
          <div className="w-full md:w-1/2 md:pr-12 text-center md:text-left  md:mt-5">
            <motion.h1
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-[55px] md:leading-16 font-bold"
            >
              <ReactTyped
                strings={["Faites bonne impression avec votre CV 100% Gratuit"]}
                typeSpeed={50}
                backSpeed={30}
                loop={true}
                showCursor={true}
                cursorChar="|"
                className="inline-block"
              />
            </motion.h1>


            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }} className="">
              <p className="mt-5 text-lg md:text-xl">Créez et téléchargez instantanément votre CV professionnel grâce à notre outil de création rapide, facile et entièrement gratuit.</p>

              <Link to="/modeles">
                <InteractiveHoverButton className="bg-white text-black">CRÉER MON CV</InteractiveHoverButton>
              </Link>

              <InteractiveHoverButton className="bg-black text-white border border-white ml-4">En savoir plus</InteractiveHoverButton>

              {/* les avatars */}
              <div className="flex flex-row flex-wrap items-center gap-12 mt-5">
                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                  <Avatar>
                    <AvatarImage src="data:image/jpeg;base64,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" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage
                      src="data:image/jpeg;base64,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"
                      alt="@maxleiter"
                    />
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage
                      src="data:image/jpeg;base64,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"
                      alt="@evilrabbit"
                    />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                </div>
                <h1>2M+ UTILISATEURS SATISFAITS</h1>
              </div>
            </motion.div>

          </div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }} className="relative w-[300px] h-[400px] flex items-center justify-center rounded-xl shadow-2xl will-change-transform hidden lg:block">
            <img
              src={modeles1}
              alt="image-hero"
              className="absolute h-100 rounded-xl shadow-2xl animate-zigzag-front"
            />
            <img
              src={modeles2}
              alt="image-hero"
              className="absolute h-100  rounded-xl shadow-2xl animate-zigzag-back"
            />
          </motion.div>



        </div>

        <div className=" dark:bg-black  max-w-6xl mx-auto px-6">

          <HowItWorks />
          <CreativeTools />
          {/* <Testimonials /> */}
          <FAQ items={faqItems} />

          <div className="bg-purple-900 text-white md:flex rounded-xl mb-15 mx-auto flex justify-center items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: false }} className="ml-7  mt-5 lg:w-1/2 m-5 text-center">
              <h1 className="text-4xl font-bold">Faites bonne impression avec votre CV</h1>
              <p className="mt-5">Créez et téléchargez instantanément votre CV professionnel grâce à notre outil 100% gratuit.</p>

              <Link to="/modeles">
                <button className="px-5 py-2 bg-white text-purple-900 rounded-full mt-5 hover:bg-black hover:text-white border border-white">CRÉER MON CV GRATUIT</button>
              </Link>

            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: false }} className=" justify-items-center hidden lg:block">
              <img src={modeles3} alt="" className="h-70" />
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

