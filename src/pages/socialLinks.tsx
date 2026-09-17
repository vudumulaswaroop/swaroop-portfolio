import React from "react";
import '../App.css';

export const SocialLinks = () => (
    <ul className="social-links">
        <li>
            <a href="https://github.com/vudumulaswaroop" target="_blank" rel="noreferrer" aria-label="GitHub">
                <span className="icon icon-github" />
            </a>
        </li>
        <li>
            <a href="https://www.linkedin.com/in/swaroop-reddy-vudumula/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <span className="icon icon-linkedin" />
            </a>
        </li>
        <li>
            <a href="mailto:swaroop.vudumula@gmail.com" aria-label="Email">
                <span className="icon icon-email" />
            </a>
        </li>
    </ul>
);