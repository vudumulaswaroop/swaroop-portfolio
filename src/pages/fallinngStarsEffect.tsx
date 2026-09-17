import {STARS} from "../constants/constants";
import React from "react";


export const FallinngStarsEffect = () => (
    <div className="star-field">
        {STARS.map((star, idx) => (
            <div
                key={idx}
                className="star"
                style={{
                    '--star-top': star.top,
                    '--star-left': star.left,
                    '--star-delay': star.delay,
                    '--star-duration': star.duration
                }as React.CSSProperties}
            />
        ))}
    </div>

);
