import React from 'react';
import './styles/serviceModal.css'; // Import service modal styles

const ServiceModal = ({ service, onClose, onAddToCart }) => {
  if (!service) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <img src={service.img} alt={service.title} />
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <button onClick={() => onAddToCart(service)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ServiceModal;