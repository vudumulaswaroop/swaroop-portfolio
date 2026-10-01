import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import '../App.css';

export const SocialLinks = () => {
    const { t } = useTranslation();

    return <ul className="social-links" lang={i18n.language}>
        <li>
            <a href="https://github.com/vudumulaswaroop" target="_blank" rel="noreferrer" aria-label={t("social.github")}>
                <span className="icon icon-github" />
            </a>
        </li>
        <li>
            <a href="https://www.linkedin.com/in/swaroop-reddy-vudumula/" target="_blank" rel="noreferrer" aria-label={t("social.linkedin")}>
                <span className="icon icon-linkedin" />
            </a>
        </li>
        <li>
            <a href="mailto:swaroop.vudumula@gmail.com" aria-label={t("social.email")}>
                <span className="icon icon-email" />
            </a>
        </li>
    </ul>;
};