import React, { useState, useEffect } from "react";
import '../App.css';
import { ContentCard } from "../components/ContentCard";
import { Section } from "../components/Section";
import { fetchPortfolioData } from "../services/sheetsApi";

type Project = {
    title: string;
    description: string;
    skills: string[];
    link?: string;
};

export const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    let isMounted = true;

    fetchPortfolioData().then((data) => {
        if (isMounted) {
            setProjects(data.projects || []);
            setLoading(false);
        }
    });

    return () => {
        isMounted = false;
    };
}, []);

    return (
        <Section id="projects" title="Projects">
            <div className="card-list">
                {loading ? (
                    <p className="loading-text">Loading projects...</p>
                ) : (
                    projects.map((proj, index) => (
                        <ContentCard
                            key={`${proj.title}-${index}`}
                            eyebrow="Project"
                            title={proj.title}
                            description={proj.description}
                            skills={proj.skills}
                            href={proj.link}
                        />
                    ))
                )}
            </div>
        </Section>
    );
};