import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get('/api/portfolio');
      setPortfolio(response.data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  if (!portfolio) return <div className="loading">Loading...</div>;

  const resumeUrl = portfolio.resumeUrl || '/resume.pdf';
  const socialEntries = Object.entries(portfolio.social || {});

  const highlightCards = [
    {
      title: 'About me',
      body: 'Fresher full-stack developer focused on building clean UI, simple APIs, and learning by doing.'
    },
    {
      title: 'What I bring',
      body: 'Curiosity, consistency, and the ability to break problems into small, shippable pieces.'
    },
    {
      title: 'Current focus',
      body: 'React patterns, Flask REST, form validation, and polishing accessibility basics.'
    }
  ];

  return (
    <div className="home">
      <section className="home-hero">
        <div className="orb orb-1" aria-hidden="true"></div>
        <div className="orb orb-2" aria-hidden="true"></div>
        <div className="home-shell">
          <div className="hero-left">
            <h1 className="hero-title">{portfolio.name}</h1>
            <p className="hero-subtitle">{portfolio.title}</p>
            <p className="hero-body">{portfolio.bio}</p>

            <div className="hero-meta">
              <div className="meta-pill">📍 {portfolio.location}</div>
              <a href={`mailto:${portfolio.email}`} className="meta-pill link-pill">✉️ {portfolio.email}</a>
            </div>

            <div className="hero-actions">
              <a href={resumeUrl} className="btn primary" download>Download Resume</a>
              <Link to="/projects" className="btn secondary">See My Projects</Link>
              <Link to="/contact" className="btn ghost">Contact Me</Link>
            </div>

            <div className="hero-social">
              {socialEntries.map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-chip"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-profile-card">
              <div className="hero-photo-wrap">
                <img 
                  src="/ajay.png" 
                  alt={portfolio.name} 
                  className="hero-photo"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-panels">
        <div className="panel-grid">
          {highlightCards.map(card => (
            <div key={card.title} className="panel highlight">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-shell">
          <h2>Ready to collaborate?</h2>
          <p>Let's build something great together. Reach out for internships, roles, or project partnerships.</p>
          <Link to="/contact" className="btn primary">Get in touch</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
