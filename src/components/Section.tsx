import React, { ReactNode } from "react";

type SectionProps = {
    id: string;
    title: ReactNode;
    children: ReactNode;
    className?: string;
};

export const Section = ({ id, title, children, className = "section" }: SectionProps) => (
    <section id={id} className={className}>
        <h2 className="section-title">{title}</h2>
        {children}
    </section>
);
