import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('/api/testimonials');
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) {
    return <div className="loading">Loading testimonials...</div>;
  }

  const current = testimonials[currentIndex];

  return (
    <div className="page-container">
      <section className="testimonials-section">
        <h1>Success Stories</h1>
        <p className="section-description">Hear from the amazing people I've worked with</p>

        <div className="testimonial-carousel">
          <div className="carousel-container">
            <button className="carousel-btn prev" onClick={prevTestimonial}>
              ❮
            </button>

            <div className="carousel-content">
              <div className="testimonial-quote">
                <svg className="quote-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5-1.002 0-1.999.085-3 .256v2.494c.532-.446 1.374-1.235 2.514-1.235 2 0 4 5.088 4 6.5s0 3-4 3c-.868 0-1.498.186-2 .257V19c1 1 3 3 7 3z" />
                </svg>
                <p>"{current.text}"</p>
              </div>

              <div className="testimonial-author-info">
                <div className="author-avatar">
                  {current.author.charAt(0)}
                </div>
                <div className="author-details">
                  <h3>{current.author}</h3>
                  <p>{current.company}</p>
                  <div className="rating">
                    {[...Array(current.rating)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button className="carousel-btn next" onClick={nextTestimonial}>
              ❯
            </button>
          </div>

          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="testimonials-stats">
          <div className="stat">
            <h4>{testimonials.length}+</h4>
            <p>Happy Clients</p>
          </div>
          <div className="stat">
            <h4>{(testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)}</h4>
            <p>Average Rating</p>
          </div>
          <div className="stat">
            <h4>100%</h4>
            <p>Satisfaction</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonials;
