import React, {useEffect, useState} from "react";
export const Navlinks = ()=> {

    const [activeSection, setActiveSection] = useState('about');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['about', 'experience', 'projects','contactus'];
            const scrollPosition = window.scrollY + 200;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="nav-menu">
        <ul className="nav-list">
            {['about', 'experience', 'projects','contactus'].map((id) => (
                <li key={id} className={`nav-item ${activeSection === id ? 'active' : ''}`}>
                    <a href={`#${id}`}>
                        <span className="nav-line"></span>
                        <span>{id}</span>
                    </a>
                </li>
            ))}
        </ul>
    </nav>
    )
}
