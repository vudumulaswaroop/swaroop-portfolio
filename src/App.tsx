import React, { useState, useEffect } from 'react';
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
