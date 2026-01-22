import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceDetail } from '../store/servicesSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './DetailPage.css';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { serviceDetail, loading, error } = useSelector(state => state.services);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchServiceDetail(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  if (loading) return <Loader />;

  if (!serviceDetail) {
    return (
      <div className="page-container">
        <Message type="error" message="Service not found" />
        <button className="btn-back" onClick={() => navigate('/')}>← Back to Services</button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="page-container">
        <button className="btn-back" onClick={() => navigate('/')}>← Back to Services</button>

        {errorMessage && (
          <Message 
            type="error" 
            message={`Error: ${JSON.stringify(errorMessage)}`}
            onClose={() => setErrorMessage(null)}
          />
        )}

        <div className="detail-container">
          <div className="detail-image">
            <img src={serviceDetail.sample_image || 'https://via.placeholder.com/500x300'} alt={serviceDetail.service_name} />
          </div>

          <div className="detail-content">
            <h1>{serviceDetail.service_name}</h1>

            <div className="rating-section">
              <span className="stars">{'⭐'.repeat(Math.floor(serviceDetail.rating))}</span>
              <span className="rating-value">{serviceDetail.rating}</span>
            </div>

            <div className="service-details">
              <div className="detail-item">
                <label>Expert Name:</label>
                <p>{serviceDetail.name_of_the_expert}</p>
              </div>

              <div className="detail-item">
                <label>Price:</label>
                <p className="price">${serviceDetail.price}</p>
              </div>

              <div className="detail-item">
                <label>Duration:</label>
                <p>{serviceDetail.duration_of_service}</p>
              </div>
            </div>

            <div className="description-section">
              <h2>Service Description</h2>
              <p>{serviceDetail.description}</p>
            </div>

            <button className="btn-book">Book This Service</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
