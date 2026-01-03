import type { CVData } from "@/types";

interface CVTemplateProps {
    data: CVData;
}

export default function CVTemplate({ data }: CVTemplateProps) {
    return (
        <div className="w-[800px] min-h-[1100px] bg-white shadow-lg p-12 font-serif text-gray-800">
            {/* HEADER */}
            <header className="text-center border-b-2 pb-8 mb-8" style={{ borderColor: data.color }}>
                <h1 className="text-4xl font-bold uppercase mb-2 tracking-widest">
                    {data.fullName}
                </h1>
                <p className="text-xl italic mb-4">{data.title}</p>
                <div className="flex justify-center gap-4 text-sm font-sans">
                    <span>{data.contact.address}</span>
                    <span>|</span>
                    <span>{data.contact.phone}</span>
                    <span>|</span>
                    <span>{data.contact.email}</span>
                </div>
            </header>

            {/* CONTENT */}
            <div className="flex gap-8">
                <div className="w-2/3">
                    <Section title="Profil" color={data.color}>
                        <p className="leading-relaxed text-justify">{data.about}</p>
                    </Section>

                    <Section title="Expériences" color={data.color}>
                        {data.experiences.map((exp, i) => (
                            <div key={i} className="mb-6">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-lg">{exp.role}</h3>
                                    <span className="text-sm italic">{exp.date}</span>
                                </div>
                                <p className="font-semibold mb-2">{exp.company}</p>
                            </div>
                        ))}
                    </Section>

                    <Section title="Compétences" color={data.color}>
                        <ul className="list-disc ml-5 grid grid-cols-2 gap-x-4">
                            {data.skills.map((skill, i) => (
                                <li key={i} className="mb-1">{skill.name} - {skill.level}%</li>
                            ))}
                        </ul>
                    </Section>
                </div>

                <div className="w-1/3 border-l border-gray-300 pl-8">
                    <Section title="Langues" color={data.color}>
                        <ul className="space-y-2">
                            {data.languages.map((lang, i) => (
                                <li key={i}>{lang}</li>
                            ))}
                        </ul>
                    </Section>

                    <Section title="Centres d'intérêt" color={data.color}>
                        <ul className="space-y-2">
                            {data.hobbies.map((hobby, i) => (
                                <li key={i}>{hobby}</li>
                            ))}
                        </ul>
                    </Section>

                    <Section title="Références" color={data.color}>
                        <div className="space-y-3">
                            {data.references.map((ref, i) => (
                                <div key={i}>
                                    <p className="font-bold">{ref.name}</p>
                                    <p className="text-sm">{ref.contact}</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
}

function Section({ title, children, color }: { title: string; children: React.ReactNode; color?: string }) {
    return (
        <section className="mb-8">
            <h2 className="font-bold text-xl uppercase mb-4 border-b pb-1 inline-block" style={{ borderColor: color || '#d1d5db' }}>
                {title}
            </h2>
            <div>{children}</div>
        </section>
    );
}
