import React, { useState, useEffect } from "react";
import "../App.css";
import { fetchPortfolioData } from "../services/sheetsApi";

type Star = {
    top: string;
    left: string;
    delay: string;
    duration: string;
};

export const FallinngStarsEffect = () => {
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        fetchPortfolioData().then((data) => {
            setStars(data.stars || []);
        });
    }, []);

    return (
        <div className="star-field">
            {stars.map((star, idx) => (
                <div
                    key={`star-${idx}`}
                    className="star"
                    style={{
                        '--star-top': star.top,
                        '--star-left': star.left,
                        '--star-delay': star.delay,
                        '--star-duration': star.duration
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
};