import type { CVData } from "@/types";
import { formatDateRange } from "@/lib/utils";

interface CVTemplateProps {
    data: CVData;
}

export default function CVTemplate({ data }: CVTemplateProps) {
    return (
        <div className="w-[800px] min-h-[1100px] bg-white dark:bg-slate-900 shadow-lg flex flex-col font-sans text-gray-800 dark:text-gray-100">
            {/* HEADER */}
            <header className="text-white p-10 flex justify-between items-center" style={{ backgroundColor: data.color }}>
                <div className="flex items-center gap-6">
                    <div className="w-36 h-36 rounded-full border-4 border-white/30 bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {data.profileImage ? (
                            <img
                                src={data.profileImage}
                                alt={data.fullName}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-white/50 font-bold text-sm uppercase">Photo</span>
                        )}
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold uppercase tracking-wider mb-1">{data.fullName}</h1>
                        <p className="text-lg font-medium opacity-90">{data.title}</p>
                    </div>
                </div>
                <div className="text-right text-sm space-y-1 opacity-90">
                    <p>{data.contact.phone}</p>
                    <p>{data.contact.email}</p>
                    <p>{data.contact.address}</p>
                </div>
            </header>

            <div className="flex flex-grow bg-slate-50 dark:bg-slate-900">
                <main className="w-2/3 p-10 bg-white dark:bg-slate-900">
                    <Section title="Profil Professionnel" color={data.color}>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{data.about}</p>
                        {data.objective && <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-2 italic">{data.objective}</p>}
                    </Section>

                    <Section title="Expérience" color={data.color}>
                        <div className="space-y-8 border-l-2 border-slate-200 dark:border-slate-700 ml-3 pl-8 py-2">
                            {data.experiences.map((exp, i) => (
                                <div key={i} className="relative">
                                    <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm" style={{ backgroundColor: data.color }} />
                                    <h3 className="font-bold text-lg text-slate-800 dark:text-gray-100">{exp.role}</h3>
                                    <div className="font-semibold text-sm mb-2" style={{ color: data.color }}>{exp.company} | {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</div>
                                    {exp.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* EDUCATION */}
                    {data.education && data.education.length > 0 && (
                        <Section title="Formations" color={data.color}>
                            <div className="space-y-6 border-l-2 border-slate-200 dark:border-slate-700 ml-3 pl-8 py-2">
                                {data.education.map((edu, i) => (
                                    <div key={i} className="relative">
                                        <span className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-slate-400 border-2 border-white dark:border-slate-900" />
                                        <h3 className="font-bold text-base text-slate-800 dark:text-gray-100">{edu.degree}</h3>
                                        <p className="text-sm text-slate-600 dark:text-gray-400">{edu.school}, {formatDateRange(edu.startDate, edu.endDate, edu.isCurrent)}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    <Section title="Références" color={data.color}>
                        <div className="grid grid-cols-2 gap-4">
                            {data.references.map((ref, i) => (
                                <div key={i} className="bg-slate-50 dark:bg-slate-800 p-4 border dark:border-slate-700 rounded">
                                    <p className="font-bold text-slate-800 dark:text-gray-100">{ref.name}</p>
                                    <p className="text-sm text-slate-500 dark:text-gray-400">{ref.contact}</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                </main>

                <aside className="w-1/3 p-10 bg-slate-100 dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700">
                    <Section title="Compétences" small color={data.color}>
                        <div className="space-y-4">
                            {data.skills.map((skill, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm font-semibold mb-1">
                                        <span>{skill.name}</span>
                                    </div>
                                    <div className="h-2 bg-slate-300 dark:bg-slate-600 rounded-full overflow-hidden">
                                        <div className="h-full" style={{ width: `${skill.level}%`, backgroundColor: data.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* TOOLS */}
                    {data.tools && data.tools.length > 0 && (
                        <Section title="Outils" small color={data.color}>
                            <div className="flex flex-wrap gap-2">
                                {data.tools.map((tool, i) => (
                                    <span key={i} className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-xs font-semibold text-slate-700 dark:text-gray-200">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* CERTIFICATIONS */}
                    {data.certifications && data.certifications.length > 0 && (
                        <Section title="Certificats" small color={data.color}>
                            <div className="space-y-3">
                                {data.certifications.map((cert, i) => (
                                    <div key={i} className="text-sm">
                                        <p className="font-bold text-slate-700 dark:text-slate-300">{cert.name}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{cert.issuer}, {cert.year}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    <Section title="Langues" small color={data.color}>
                        <ul className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                            {data.languages.map((lang, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: data.color }} />
                                    {lang}
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section title="Intérêts" small color={data.color}>
                        <div className="flex flex-wrap gap-2">
                            {data.hobbies.map((hobby, i) => (
                                <span key={i} className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 px-3 py-1 rounded text-xs font-semibold text-slate-600 dark:text-slate-300">
                                    {hobby}
                                </span>
                            ))}
                        </div>
                    </Section>
                </aside>
            </div>

        </div>
    );
}

function Section({ title, children, small, color }: { title: string; children: React.ReactNode; small?: boolean; color: string }) {
    return (
        <section className="mb-10">
            <h2 className={`font-bold uppercase text-slate-800 dark:text-white border-b-2 pb-2 mb-6 ${small ? 'text-lg' : 'text-xl'}`} style={{ borderColor: color }}>
                {title}
            </h2>
            <div>{children}</div>
        </section>
    );
}
