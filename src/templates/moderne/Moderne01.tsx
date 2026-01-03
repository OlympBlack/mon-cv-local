import type { CVData } from "@/types";
import { formatDateRange } from "@/lib/utils";
interface CVTemplateProps {
  data: CVData;
}

export default function CVTemplate({ data }: CVTemplateProps) {
  return (
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
        <h1 className="text-xl font-bold text-center dark:text-white">{data.fullName}</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">{data.title}</p>

        {/* Contact */}
        <Section title="CONTACT">
          <p>{data.contact.phone}</p>
          <p>{data.contact.email}</p>
          <p>{data.contact.address}</p>
        </Section>

        {/* Education can go to main, removing placeholder comment */}

        {/* Tools */}
        {data.tools && data.tools.length > 0 && (
          <Section title="OUTILS">
            <div className="flex flex-wrap gap-2">
              {data.tools.map((tool, i) => (
                <span key={i} className="bg-white/50 dark:bg-black/20 px-2 py-1 rounded text-xs border border-gray-200 dark:border-gray-700">{tool}</span>
              ))}
            </div>
          </Section>
        )}

        {/* Languages */}
        <Section title="LANGUES">
          <ul className="list-disc ml-4">
            {data.languages.map((lang, i) => (
              <li key={i}>{lang}</li>
            ))}
          </ul>
        </Section>

        {/* Hobbies */}
        <Section title="HOBBIES">
          <ul className="list-disc ml-4">
            {data.hobbies.map((hobby, i) => (
              <li key={i}>{hobby}</li>
            ))}
          </ul>
        </Section>

        {/* References */}
        <Section title="RÉFÉRENCES">
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
        <Section title="À PROPOS">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.about}</p>
          {data.objective && <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-2 italic border-l-2 border-gray-300 dark:border-gray-600 pl-3">{data.objective}</p>}
        </Section>

        {/* Experience */}
        <Section title="EXPÉRIENCES">
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
          <Section title="FORMATIONS">
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
          <Section title="CERTIFICATIONS">
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
        <Section title="COMPÉTENCES">
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
  );
}

/* ---------- Section reusable ---------- */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6">
      <h2
        className="font-bold text-sm mb-2 uppercase text-[#333] dark:text-white"
      >
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
