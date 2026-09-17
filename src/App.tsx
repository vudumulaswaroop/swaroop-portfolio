import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './App.css';
import {FallinngStarsEffect} from "./pages/fallinngStarsEffect";
import {Portfolio} from "./pages/portfolio";
function App() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Track cursor position for the dynamic spotlight effect
    useEffect(() => {
        const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Track active section on scroll

    return (
      <div>
          {/* Global SEO Meta Tags */}
          <Helmet>
              <title>Swaroop Reddy Vudumula | Software Engineer, Agri Milk & Pharma Tech</title>
              <meta
                  name="description"
                  content="Official portfolio of Swaroop Reddy Vudumula — Software Engineer & UI Developer showcasing Agri Milk monitoring, Pharma Tech, and pharma machinery solutions."
              />
              <meta
                  name="keywords"
                  content="Swaroop, Swaroop Reddy, Swaroop Reddy Vudumula, Swaroop Vudumula, Agri Milk, Pharma Tech, Pharma Machinery, UI Developer, Software Engineer"
              />
              <meta name="author" content="Swaroop Reddy Vudumula" />
              <link rel="canonical" href="https://swaroopvudumula.com/" />

              {/* Open Graph Tags */}
              <meta property="og:title" content="Swaroop Reddy Vudumula | Software Engineer, Agri Milk & Pharma Tech" />
              <meta property="og:description" content="Explore projects by Swaroop Reddy Vudumula in Agri Milk, Pharma Tech, Pharma Machinery, and IT product engineering." />
              <meta property="og:url" content="https://swaroopvudumula.com/" />
              <meta property="og:type" content="website" />

              {/* Structured Data (JSON-LD) */}
              <script type="application/ld+json">
                  {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Person",
                      "name": "Swaroop Reddy Vudumula",
                      "alternateName": ["Swaroop Reddy", "Swaroop Vudumula", "Swaroop"],
                      "url": "https://swaroopvudumula.com/",
                      "jobTitle": "Software Engineer & UI Developer",
                      "knowsAbout": [
                          "Agri Milk",
                          "Pharma Tech",
                          "Pharma Machinery",
                          "UI Development",
                          "Software Engineering"
                      ]
                  })}
              </script>
          </Helmet>
          {/* Background Radial Light Beam (Mouse Glow Effect) */}
          <div
              className="mouse-spotlight"
              style={{
                  background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
              }}
          />
          {/* Falling Stars Layer */}
          <FallinngStarsEffect/>
          <Portfolio/>
      </div>
  );
}

export default App;
