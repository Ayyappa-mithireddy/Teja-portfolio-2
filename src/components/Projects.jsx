import React from 'react';
import './Projects.css';
import { GitBranch } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Customer Churn Prediction",
      description: "Machine learning classification pipeline built on 7,043 telecom records to identify important customer churn drivers.",
      technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Machine Learning"],
      metrics: "0.84 ROC-AUC | 80.6% Accuracy",
      url: "https://github.com/Ayyappa-mithireddy/churn-prediction"
    },
    {
      title: "PhonePe Transactions Dashboard",
      description: "Interactive Power BI analytics dashboard using a star-schema data model and 25+ dynamic DAX measures across transfers, recharges, and insurance.",
      technologies: ["Power BI", "DAX", "Data Modeling", "SQL"],
      metrics: "5-page interactive report",
      url: "https://github.com/Ayyappa-mithireddy/phonepe-dashboard"
    },
    {
      title: "Student Academic Risk Intelligence System",
      description: "Statistical early-warning dashboard built with Python, Streamlit, and Plotly to identify students who may be academically at risk.",
      technologies: ["Python", "Pandas", "Streamlit", "Plotly", "Data Analytics"],
      metrics: "Composite Risk Score Engine",
      url: "https://github.com/Ayyappa-mithireddy/Student_Analysis"
    },
    {
      title: "AgriConnect",
      description: "Digital agricultural marketplace prototype featuring a multilingual rule engine, fair pricing, and role-based portals.",
      technologies: ["Python", "JavaScript", "APIs", "Data-Driven Applications"],
      metrics: "Agricultural Data Marketplace",
      url: "https://github.com/Ayyappa-mithireddy/agriconnect"
    }
  ];

  return (
    <section className="section projects" id="projects">
      <div className="section-header">
        <span className="section-tag">FEATURED MISSIONS</span>
        <h2 className="section-title">BUILDS.</h2>
        <p className="section-subtitle">
          Applied data science, business intelligence dashboards, and intelligent systems.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-card-header">
              <span className="card-badge">MISSION #{index + 1}</span>
              <span className="project-spider-icon">🕷️</span>
            </div>

            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tech-tags">
                {project.technologies.map(tech => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-metrics">
                <span className="project-metric-label">Impact:</span>
                <span className="project-metric">{project.metrics}</span>
              </div>

              <div className="project-actions">
                <a
                  href={project.url}
                  className="btn-project btn-github"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitBranch size={16} />
                  View Repository
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
