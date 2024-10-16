// src/components/Home.js
import React, { useRef } from 'react';
import '../styles/home.css'; // Import home styles

const Home = () => {
  const containerRef = useRef(null); // Reference for scroll container

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -250, behavior: 'smooth' }); // Scroll left
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 250, behavior: 'smooth' }); // Scroll right
  };

  return (
    <div className="home-container">
      <h1>Welcome to John Romagno Personal Training</h1>
      <p>This is your path to a better you. Browse our services, track your progress, and achieve your fitness goals!</p>

      {/* Services Section */}
      <section className="services">
        <h2>My Services</h2>
        
        {/* Scroll Buttons */}
        <button onClick={scrollLeft} className="scroll-btn left">←</button>
        <button onClick={scrollRight} className="scroll-btn right">→</button>
        
        {/* Services Container */}
        <div className="services-container" ref={containerRef}>
          <div className="service-card">
            <img src="path/to/personal-training.jpg" alt="Personal Training" />
            <h3>Personal Training</h3>
            <p>One-on-one coaching to help you achieve your fitness goals.</p>
          </div>
          <div className="service-card">
            <img src="path/to/nutrition-guidance.jpg" alt="Nutritional Guidance" />
            <h3>Nutritional Guidance</h3>
            <p>Customized meal plans to complement your fitness routine.</p>
          </div>
          <div className="service-card">
            <img src="\images\placeholder3.webp" alt="Program Design" />
            <h3>Program Design</h3>
            <p>Personalized training programs to fit your lifestyle and goals.</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials">
        <h3>What Clients Say</h3>
        <blockquote>
          "John's training program transformed my life. I feel stronger and healthier than ever!" - Jane Doe
        </blockquote>
        <blockquote>
          "The personalized nutrition plan helped me achieve my weight loss goals. Highly recommend!" - John Smith
        </blockquote>
      </section>

      <section className="cta">
        <h3>Get Started Today!</h3>
        <p>Contact us to schedule your first session and take the first step towards a better you.</p>
        <button>Contact Us</button>
      </section>
    </div>
  );
};

export default Home;

