import type { CVData } from "@/types";
import { formatDateRange } from "@/lib/utils";
import { PdfSafeWrapper } from "@/components/cv/PdfSafeWrapper";

interface CVTemplateProps {
    data: CVData;
}

export default function CVTemplate({ data }: CVTemplateProps) {
    return (
        <PdfSafeWrapper>
            <div className="w-[800px] min-h-[1100px] bg-white shadow-lg flex flex-col font-sans">

                {/* HEADER */}
                <header className="bg-slate-800 text-white p-8 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden shadow-lg flex-shrink-0 bg-white/10 flex items-center justify-center">
                            {data.profileImage ? (
                                <img src={data.profileImage} alt={data.fullName} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-white/30 font-bold text-sm uppercase">PHOTO</span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold uppercase tracking-wider mb-1">{data.fullName}</h1>
                            <p className="text-lg font-medium" style={{ color: data.color }}>{data.title}</p>
                        </div>
                    </div>
                    <div className="text-right text-sm space-y-1 text-slate-300">
                        <p>{data.contact.phone}</p>
                        <p>{data.contact.email}</p>
                        <p>{data.contact.address}</p>
                    </div>
                </header>

                <div className="flex flex-grow bg-slate-50">
                    <main className="w-2/3 p-10 bg-white">
                        <Section title="Profil Professionnel" color={data.color}>
                            <p className="text-gray-600 leading-relaxed">{data.about}</p>
                            {/* {data.objective && <p className="text-gray-600 leading-relaxed mt-2 italic">{data.objective}</p>} */}
                        </Section>

                        <Section title="Expérience" color={data.color}>
                            <div className="space-y-8 border-l-2 border-slate-200 ml-3 pl-8 py-2">
                                {data.experiences.map((exp, i) => (
                                    <div key={i} className="relative">
                                        <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm" style={{ backgroundColor: data.color }} />
                                        <h3 className="font-bold text-lg text-slate-800">{exp.role}</h3>
                                        <div className="font-semibold text-sm mb-2" style={{ color: data.color }}>{exp.company} | {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</div>
                                        {exp.description && (
                                            <p className="text-sm text-gray-600  whitespace-pre-line">{exp.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Section>

                        {data.education && data.education.length > 0 && (
                            <Section title="Formations" color={data.color}>
                                <div className="space-y-6 border-l-2 border-slate-200  ml-3 pl-8 py-2">
                                    {data.education.map((edu, i) => (
                                        <div key={i} className="relative">
                                            <span className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-slate-400 border-2 border-white" />
                                            <h3 className="font-bold text-base text-slate-800">{edu.degree}</h3>
                                            <p className="text-sm text-slate-600">{edu.school}, {formatDateRange(edu.startDate, edu.endDate, edu.isCurrent)}</p>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}

                        <Section title="Références" color={data.color}>
                            <div className="grid grid-cols-2 gap-4">
                                {data.references.map((ref, i) => (
                                    <div key={i} className="bg-slate-50 p-4 border rounded">
                                        <p className="font-bold text-slate-800">{ref.name}</p>
                                        <p className="text-sm text-slate-500">{ref.contact}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    </main>

                    <aside className="w-1/3 p-10 bg-slate-100800 border-l border-slate-200">
                        <Section title="Compétences" small color={data.color}>
                            <div className="space-y-4">
                                {data.skills.map((skill, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-sm font-semibold mb-1">
                                            <span>{skill.name}</span>
                                        </div>
                                        <div className="h-2 bg-slate-300 rounded-full overflow-hidden">
                                            <div className="h-full" style={{ width: `${skill.level}%`, backgroundColor: data.color }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        {data.tools && data.tools.length > 0 && (
                            <Section title="Outils" small color={data.color}>
                                <div className="flex flex-wrap gap-2">
                                    {data.tools.map((tool, i) => (
                                        <span key={i} className="bg-white border border-slate-300 px-2 py-1 rounded text-xs font-semibold text-slate-600">{tool}</span>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {data.certifications && data.certifications.length > 0 && (
                            <Section title="Certificats" small color={data.color}>
                                <div className="space-y-3">
                                    {data.certifications.map((cert, i) => (
                                        <div key={i} className="text-sm">
                                            <p className="font-bold text-slate-700">{cert.name}</p>
                                            <p className="text-xs text-slate-500">{cert.issuer}, {cert.year}</p>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}

                        <Section title="Langues" small color={data.color}>
                            <ul className="space-y-2 text-sm font-medium text-slate-700">
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
                                    <span key={i} className="bg-white border border-slate-300 px-3 py-1 rounded text-xs font-semibold text-slate-600">
                                        {hobby}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    </aside>
                </div>

            </div>
        </PdfSafeWrapper>
    );
}

function Section({ title, children, small, color }: { title: string; children: React.ReactNode; small?: boolean; color: string }) {
    return (
        <section className="mb-10">
            <h2 className={`font-bold uppercase text-slate-800e border-b-2 pb-2 mb-6 ${small ? 'text-lg' : 'text-xl'}`} style={{ borderColor: color }}>
                {title}
            </h2>
            <div>{children}</div>
        </section>
    );
}
