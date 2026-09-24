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
              <meta name="robots" content="index, follow, max-image-preview:large" />
              <meta
                  name="description"
                  content="Official portfolio of Swaroop Reddy Vudumula, a software engineer and technology leader building Agri Milk monitoring, Pharma Tech, Industrial IoT, and modern web products."
              />
              <meta
                  name="keywords"
                  content="Swaroop, Swaroop Reddy, Swaroop Reddy Vudumula, Swaroop Vudumula, Agri Milk, Pharma Tech, Pharma Machinery, UI Developer, Software Engineer"
              />
              <meta name="author" content="Swaroop Reddy Vudumula" />
              <link rel="canonical" href="https://swaroopvudumula.com/" />
              <meta property="og:site_name" content="Swaroop Reddy Vudumula" />
              <meta property="og:locale" content="en_US" />
              <meta property="og:image" content="https://swaroopvudumula.com/logo192.png" />
              <meta property="og:image:alt" content="Swaroop Reddy Vudumula portfolio" />

              {/* Open Graph Tags */}
              <meta property="og:title" content="Swaroop Reddy Vudumula | Software Engineer, Agri Milk & Pharma Tech" />
              <meta property="og:description" content="Explore projects by Swaroop Reddy Vudumula in Agri Milk, Pharma Tech, Pharma Machinery, and IT product engineering." />
              <meta property="og:url" content="https://swaroopvudumula.com/" />
              <meta property="og:type" content="website" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Swaroop Reddy Vudumula | Software Engineer, Agri Milk & Pharma Tech" />
              <meta name="twitter:description" content="Explore software engineering, Industrial IoT, Agri Milk monitoring, Pharma Tech, and web product work by Swaroop Reddy Vudumula." />
              <meta name="twitter:image" content="https://swaroopvudumula.com/logo192.png" />

              {/* Structured Data (JSON-LD) */}
              <script type="application/ld+json">
                  {JSON.stringify({
                      "@context": "https://schema.org",
                      "@graph": [
                          {
                              "@type": "Person",
                              "@id": "https://swaroopvudumula.com/#person",
                              "name": "Swaroop Reddy Vudumula",
                              "alternateName": ["Swaroop Reddy", "Swaroop Vudumula", "Swaroop"],
                              "url": "https://swaroopvudumula.com/",
                              "jobTitle": "Software Engineer & Technology Leader",
                              "description": "Software engineer and technology leader specializing in Industrial IoT, Agri Milk monitoring, Pharma Tech, and web product development.",
                              "sameAs": [
                                  "https://github.com/vudumulaswaroop",
                                  "https://www.linkedin.com/in/swaroop-reddy-vudumula/"
                              ],
                              "knowsAbout": ["Industrial IoT", "Agri Milk Monitoring", "Pharma Tech", "Pharma Machinery", "UI Development", "Software Engineering"]
                          },
                          {
                              "@type": "WebSite",
                              "@id": "https://swaroopvudumula.com/#website",
                              "url": "https://swaroopvudumula.com/",
                              "name": "Swaroop Reddy Vudumula Portfolio",
                              "description": "Portfolio of Swaroop Reddy Vudumula, software engineer and technology leader.",
                              "publisher": {"@id": "https://swaroopvudumula.com/#person"}
                          }
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
