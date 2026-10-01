import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
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
    const { t } = useTranslation();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadProjects = async () => {
            try {
                const data = await getProjects();

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
        <Section id="projects" title={t("projects.title")} lang={i18n.language}>
            <div className="card-list">
                {loading ? (
                    <p className="loading-text">
                        {t("projects.loading")}
                    </p>
                ) : error ? (
                    <p className="loading-text">
                        {t("projects.error")}
                    </p>
                ) : projects.length === 0 ? (
                    <p className="loading-text">
                        {t("projects.empty")}
                    </p>
                ) : (
                    projects.map((proj, index) => (
                        <ContentCard
                            key={
                                proj.id ||
                                `${proj.title}-${index}`
                            }
                            eyebrow={t("projects.eyebrow")}
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
