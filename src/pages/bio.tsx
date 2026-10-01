import React from "react";
import { Trans, useTranslation } from "react-i18next";
import {Navlinks} from "./navlinks";
export const Bio = () => {
    const { t } = useTranslation();

    return (
        <>
            <h1 className="brand-title">{t("bio.name")}</h1>
            <h2>{t("bio.philosophy")}</h2>

            <p><Trans i18nKey="bio.intro" components={{ strong: <strong key="bio-intro-strong" /> }} /></p>
            <Navlinks/>
            <div className="social-links"></div>
            <p>{t("bio.commonTheme")}</p>

            <p className="about-highlight">
                <strong>{t("bio.highlight")}</strong>
            </p>
        </>
    );
};