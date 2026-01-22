import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/contact', formData);
      console.log('Contact form response:', response.data);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    } catch (error) {
      console.error('Error submitting contact form:', error.response?.data || error.message);
      alert('Failed to send message. Please try again or contact directly at ajaydevadiga600@gmail.com');
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <section className="contact-section">
        <div className="contact-hero">
          <h1 className="hero-title">Let's Create Something Extraordinary</h1>
          <p className="hero-subtitle">I'm always open to exciting opportunities and meaningful conversations</p>
          <div className="hero-accent"></div>
        </div>

        <div className="contact-wrapper">
          <div className="contact-grid">
            {/* Contact Methods */}
            <div className="contact-methods">
              <div className="method-card">
                <div className="method-icon">✉</div>
                <h3>Email</h3>
                <a href="mailto:ajaydevadiga600@gmail.com">ajaydevadiga600@gmail.com</a>
              </div>
              <div className="method-card">
                <div className="method-icon">☎</div>
                <h3>Phone</h3>
                <a href="tel:+917795068044">+91 7795068044</a>
              </div>
              <div className="method-card">
                <div className="method-icon">📍</div>
                <h3>Location</h3>
                <p>Bhatkal, Karnataka, India</p>
              </div>
            </div>

            {/* Contact Form */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your Message"
                  rows="6"
                  className="form-input"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
                <span className="btn-arrow">→</span>
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="social-section">
            <p className="social-label">Connect with me on:</p>
            <div className="social-icons">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a>
            </div>
          </div>
        </div>

        {submitted && (
          <div className="success-message">
            <div className="success-content">
              <div className="success-icon">✓</div>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. I'll get back to you soon.</p>
            </div>
          </div>
        )}

        <div className="thank-you-section">
          <div className="thank-you-container">
            <h2>Thank You for Your Interest</h2>
            <div className="thank-you-divider"></div>
            <p className="thank-you-text">
              Every message matters. Whether you have a project proposal, a collaboration idea, or just want to connect—I'm here and excited to hear from you. Looking forward to building something remarkable together.
            </p>
            <div className="thank-you-accent"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
