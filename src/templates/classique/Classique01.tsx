import type { CVData } from "@/types";
import { formatDateRange, getToolIconUrl } from "@/lib/utils";
import { PdfSafeWrapper } from "@/components/cv/PdfSafeWrapper";

interface CVTemplateProps {
    data: CVData;
}

export default function CVTemplate({ data }: CVTemplateProps) {
    const sidebarWidth = "35%"; // Roughly 280px of 800px

    return (
        <PdfSafeWrapper>
            <div
                className="w-[800px] min-h-[1123px] bg-gray-300 shadow-2xl flex relative font-sans"
                style={{
                    // Gradient simulates the sidebar color covering the full height of all pages
                    background: `linear-gradient(to right, ${data.color || '#0f5e6e'} ${sidebarWidth}, #F3F4F6 ${sidebarWidth})`,
                    backgroundColor: '#F3F4F6'
                }}
            >
                {/* DIAGONAL RIBBON - Decorative, kept absolute but might break on pages? It stays on page 1 usually */}
                <div className="absolute -top-2 -left-2 overflow-hidden w-32 h-32 z-10">
                    {/* <div className="absolute transform -rotate-45 bg-gray-500 dark:bg-gray-700 text-white text-center font-bold py-1 left-[-35px] top-[25px] w-[170px] text-xs">
                        ● BANDE BANDE
                    </div> */}
                </div>

                {/* LEFT SIDEBAR */}
                <aside
                    className="w-[35%] text-white flex flex-col relative"
                    style={{ backgroundColor: 'transparent', color: 'white' }}
                >
                    {/* PHOTO PLACEHOLDER */}
                    <div className="mt-12 mx-auto">
                        <div className="w-[210px] h-[210px] rounded-full overflow-hidden bg-white mx-auto flex items-center justify-center">
                            {data.profileImage ? (
                                <img
                                    src={data.profileImage}
                                    alt={data.fullName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest text-lg">Photo</span>
                            )}
                        </div>
                    </div>

                    {/* NAME */}
                    <div className="text-center mt-6 px-6">
                        {data.fullName && (
                            <>
                                <h1 className="text-4xl font-bold leading-tight">
                                    {data.fullName.split(' ')[0]}
                                </h1>
                                <h1 className="text-4xl font-bold leading-tight">
                                    {data.fullName.split(' ').slice(1).join(' ')}
                                </h1>
                            </>
                        )}
                        {data.title && <p className="text-sm mt-2 font-light">{data.title}</p>}
                    </div>

                    {/* PERSONAL INFO */}
                    <div className="px-6 mt-6 text-sm space-y-2">
                        {data.contact.address && (
                            <div>
                                <span className="font-semibold">Address: </span>
                                <span className="font-light">{data.contact.address}</span>
                            </div>
                        )}
                    </div>

                    {/* ABOUT TEXT */}
                    {data.about && (
                        <div className="px-6 mt-6 break-inside-avoid">
                            <p className="text-xs leading-relaxed font-light">{data.about}</p>
                        </div>
                    )}
                    {data.objective && (
                        <div className="px-6 mt-4 break-inside-avoid">
                            <h2 className="text-base font-bold uppercase mb-2 pb-1 border-b border-white/50 text-xs">Objectif</h2>
                            <p className="text-xs leading-relaxed font-light italic">{data.objective}</p>
                        </div>
                    )}

                    {/* PROFESSIONAL SKILLS */}
                    {data.skills.length > 0 && (
                        <div className="px-6 mt-8 break-inside-avoid">
                            <h2 className="text-base font-bold uppercase mb-4 pb-2 border-b-2 border-white">
                                Compétences
                            </h2>

                            {data.skills.map((skill, i) => (
                                <div key={i} className="mb-3 break-inside-avoid">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="font-semibold">{skill.name}</span>
                                        <span>{skill.level}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-black bg-opacity-30 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-yellow-400 rounded-full"
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TOOLS */}
                    {data.tools && data.tools.length > 0 && (
                        <div className="px-6 mt-8 break-inside-avoid">
                            <h2 className="text-base font-bold uppercase mb-4 pb-2 border-b-2 border-white">
                                Outils
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {data.tools.map((tool, i) => (
                                    <div key={i} className="bg-white/10 p-2 rounded backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors" title={tool.label}>
                                        <img
                                            src={getToolIconUrl(tool, 'white')}
                                            alt={tool.label}
                                            className="w-4 h-4 object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* LINKS */}
                    {data.links && data.links.length > 0 && (
                        <div className="px-6 mt-8 break-inside-avoid">
                            <h2 className="text-base font-bold uppercase mb-4 pb-2 border-b-2 border-white">
                                Ressources
                            </h2>
                            <ul className="text-xs space-y-2">
                                {data.links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline text-gray-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                                            <span className="truncate">{link.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* LANGUAGE */}
                    {data.languages.length > 0 && (
                        <div className="px-6 mt-8 break-inside-avoid">
                            <h2 className="text-base font-bold uppercase mb-4 pb-2 border-b-2 border-white">
                                Langues
                            </h2>

                            {data.languages.map((lang, i) => (
                                <div key={i} className="mb-3">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="font-semibold">{lang}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* HOBBIES */}
                    {data.hobbies.length > 0 && (
                        <div className="px-6 mt-8 break-inside-avoid">
                            <h2 className="text-base font-bold uppercase mb-4 pb-2 border-b-2 border-white">
                                Centres d'intérêt
                            </h2>
                            <ul className="text-xs space-y-2">
                                {data.hobbies.map((hobby, i) => (
                                    <li key={i} className="font-light">{hobby}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* SOCIAL ICONS */}
                    <div className="px-6 mt-auto mb-6 flex gap-6 text-xs">
                    </div>
                </aside>

                {/* RIGHT CONTENT - LIGHT GRAY */}
                <main className="flex-1 text-slate-800 dark:text-gray-100 p-10" style={{ backgroundColor: 'transparent' }}>
                    {/* CONTACT INFO */}
                    <div className="text-right text-xs mb-6 pb-4 border-b-4" style={{ borderColor: data.color || '#0f5e6e' }}>
                        {data.contact.phone && <p className="font-semibold">{data.contact.phone}</p>}
                        {data.contact.email && <p className="font-semibold">{data.contact.email}</p>}
                    </div>

                    {/* WORK EXPERIENCE */}
                    {data.experiences.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-xl font-bold uppercase mb-6 tracking-wide">Expériences</h2>

                            {data.experiences.map((exp, i) => (
                                <div key={i} className="mb-6 break-inside-avoid">
                                    <p className="text-sm font-semibold mb-1">{formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</p>
                                    {(exp.role || exp.company) && (
                                        <h3 className="font-bold text-base mb-2">
                                            {exp.role} {exp.company && `- @${exp.company}`}
                                        </h3>
                                    )}
                                    {exp.description && (
                                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}

                    {/* EDUCATION */}
                    {data.education && data.education.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-xl font-bold uppercase mb-6 tracking-wide">Formations</h2>
                            {data.education.map((edu, i) => (
                                <div key={i} className="mb-4 break-inside-avoid">
                                    <p className="text-sm font-semibold mb-1">{formatDateRange(edu.startDate, edu.endDate, edu.isCurrent)}</p>
                                    <h3 className="font-bold text-base">{edu.degree}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{edu.school}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* CERTIFICATIONS */}
                    {data.certifications && data.certifications.length > 0 && (
                        <section className="mb-10 break-inside-avoid">
                            <h2 className="text-xl font-bold uppercase mb-6 tracking-wide">Certifications</h2>
                            {data.certifications.map((cert, i) => (
                                <div key={i} className="mb-4 break-inside-avoid">
                                    <p className="text-sm font-semibold mb-1">{cert.year}</p>
                                    <h3 className="font-bold text-base">{cert.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* REFERENCES */}
                    {data.references.length > 0 && (
                        <section className="break-inside-avoid">
                            <h2 className="text-xl font-bold uppercase mb-6 tracking-wide">References</h2>

                            <div className="grid grid-cols-2 gap-8">
                                {data.references.map((ref, i) => (
                                    <div key={i} className="break-inside-avoid">
                                        <h3 className="font-bold text-sm mb-2">{ref.name}</h3>
                                        <p className="text-xs text-gray-700 dark:text-gray-400">Job Title</p>
                                        <p className="text-xs text-gray-700 dark:text-gray-400">City, State, Country</p>
                                        {ref.contact && (
                                            <>
                                                <p className="text-xs font-bold mt-2">T: {ref.contact}</p>
                                                <p className="text-xs font-bold">E: {ref.contact}</p>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </PdfSafeWrapper>
    );
}