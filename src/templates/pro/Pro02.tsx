import type { CVData } from "@/types";

interface CVTemplateProps {
    data: CVData;
}

export default function CVTemplate({ data }: CVTemplateProps) {
    return (
        <div className="w-[800px] min-h-[1100px] bg-white shadow-lg font-sans text-gray-900">

            {/* HEADER */}
            <header className="text-white p-12" style={{ backgroundColor: data.color }}>
                <div className="flex justify-between items-start">
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">{data.title}</p>
                    <h1 className="text-5xl font-black uppercase leading-none">{data.fullName}</h1>
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
                        <p className="text-sm text-gray-600 leading-relaxed text-justify">
                            {data.about}
                        </p>
                    </Section>

                    <Section title="Expertise">
                        <div className="space-y-4">
                            {data.skills.map((skill, i) => (
                                <div key={i} className="bg-white p-3 rounded shadow-sm flex items-center justify-between">
                                    <span className="font-medium text-sm">{skill.name}</span>
                                    <span className="text-xs font-bold text-white px-2 py-1 rounded" style={{ backgroundColor: data.color }}>{skill.level}%</span>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section title="Langues & Loisirs">
                        <div className="text-white p-12" style={{ backgroundColor: data.color }}>
                            <div>
                                <p className="font-bold mb-1">Langues</p>
                                <p className="text-gray-600">{data.languages.join(", ")}</p>
                            </div>
                            <div>
                                <p className="font-bold mb-1">Loisirs</p>
                                <p className="text-gray-600">{data.hobbies.join(", ")}</p>
                            </div>
                        </div>
                    </Section>
                </aside>

                {/* RIGHT SIDE (Experiences) */}
                <main className="col-span-8 border-l border-gray-100 pl-8">
                    <Section title="Expérience Professionnelle">
                        {data.experiences.map((exp, i) => (
                            <div key={i} className="bg-white p-6 shadow-sm border-l-4 rounded-r-lg" style={{ borderColor: data.color }}>
                                <h4 className="font-bold text-lg text-gray-800">{exp.role}</h4>
                                <p className="font-medium mb-1" style={{ color: data.color }}>{exp.company}</p>
                                <p className="text-sm text-gray-400 italic">{exp.date}</p>
                            </div>
                        ))}
                    </Section>

                    <Section title="Références">
                        <div className="grid grid-cols-2 gap-4">
                            {data.experiences.map((exp, i) => (
                                <div key={i} className="bg-white p-6 shadow-sm border-l-4 rounded-r-lg" style={{ borderColor: data.color }}>
                                    <h4 className="font-bold text-lg text-gray-800">{exp.role}</h4>
                                    <p className="font-medium mb-1" style={{ color: data.color }}>{exp.company}</p>
                                    <p className="text-sm text-gray-400 italic">{exp.date}</p>
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
