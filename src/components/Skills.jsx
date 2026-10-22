import React from 'react';
import './Skills.css';

const Skills = () => {
  const skills = {
    programming: [
      { name: 'Python', level: 9 },
      { name: 'SQL', level: 8 },
      { name: 'C++', level: 7 },
      { name: 'Java', level: 9 },
      { name: 'JavaScript', level: 8 },
      { name: 'HTML5', level: 8 },
      { name: 'CSS3', level: 8 }
    ],
    data_science: [
      { name: 'Pandas', level: 9 },
      { name: 'NumPy', level: 8 },
      { name: 'Scikit-learn', level: 8 },
      { name: 'Feature Engineering', level: 8 },
      { name: 'Regression', level: 8 },
      { name: 'Random Forest', level: 8 },
      { name: 'Artificial Neural Networks', level: 7 },
      { name: 'Convolutional Neural Networks', level: 7 }
    ],
    data_engineering: [
      { name: 'SQL & RDBMS', level: 8 },
      { name: 'Data Modeling', level: 7 },
      { name: 'ETL Pipelines', level: 7 },
      { name: 'MongoDB', level: 7 },
      { name: 'Power BI', level: 8 },
      { name: 'DAX', level: 8 },
      { name: 'Streamlit', level: 7 },
      { name: 'Plotly', level: 7 }
    ],
    developer_tools: [
      { name: 'Git', level: 9 },
      { name: 'GitHub', level: 9 },
      { name: 'REST APIs', level: 8 },
      { name: 'Docker', level: 8 },
      { name: 'Next.js', level: 7 }
    ]
  };

  return (
    <section className="section skills" id="skills">
      <div className="section-header">
        <span className="section-tag">TECHNICAL EXPERTISE</span>
        <h2 className="section-title">ARSENAL.</h2>
        <p className="section-subtitle">
          Core competencies spanning algorithmic problem solving, machine learning, and scalable data systems.
        </p>
      </div>

      <div className="skills-grid">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="skills-category">
            <div className="category-header">
              <span className="category-badge">🕷️</span>
              <h3 className="category-title">
                {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
              </h3>
            </div>

            <div className="skills-list">
              {items.map(item => (
                <div key={item.name} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">
                      <span className="skill-dot"></span>
                      {item.name}
                    </span>
                    <span className="skill-level">{item.level}/10</span>
                  </div>

                  <div className="skill-bar">
                    <div
                      className={`skill-bar-fill ${
                        item.level >= 8 ? 'high' : item.level >= 6 ? 'medium' : 'low'
                      }`}
                      style={{ width: `${item.level * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
