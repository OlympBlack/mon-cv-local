import type { CVData } from "@/types";
interface CVTemplateProps {
  data: CVData;
}

export default function CVTemplate({ data }: CVTemplateProps) {
  return (
    <div className="w-[800px] min-h-[1100px] bg-white shadow-lg flex font-sans">

      {/* COLONNE GAUCHE */}
      <aside
        className="w-1/3 p-6 text-sm text-gray-800"
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
        <h1 className="text-xl font-bold text-center">{data.fullName}</h1>
        <p className="text-center text-gray-600 mb-6">{data.title}</p>

        {/* Contact */}
        <Section title="CONTACT">
          <p>{data.contact.phone}</p>
          <p>{data.contact.email}</p>
          <p>{data.contact.address}</p>
        </Section>

        {/* Education (optionnel plus tard) */}

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
      <main className="w-2/3 p-8 text-sm">

        {/* About */}
        <Section title="À PROPOS">
          <p className="text-gray-700 leading-relaxed">{data.about}</p>
        </Section>

        {/* Experience */}
        <Section title="EXPÉRIENCES">
          {data.experiences.map((exp, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between font-semibold">
                <span>{exp.role}</span>
                <span className="text-gray-500">{exp.date}</span>
              </div>
              <p className="italic text-gray-600 mb-2">{exp.company}</p>
              {exp.description && (
                <p className="text-gray-700 text-xs leading-relaxed whitespace-pre-line">{exp.description}</p>
              )}
            </div>
          ))}
        </Section>

        {/* Skills */}
        <Section title="COMPÉTENCES">
          <div className="space-y-3">
            {data.skills.map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
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
        className="font-bold text-sm mb-2 uppercase"
        style={{ color: "#333" }}
      >
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}
