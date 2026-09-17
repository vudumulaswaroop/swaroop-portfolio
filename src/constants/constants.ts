const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;

// Parse the JSON string from environment variables, or fallback to an empty array []
// Define interfaces for your structures to keep TypeScript happy
interface ExperienceItem {
    period: string;
    role: string;
    company: string;
    description: string;
    skills: string[];
    link?: string;
}

interface ProjectItem {
    title: string;
    description: string;
    skills: string[];
    link?: string;
}

// Typecast the JSON parse results
export const EXPERIENCES: ExperienceItem[] = process.env.REACT_APP_EXPERIENCES
    ? JSON.parse(process.env.REACT_APP_EXPERIENCES)
    : [];

export const PROJECTS: ProjectItem[] = process.env.REACT_APP_PROJECTS
    ? JSON.parse(process.env.REACT_APP_PROJECTS)
    : [];
export const STARS = [
    { top: '10%', left: '80%', delay: '0s', duration: '10s' },
    { top: '25%', left: '95%', delay: '25s', duration: '8s' },
    { top: '5%', left: '60%', delay: '40s', duration: '9s' },
    { top: '40%', left: '85%', delay: '15s', duration: '11s' },
    { top: '15%', left: '45%', delay: '55s', duration: '10s' },
    { top: '50%', left: '70%', delay: '73s', duration: '10s' }
];

export const GOOGLEAPI = `${CLIENT_ID}${CLIENT_SECRET}/exec`;
