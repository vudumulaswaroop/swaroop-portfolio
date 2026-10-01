import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { languages } from "../constants/languages";

export const LanguagePopup = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(true);
    const [search, setSearch] = useState("");
    const searchInput = useRef<HTMLInputElement>(null);
    const filteredLanguages = Object.entries(languages).filter(([code, name]) =>
        `${code} ${name}`.toLowerCase().includes(search.trim().toLowerCase())
    );

    useEffect(() => {
        if (!isOpen) return;

        searchInput.current!.focus();
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
                setSearch("");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const closePopup = () => {
        setIsOpen(false);
        setSearch("");
    };

    if (!isOpen) return null;

    return (
        <div
            className="language-dialog-backdrop"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) closePopup();
            }}
        >
            <section
                className="language-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="language-dialog-title"
            >
                <header className="language-dialog-header">
                    <h2 id="language-dialog-title">{t("language.title")}</h2>
                    <button
                        type="button"
                        className="language-dialog-close"
                        aria-label={t("language.close")}
                        onClick={closePopup}
                    >
                        ×
                    </button>
                </header>
                <input
                    ref={searchInput}
                    className="language-search"
                    type="search"
                    value={search}
                    placeholder={t("language.search")}
                    aria-label={t("language.search")}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <div className="language-options">
                    {filteredLanguages.map(([code, name]) => (
                        <button
                            key={code}
                            type="button"
                            className="language-option"
                            aria-pressed={i18n.language === code}
                            onClick={() => {
                                void i18n.changeLanguage(code);
                                closePopup();
                            }}
                        >
                            <span>{name}</span>
                            <span className="language-code">{code}</span>
                        </button>
                    ))}
                    {filteredLanguages.length === 0 && (
                        <p className="language-empty">{t("language.noResults")}</p>
                    )}
                </div>
            </section>
        </div>
    );
};