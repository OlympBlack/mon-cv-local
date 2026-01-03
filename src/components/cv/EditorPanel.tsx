import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Experience {
  role: string;
  company: string;
  date: string;
}

interface Skill {
  name: string;
  level: number;
}

interface Reference {
  name: string;
  contact: string;
}

interface CVData {
  fullName: string;
  title: string;
  color: string;
  contact: { phone: string; email: string; address: string };
  about: string;
  experiences: Experience[];
  skills: Skill[];
  languages: string[];
  hobbies: string[];
  references: Reference[];
}

interface EditorPanelProps {
  data: CVData;
  onChange: (newData: CVData) => void;
}

export default function EditorPanel({ data, onChange }: EditorPanelProps) {
  const handleAddExperience = () => {
    onChange({
      ...data,
      experiences: [...data.experiences, { role: "", company: "", date: "" }],
    });
  };

  const handleAddSkill = () => {
    onChange({
      ...data,
      skills: [...data.skills, { name: "", level: 0 }],
    });
  };

  const handleAddReference = () => {
    onChange({
      ...data,
      references: [...data.references, { name: "", contact: "" }],
    });
  };

  const handleAddLanguage = () => {
    onChange({
      ...data,
      languages: [...data.languages, ""],
    });
  };

  const handleAddHobby = () => {
    onChange({
      ...data,
      hobbies: [...data.hobbies, ""],
    });
  };

  return (
    <div className="bg-card border rounded-xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
      <h2 className="font-bold text-xl">Informations personnelles</h2>

      <div>
        <Label>Nom complet</Label>
        <Input
          value={data.fullName}
          onChange={(e) => onChange({ ...data, fullName: e.target.value })}
        />
      </div>

      <div>
        <Label>Titre</Label>
        <Input
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
        />
      </div>

      <div>
        <Label>Couleur principale</Label>
        <Input
          type="color"
          value={data.color}
          onChange={(e) => onChange({ ...data, color: e.target.value })}
        />
      </div>

      <div>
        <Label>Téléphone</Label>
        <Input
          value={data.contact.phone}
          onChange={(e) =>
            onChange({
              ...data,
              contact: { ...data.contact, phone: e.target.value },
            })
          }
        />
      </div>

      <div>
        <Label>Email</Label>
        <Input
          value={data.contact.email}
          onChange={(e) =>
            onChange({
              ...data,
              contact: { ...data.contact, email: e.target.value },
            })
          }
        />
      </div>

      <div>
        <Label>Adresse</Label>
        <Input
          value={data.contact.address}
          onChange={(e) =>
            onChange({
              ...data,
              contact: { ...data.contact, address: e.target.value },
            })
          }
        />
      </div>

      <div>
        <Label>À propos</Label>
        <Input
          value={data.about}
          onChange={(e) => onChange({ ...data, about: e.target.value })}
        />
      </div>

      {/* Experiences */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Expériences</Label>
          <Button size="sm" onClick={handleAddExperience}>
            Ajouter
          </Button>
        </div>
        {data.experiences.map((exp, i) => (
          <div key={i} className="space-y-2 p-2 border rounded">
            <Input
              placeholder="Rôle"
              value={exp.role}
              onChange={(e) => {
                const newExps = [...data.experiences];
                newExps[i].role = e.target.value;
                onChange({ ...data, experiences: newExps });
              }}
            />
            <Input
              placeholder="Entreprise"
              value={exp.company}
              onChange={(e) => {
                const newExps = [...data.experiences];
                newExps[i].company = e.target.value;
                onChange({ ...data, experiences: newExps });
              }}
            />
            <Input
              placeholder="Date"
              value={exp.date}
              onChange={(e) => {
                const newExps = [...data.experiences];
                newExps[i].date = e.target.value;
                onChange({ ...data, experiences: newExps });
              }}
            />
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Compétences</Label>
          <Button size="sm" onClick={handleAddSkill}>
            Ajouter
          </Button>
        </div>
        {data.skills.map((skill, i) => (
          <div key={i} className="flex gap-2 items-center">
            <Input
              placeholder="Compétence"
              value={skill.name}
              onChange={(e) => {
                const newSkills = [...data.skills];
                newSkills[i].name = e.target.value;
                onChange({ ...data, skills: newSkills });
              }}
            />
            <Input
              type="number"
              placeholder="%"
              value={skill.level}
              onChange={(e) => {
                const newSkills = [...data.skills];
                newSkills[i].level = Number(e.target.value);
                onChange({ ...data, skills: newSkills });
              }}
            />
          </div>
        ))}
      </div>

      {/* Languages */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Langues</Label>
          <Button size="sm" onClick={handleAddLanguage}>
            Ajouter
          </Button>
        </div>
        {data.languages.map((lang, i) => (
          <Input
            key={i}
            placeholder="Langue"
            value={lang}
            onChange={(e) => {
              const newLangs = [...data.languages];
              newLangs[i] = e.target.value;
              onChange({ ...data, languages: newLangs });
            }}
          />
        ))}
      </div>

      {/* Hobbies */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Hobbies</Label>
          <Button size="sm" onClick={handleAddHobby}>
            Ajouter
          </Button>
        </div>
        {data.hobbies.map((hobby, i) => (
          <Input
            key={i}
            placeholder="Hobby"
            value={hobby}
            onChange={(e) => {
              const newHobbies = [...data.hobbies];
              newHobbies[i] = e.target.value;
              onChange({ ...data, hobbies: newHobbies });
            }}
          />
        ))}
      </div>

      {/* References */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Références</Label>
          <Button size="sm" onClick={handleAddReference}>
            Ajouter
          </Button>
        </div>
        {data.references.map((ref, i) => (
          <div key={i} className="flex gap-2">
            <Input
              placeholder="Nom"
              value={ref.name}
              onChange={(e) => {
                const newRefs = [...data.references];
                newRefs[i].name = e.target.value;
                onChange({ ...data, references: newRefs });
              }}
            />
            <Input
              placeholder="Contact"
              value={ref.contact}
              onChange={(e) => {
                const newRefs = [...data.references];
                newRefs[i].contact = e.target.value;
                onChange({ ...data, references: newRefs });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
