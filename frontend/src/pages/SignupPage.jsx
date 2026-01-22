import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Message from '../components/Message';
import './SignupPage.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Validation
    if (formData.password !== formData.password2) {
      setMessage({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters!' });
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/register/', {
        username: formData.username,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password
      });

      // Auto login after signup
      const loginResponse = await api.post('/token/', {
        username: formData.username,
        password: formData.password
      });

      localStorage.setItem('authToken', loginResponse.data.access);
      localStorage.setItem('refreshToken', loginResponse.data.refresh);
      localStorage.setItem('username', formData.username);

      setMessage({ type: 'success', text: 'Account created successfully! Redirecting...' });
      
      // Use setTimeout with a very short delay to ensure state updates
      setTimeout(() => {
        // Force reload to ensure auth state is updated
        window.location.href = '/';
      }, 500);
    } catch (error) {
      const errorMsg = error.response?.data?.detail || error.response?.data?.message || 'Signup failed. Please try again.';
      setMessage({ type: 'error', text: errorMsg });
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>WiFi, CCTV & Light Services</h1>
        <h2>Create Account</h2>

        {message && <Message type={message.type} text={message.text} />}

        <form onSubmit={handleSignup}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First name"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last name"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password2">Confirm Password:</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-signup">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
