import React from "react";
import '../App.css';
import {EXPERIENCES} from "../constants/constants";


export const Experiences = () => (
    <section id="experience" className="section">
        <h2 className="section-title">Experience</h2>
        <div className="card-list">
            {EXPERIENCES.map((exp, index) => {
                const CardComponent = exp.link ? 'a' : 'div';
                const linkProps = exp.link ? { href: exp.link, target: "_blank", rel: "noopener noreferrer" } : {};

                return (
                    <CardComponent key={index} {...linkProps} className="card">
                        <div className="card-header">{exp.period}</div>
                        <div>
                            <h3 className="card-title">
                                {exp.role} · {exp.company} {exp.link && '↗'}
                            </h3>
                            <p className="card-description">{exp.description}</p>
                            <ul className="tags">
                                {exp.skills.map((skill, sIdx) => (
                                    <li key={sIdx} className="tag">{skill}</li>
                                ))}
                            </ul>
                        </div>
                    </CardComponent>
                );
            })}
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
    </section>

);
