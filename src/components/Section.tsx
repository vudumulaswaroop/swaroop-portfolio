import React, { ReactNode } from "react";

type SectionProps = {
    id: string;
    title: ReactNode;
    children: ReactNode;
    className?: string;
    lang?: string;
};

export const Section = ({ id, title, children, className = "section", lang }: SectionProps) => (
    <section id={id} className={className} lang={lang}>
        <h2 className="section-title">{title}</h2>
        {children}
    </section>
);
