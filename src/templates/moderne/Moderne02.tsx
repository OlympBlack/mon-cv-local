import type { CVData } from "@/types";

interface CVTemplateProps {
    data: CVData;
}

export default function CVTemplate({ data }: CVTemplateProps) {
    return (
        <div className="w-[800px] min-h-[1100px] bg-white shadow-lg flex flex-col font-sans">
            {/* HEADER */}
            <header className="bg-gray-100 p-8 flex items-center gap-8 border-b border-gray-200">
                <div className="w-32 h-32 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
                    {data.profileImage ? (
                        <img src={data.profileImage} alt={data.fullName} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-500 font-bold text-sm uppercase">Photo</span>
                    )}
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">
                        {data.fullName}
                    </h1>
                    <p className="text-xl font-medium mt-1" style={{ color: data.color }}>
                        {data.title}
                    </p>
                    <div className="flex gap-4 mt-3 text-sm text-gray-600">
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
                <main className="w-2/3 p-8 border-r border-gray-100">
                    <Section title="Profil">
                        <p className="text-gray-700 leading-relaxed text-justify">
                            {data.about}
                        </p>
                    </Section>

                    <Section title="Expériences Professionnelles">
                        {data.experiences.map((exp, i) => (
                            <div key={i} className="mb-6 relative pl-4 border-l-2" style={{ borderColor: `${data.color}40` }}>
                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: data.color }} />
                                <h3 className="font-bold text-gray-800">{exp.role}</h3>
                                <div className="flex justify-between text-sm text-gray-500 mb-1">
                                    <span className="font-semibold" style={{ color: data.color }}>
                                        {exp.company}
                                    </span>
                                    <span>{exp.date}</span>
                                </div>
                                {exp.description && (
                                    <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{exp.description}</p>
                                )}
                            </div>
                        ))}
                    </Section>

                    <Section title="Références">
                        <div className="grid grid-cols-2 gap-4">
                            {data.references.map((ref, i) => (
                                <div key={i} className="bg-gray-50 p-3 rounded">
                                    <p className="font-bold text-sm">{ref.name}</p>
                                    <p className="text-xs text-gray-600">{ref.contact}</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                </main>

                {/* RIGHT COLUMN (Skills & details) */}
                <aside className="w-1/3 p-8 bg-gray-50">
                    <Section title="Compétences">
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="bg-white border border-gray-200 px-3 py-1 text-sm rounded-full"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </Section>

                    <Section title="Langues">
                        <div className="space-y-2">
                            {data.languages.map((lang, i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-1">
                                    <span>{lang}</span>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section title="Centres d'intérêt">
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {data.hobbies.map((hobby, i) => (
                                <li key={i}>{hobby}</li>
                            ))}
                        </ul>
                    </Section>
                </aside>
            </div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">
                {title}
            </h2>
            {children}
        </section>
    );
}
