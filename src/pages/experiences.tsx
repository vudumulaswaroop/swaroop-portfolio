import React, { useState, useEffect } from "react";
import '../App.css';
import { ContentCard } from "../components/ContentCard";
import { Section } from "../components/Section";
import { fetchPortfolioData } from "../services/sheetsApi";

type Experience = {
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

useEffect(() => {
    let isMounted = true;

    fetchPortfolioData().then((data) => {
        if (isMounted) {
            setExperiences(data.experiences || []);
            setLoading(false);
        }
    });

    return () => {
        isMounted = false;
    };
}, []);

    return (
        <Section id="experience" title="Experience">
            <div className="card-list">
                {loading ? (
                    <p className="loading-text">Loading experiences...</p>
                ) : (
                    experiences.map((exp, index) => (
                        <ContentCard
                            key={`${exp.period}-${exp.company}-${index}`}
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