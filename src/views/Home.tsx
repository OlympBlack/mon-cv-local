import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";
import FAQ from "../components/ui/faq";


export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center py-20">
          {/* <h1 className="text-4xl font-bold mb-6">Contenu vide</h1> */}
          <p className="mb-4 text-gray-700">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, quidem. Mollitia recusandae, sunt facere sit voluptates amet. Illo iste mollitia non voluptate eligendi explicabo a ab tempore, iusto vero nostrum!</p>
          <p className="mb-4 text-gray-700">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, quidem. Mollitia recusandae, sunt facere sit voluptates amet. Illo iste mollitia non voluptate eligendi explicabo a ab tempore, iusto vero nostrum!</p>
          <p className="text-gray-700">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit, quidem. Mollitia recusandae, sunt facere sit voluptates amet. Illo iste mollitia non voluptate eligendi</p>
        </div>
        <FAQ />
      </div>
      <Footer />
    </div>
  )
}

