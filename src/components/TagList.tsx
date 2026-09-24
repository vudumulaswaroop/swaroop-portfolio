import React from "react";

type TagListProps = {
    items: string[];
};

export const TagList = ({ items }: TagListProps) => (
    <ul className="tags">
        {items.map((item) => (
            <li key={item} className="tag">{item}</li>
        ))}
    </ul>
);
