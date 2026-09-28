import React, { useState, useEffect } from "react";
import "../App.css";
import { ContentCard } from "../components/ContentCard";
import { Section } from "../components/Section";
import { getProjects } from "../services/portfolioService";

type Project = {
    id?: string;
    title: string;
    description: string;
    skills: string[];
    link?: string;
};

export const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadProjects = async () => {
            try {
                const data = await getProjects();

                console.log("PROJECTS FROM SUPABASE:", data);

                if (isMounted) {
                    setProjects(data || []);
                }
            } catch (error) {
                console.error("PROJECT LOAD ERROR:", error);

                if (isMounted) {
                    setError("Unable to load projects.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadProjects();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <Section id="projects" title="Projects">
            <div className="card-list">
                {loading ? (
                    <p className="loading-text">
                        Loading projects...
                    </p>
                ) : error ? (
                    <p className="loading-text">
                        {error}
                    </p>
                ) : projects.length === 0 ? (
                    <p className="loading-text">
                        No projects available.
                    </p>
                ) : (
                    projects.map((proj, index) => (
                        <ContentCard
                            key={
                                proj.id ||
                                `${proj.title}-${index}`
                            }
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
