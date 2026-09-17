import {About} from "./about";
import {Experiences} from "./experiences";
import {Projects} from "./projects";
import {Footerpage} from "./footerpage";
import React from "react";
import ContactUs from "./contactUS";


export const Mainpage = () => (
    <main className="main-content">
        {/* About Section */}
        <About/>
        {/* Experience Section */}
        <Experiences/>
        {/* Projects Section */}
        <Projects/>
        <ContactUs/>
        {/* Footer */}
        <Footerpage/>
    </main>

);
