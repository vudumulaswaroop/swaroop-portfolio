import {PROJECTS} from "../constants/constants";
import React from "react";
import '../App.css';
import { ContentCard } from "../components/ContentCard";
import { Section } from "../components/Section";


export const Projects = () => (
    <Section id="projects" title="Projects">
        <div className="card-list">
            {PROJECTS.map((proj) => (
                <ContentCard
                    key={proj.title}
                    eyebrow="Project"
                    title={proj.title}
                    description={proj.description}
                    skills={proj.skills}
                    href={proj.link}
                />
            ))}
        </div>
    </Section>
);
