import React from "react";
import {SocialLinks} from "./socialLinks";
import {Mainpage} from "./mainpage";
import {Bio} from "./bio";
export const Portfolio = () => (
    <div className="portfolio-container">
        {/* Left Sticky Sidebar Header */}
        <header className="sidebar">
            <div>
                <Bio/>
                {/* Navigation links */}
            </div>

            {/* Social Links */}
            <SocialLinks/>
        </header>

        {/* Right Main Content */}
        <Mainpage/>
    </div>
);