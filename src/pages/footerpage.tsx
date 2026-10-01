import React from "react";
import { Trans, useTranslation } from "react-i18next";
import i18n from "../i18n";

export const Footerpage = () => {
    const { t } = useTranslation();

    return <footer className="footer" lang={i18n.language}>
        <p>
            <Trans
                i18nKey="footer.buildLine"
                components={{
                    react: <strong key="footer-react" />,
                    css: <strong key="footer-css" />,
                    api: <strong key="footer-api" />,
                }}
            />
        </p>
        <p>
            {t("footer.inspired")}
        </p>
    </footer>;
};
