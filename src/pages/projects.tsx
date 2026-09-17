import {PROJECTS} from "../constants/constants";
import React from "react";
import '../App.css';


export const Projects = () => (

    <section id="projects" className="section">
        <h2 className="section-title">Projects</h2>
        <div className="card-list">
            {PROJECTS.map((proj, index) => (
                <a
                    key={index}
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card"
                >
                    <div className="card-header">Project</div>
                    <div>
                        <h3 className="card-title">{proj.title} ↗</h3>
                        <p className="card-description">{proj.description}</p>
                        <ul className="tags">
                            {proj.skills.map((skill, sIdx) => (
                                <li key={sIdx} className="tag">{skill}</li>
                            ))}
                        </ul>
                    </div>
                </a>
            ))}
        </div>
    </section>
);
