import React from "react";
import '../App.css';
import { Section } from "../components/Section";


export const About = () => (
    <Section id="about" title="About">

        <div className="about-text">

            <h2>Technology Leader From Enterprise Engineering to Startup Building</h2>

            <p>
                I am a <strong>technology leader and hands-on software architect</strong> with
                experience spanning <strong>Scientific IT, Healthcare, High-Scale Web Platforms,
                Industrial IoT, Pharma Manufacturing, AI, and Startup Product Development</strong>.
            </p>

            <p>
                My career has evolved from building software for
                <strong> DNA diagnostic and scientific instruments</strong>, to engineering
                healthcare and pharmacy platforms, to architecting web ecosystems supporting
                <strong> 50,000+ automotive dealership websites</strong>, and now leading
                technology and operations while transforming industrial machinery into
                connected, data-driven systems.
            </p>
            <p>
                Alongside my enterprise experience, I continue to build
                <strong> startup-style technology products</strong> focused on solving
                real-world business and operational problems.
            </p>

            <h2>Scientific IT → Healthcare → Massive Web Scale → Industrial IoT → Leadership</h2>






            <p className="technology-flow">
                <strong>
                    Physical Machinery → Sensors → Data → Cloud → Analytics → React Dashboards
                    → Business Decisions
                </strong>
            </p>







            <h2>Leadership &amp; Technology</h2>

            <ul>
                <li>
                    <strong>Technology &amp; Executive Leadership:</strong>
                    Leading a 40+ person organization across engineering, manufacturing,
                    and business operations—aligning technical strategy, execution priorities,
                    and digital transformation to drive measurable operational growth.
                </li>

                <li>
                    <strong>Digital Transformation:</strong>
                    Modernizing traditional operational workflows and connecting
                    physical manufacturing environments with modern software platforms.
                </li>


            </ul>






        </div>
    </Section>
);
