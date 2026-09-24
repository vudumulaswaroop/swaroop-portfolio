import React, { ReactNode } from "react";
import { TagList } from "./TagList";

type ContentCardProps = {
    eyebrow: ReactNode;
    title: ReactNode;
    description: ReactNode;
    skills: string[];
    href?: string;
};

export const ContentCard = ({
    eyebrow,
    title,
    description,
    skills,
    href,
}: ContentCardProps) => {
    const content = (
        <>
            <div className="card-header">{eyebrow}</div>
            <div>
                <h3 className="card-title">{title}{href && " ↗"}</h3>
                <p className="card-description">{description}</p>
                <TagList items={skills} />
            </div>
        </>
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="card">
                {content}
            </a>
        );
    }

    return <div className="card">{content}</div>;
};
