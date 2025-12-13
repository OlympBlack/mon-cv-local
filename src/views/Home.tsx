import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";
import FAQ from "../components/ui/faq";
import HowItWorks from "../components/ui/HowItWorks";
import CreativeTools from "../components/ui/tools";


export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6">
        <HowItWorks />
        <CreativeTools />
        <FAQ />
      </div>
      <Footer />
    </div>
  )
}

