import React from 'react';
import './UserCard.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        <div className="avatar-placeholder">
          {user.first_name.charAt(0)}{user.last_name.charAt(0)}
        </div>
      </div>
      <div className="user-content">
        <h3>{user.first_name} {user.last_name}</h3>
        <p className="email">{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
