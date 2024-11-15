import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/serviceModal.css'; // Ensure the correct path to ServiceModal.css

const ServiceModal = ({ service, onClose, onAddToCart, isLoggedIn }) => {
  const navigate = useNavigate();

  if (!service) return null;

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
        credentials: 'include',
      });
      if (response.ok) {
        onAddToCart(service);
      } else {
        console.error('Error adding item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <img src={service.img} alt={service.title} />
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ServiceModal;