import React from "react";
import { Trans, useTranslation } from "react-i18next";
import i18n from "../i18n";
import '../App.css';
import { Section } from "../components/Section";


export const About = () => {
    const { t } = useTranslation();

    return <Section id="about" title={t("about.title")} lang={i18n.language}>
        <div className="about-text">
            <h2>{t("about.headline")}</h2>
            <p><Trans i18nKey="about.intro" components={{ strong: <strong key="about-intro-strong" /> }} /></p>
            <p><Trans i18nKey="about.journey" components={{ strong: <strong key="about-journey-strong" /> }} /></p>
            <p><Trans i18nKey="about.startup" components={{ strong: <strong key="about-startup-strong" /> }} /></p>
            <h2>{t("about.journeyHeading")}</h2>
            <p className="technology-flow"><strong>{t("about.flow")}</strong></p>
            <h2>{t("about.leadershipHeading")}</h2>

            <ul>
                <li>
                    <strong>{t("about.leadershipLabel")}</strong> {t("about.leadership")}
                </li>
                <li>
                    <strong>{t("about.transformationLabel")}</strong> {t("about.transformation")}
                </li>
            </ul>
        </div>
    </Section>;
};
