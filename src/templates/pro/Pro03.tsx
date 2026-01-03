import type { CVData } from "@/types";

interface CVTemplateProps {
    data: CVData;
}

export default function CVTemplate({ data }: CVTemplateProps) {
    return (
        <div className="w-[800px] min-h-[1100px] bg-white shadow-lg font-sans text-gray-800 flex flex-col">

            {/* HEADER */}
            <div className="text-white p-12" style={{ backgroundColor: data.color }}>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">{data.fullName}</h1>
                        <p className="text-xl text-gray-300 font-light">{data.title}</p>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                        <p>{data.contact.address}</p>
                        <p>{data.contact.phone}</p>
                        <p>{data.contact.email}</p>
                    </div>
                </div>
            </div>

            {/* CONTENT GRID */}
            <div className="flex-grow p-12 grid grid-cols-3 gap-12 bg-gray-50">

                {/* Main Column */}
                <div className="col-span-2 space-y-10">
                    <section>
                        <h3 className="section-title border-b-2 pb-2 mb-4 font-bold uppercase text-gray-700" style={{ borderColor: data.color }}>Profil</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {data.about}
                        </p>
                    </section>

                    <section>
                        <h3 className="section-title border-b-2 pb-2 mb-4 font-bold uppercase text-gray-700" style={{ borderColor: data.color }}>Expérience Professionnelle</h3>
                        <div className="space-y-8">
                            {data.experiences.map((exp, i) => (
                                <div key={i} className="bg-white p-6 shadow-sm border-l-4 rounded-r-lg" style={{ borderColor: data.color }}>
                                    <h4 className="font-bold text-lg text-gray-800">{exp.role}</h4>
                                    <p className="font-medium mb-1" style={{ color: data.color }}>{exp.company}</p>
                                    <p className="text-sm text-gray-400 italic">{exp.date}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Column */}
                <div className="col-span-1 space-y-10">
                    <section>
                        <h3 className="section-title border-b-2 pb-2 mb-4 font-bold uppercase text-gray-700" style={{ borderColor: data.color }}>Compétences</h3>
                        <div className="flex flex-col gap-3">
                            {data.skills.map((skill, i) => (
                                <div key={i} className="bg-white p-3 rounded shadow-sm flex items-center justify-between">
                                    <span className="font-medium text-sm">{skill.name}</span>
                                    <span className="text-xs font-bold text-white px-2 py-1 rounded" style={{ backgroundColor: data.color }}>{skill.level}%</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="section-title border-b-2 pb-2 mb-4 font-bold uppercase text-gray-700" style={{ borderColor: data.color }}>Langues</h3>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <ul className="space-y-2 text-sm">
                                {data.languages.map((lang, i) => (
                                    <li key={i} className="border-b last:border-0 border-gray-100 pb-2 last:pb-0">{lang}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h3 className="section-title border-b-2 pb-2 mb-4 font-bold uppercase text-gray-700" style={{ borderColor: data.color }}>Contact</h3>
                        <div className="bg-white p-4 rounded shadow-sm text-sm space-y-4">
                            {data.references.map((ref, i) => (
                                <div key={i}>
                                    <p className="font-bold">{ref.name}</p>
                                    <p className="text-gray-500 break-all">{ref.contact}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

            </div>

        </div>
    );
}
