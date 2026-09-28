import React, { useState, useEffect } from "react";
import "../App.css";
import { ContentCard } from "../components/ContentCard";
import { Section } from "../components/Section";
import { getExperiences } from "../services/portfolioService";

type Experience = {
    id?: string;
    period: string;
    role: string;
    company: string;
    description: string;
    skills: string[];
    link?: string;
};

export const Experiences = () => {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadExperiences = async () => {
            try {
                const data = await getExperiences();

                if (isMounted) {
                    setExperiences(data || []);
                }
            } catch (err) {
                console.error("Failed to load experiences:", err);

                if (isMounted) {
                    setError("Unable to load experiences.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadExperiences();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <Section id="experience" title="Experience">
            <div className="card-list">
                {loading ? (
                    <p className="loading-text">
                        Loading experiences...
                    </p>
                ) : error ? (
                    <p className="loading-text">
                        {error}
                    </p>
                ) : experiences.length === 0 ? (
                    <p className="loading-text">
                        No experience data available.
                    </p>
                ) : (
                    experiences.map((exp, index) => (
                        <ContentCard
                            key={
                                exp.id ||
                                `${exp.period}-${exp.company}-${index}`
                            }
                            eyebrow={exp.period}
                            title={`${exp.role} · ${exp.company}`}
                            description={exp.description}
                            skills={exp.skills}
                            href={exp.link}
                        />
                    ))
                )}
            </div>

            <h3 className="section-title">
                <a
                    href="/SwaroopReddyVudumulaResume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Take a look at my resume
                </a>
            </h3>
        </Section>
    );
};
