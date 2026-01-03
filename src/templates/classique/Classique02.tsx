import type { CVData } from "@/types";
import { formatDateRange } from "@/lib/utils";

interface CVTemplateProps {
    data: CVData;
}

export default function CVTemplate({ data }: CVTemplateProps) {
    return (
        <div className="w-[800px] min-h-[1100px] bg-[#fdfbf7] dark:bg-slate-900 shadow-lg p-14 font-serif text-gray-900 dark:text-gray-100">

            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold uppercase mb-3">{data.fullName}</h1>
                <div className="w-20 h-1 mx-auto mb-4" style={{ backgroundColor: data.color }} />
                <p className="text-xl italic text-gray-600 dark:text-gray-400 mb-4">{data.title}</p>
                <p className="font-sans text-sm text-gray-500 dark:text-gray-400">
                    {data.contact.address} • {data.contact.phone} • {data.contact.email}
                </p>
            </header>

            <div className="space-y-8">
                <Section title="Profil" color={data.color}>
                    <p className="text-justify leading-relaxed mb-2 text-gray-700 dark:text-gray-300">{data.about}</p>
                    {data.objective && <p className="text-justify leading-relaxed italic text-gray-700 dark:text-gray-400">{data.objective}</p>}
                </Section>

                <Section title="Expérience Professionnelle" color={data.color}>
                    {data.experiences.map((exp, i) => (
                        <div key={i} className="mb-6 page-break-inside-avoid">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-lg dark:text-gray-200">{exp.role}</h3>
                                <span className="text-sm font-sans text-gray-500 dark:text-gray-400">{formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</span>
                            </div>
                            <p className="font-semibold italic text-gray-700 dark:text-gray-300 mb-2">{exp.company}</p>
                        </div>
                    ))}
                </Section>

                <div className="grid grid-cols-2 gap-10">
                    <Section title="Compétences" color={data.color}>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="border-b border-gray-400 dark:border-gray-600 pb-1">{skill.name}</span>
                            ))}
                        </div>
                        {data.tools && data.tools.length > 0 && (
                            <div>
                                <h4 className="font-bold text-sm mb-2 mt-4 text-gray-800 dark:text-gray-200">Outils</h4>
                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                    {data.tools.map((tool, i) => (
                                        <span key={i} className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded">{tool}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Section>

                    <Section title="Formation & Langues" color={data.color}>
                        <div className="space-y-4">
                            {data.education && data.education.length > 0 && (
                                <div>
                                    <h4 className="font-bold text-sm mb-2">Formation</h4>
                                    {data.education.map((edu, i) => (
                                        <div key={i} className="mb-2">
                                            <p className="font-semibold text-sm dark:text-gray-200">{edu.degree}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{edu.school}, {formatDateRange(edu.startDate, edu.endDate, edu.isCurrent)}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {data.certifications && data.certifications.length > 0 && (
                                <div>
                                    <h4 className="font-bold text-sm mb-2">Certifications</h4>
                                    {data.certifications.map((cert, i) => (
                                        <div key={i} className="mb-2">
                                            <p className="font-semibold text-sm dark:text-gray-200">{cert.name}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{cert.issuer}, {cert.year}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div>
                                <h4 className="font-bold text-sm mb-2">Langues</h4>
                                <p>{data.languages.join(", ")}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm mb-2">Loisirs</h4>
                                <p>{data.hobbies.join(", ")}</p>
                            </div>
                        </div>
                    </Section>
                </div>

                <Section title="Références" color={data.color}>
                    <div className="flex gap-10">
                        {data.references.map((ref, i) => (
                            <div key={i}>
                                <p className="font-bold dark:text-gray-200">{ref.name}</p>
                                <p className="text-sm italic text-gray-600 dark:text-gray-400">{ref.contact}</p>
                            </div>
                        ))}
                    </div>
                </Section>
            </div>

        </div>
    );
}

function Section({ title, children, color }: { title: string; children: React.ReactNode; color?: string }) {
    return (
        <section>
            <h2 className="font-bold text-xl uppercase mb-6 text-center text-gray-800 dark:text-gray-200">
                <span className="border-b-2 pb-1 px-4" style={{ borderColor: color || '#d1d5db' }}>{title}</span>
            </h2>
            <div>{children}</div>
        </section>
    );
}
