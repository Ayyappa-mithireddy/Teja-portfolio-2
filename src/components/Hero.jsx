import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Hero.css';

const Hero = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeCmd, setActiveCmd] = useState(null);
  const [terminalState, setTerminalState] = useState('idle');
  const [typewriterText, setTypewriterText] = useState('');
  const timerRefs = useRef([]);

  const clearAllTimers = useCallback(() => {
    timerRefs.current.forEach(timer => {
      clearTimeout(timer);
      clearInterval(timer);
    });
    timerRefs.current = [];
  }, []);

  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  // Flip card handlers
  const handleFlipToBack = () => {
    setIsFlipped(true);
  };

  const handleFlipToFront = (e) => {
    if (e) e.stopPropagation();
    setIsFlipped(false);
  };

  // Keyboard shortcut: Escape flips back to front
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFlipped) {
        setIsFlipped(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped]);

  const handleExecuteCommand = (cmd) => {
    clearAllTimers();
    setActiveCmd(cmd);

    if (cmd === 'whoami') {
      setTerminalState('whoami');
    } else if (cmd === 'origin') {
      setTerminalState('origin');
    } else if (cmd === 'classified') {
      setTerminalState('classified');
    } else if (cmd === 'glorious-purpose') {
      // 1. Authenticating...
      setTerminalState('glorious-auth');
      setTypewriterText('');

      // 2. Show ACCESS DENIED (after 500ms)
      const t1 = setTimeout(() => {
        setTerminalState('glorious-denied');

        // 3. Transition to OVERRIDE ACCEPTED (after 600ms)
        const t2 = setTimeout(() => {
          setTerminalState('glorious-override');

          // 4. Start typing quote character by character (after 450ms)
          const t3 = setTimeout(() => {
            setTerminalState('glorious-typing');
            const fullQuote = "“I am burdened with glorious purpose.”";
            let charIndex = 0;

            const typeInterval = setInterval(() => {
              charIndex++;
              setTypewriterText(fullQuote.slice(0, charIndex));
              if (charIndex >= fullQuote.length) {
                clearInterval(typeInterval);
                setTerminalState('glorious-done');
              }
            }, 36);

            timerRefs.current.push(typeInterval);
          }, 450);
          timerRefs.current.push(t3);
        }, 600);
        timerRefs.current.push(t2);
      }, 500);
      timerRefs.current.push(t1);
    }
  };

  const handleClearTerminal = (e) => {
    if (e) e.stopPropagation();
    clearAllTimers();
    setActiveCmd(null);
    setTerminalState('idle');
    setTypewriterText('');
  };

  return (
    <div className="hero-wrapper">
      <section className="hero" id="home">

        {/* Left Side: Typography & CTA */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="spider-bullet">🕷️</span>
            <span className="hero-tagline">YOUR FRIENDLY NEIGHBORHOOD ENGINEER</span>
          </div>

          <div className="hero-title-group">
            <h1 className="hero-name-line">TEJA</h1>
            <h1 className="hero-name-line">AYYAPPA.</h1>
          </div>

          <p className="hero-subheading">
            Computer Science & Data Science Engineer specializing in Machine Learning,
            Data Pipelines, Analytics Dashboards, and Intelligent Applications.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary-red">
              EXPLORE PROJECTS
            </a>
            <a
              href="/Teja_Ayyappa_Resume_Revised.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark-resume"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="resume-icon"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              SEE RESUME
            </a>
          </div>
        </div>

        {/* Right Side: Hanging Developer ID Card with 3D Flip Backside */}
        <div className="hero-id-container">
          {/* Lanyard Strap & Clip */}
          <div className="id-lanyard-wrapper" aria-hidden="true">
            <div className="id-lanyard-strap">
              <span className="strap-text">TEJA AYYAPPA 🕷️ DATA SCIENCE</span>
            </div>
            <div className="id-lanyard-buckle"></div>
            <div className="id-lanyard-clip">
              <div className="clip-loop"></div>
              <div className="clip-hook"></div>
            </div>
          </div>

          {/* 3D Flip Wrapper */}
          <div className="id-card-3d-wrapper">
            <div className={`id-card-flipper ${isFlipped ? 'flipped' : ''}`}>

              {/* ============================================================
                  FRONT FACE: Original Preserved ID Card
                  ============================================================ */}
              <div
                className="id-badge-card id-card-front"
                onClick={handleFlipToBack}
                role="button"
                tabIndex={isFlipped ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleFlipToBack();
                  }
                }}
                aria-label="Developer ID Card. Click or press Enter to flip to classified terminal."
              >
                {/* Gloss Reflection Overlay */}
                <div className="id-badge-gloss"></div>

                {/* Top Lanyard Slot Cutout */}
                <div className="id-punch-hole"></div>

                {/* Dark Header Banner */}
                <div className="id-card-header">
                  <div className="id-header-left">
                    <div className="id-avatar-icon">TA</div>
                    <div className="id-header-text">
                      <span className="id-header-title">DEVELOPER ID</span>
                      <span className="id-header-subtitle">TA2028</span>
                    </div>
                  </div>
                  <div className="id-chip-icon">
                    <span className="id-spider-chip">🕷️</span>
                  </div>
                </div>

                {/* Photo Section */}
                <div className="id-photo-wrapper">
                  <div className="id-photo-frame">
                    <img
                      src="/images/teja_id.jpg"
                      alt="Teja Ayyappa"
                      className="id-photo-img"
                    />
                  </div>
                </div>

                {/* Name and Designation */}
                <div className="id-identity-info">
                  <h3 className="id-full-name">TEJA AYYAPPA</h3>
                  <p className="id-designation">Data Science Engineer</p>
                </div>

                {/* Metadata 3-Column Grid */}
                <div className="id-meta-grid">
                  <div className="id-meta-col">
                    <span className="id-meta-label">CGPA</span>
                    <span className="id-meta-val">8.11</span>
                  </div>
                  <div className="id-meta-col">
                    <span className="id-meta-label">DEPT.</span>
                    <span className="id-meta-val">Data Science</span>
                  </div>
                  <div className="id-meta-col">
                    <span className="id-meta-label">VALID TILL</span>
                    <span className="id-meta-val">2028</span>
                  </div>
                </div>

                {/* Card Footer: Barcode, Flip Hint, & Hologram Seal */}
                <div className="id-card-footer">
                  <div className="id-barcode-container">
                    <div className="id-barcode-lines" aria-hidden="true">
                      <span className="bar-b"></span><span className="bar-t"></span><span className="bar-m"></span>
                      <span className="bar-t"></span><span className="bar-b"></span><span className="bar-s"></span>
                      <span className="bar-t"></span><span className="bar-m"></span><span className="bar-b"></span>
                      <span className="bar-t"></span><span className="bar-s"></span><span className="bar-b"></span>
                      <span className="bar-m"></span><span className="bar-t"></span><span className="bar-b"></span>
                      <span className="bar-s"></span><span className="bar-t"></span><span className="bar-m"></span>
                      <span className="bar-b"></span><span className="bar-t"></span><span className="bar-b"></span>
                      <span className="bar-s"></span><span className="bar-m"></span><span className="bar-t"></span>
                      <span className="bar-b"></span><span className="bar-t"></span><span className="bar-s"></span>
                    </div>
                    <span className="id-barcode-num">TA-2024-81107-DS</span>
                  </div>

                  <div className="id-hologram-seal" title="Official Seal">
                    <span className="hologram-spider">🕸️</span>
                  </div>
                </div>
              </div>

              {/* ============================================================
                  BACK FACE: Secret Developer Terminal (TVA / Loki Easter Egg)
                  ============================================================ */}
              <div
                className="id-badge-card id-card-back"
                role="region"
                aria-label="Secret Classified Terminal"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Back Cutout */}
                <div className="id-punch-hole id-punch-hole-back"></div>

                {/* Terminal Header */}
                <div className="terminal-header">
                  <div className="terminal-header-info">
                    <span className="tva-icon" aria-hidden="true">🐍</span>
                    <div>
                      <div className="terminal-title">CLASSIFIED TERMINAL</div>
                      <div className="terminal-subtitle">TIMELINE-616</div>
                    </div>
                  </div>

                  <div className="terminal-header-controls">
                    <span className="terminal-online-status" title="System operational">
                      <span className="status-indicator-dot"></span> ONLINE
                    </span>
                    <button
                      type="button"
                      className="terminal-return-btn"
                      onClick={handleFlipToFront}
                      title="Return to card front"
                      aria-label="Return to card front"
                    >
                      ↺ FRONT
                    </button>
                  </div>
                </div>

                {/* Terminal Command Pills */}
                <div className="terminal-controls-bar">
                  <span className="cmd-label">DIRECTIVES:</span>
                  <div className="cmd-buttons-grid">
                    <button
                      type="button"
                      className={`terminal-cmd-pill ${activeCmd === 'whoami' ? 'active' : ''}`}
                      onClick={() => handleExecuteCommand('whoami')}
                      aria-label="Execute whoami command"
                    >
                      whoami
                    </button>
                    <button
                      type="button"
                      className={`terminal-cmd-pill ${activeCmd === 'origin' ? 'active' : ''}`}
                      onClick={() => handleExecuteCommand('origin')}
                      aria-label="Execute origin command"
                    >
                      origin
                    </button>
                    <button
                      type="button"
                      className={`terminal-cmd-pill ${activeCmd === 'classified' ? 'active' : ''}`}
                      onClick={() => handleExecuteCommand('classified')}
                      aria-label="Execute classified command"
                    >
                      classified
                    </button>
                    <button
                      type="button"
                      className={`terminal-cmd-pill cmd-gold ${activeCmd === 'glorious-purpose' ? 'active' : ''}`}
                      onClick={() => handleExecuteCommand('glorious-purpose')}
                      title="Access classified protocol"
                      aria-label="Execute glorious-purpose protocol"
                    >
                      glorious-purpose
                    </button>
                  </div>
                </div>

                {/* Terminal Output Screen */}
                <div className="terminal-screen" aria-live="polite">
                  {terminalState === 'idle' && (
                    <div className="terminal-output-empty">
                      <div className="term-line prompt-line">
                        <span className="term-prompt">dev@variant-ta:~$</span>
                        <span className="term-cursor">_</span>
                      </div>
                      <div className="term-line muted-desc">
                        Awaiting directive... Click a protocol above to query archives.
                      </div>
                    </div>
                  )}

                  {terminalState === 'whoami' && (
                    <div className="terminal-output-block">
                      <div className="term-line prompt-line">
                        <span className="term-prompt">dev@variant-ta:~$</span> whoami
                      </div>
                      <div className="term-line status-success">IDENTITY CONFIRMED</div>
                      <div className="term-line output-text">
                        Teja Ayyappa — Computer Science student specializing in Data Science.
                      </div>
                    </div>
                  )}

                  {terminalState === 'origin' && (
                    <div className="terminal-output-block">
                      <div className="term-line prompt-line">
                        <span className="term-prompt">dev@variant-ta:~$</span> origin
                      </div>
                      <div className="term-line status-info">STILL BECOMING. STILL BUILDING.</div>
                      <div className="term-line output-text">
                        Continuously developing machine learning models, resilient data pipelines, and intelligent analytical systems.
                      </div>
                    </div>
                  )}

                  {terminalState === 'classified' && (
                    <div className="terminal-output-block">
                      <div className="term-line prompt-line">
                        <span className="term-prompt">dev@variant-ta:~$</span> classified
                      </div>
                      <div className="term-line status-denied">ACCESS DENIED</div>
                      <div className="term-line output-text">
                        This information is classified.
                      </div>
                      <span className="term-denied-badge">[RESTRICTED // OMEGA CLEARANCE]</span>
                    </div>
                  )}

                  {terminalState === 'glorious-auth' && (
                    <div className="terminal-output-block">
                      <div className="term-line prompt-line">
                        <span className="term-prompt">dev@variant-ta:~$</span> glorious-purpose
                      </div>
                      <div className="term-line status-pending">
                        <span className="pulse-dot">●</span> AUTHENTICATING...
                      </div>
                    </div>
                  )}

                  {terminalState === 'glorious-denied' && (
                    <div className="terminal-output-block">
                      <div className="term-line prompt-line">
                        <span className="term-prompt">dev@variant-ta:~$</span> glorious-purpose
                      </div>
                      <div className="term-line status-denied glitch-text">ACCESS DENIED</div>
                      <div className="term-line muted-desc">Bypassing security layer...</div>
                    </div>
                  )}

                  {(terminalState === 'glorious-override' || terminalState === 'glorious-typing' || terminalState === 'glorious-done') && (
                    <div className="terminal-output-block easter-egg-block">
                      <div className="term-line prompt-line">
                        <span className="term-prompt">dev@variant-ta:~$</span> glorious-purpose
                      </div>
                      <div className="term-line status-override">OVERRIDE ACCEPTED</div>

                      {/* Character by character typing */}
                      <div className="easter-egg-quote-box">
                        <span className="easter-egg-quote">{typewriterText}</span>
                        {terminalState === 'glorious-typing' && (
                          <span className="typewriter-cursor">▌</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Terminal Footer */}
                <div className="terminal-footer">
                  <span className="terminal-footer-serial">LOOM // VARIANT-81107</span>
                  <div className="terminal-footer-actions">
                    <button
                      type="button"
                      className="terminal-clear-btn"
                      onClick={handleClearTerminal}
                      title="Clear terminal screen"
                      aria-label="Clear terminal screen"
                    >
                      CLEAR
                    </button>
                    <button
                      type="button"
                      className="terminal-back-btn"
                      onClick={handleFlipToFront}
                      title="Return to card front"
                      aria-label="Return to card front"
                    >
                      RETURN ↺
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Spider-Man Angled Marquee Ribbons */}
      <div className="hero-ticker-container" aria-hidden="true">
        {/* Red Ribbon */}
        <div className="ticker-ribbon ribbon-red">
          <div className="ticker-track">
            <span>DATA SCIENCE 🕷️</span>
            <span>MACHINE LEARNING 🕷️</span>
            <span>FULL STACK ENGINEER 🕷️</span>
            <span>DATA PIPELINES 🕷️</span>
            <span>POWER BI & DAX 🕷️</span>
            <span>PREDICTIVE MODELING 🕷️</span>
            <span>DATA SCIENCE 🕷️</span>
            <span>MACHINE LEARNING 🕷️</span>
            <span>FULL STACK ENGINEER 🕷️</span>
            <span>DATA PIPELINES 🕷️</span>
            <span>POWER BI & DAX 🕷️</span>
            <span>PREDICTIVE MODELING 🕷️</span>
          </div>
        </div>

        {/* Dark Ribbon */}
        <div className="ticker-ribbon ribbon-dark">
          <div className="ticker-track ticker-reverse">
            <span>PYTHON 🕸️</span>
            <span>SQL & RDBMS 🕸️</span>
            <span>SCIKIT-LEARN 🕸️</span>
            <span>REACT.JS 🕸️</span>
            <span>STREAMLIT 🕸️</span>
            <span>MONGODB 🕸️</span>
            <span>DOCKER & GIT 🕸️</span>
            <span>PYTHON 🕸️</span>
            <span>SQL & RDBMS 🕸️</span>
            <span>SCIKIT-LEARN 🕸️</span>
            <span>REACT.JS 🕸️</span>
            <span>STREAMLIT 🕸️</span>
            <span>MONGODB 🕸️</span>
            <span>DOCKER & GIT 🕸️</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
