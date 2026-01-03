export interface Experience {
    role: string;
    company: string;
    date: string;
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
    experiences: Experience[];
    skills: Skill[];
    languages: string[];
    hobbies: string[];
    references: Reference[];
}
