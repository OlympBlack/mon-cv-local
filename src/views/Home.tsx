import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";
import FAQ from "../components/ui/faq";
import HowItWorks from "../components/ui/HowItWorks";
import CreativeTools from "../components/ui/tools";
import Testimonials from "../components/ui/testimonials";
import modeles from "@/assets/images/modeles-cv.png";
import "@/assets/css/home.css";

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* -------hero----------- */}
      <div className="hero text-white md:flex flex justify-center items-center mt-10">
          <div className="ml-7  mt-5 w-1/2">
            <h1 className="text-4xl font-bold">Faites bonne impression avec votre CV</h1>
            <p className="mt-5">Créez et téléchargez instantanément votre CV professionnel grâce à notre outil de création rapide et facile.</p>

            <button className="px-5 py-2 bg-white text-purple-900 rounded-full mt-5 hover:bg-black hover:text-white border border-white">CREATE CV</button>
            <button className="px-5 py-2 bg-black text-white rounded-full mt-5 hover:bg-white hover:text-purple-600 border border-white ml-5">LEARN MORE</button>

          </div>
          <div className=" justify-items-center">
            <img src={modeles} alt="image-hero"  className="h-90"/>
          </div>
        </div>

      <div className="max-w-6xl mx-auto px-6">
        <HowItWorks />
        <CreativeTools />
        <Testimonials />
        <FAQ />
        <div className="bg-purple-900 text-white md:flex rounded-xl mb-15 mx-auto flex justify-center items-center">
          <div className="ml-7  mt-5 w-1/2">
            <h1 className="text-4xl font-bold">Faites bonne impression avec votre CV</h1>
            <p className="mt-5">Créez et téléchargez instantanément votre CV professionnel grâce à notre outil de création rapide et facile.</p>

            <button className="px-5 py-2 bg-white text-purple-900 rounded-full mt-5 hover:bg-black hover:text-white border border-white">CREATE CV</button>
          </div>
          <div className=" justify-items-center">
            <img src={modeles} alt=""  className="h-70"/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

