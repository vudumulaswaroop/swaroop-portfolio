const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;

export const EXPERIENCES = [
    {
        period: "APR 2023 — PRESENT",
        role: "Director – Technology & Operations",
        company: "Ankar Engineers and Fabrications Private Limited",
        description: "Architected real-time Industrial IoT machine telemetry and energy-optimization platforms for pharma production machinery. Modernized legacy workflows with custom Node.js/GraphQL backends and live React dashboards, reducing unscheduled equipment downtime by 25% and manual reporting overhead by 50%.",
        skills: ["Industrial IoT", "Automation", "Node.js", "GraphQL", "React", "Predictive Analytics"],
        link: "https://ankarengineers.in/"
    },
    {
        period: "MAY 2022 — MAR 2023",
        role: "Lead Developer",
        company: "Safeway",
        description: "Scaled core modules for the Safeway Pharmacy Application, prescription workflows, and delivery tracking. Engineered HIPAA-compliant COVID-19 vaccination tracking portals and built high-concurrency backend content engines serving real-time UI configs and assets.",
        skills: ["React", "Backend Orchestration", "HIPAA Compliance", "Node.js", "REST APIs", "Performance Tuning"],
        link: "https://www.safeway.com/health/pharmacy/dashboard"
    },
    {
        period: "MAR 2019 — APR 2022",
        role: "Senior Full Stack UI / IoT Platform Lead",
        company: "CDK GLOBAL",
        description: "Architected high-scale IoT and multi-tenant web platforms powering 50,000+ independent dealership websites with 99.99% availability. Automated seasonal theme and UI asset deployment pipelines, reducing rollout times from weeks to under 24 hours.",
        skills: ["React", "IoT Architecture", "Multi-Tenant Systems", "CI/CD Pipelines", "Frontend Optimization", "Performance"],
        link: "https://www.cdkglobal.com/"
    },
    {
        period: "JAN 2017 — FEB 2019",
        role: "Sr UI Developer",
        company: "Bio-Rad Laboratories",
        description: "Engineered cloud integration layers and UI workflows for automated DNA diagnostic machines. Reduced diagnostic test setup times by 40% and improved system responsiveness by reducing API latency by 45% and bundle sizes by 35%.",
        skills: ["React", "AWS Cloud Services", "RESTful APIs", "Jenkins", "Docker", "Machine Telemetry"],
        link: "https://www.bio-rad.com/",
    },
    {
        period: "JUN 2014 — JUL 2015",
        role: "Front-End Developer",
        company: "Avenir IT Private Limited",
        description: "Developed user-facing interfaces and web components during front-end engineering internship, implementing core JavaScript interactions and responsive layouts.",
        skills: ["JavaScript", "Front-end Development", "HTML5", "CSS3"],
    }
];

export const PROJECTS = [
    {
        title: "Agri Milk Monitoring Tech",
        description: "IoT-enabled agricultural monitoring platform for real-time milk production tracking, live farm updates, and quality telemetry management.",
        skills: ["React", "Firebase", "Node.js", "IoT Telemetry", "REST APIs"],
        link: "https://github.com/vudumulaswaroop/agri-milk-montering-tech"
    },
    {
        title: "Pharma Centrifuge Dashboard",
        description: "Real-time industrial dashboard monitoring machinery telemetry, operational metrics, and energy consumption for pharma manufacturing.",
        skills: ["React", "TypeScript", "Chart.js", "WebSockets", "IoT Telemetry"],
        link: "https://github.com/vudumulaswaroop/pharma-centrifuge-dashboard"
    },
    {
        title: "Hospital Application Udumula",
        description: "Comprehensive healthcare and patient record management portal for managing hospital workflows, appointments, and prescription data.",
        skills: ["React", "Node.js", "REST APIs", "State Management", "Tailwind CSS"],
        link: "https://github.com/vudumulaswaroop/hospital-application-udumula"
    },
    {
        title: "Storybook for React",
        description: "Isolated UI component design system and development environment for building, testing, and documenting modular React components.",
        skills: ["React", "Storybook", "TypeScript", "CSS Modules", "UI/UX Design"],
        link: "https://github.com/vudumulaswaroop/storybook-for-react"
    },
    {
        title: "Pharma AI Chatbot",
        description: "Intelligent conversational AI assistant built to query pharma data, streamline technical support, and summarize machinery operational logs.",
        skills: ["React", "Node.js", "OpenAI / LLM Integration", "GraphQL", "Tailwind CSS"],
        link: "https://github.com/vudumulaswaroop/pharma-ai-chatbot"
    }
];

export const STARS = [
    { top: '10%', left: '80%', delay: '0s', duration: '10s' },
    { top: '25%', left: '95%', delay: '25s', duration: '8s' },
    { top: '5%', left: '60%', delay: '40s', duration: '9s' },
    { top: '40%', left: '85%', delay: '15s', duration: '11s' },
    { top: '15%', left: '45%', delay: '55s', duration: '10s' },
    { top: '50%', left: '70%', delay: '73s', duration: '10s' }
];

export const GOOGLEAPI = `${CLIENT_ID}${CLIENT_SECRET}/exec`;
