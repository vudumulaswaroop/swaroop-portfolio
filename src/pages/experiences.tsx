import React from "react";
import '../App.css';
import {EXPERIENCES} from "../constants/constants";
import { ContentCard } from "../components/ContentCard";
import { Section } from "../components/Section";


export const Experiences = () => (
    <Section id="experience" title="Experience">
        <div className="card-list">
            {EXPERIENCES.map((exp) => (
                <ContentCard
                    key={`${exp.period}-${exp.company}`}
                    eyebrow={exp.period}
                    title={`${exp.role} · ${exp.company}`}
                    description={exp.description}
                    skills={exp.skills}
                    href={exp.link}
                />
            ))}
        </div>
        <h3 className="section-title">
            <a
                href="/SwaroopReddyVudumulaResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
            >
                Take a look of resume
            </a>
        </h3>
    </Section>

);
