import type { CVData } from "@/types";
import { formatDateRange, getToolIconUrl } from "@/lib/utils";
import { PdfSafeWrapper } from "@/components/cv/PdfSafeWrapper";

interface CVTemplateProps {
  data: CVData;
}

export default function CVTemplate({ data }: CVTemplateProps) {
  return (
    <PdfSafeWrapper>
      <div className="w-[800px] min-h-[1100px] bg-white dark:bg-slate-900 shadow-lg flex font-sans text-gray-800 dark:text-gray-100">

        {/* COLONNE GAUCHE */}
        <aside
          className="w-1/3 p-6 text-sm text-gray-800 dark:text-gray-200"
          style={{ backgroundColor: `${data.color}20` }}
        >
          {/* Photo */}
          <div className="flex justify-center mb-6">
            <div className="w-40 h-40 rounded-full bg-gray-200 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
              {data.profileImage ? (
                <img
                  src={data.profileImage}
                  alt={data.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 font-bold uppercase tracking-widest">Photo</span>
              )}
            </div>
          </div>

          {/* Nom */}
          <h1
            className="text-xl font-bold text-center dark:text-white"
            style={{ color: data.color }}
          >
            {data.fullName}
          </h1>
          <p
            className="text-center text-gray-600 dark:text-gray-300 mb-6"
            style={{ color: data.color }}
          >
            {data.title}
          </p>

          {/* Contact */}
          <Section title="CONTACT" color={data.color}>
            <p>{data.contact.phone}</p>
            <p>{data.contact.email}</p>
            <p>{data.contact.address}</p>
          </Section>

          {/* Education can go to main, removing placeholder comment */}

          {/* Tools */}
          {data.tools && data.tools.length > 0 && (
            <Section title="OUTILS" color={data.color}>
              <div className="flex flex-wrap gap-3">
                {data.tools.map((tool, i) => (
                  <div key={i} className="relative group p-1.5 bg-white dark:bg-slate-800 rounded shadow-sm border border-gray-100 dark:border-slate-700" title={tool.label}>
                    <img
                      src={getToolIconUrl(tool)}
                      alt={tool.label}
                      className="w-5 h-5 object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Ressources / Liens */}
          {data.links && data.links.length > 0 && (
            <Section title="RESSOURCES" color={data.color}>
              <ul className="space-y-1">
                {data.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:underline text-gray-700 dark:text-gray-300"
                    >
                      {/* Petite icône globe optionnelle ou juste le texte */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Languages */}
          <Section title="LANGUES" color={data.color}>
            <ul className="list-disc ml-4">
              {data.languages.map((lang, i) => (
                <li key={i}>{lang}</li>
              ))}
            </ul>
          </Section>

          {/* Hobbies */}
          <Section title="HOBBIES" color={data.color}>
            <ul className="list-disc ml-4">
              {data.hobbies.map((hobby, i) => (
                <li key={i}>{hobby}</li>
              ))}
            </ul>
          </Section>

          {/* References */}
          <Section title="RÉFÉRENCES" color={data.color}>
            {data.references.map((ref, i) => (
              <div key={i} className="mb-2">
                <p className="font-semibold">{ref.name}</p>
                <p className="text-xs">{ref.contact}</p>
              </div>
            ))}
          </Section>
        </aside>

        {/* COLONNE DROITE */}
        <main className="w-2/3 p-8 text-sm text-gray-800 dark:text-gray-200">

          {/* About */}
          <Section title="À PROPOS" color={data.color}>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.about}</p>
            {data.objective && <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2 italic border-l-2 border-gray-300 dark:border-gray-600 pl-3">{data.objective}</p>}
          </Section>

          {/* Experience */}
          <Section title="EXPÉRIENCES" color={data.color}>
            {data.experiences.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between font-semibold">
                  <span>{exp.role}</span>
                  <span className="text-gray-500 dark:text-gray-400">{formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</span>
                </div>
                <p className="italic text-gray-600 dark:text-gray-400 mb-2">{exp.company}</p>
                {exp.description && (
                  <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </Section>

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <Section title="FORMATIONS" color={data.color}>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between font-semibold">
                    <span>{edu.degree}</span>
                    <span className="text-gray-500 dark:text-gray-400">{formatDateRange(edu.startDate, edu.endDate, edu.isCurrent)}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic">{edu.school}</p>
                </div>
              ))}
            </Section>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <Section title="CERTIFICATIONS" color={data.color}>
              {data.certifications.map((cert, i) => (
                <div key={i} className="mb-2">
                  <div className="flex justify-between font-semibold text-sm">
                    <span>{cert.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">{cert.year}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                </div>
              ))}
            </Section>
          )}

          {/* Skills */}
          <Section title="COMPÉTENCES" color={data.color}>
            <div className="space-y-3">
              {data.skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded">
                    <div
                      className="h-2 rounded"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: data.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </main>
      </div>
    </PdfSafeWrapper>
  );
}

/* ---------- Section reusable ---------- */
function Section({
  title,
  children,
  color,
}: {
  title: string;
  children: React.ReactNode;
  color: string;
}) {
  return (
    <section className="mb-6">
      <h2
        className="font-bold text-sm mb-2 uppercase text-[#333] dark:text-white"
        style={{ color: color }}
      >
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
