import type { CVData } from "@/types";
import { formatDateRange, getToolIconUrl } from "@/lib/utils";
import { PdfSafeWrapper } from "@/components/cv/PdfSafeWrapper";

interface CVTemplateProps {
    data: CVData;
}

export default function CVTemplate({ data }: CVTemplateProps) {
    return (
        <PdfSafeWrapper>
            <div className="w-[800px] min-h-[1100px] bg-white   shadow-lg flex font-sans text-gray-800 dark:text-gray-100">
                {/* MAIN CONTENT (Left) */}
                <main className="w-2/3 p-10">
                    <header className="mb-10">
                        <h1 className="text-4xl font-black text-gray-800 dark:text-gray-100 tracking-tighter uppercase mb-2">
                            <span style={{ color: data.color }}>{data.fullName.split(" ")[0]}</span>{" "}
                            {data.fullName.split(" ").slice(1).join(" ")}
                        </h1>
                        <p className="text-xl text-gray-400 font-light tracking-widest uppercase">
                            {data.title}
                        </p>
                    </header>

                    <Section title="Profil Personnel" color={data.color}>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{data.about}</p>
                        {data.objective && <p className="text-gray-500 dark:text-gray-400 leading-relaxed mt-2 italic">{data.objective}</p>}
                    </Section>

                    <Section title="Expérience" color={data.color}>
                        <div className="space-y-6">
                            {data.experiences.map((exp, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{exp.role}</h3>
                                    <div className="flex items-center gap-2 font-medium mb-1" style={{ color: data.color }}>
                                        <span>{exp.company}</span>
                                        <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                                        <span className="text-sm text-gray-400 dark:text-gray-500 font-normal">{formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</span>
                                    </div>
                                    {exp.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line mt-2">{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Section>

                    {data.education && data.education.length > 0 && (
                        <Section title="Formations" color={data.color}>
                            <div className="space-y-6">
                                {data.education.map((edu, i) => (
                                    <div key={i}>
                                        <h3 className="font-bold text-base text-gray-800 dark:text-gray-200">{edu.degree}</h3>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                            {edu.school}, {formatDateRange(edu.startDate, edu.endDate, edu.isCurrent)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    <Section title="Références" color={data.color}>
                        <div className="flex gap-8">
                            {data.references.map((ref, i) => (
                                <div key={i}>
                                    <p className="font-bold dark:text-gray-200">{ref.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{ref.contact}</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                </main>

                {/* SIDEBAR (Right) */}
                <aside className="w-1/3 bg-gray-900 text-white p-8">
                    <div className="flex justify-center mb-8">
                        <div className="w-40 h-40 rounded-full border-4 bg-gray-700 overflow-hidden flex items-center justify-center" style={{ borderColor: data.color }}>
                            {data.profileImage ? (
                                <img src={data.profileImage} alt={data.fullName} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-gray-400 font-bold uppercase tracking-widest">Photo</span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="font-bold tracking-widest text-sm mb-4 uppercase" style={{ color: data.color }}>
                                Contact
                            </h3>
                            <div className="space-y-3 text-sm text-gray-300">
                                <p>{data.contact.phone}</p>
                                <p>{data.contact.email}</p>
                                <p>{data.contact.address}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold tracking-widest text-sm mb-4 uppercase" style={{ color: data.color }}>
                                Compétences
                            </h3>
                            <div className="space-y-4">
                                {data.skills.map((skill, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>{skill.name}</span>
                                        </div>
                                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full"
                                                style={{ width: `${skill.level}%`, backgroundColor: data.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {data.tools && data.tools.length > 0 && (
                            <div>
                                <h3 className="font-bold tracking-widest text-sm mb-4 uppercase" style={{ color: data.color }}>
                                    Outils
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {data.tools.map((tool, i) => (
                                        <div key={i} className="bg-gray-800 p-2 rounded border border-gray-700 hover:border-gray-600 transition-colors" title={tool.label}>
                                            <img
                                                src={getToolIconUrl(tool)}
                                                alt={tool.label}
                                                // Moderne03 sidebar is dark (bg-gray-900), so we might want white icons depending on the icon color. 
                                                // Simple Icons are usually black or brand color. 
                                                // For dark bg, often white is preferred if brand color isn't sufficient contrast.
                                                // However, simpleicons 'default' is brand color.
                                                // Let's invert if we want white, or keep as is.
                                                // The previous text was white/gray.
                                                // Let's add class invert for dark mode if using black icons, but simpleicons CDN serves colored icons by default?
                                                // Actually CDN serves brand colors normally.
                                                // Let's try adding brightness filter or just keep as is.
                                                // User asked for "Professional rendering".
                                                className="w-5 h-5 object-contain filter hover:brightness-110"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Liens / Ressources */}
                        {data.links && data.links.length > 0 && (
                            <div>
                                <h3 className="font-bold tracking-widest text-sm mb-4 uppercase" style={{ color: data.color }}>
                                    Ressources
                                </h3>
                                <div className="space-y-3">
                                    {data.links.map((link, i) => (
                                        <div key={i}>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-gray-300 hover:text-white flex items-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                                                {link.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.certifications && data.certifications.length > 0 && (
                            <div>
                                <h3 className="font-bold tracking-widest text-sm mb-4 uppercase" style={{ color: data.color }}>
                                    Certificats
                                </h3>
                                <div className="space-y-3">
                                    {data.certifications.map((cert, i) => (
                                        <div key={i} className="text-sm text-gray-300">
                                            <p className="font-semibold text-white">{cert.name}</p>
                                            <p className="text-xs text-gray-500">{cert.issuer} - {cert.year}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <h3 className="font-bold tracking-widest text-sm mb-4 uppercase" style={{ color: data.color }}>
                                Langues
                            </h3>
                            <ul className="text-sm text-gray-300 space-y-1">
                                {data.languages.map((lang, i) => (
                                    <li key={i}>{lang}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold tracking-widest text-sm mb-4 uppercase" style={{ color: data.color }}>
                                Intérêts
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {data.hobbies.map((hobby, i) => (
                                    <span key={i} className="text-xs border border-gray-700 px-2 py-1 rounded">
                                        {hobby}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </div >
        </PdfSafeWrapper >
    );
}

function Section({ title, children, color }: { title: string; children: React.ReactNode; color: string }) {
    return (
        <section className="mb-10">
            <h2 className="font-bold text-gray-900 dark:text-white text-xl mb-4 relative inline-block">
                {title}
                <span className="absolute -bottom-1 left-0 w-1/3 h-1" style={{ backgroundColor: color }} />
            </h2>
            <div>{children}</div>
        </section>
    );
}
