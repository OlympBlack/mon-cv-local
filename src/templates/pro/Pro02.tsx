import type { CVData } from "@/types";
import { formatDateRange } from "@/lib/utils";

interface CVTemplateProps {
    data: CVData;
}

export default function CVTemplate({ data }: CVTemplateProps) {
    return (
        <div className="w-[800px] min-h-[1100px] bg-white dark:bg-slate-900 shadow-lg font-sans text-gray-900 dark:text-gray-100">

            {/* HEADER */}
            <header className="text-white p-12" style={{ backgroundColor: data.color }}>
                <div className="flex justify-between items-start gap-8">
                    <div className="flex-1">
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">{data.title}</p>
                        <h1 className="text-5xl font-black uppercase leading-none">{data.fullName}</h1>
                    </div>
                    <div className="w-40 h-40 rounded-full shadow-2xl overflow-hidden border-4 border-white bg-black/20 flex items-center justify-center">
                        {data.profileImage ? (
                            <img src={data.profileImage} alt={data.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-white/50 font-bold uppercase tracking-widest text-lg">Photo</span>
                        )}
                    </div>
                </div>
                <div className="text-right text-xs bg-gray-900 text-white p-4 -mb-[42px]">
                    <p className="font-bold mb-1">CONTACT</p>
                    <p>{data.contact.phone}</p>
                    <p>{data.contact.email}</p>
                    <p>{data.contact.address}</p>
                </div>
            </header>

            <div className="p-10 mt-6 grid grid-cols-12 gap-8">

                {/* LEFT SIDE (Skills/Contact) */}
                <aside className="col-span-4 space-y-10 pt-4">
                    <Section title="Description">
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                            {data.about}
                        </p>
                        {data.objective && <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-2">{data.objective}</p>}
                    </Section>

                    <Section title="Expertise">
                        <div className="space-y-4">
                            {data.skills.map((skill, i) => (
                                <div key={i} className="bg-white dark:bg-slate-800 p-3 rounded shadow-sm flex items-center justify-between">
                                    <span className="font-medium text-sm dark:text-gray-200">{skill.name}</span>
                                    <span className="text-xs font-bold text-white px-2 py-1 rounded" style={{ backgroundColor: data.color }}>{skill.level}%</span>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {data.tools && data.tools.length > 0 && (
                        <Section title="Outils">
                            <div className="flex flex-wrap gap-2">
                                {data.tools.map((tool, i) => (
                                    <span key={i} className="bg-white dark:bg-slate-800 border dark:border-slate-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs font-semibold">{tool}</span>
                                ))}
                            </div>
                        </Section>
                    )}

                    {data.certifications && data.certifications.length > 0 && (
                        <Section title="Certifications">
                            <div className="space-y-3">
                                {data.certifications.map((cert, i) => (
                                    <div key={i} className="bg-white dark:bg-slate-800 p-2 rounded shadow-sm border-l-2" style={{ borderColor: data.color }}>
                                        <p className="font-bold text-sm text-gray-800 dark:text-gray-200">{cert.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{cert.issuer}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    <Section title="Langues & Loisirs">
                        <div className="space-y-2">
                            <div>
                                <p className="font-bold mb-1 text-sm text-gray-800 dark:text-white">Langues</p>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{data.languages.join(", ")}</p>
                            </div>
                            <div>
                                <p className="font-bold mb-1 text-sm text-gray-800 dark:text-white">Loisirs</p>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{data.hobbies.join(", ")}</p>
                            </div>
                        </div>
                    </Section>
                </aside>

                {/* RIGHT SIDE (Experiences) */}
                <main className="col-span-8 border-l border-gray-100 dark:border-slate-800 pl-8">
                    <Section title="Expérience Professionnelle">
                        <div className="space-y-6">
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
                    </Section>

                    {data.education && data.education.length > 0 && (
                        <Section title="Formations">
                            <div className="space-y-6">
                                {data.education.map((edu, i) => (
                                    <div key={i} className="bg-white dark:bg-slate-800 p-6 shadow-sm border-l-4 rounded-r-lg" style={{ borderColor: '#ddd' }}>
                                        <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">{edu.degree}</h4>
                                        <p className="font-medium mb-1 text-gray-700 dark:text-gray-300">{edu.school}</p>
                                        <p className="text-sm text-gray-400 italic">{formatDateRange(edu.startDate, edu.endDate, edu.isCurrent)}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    <Section title="Références">
                        <div className="grid grid-cols-2 gap-4">
                            {data.references.map((ref, i) => (
                                <div key={i} className="bg-white dark:bg-slate-800 p-6 shadow-sm border-l-4 rounded-r-lg" style={{ borderColor: data.color }}>
                                    <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">{ref.name}</h4>
                                    <p className="text-sm text-gray-400 italic">{ref.contact}</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                </main>

            </div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section>
            <h2 className="font-bold uppercase text-sm tracking-widest text-gray-400 mb-6">
                {title}
            </h2>
            <div>{children}</div>
        </section>
    );
}
