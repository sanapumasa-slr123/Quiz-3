import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>⚡ WiFi, CCTV & Light Services</h1>
        </div>
        <nav className="nav">
          <a href="/">Services</a>
          <a href="/users">Users</a>
          <a href="/profile">Profile</a>
          <div className="user-info">
            <span className="username">{username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
