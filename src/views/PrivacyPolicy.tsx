
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
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
                        transition={{ duration: 1 }}
                        className="max-w-4xl mx-auto bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl border border-white/20"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-900 dark:text-white">Politique de Confidentialité</h1>

                        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
                            <p className="lead">
                                Chez MON CV LOCAL, nous accordons une importance capitale à la protection de vos données personnelles.
                                Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons les informations
                                que vous nous fournissez lors de la création de votre CV.
                            </p>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">1. Collecte des données</h2>
                                <p>
                                    Pour générer votre CV, nous collectons les informations que vous saisissez volontairement dans nos formulaires, notamment :
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Informations d'identité (Nom, Prénom, Photo)</li>
                                    <li>Coordonnées (Email, Téléphone, Adresse)</li>
                                    <li>Parcours professionnel et formation</li>
                                    <li>Compétences et langues parlées</li>
                                </ul>
                                <p>
                                    Ces données sont strictement nécessaires à la fourniture de notre service de création de CV.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">2. Utilisation des données</h2>
                                <p>
                                    Vos données sont utilisées exclusivement pour :
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Générer et mettre en forme vos documents (CV et lettres de motivation)</li>
                                    <li>Vous permettre de télécharger ou d'enregistrer vos créations</li>
                                    <li>Améliorer votre expérience utilisateur sur notre plateforme</li>
                                </ul>
                                <p>
                                    Nous ne vendons, ni ne louons, ni ne partageons vos données personnelles à des tiers à des fins commerciales.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">3. Stockage et Sécurité</h2>
                                <p>
                                    Vos données sont stockées de manière sécurisée. Nous mettons en œuvre des mesures techniques et organisationnelles
                                    appropriées pour protéger vos données contre tout accès non autorisé, altération, divulgation ou destruction.
                                </p>
                                <p>
                                    Si vous utilisez notre service sans compte, les données peuvent être stockées localement sur votre appareil
                                    via votre navigateur (LocalStorage).
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">4. Vos droits</h2>
                                <p>
                                    Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données.
                                    Vous pouvez exercer ces droits à tout moment en nous contactant ou via les paramètres de votre compte si vous en possédez un.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">5. Cookies</h2>
                                <p>
                                    Nous utilisons des cookies essentiels au fonctionnement du site (session, préférences).
                                    Nous n'utilisons pas de cookies publicitaires intrusifs.
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
