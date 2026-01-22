import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../store/servicesSlice';
import ServiceCard from '../components/ServiceCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector(state => state.services);
  const [errorMessage, setErrorMessage] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Fetch services when component mounts
    const loadServices = async () => {
      console.log('Fetching services...');
      try {
        await dispatch(fetchServices()).unwrap();
        console.log('Services fetched successfully');
      } catch (err) {
        console.error('Error fetching services:', err);
        // Auto-retry once after 2 seconds
        if (retryCount < 1) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            dispatch(fetchServices());
          }, 2000);
        }
      }
    };

    loadServices();
  }, [dispatch, retryCount]);

  useEffect(() => {
    if (error) {
      console.error('Service error:', error);
      setErrorMessage(error);
    }
  }, [error]);

  const handleRetry = () => {
    setRetryCount(0);
    dispatch(fetchServices());
  };

  if (loading) return <Loader />;

  return (
    <div className="home-page">
      <div className="page-container">
        <div className="page-header">
          <h1>Installation & Setup Services</h1>
          <p>WiFi Installation • CCTV Installation • Light Installation</p>
        </div>

        {errorMessage && (
          <Message 
            type="error" 
            text={`Error loading services. Please try again.`}
          />
        )}

        <div className="services-grid">
          {services && services.length > 0 ? (
            services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))
          ) : (
            <div className="no-services">
              <p>No services available at the moment.</p>
              {errorMessage && (
                <button 
                  onClick={handleRetry} 
                  className="retry-btn"
                  style={{
                    padding: '10px 20px',
                    marginTop: '15px',
                    backgroundColor: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Retry Loading Services
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
