import type { CVData } from "@/types";

interface CVTemplateProps {
    data: CVData;
}

export default function CVTemplate({ data }: CVTemplateProps) {
    return (
        <div className="w-[800px] min-h-[1100px] bg-[#fdfbf7] shadow-lg p-14 font-serif text-gray-900">

            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold uppercase mb-3">{data.fullName}</h1>
                <div className="w-20 h-1 mx-auto mb-4" style={{ backgroundColor: data.color }} />
                <p className="text-xl italic text-gray-600 mb-4">{data.title}</p>
                <p className="font-sans text-sm text-gray-500">
                    {data.contact.address} • {data.contact.phone} • {data.contact.email}
                </p>
            </header>

            <div className="space-y-8">
                <Section title="Profil" color={data.color}>
                    <p className="text-justify leading-relaxed">{data.about}</p>
                </Section>

                <Section title="Expérience Professionnelle" color={data.color}>
                    {data.experiences.map((exp, i) => (
                        <div key={i} className="mb-6 page-break-inside-avoid">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-lg">{exp.role}</h3>
                                <span className="text-sm font-sans text-gray-500">{exp.date}</span>
                            </div>
                            <p className="font-semibold italic text-gray-700 mb-2">{exp.company}</p>
                        </div>
                    ))}
                </Section>

                <div className="grid grid-cols-2 gap-10">
                    <Section title="Compétences" color={data.color}>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="border-b border-gray-400 pb-1">{skill.name}</span>
                            ))}
                        </div>
                    </Section>

                    <Section title="Formation & Langues" color={data.color}>
                        <div className="space-y-4">
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
                                <p className="font-bold">{ref.name}</p>
                                <p className="text-sm italic text-gray-600">{ref.contact}</p>
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
            <h2 className="font-bold text-xl uppercase mb-6 text-center text-gray-800">
                <span className="border-b-2 pb-1 px-4" style={{ borderColor: color || '#d1d5db' }}>{title}</span>
            </h2>
            <div>{children}</div>
        </section>
    );
}
