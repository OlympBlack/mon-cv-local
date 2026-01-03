export interface Experience {
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    description?: string;
}

export interface Skill {
    name: string;
    level: number;
}

export interface Reference {
    name: string;
    contact: string;
}

export interface CVData {
    fullName: string;
    title: string;
    color: string;
    profileImage?: string;
    contact: {
        phone: string;
        email: string;
        address: string;
        linkedin?: string;
    };
    about: string;
    objective?: string;
    experiences: Experience[];
    education: {
        degree: string;
        school: string;
        startDate: string;
        endDate: string;
        isCurrent: boolean;
    }[];
    certifications: {
        name: string;
        issuer: string;
        year: string;
    }[];
    skills: Skill[];
    tools: string[]; // "Outils"
    languages: string[];
    hobbies: string[];
    references: Reference[];
}
