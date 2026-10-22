import React, { useState, useCallback } from 'react';
import './App.css';
import IntroAnimation from './components/IntroAnimation';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      // Explicit override flags: ?intro=true or ?intro=false
      if (urlParams.get('intro') === 'false') return false;
      if (urlParams.get('intro') === 'true') return true;
      // Show on first visit in browsing session
      return !sessionStorage.getItem('spidy_intro_v5_seen');
    } catch {
      return true;
    }
  });

  const [isRevealing, setIsRevealing] = useState(false);

  const handleRevealStart = useCallback(() => {
    setIsRevealing(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem('spidy_intro_v5_seen', 'true');
    } catch {
      // storage unavailable fallback
    }
    setShowIntro(false);
  }, []);

  return (
    <div className="app">
      {showIntro && (
        <IntroAnimation
          onRevealStart={handleRevealStart}
          onComplete={handleIntroComplete}
        />
      )}
      <div
        className={`homepage-content ${showIntro && !isRevealing ? 'intro-hidden' : ''}`}
        aria-hidden={showIntro && !isRevealing}
      >
        <Nav />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
