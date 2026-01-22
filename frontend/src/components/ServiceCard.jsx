import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceCard.css';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/service/${service.id}`);
  };

  return (
    <div className="service-card" onClick={handleClick}>
      <div className="service-image">
        <img src={service.sample_image || 'https://via.placeholder.com/300x200'} alt={service.service_name} />
      </div>
      <div className="service-content">
        <h3>{service.service_name}</h3>
        <p className="description">{service.description.substring(0, 100)}...</p>
        <div className="service-footer">
          <div className="rating">
            <span className="stars">{'⭐'.repeat(Math.floor(service.rating))}</span>
            <span className="rating-value">{service.rating}</span>
          </div>
          <button className="view-btn">View Details →</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
