import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="section about" id="about">
      {/* Background Web Watermark */}
      <div className="section-web-watermark" aria-hidden="true">
        <img src="/images/spidy/web1.png" alt="" className="watermark-img" />
      </div>

      <div className="section-header">
        <span className="section-tag">ORIGIN STORY</span>
        <h2 className="section-title">EVERY HERO HAS A BEGINNING. THIS IS MINE.</h2>
        <p className="origin-lead-quote">
          “Not bitten by a radioactive spider. Just a curious mind, a laptop, and an obsession with building things that matter.”
        </p>
      </div>

      <div className="about-content">
        {/* Left Side: Avatar & Hero Persona */}
        <div className="about-image-wrapper">
          <div className="avatar-frame">
            <img
              src="/images/teja_real.jpg"
              alt="Teja Ayyappa"
              className="about-photo"
            />
          </div>
          <div className="avatar-caption">
            <h3>Teja Ayyappa</h3>
            <span className="avatar-role-tag">THE MIND BEHIND THE MASK</span>
            <div className="status-badge">
              <span className="status-pulse-dot"></span>
              <span className="status-text">STILL BECOMING</span>
            </div>
          </div>
        </div>

        {/* Right Side: The Narrative Matter */}
        <div className="about-text">
          <p className="story-lead">
            Somewhere between lines of code, late-night ideas, and things that refused to work, 
            <span className="story-lead-highlight"> I found my world.</span>
          </p>

          <p className="story-para">
            I'm a Computer Science student specializing in Data Science, exploring the intersection of 
            AI, technology, and creativity. I build intelligent systems, experiment with machine learning, 
            engineer data-driven solutions, and turn ambitious ideas into things you can actually experience.
          </p>

          <div className="story-callout-card">
            <blockquote className="callout-quote">
              “I’m not here to pretend I know it all. I’m here to explore the unknown, experiment without limits, 
              and build things that make people stop and say, <em>‘Wait, you made that?’</em>”
            </blockquote>
          </div>

          <p className="story-para">
            Because the world doesn’t need another person who simply follows the blueprint. 
            It needs people willing to imagine what comes next.
          </p>

          <p className="story-para story-evolving">
            My story is still being written. The suit isn't perfect. The mission keeps changing. 
            And there’s a long way to go.
          </p>

          <div className="responsibility-banner">
            <div className="responsibility-accent"></div>
            <p className="responsibility-quote">
              Because with great curiosity comes great responsibility. <span className="banner-web">🕸️</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
