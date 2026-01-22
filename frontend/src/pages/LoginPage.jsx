import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Message from '../components/Message';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await api.post('/token/', {
        username,
        password
      });

      // Store tokens
      localStorage.setItem('authToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      localStorage.setItem('username', username);

      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      
      // Use setTimeout with a very short delay to ensure state updates
      setTimeout(() => {
        // Force reload to ensure auth state is updated
        window.location.href = '/';
      }, 500);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.detail || 'Login failed. Please check your credentials.'
      });
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>WiFi, CCTV & Light Services</h1>
        <h2>Login</h2>

        {message && <Message type={message.type} text={message.text} />}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-login">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>

        <div className="demo-credentials">
          <p>Demo Credentials:</p>
          <p>Username: <strong>admin123</strong></p>
          <p>Password: <strong>123</strong></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
