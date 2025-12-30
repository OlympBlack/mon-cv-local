
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { motion, type Variants } from "framer-motion";
import member2 from "../assets/images/team-member-2.png";
import vision from "../assets/images/vision.jpg";
import { CheckCircle, Globe, Lightbulb } from "lucide-react";

export default function About() {
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <>
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                {/* Light */}
                <div className="absolute inset-0 -z-10 dark:hidden h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
                {/* Dark */}
                <div className="absolute inset-0 -z-10 hidden dark:block h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            </div>
            <div className=" relative min-h-screen  flex flex-col font-sans">
                <Navbar />

                <main className="flex-grow pt-24 pb-16">

                    {/* Introduction Section */}
                    <section className="max-w-4xl mx-auto px-6 mb-20 text-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                        >
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                                Démocratiser l'accès à l'emploi au <span className="text-purple-600">Bénin</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                MON CV LOCAL est une plateforme née d'une ambition simple : permettre à chaque talent béninois de se valoriser avec un CV professionnel, moderne et 100% gratuit.
                            </p>
                        </motion.div>
                    </section>

                    {/* Pourquoi cette plateforme ? */}
                    <section className=" dark:bg-gray-900 py-20 mb-20">
                        <div className="max-w-5xl mx-auto px-6">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="relative">
                                        {/* <div className="absolute -top-4 -left-4 w-24 h-16 bg-purple-100 rounded-full z-0"></div> */}
                                        <h2 className="relative z-10 text-3xl font-bold text-gray-900 dark:text-white mb-6">Pourquoi LOCAL ?</h2>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg leading-relaxed">
                                            Nous avons constaté une réalité frustrante : la majorité des outils de création de CV sont payants ou inadaptés aux réalités du marché béninois. Les formats ne correspondent pas toujours aux attentes des recruteurs locaux.
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                            Deux jeunes béninois passionnés par la tech ont décidé de changer la donne. Notre mission est de briser ces barrières technologiques et financières pour offrir à tous les jeunes diplômés, étudiants et professionnels une chance égale de briller.
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="grid gap-6"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={staggerContainer}
                                >
                                    {[
                                        { icon: CheckCircle, title: "100% Gratuit", desc: "Aucun frais caché, tout est accessible à tous." },
                                        { icon: Globe, title: "Adapté au Bénin", desc: "Des modèles conçus pour les recruteurs locaux." },
                                        { icon: Lightbulb, title: "Moderne & Simple", desc: "Une interface intuitive pour créer votre CV en quelques minutes." }
                                    ].map((item, index) => (
                                        <motion.div key={index} variants={fadeInUp} className="flex p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow">
                                            <div className="mr-4">
                                                <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                                                    <item.icon size={24} />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Notre Vision */}
                    <section className="max-w-5xl mx-auto px-6 mb-24 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className=" text-white rounded-3xl p-12 md:p-20 relative overflow-hidden bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${vision})`,
                            }}
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-indigo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

                            <div className="relative z-10 max-w-4xl mx-auto">
                                <h2 className="text-3xl md:text-4xl font-bold mb-8">Notre Vision</h2>
                                <p className="text-xl md:text-2xl font-light leading-relaxed opacity-90 drop-shadow-lg">
                                    "Nous rêvons d'un Bénin où la compétence est la seule barrière à l'emploi, pas la présentation du CV. LOCAL est notre contribution à l'inclusion numérique et à l'avenir professionnel de la jeunesse béninoise."
                                </p>
                            </div>
                        </motion.div>
                    </section>

                    {/* L'Equipe */}
                    <section className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl border-b-4 border-purple-500 inline-block pb-2 font-bold text-gray-900 dark:text-white mb-4">L'Équipe</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg">Les esprits derrière le projet</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                            {/* Membre 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className=" dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className="aspect-w-1 aspect-h-1 overflow-hidden h-96">
                                    <img
                                        src="https://media.licdn.com/dms/image/v2/D4E03AQG25PGS20-cgw/profile-displayphoto-crop_800_800/B4EZmBl.gnIkAI-/0/1758815842563?e=1768435200&v=beta&t=JgcFkdvlHKCFc2gW46WtciE7sVCR2HMvyiIktXUFlGw"
                                        alt="Romuld ZOUNGLA"
                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-8 text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Romuld ZOUNGLA</h3>
                                    <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">Co-fondateur & Tech Lead</span>
                                    <p className="text-gray-600 dark:text-gray-300 italic">
                                        "Passionné par le code et l'impact social. Je construis des outils pour simplifier la vie des gens."
                                    </p>
                                </div>
                            </motion.div>

                            {/* Membre 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className=" dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className="aspect-w-1 aspect-h-1 overflow-hidden h-96">
                                    <img
                                        src={member2}
                                        alt="Marc A."
                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-8 text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Jules-christ GBASSI</h3>
                                    <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">Co-fondateur & Product Manager</span>
                                    <p className="text-gray-600 dark:text-gray-300 italic">
                                        "Mon objectif est de créer des produits intuitifs qui répondent aux vrais besoins de notre communauté."
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                </main>

                <Footer />
            </div>
        </>
    );
}
