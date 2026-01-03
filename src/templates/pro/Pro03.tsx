import type { CVData } from "@/types";
import { formatDateRange } from "@/lib/utils";

interface CVTemplateProps {
    data: CVData;
}

export default function CVTemplate({ data }: CVTemplateProps) {
    return (
        <div className="w-[800px] min-h-[1100px] bg-white dark:bg-slate-900 shadow-lg font-sans text-gray-800 dark:text-gray-100 flex flex-col">

            {/* HEADER */}
            <div className="text-white p-12" style={{ backgroundColor: data.color }}>
                <div className="flex justify-between items-start gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-36 h-36 bg-white/10 rounded-full flex items-center justify-center p-1 backdrop-blur-sm">
                            <div className="w-full h-full rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                                {data.profileImage ? (
                                    <img src={data.profileImage} alt={data.fullName} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white/40 font-bold text-sm">PHOTO</span>
                                )}
                            </div>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{data.fullName}</h1>
                            <p className="text-xl text-gray-300 font-light">{data.title}</p>
                        </div>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                        <p>{data.contact.address}</p>
                        <p>{data.contact.phone}</p>
                        <p>{data.contact.email}</p>
                    </div>
                </div>
            </div>

            {/* CONTENT GRID */}
            <div className="flex-grow p-12 grid grid-cols-3 gap-12 bg-gray-50 dark:bg-slate-900">

                {/* Main Column */}
                <div className="col-span-2 space-y-10">
                    <section>
                        <h3 className="section-title border-b-2 pb-2 mb-4 font-bold uppercase text-gray-700 dark:text-gray-200" style={{ borderColor: data.color }}>Profil</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {data.about}
                        </p>
                        {data.objective && <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2 italic">{data.objective}</p>}
                    </section>

                    <section>
                        <h3 className="section-title border-b-2 pb-2 mb-4 font-bold uppercase text-gray-700 dark:text-gray-200" style={{ borderColor: data.color }}>Expérience Professionnelle</h3>
                        <div className="space-y-8">
                            {data.experiences.map((exp, i) => (
                                <div key={i} className="bg-white dark:bg-slate-800 p-6 shadow-sm border-l-4 rounded-r-lg" style={{ borderColor: data.color }}>
                                    <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">{exp.role}</h4>
                                    <p className="font-medium mb-1" style={{ color: data.color }}>{exp.company}</p>
                                    <p className="text-sm text-gray-400 italic mb-2">{formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</p>
                                    {exp.description && (
                                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {data.education && data.education.length > 0 && (
                        <section>
                            <h3 className="section-title border-b-2 pb-2 mb-4 font-bold uppercase text-gray-700 dark:text-gray-200" style={{ borderColor: data.color }}>Formations</h3>
                            <div className="space-y-6">
                                {data.education.map((edu, i) => (
                                    <div key={i} className="bg-white dark:bg-slate-800 p-6 shadow-sm border-l-4 rounded-r-lg" style={{ borderColor: '#e2e8f0' }}>
                                        <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">{edu.degree}</h4>
                                        <p className="font-medium mb-1 text-gray-700 dark:text-gray-300">{edu.school}</p>
                                        <p className="text-sm text-gray-400 italic">{formatDateRange(edu.startDate, edu.endDate, edu.isCurrent)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className="col-span-1 space-y-10">
                    <section>
                        <h3 className="section-title border-b-2 pb-2 mb-4 font-bold uppercase text-gray-700 dark:text-gray-200" style={{ borderColor: data.color }}>Compétences</h3>
                        <div className="flex flex-col gap-3">
                            {data.skills.map((skill, i) => (
                                <div key={i} className="bg-white dark:bg-slate-800 p-3 rounded shadow-sm flex items-center justify-between">
                                    <span className="font-medium text-sm dark:text-gray-200">{skill.name}</span>
                                    <span className="text-xs font-bold text-white px-2 py-1 rounded" style={{ backgroundColor: data.color }}>{skill.level}%</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {data.tools && data.tools.length > 0 && (
                        <section>
                            <h3 className="section-title border-b-2 pb-2 mb-4 font-bold uppercase text-gray-700 dark:text-gray-200" style={{ borderColor: data.color }}>Outils</h3>
                            <div className="flex flex-wrap gap-2">
                                {data.tools.map((tool, i) => (
                                    <span key={i} className="bg-white dark:bg-slate-800 border dark:border-slate-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs font-semibold">{tool}</span>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.certifications && data.certifications.length > 0 && (
                        <section>
                            <h3 className="section-title border-b-2 pb-2 mb-4 font-bold uppercase text-gray-700 dark:text-gray-200" style={{ borderColor: data.color }}>Certificats</h3>
                            <div className="space-y-3">
                                {data.certifications.map((cert, i) => (
                                    <div key={i} className="bg-white dark:bg-slate-800 p-2 rounded shadow-sm border-l-2" style={{ borderColor: data.color }}>
                                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">{cert.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{cert.issuer}, {cert.year}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <section>
                        <h3 className="section-title border-b-2 pb-2 mb-4 font-bold uppercase text-gray-700 dark:text-gray-200" style={{ borderColor: data.color }}>Langues</h3>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm">
                            <ul className="space-y-2 text-sm dark:text-gray-300">
                                {data.languages.map((lang, i) => (
                                    <li key={i} className="border-b last:border-0 border-gray-100 dark:border-slate-700 pb-2 last:pb-0">{lang}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h3 className="section-title border-b-2 pb-2 mb-4 font-bold uppercase text-gray-700 dark:text-gray-200" style={{ borderColor: data.color }}>Contact</h3>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm text-sm space-y-4">
                            {data.references.map((ref, i) => (
                                <div key={i}>
                                    <p className="font-bold dark:text-gray-200">{ref.name}</p>
                                    <p className="text-gray-500 dark:text-gray-400 break-all">{ref.contact}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

            </div>

        </div>
    );
}
