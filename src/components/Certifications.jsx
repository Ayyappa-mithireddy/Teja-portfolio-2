import React from 'react';
import './Certifications.css';
import { Certificate } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google"
    },
    {
      title: "Cisco C++ Certifications - Essentials 1 & 2",
      issuer: "Cisco Networking Academy"
    },
    {
      title: "Cisco C++ Certifications - Advanced",
      issuer: "Cisco Networking Academy"
    },
    {
      title: "MongoDB: Relational Model to Document Model",
      issuer: "MongoDB University"
    },
    {
      title: "Oracle Java Foundations",
      issuer: "Oracle"
    },
    {
      title: "Certiport IT Specialist - HTML/CSS",
      issuer: "Certiport"
    }
  ];

  return (
    <section className="section certifications" id="certifications">
      <div className="section-header">
        <span className="section-tag">BADGES OF HONOR</span>
        <h2 className="section-title">AWARDS.</h2>
        <p className="section-subtitle">
          Industry-recognized credentials in data analytics, database architectures, and software engineering.
        </p>
      </div>

      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <div key={index} className="certification-card">
            <div className="cert-icon-wrapper">
              <Certificate className="cert-icon" />
            </div>
            <div className="cert-info">
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
