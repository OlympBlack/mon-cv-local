import type { CVData } from "@/types";
import { formatDateRange, getToolIconUrl } from "@/lib/utils";
import { PdfSafeWrapper } from "@/components/cv/PdfSafeWrapper";

interface CVTemplateProps {
    data: CVData;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mb-8">
            <h2 className="text-lg font-bold pb-2 mb-4" style={{ color: "#111827", borderBottomWidth: "2px", borderBottomColor: "#e5e7eb" }}>
                {title}
            </h2>
            {children}
        </section>
    );
}

export default function CVTemplate({ data }: CVTemplateProps) {
    return (
        <PdfSafeWrapper>
            <div className="w-[800px] min-h-[1100px] flex flex-col font-sans shadow-lg" style={{ backgroundColor: "#ffffff" }}>
                {/* HEADER */}
                <header className="p-8 flex items-center gap-8 border-b" style={{ backgroundColor: "#f3f4f6", borderColor: "#e5e7eb" }}>
                    <div className="w-32 h-32 rounded-full flex-shrink-0 overflow-hidden border-2 shadow-sm flex items-center justify-center" style={{ backgroundColor: "#d1d5db", borderColor: "#ffffff" }}>
                        {data.profileImage ? (
                            <img src={data.profileImage} alt={data.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <span className="font-bold text-sm uppercase" style={{ color: "#6b7280" }}>Photo</span>
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold uppercase tracking-wide" style={{ color: "#111827" }}>
                            {data.fullName}
                        </h1>
                        <p className="text-xl font-medium mt-1" style={{ color: data.color }}>
                            {data.title}
                        </p>
                        <div className="flex gap-4 mt-3 text-sm" style={{ color: "#4b5563" }}>
                            <span>{data.contact.phone}</span>
                            <span>•</span>
                            <span>{data.contact.email}</span>
                            <span>•</span>
                            <span>{data.contact.address}</span>
                        </div>
                    </div>
                </header>

                <div className="flex flex-grow">
                    {/* LEFT COLUMN (Content) */}
                    <main className="w-2/3 p-8 border-r" style={{ borderColor: "#f3f4f6" }}>
                        <Section title="Profil">
                            <p className="leading-relaxed text-justify mb-2" style={{ color: "#374151" }}>
                                {data.about}
                            </p>
                            {data.objective && <p className="italic border-l-2 pl-3" style={{ color: "#4b5563", borderColor: "#d1d5db" }}>{data.objective}</p>}
                        </Section>

                        <Section title="Expériences Professionnelles">
                            {data.experiences.map((exp, i) => (
                                <div key={i} className="mb-6 relative pl-4 border-l-2" style={{ borderColor: `${data.color}40` }}>
                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: data.color }} />
                                    <h3 className="font-bold" style={{ color: "#1f2937" }}>{exp.role}</h3>
                                    <div className="flex justify-between text-sm mb-1" style={{ color: "#6b7280" }}>
                                        <span className="font-semibold" style={{ color: data.color }}>
                                            {exp.company}
                                        </span>
                                        <span>{formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</span>
                                    </div>
                                    {exp.description && (
                                        <p className="text-sm mt-2 whitespace-pre-line" style={{ color: "#4b5563" }}>{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </Section>

                        {data.education && data.education.length > 0 && (
                            <Section title="Formations">
                                {data.education.map((edu, i) => (
                                    <div key={i} className="mb-4 relative pl-4 border-l-2" style={{ borderColor: `${data.color}40` }}>
                                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full border" style={{ backgroundColor: '#aaa', borderColor: "#ffffff" }} />
                                        <h3 className="font-bold" style={{ color: "#1f2937" }}>{edu.degree}</h3>
                                        <div className="flex justify-between text-sm" style={{ color: "#6b7280" }}>
                                            <span>{edu.school}</span>
                                            <span>{formatDateRange(edu.startDate, edu.endDate, edu.isCurrent)}</span>
                                        </div>
                                    </div>
                                ))}
                            </Section>
                        )}

                        <Section title="Références">
                            <div className="grid grid-cols-2 gap-4">
                                {data.references.map((ref, i) => (
                                    <div key={i} className="p-3 rounded" style={{ backgroundColor: "#f9fafb" }}>
                                        <p className="font-bold text-sm" style={{ color: "#1f2937" }}>{ref.name}</p>
                                        <p className="text-xs" style={{ color: "#4b5563" }}>{ref.contact}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    </main>

                    {/* RIGHT COLUMN (Skills & details) */}
                    <aside className="w-1/3 p-8" style={{ backgroundColor: "#f9fafb", color: "#111827" }}>
                        <Section title="Compétences">
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="border px-3 py-1 text-sm rounded-full"
                                        style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb", color: "#374151" }}
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </Section>

                        {data.tools && data.tools.length > 0 && (
                            <Section title="Outils">
                                <div className="flex flex-wrap gap-2">
                                    {data.tools.map((tool, i) => (
                                        <div key={i} className="border p-1.5 rounded-md bg-white border-gray-200" title={tool.label}>
                                            <img
                                                src={getToolIconUrl(tool)}
                                                alt={tool.label}
                                                className="w-4 h-4 object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {data.certifications && data.certifications.length > 0 && (
                            <Section title="Certifications">
                                <div className="space-y-3">
                                    {data.certifications.map((cert, i) => (
                                        <div key={i} className="p-2 rounded shadow-sm" style={{ backgroundColor: "#ffffff" }}>
                                            <p className="font-bold text-sm" style={{ color: "#1f2937" }}>{cert.name}</p>
                                            <p className="text-xs" style={{ color: "#6b7280" }}>{cert.issuer}, {cert.year}</p>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}

                        <Section title="Langues">
                            <div className="space-y-2">
                                {data.languages.map((lang, i) => (
                                    <div key={i} className="flex items-center justify-between border-b pb-1" style={{ borderColor: "#e5e7eb" }}>
                                        <span>{lang}</span>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="Centres d'intérêt">
                            <ul className="list-disc list-inside space-y-1" style={{ color: "#374151" }}>
                                {data.hobbies.map((hobby, i) => (
                                    <li key={i}>{hobby}</li>
                                ))}
                            </ul>
                        </Section>
                    </aside>
                </div>
            </div>
        </PdfSafeWrapper>
    );
}
