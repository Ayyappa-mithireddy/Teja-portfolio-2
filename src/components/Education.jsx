import React from 'react';
import './Education.css';

const Education = () => {
  return (
    <section className="section education" id="education">
      <div className="section-header">
        <span className="section-tag">ACADEMIC FOUNDATION</span>
        <h2 className="section-title">ACADEMY.</h2>
      </div>

      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot">🕷️</div>
          <div className="timeline-content">
            <span className="timeline-period">2024 – 2028</span>
            <h3 className="timeline-institution">Aditya College of Engineering and Technology</h3>
            <p className="timeline-degree">B.Tech in Computer Science and Engineering (Data Science)</p>
            <div className="timeline-highlight">
              <span className="cgpa-label">Cumulative GPA:</span>
              <span className="cgpa-value">8.11 / 10</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
