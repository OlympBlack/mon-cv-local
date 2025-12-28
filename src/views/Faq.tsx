import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";
import FAQ from "../components/ui/faq";
// import Testimonials from "../components/ui/testimonials";
import modeles3 from "@/assets/images/modeles-cv.png";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import "@/assets/css/home.css";
export default function Home() {
  return (
    <div>
      <Navbar /> 

      <div className="max-w-6xl mx-auto px-6 mt-10">
        <FAQ />

        {/* input */}
            <h2 className="font-bold text-3xl">Posez ici une question</h2>
         <div className="flex w-full  items-center gap-2 mb-10">
            <Input type="text" placeholder="Votre question" className="outline-violet-500"/>
            <Button className="bg-violet-500 text-white rounded-full hover:bg-black hover:text-white" type="submit" variant="outline">Envoyer</Button>
        </div>

        <div className="bg-purple-900 text-white md:flex rounded-xl mb-15 mx-auto flex justify-center items-center">
          <motion.div initial={{opacity: 0, x: -50}} whileInView={{opacity: 1, x: 0}} transition={{duration: 1, ease:"easeOut"}} viewport={{once:false}} className="ml-7  mt-5 lg:w-1/2 m-5 text-center">
            <h1 className="text-4xl font-bold">Faites bonne impression avec votre CV</h1>
            <p className="mt-5">Créez et téléchargez instantanément votre CV professionnel grâce à notre outil de création rapide et facile.</p>

            <button className="px-5 py-2 bg-white text-purple-900 rounded-full mt-5 hover:bg-black hover:text-white border border-white">CREATE CV</button>
          </motion.div>

          <motion.div initial={{opacity: 0, x: 50}} whileInView={{opacity: 1, x: 0}} transition={{duration: 1, ease:"easeOut"}} viewport={{once: false}} className=" justify-items-center hidden lg:block">
            <img src={modeles3} alt=""  className="h-70"/>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

