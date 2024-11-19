import React, { useRef, useState } from 'react';
import '../styles/home.css'; // Import home styles
import ServiceModal from '../ServiceModal';

const Home = () => {
  const containerRef = useRef(null); // Reference for scroll container
  const [selectedService, setSelectedService] = useState(null); // State for selected service
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -250, behavior: 'smooth' }); // Scroll left
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 250, behavior: 'smooth' }); // Scroll right
  };

  const services = [
    {
      img: '/images/personal-training.webp',
      title: 'Personal Training',
      description: 'One-on-one coaching to help you achieve your fitness goals.',
    },
    {
      img: '/images/nutrition.webp',
      title: 'Nutritional Guidance',
      description: 'Customized meal plans to complement your fitness routine.',
    },
    {
      img: 'images/program.webp',
      title: 'Program Design',
      description: 'Personalized training programs to fit your lifestyle and goals.',
    },
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleAddToCart = (service) => {
    console.log('Added to cart:', service);
    // Implement add to cart functionality here
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
          {services.map((service, index) => (
            <div key={index} className="service-card" onClick={() => handleServiceClick(service)}>
              <img src={service.img} alt={service.title} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
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

      {/* Service Modal */}
      {isModalOpen && (
        <ServiceModal
          service={selectedService}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default Home;