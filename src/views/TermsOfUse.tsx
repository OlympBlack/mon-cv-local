
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";

export default function TermsOfUse() {
    return (
        <>
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 -z-10 dark:hidden h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
                <div className="absolute inset-0 hidden dark:block h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            </div>

            <div className="relative z-10 min-h-screen flex flex-col">
                <Navbar />

                <main className="flex-grow container mx-auto px-6 pt-32 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl border border-white/20"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-900 dark:text-white">Conditions d'Utilisation</h1>

                        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
                            <p className="lead">
                                Bienvenue sur MON CV LOCAL. En utilisant notre service de création de CV, vous acceptez les présentes conditions d'utilisation.
                                Veuillez les lire attentivement.
                            </p>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">1. Description du Service</h2>
                                <p>
                                    MON CV LOCAL fournit un outil en ligne permettant aux utilisateurs de créer, éditer et télécharger des CV et lettres de motivation
                                    à partir de modèles prédéfinis. Le service est fourni "tel quel" et nous nous efforçons d'assurer sa disponibilité permanente.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">2. Responsabilité de l'Utilisateur</h2>
                                <p>
                                    Vous êtes seul responsable du contenu que vous saisissez dans votre CV. Vous vous engagez à :
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Fournir des informations exactes et véridiques</li>
                                    <li>Ne pas utiliser le service pour créer de faux documents ou usurper l'identité d'autrui</li>
                                    <li>Ne pas saisir de contenus illicites, offensants ou discriminatoires</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">3. Propriété Intellectuelle</h2>
                                <p>
                                    Les modèles de CV, le design du site, les logos et le code source de MON CV LOCAL sont notre propriété exclusive.
                                </p>
                                <p>
                                    Cependant, <strong>vous restez propriétaire des données et du contenu de votre CV</strong>. Une fois généré et téléchargé,
                                    vous êtes libre d'utiliser votre CV pour vos candidatures sans restriction.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">4. Limitation de Responsabilité</h2>
                                <p>
                                    MON CV LOCAL ne peut être tenu responsable :
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Des conséquences liées à l'utilisation d'un CV créé sur notre plateforme lors d'un processus de recrutement</li>
                                    <li>De la perte accidentelle de données (nous vous encourageons à télécharger régulièrement vos documents)</li>
                                    <li>D'une interruption temporaire du service pour maintenance</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">5. Modifications</h2>
                                <p>
                                    Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prennent effet dès leur publication sur cette page.
                                </p>
                            </section>

                            <p className="text-sm pt-4 border-t border-gray-200 dark:border-gray-700 mt-8">
                                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    </motion.div>
                </main>

                <Footer />
            </div>
        </>
    );
}
