import React, { useState, useEffect } from "react";
import "../App.css";
import { getStars } from "../services/portfolioService";

type Star = {
    id?: string;
    top: string;
    left: string;
    delay: string;
    duration: string;
};

export const FallinngStarsEffect = () => {
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        let isMounted = true;

        const loadStars = async () => {
            try {
                const data = await getStars();

                if (isMounted) {
                    setStars(data || []);
                }
            } catch (error) {
                console.error("Failed to load stars:", error);
            }
        };

        loadStars();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="star-field">
            {stars.map((star, idx) => (
                <div
                    key={star.id || `star-${idx}`}
                    className="star"
                    style={
                        {
                            "--star-top": star.top,
                            "--star-left": star.left,
                            "--star-delay": star.delay,
                            "--star-duration": star.duration,
                        } as React.CSSProperties
                    }
                />
            ))}
        </div>
    );
};
