import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css';

function About() {
  const [about, setAbout] = useState(null);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    fetchAbout();
    fetchExperience();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await axios.get('/api/about');
      setAbout(response.data);
    } catch (error) {
      console.error('Error fetching about:', error);
      setAbout({
        title: 'About Me',
        introduction: 'MCA graduate with a strong passion for Python development and software engineering. Fresher eager to apply academic knowledge and build real-world applications with modern technologies.',
        background: 'I specialize in Python backend development, full-stack web development with React & Flask, and software design principles. Committed to writing clean, maintainable code and solving real-world problems.',
        highlights: ['MCA Graduate from ST Aloysius', 'Python Development Enthusiast', 'Full-Stack Web Developer', 'Software Engineering Focused'],
        education: [{ degree: 'Master of Computer Applications (MCA)', field: 'Software Development & Python', institution: 'ST Aloysius (Deemed to be University)', year: '2024' }]
      });
    }
  };

  const fetchExperience = async () => {
    try {
      const response = await axios.get('/api/experience');
      setExperience(response.data);
    } catch (error) {
      console.error('Error fetching experience:', error);
      setExperience([
        {
          id: 1,
          position: 'Fresher Developer',
          company: 'Self-Learning & Practice Projects',
          duration: '2024 - Present',
          description: 'Building practical projects to master full-stack development and Python ecosystem.',
          responsibilities: ['Developing Flask REST APIs with Python', 'Building responsive React frontends', 'Database design and SQL queries', 'Git version control and clean code practices']
        }
      ]);
    }
  };

  if (!about) return <div className="loading">Loading...</div>;

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-shell">
          <div className="about-header">
            <h1>{about.title}</h1>
            <p className="about-subtitle">MCA Graduate | Python Developer | Software Engineer</p>
          </div>
        </div>
      </section>

      <section className="about-content-section">
        <div className="about-shell">
          <div className="intro-card">
            <h2>Who I Am</h2>
            <p>{about.introduction}</p>
          </div>

          <div className="content-grid">
            <div className="about-card">
              <h2>Specialization</h2>
              <p>{about.background}</p>
            </div>

            <div className="about-card">
              <h2>Education</h2>
              {about.education.map((edu, idx) => (
                <div key={idx} className="education-item">
                  <h3>{edu.degree}</h3>
                  <p className="field">{edu.field}</p>
                  <p className="institution">{edu.institution}</p>
                  <p className="year">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="highlights-section">
            <h2>Why Me</h2>
            <div className="highlights-grid">
              {about.highlights.map((highlight, idx) => (
                <div key={idx} className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {experience.length > 0 && (
        <section className="experience-section">
          <div className="about-shell">
            <h2>Current Journey</h2>
            <div className="key-message">
              <p className="key-text"><span className="pro-emoji">⚡</span> <strong>From Learning to Building:</strong> Applying MCA expertise into production-grade solutions.</p>
            </div>
            <div className="experience-timeline">
              {experience.map((exp) => (
                <div key={exp.id} className="experience-item">
                  <div className="experience-marker"></div>
                  <div className="experience-content">
                    <div className="experience-header">
                      <h3>{exp.position}</h3>
                      <span className="duration">{exp.duration}</span>
                    </div>
                    <p className="company">{exp.company}</p>
                    <p className="description">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="expertise-section">
        <div className="about-shell">
          <h2>Core Competencies</h2>
          <div className="expertise-grid">
            <div className="expertise-card">
              <h3><span className="pro-emoji">◆</span> Backend Engineering</h3>
              <p>Python, REST APIs, system design, database optimization, and scalable architecture.</p>
            </div>
            <div className="expertise-card">
              <h3><span className="pro-emoji">▢</span> Frontend Development</h3>
              <p>React, JavaScript ES6+, responsive design, performance optimization.</p>
            </div>
            <div className="expertise-card">
              <h3><span className="pro-emoji">◇</span> Data & Databases</h3>
              <p>SQL, relational design, query optimization, data management.</p>
            </div>
            <div className="expertise-card">
              <h3><span className="pro-emoji">◈</span> Software Craft</h3>
              <p>Clean architecture, Git workflows, testing, design patterns.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="about-shell">
          <h2>Let's Connect</h2>
          <p>Open to internships, junior developer roles, and exciting collaboration opportunities.</p>
          <a href="/contact" className="cta-button">Get In Touch</a>
        </div>
      </section>
    </div>
  );
}

export default About;
