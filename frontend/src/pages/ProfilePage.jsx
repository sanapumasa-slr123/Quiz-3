import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../store/usersSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './ProfilePage.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector(state => state.users);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  if (loading) return <Loader />;

  if (!profile) {
    return (
      <div className="page-container">
        <Message type="error" message="Please log in to view your profile" />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="page-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">
              {profile.first_name?.charAt(0)}{profile.last_name?.charAt(0)}
            </div>
            <div className="profile-info">
              <h1>{profile.first_name} {profile.last_name}</h1>
              <p className="email">{profile.email}</p>
            </div>
          </div>

          {errorMessage && (
            <Message 
              type="error" 
              message={`Error: ${JSON.stringify(errorMessage)}`}
              onClose={() => setErrorMessage(null)}
            />
          )}

          <div className="profile-details">
            <div className="detail-row">
              <label>First Name:</label>
              <span>{profile.first_name}</span>
            </div>
            <div className="detail-row">
              <label>Last Name:</label>
              <span>{profile.last_name}</span>
            </div>
            <div className="detail-row">
              <label>Email:</label>
              <span>{profile.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
