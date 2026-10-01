import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import './App.css';
import {FallinngStarsEffect} from "./pages/fallinngStarsEffect";
import {LanguagePopup, Portfolio} from "./pages/portfolio";
function App() {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const indiaHour = Number(new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        hourCycle: 'h23',
    }).format(time));
    const isNight = indiaHour >= 18 || indiaHour < 6;

    useEffect(() => {
        document.body.classList.toggle('night-mode', isNight);
        return () => document.body.classList.remove('night-mode');
    }, [isNight]);

    useEffect(() => {
        document.documentElement.lang = currentLanguage;
    }, [currentLanguage]);

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
    <div className={`app-shell${isNight ? ' night-mode' : ''}`}>
          {/* Global SEO Meta Tags */}
          <Helmet>
              <title>{t('seo.title')}</title>
              <meta name="robots" content="index, follow, max-image-preview:large" />
              <meta
                  name="description"
                  content={t('seo.description')}
              />
              <meta
                  name="keywords"
                  content={t('seo.keywords')}
              />
              <meta name="author" content="Swaroop Reddy Vudumula" />
              <link rel="canonical" href="https://swaroopvudumula.com/" />
              <meta property="og:site_name" content="Swaroop Reddy Vudumula" />
              <meta property="og:locale" content={currentLanguage.replace('-', '_')} />
              <meta property="og:image" content="https://swaroopvudumula.com/logo192.png" />
              <meta property="og:image:alt" content="Swaroop Reddy Vudumula portfolio" />

              {/* Open Graph Tags */}
              <meta property="og:title" content={t('seo.title')} />
              <meta property="og:description" content={t('seo.socialDescription')} />
              <meta property="og:url" content="https://swaroopvudumula.com/" />
              <meta property="og:type" content="website" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content={t('seo.title')} />
              <meta name="twitter:description" content={t('seo.socialDescription')} />
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
                              "description": t('seo.personDescription'),
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
                              "description": t('seo.websiteDescription'),
                              "publisher": {"@id": "https://swaroopvudumula.com/#person"}
                          }
                      ]
                  })}
              </script>
          </Helmet>
          {/* Background Radial Light Beam (Mouse Glow Effect) */}
          <div
              className={`mouse-spotlight${isNight ? ' night-moon' : ''}`}
              style={{
                  '--mouse-x': `${mousePos.x}px`,
                  '--mouse-y': `${mousePos.y}px`,
                  background: isNight
                      ? 'none'
                      : `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
              } as React.CSSProperties}
          />
          {/* Falling Stars Layer */}
          <FallinngStarsEffect/>
          {/* <LanguagePopup /> */}
          <Portfolio/>
      </div>
  );
}

export default App;
