import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import UserListPage from './pages/UserListPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check auth status
  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    console.log('Auth check - Token exists:', !!token);
    setIsAuthenticated(!!token);
    setIsLoading(false);
  };

  // Check on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      console.log('Storage changed, checking auth...');
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check on page focus
    const handleFocus = () => {
      const token = localStorage.getItem('authToken');
      if (token !== localStorage.getItem('authToken')) {
        checkAuth();
      }
    };

    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  if (isLoading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Header />}
        <main className="main-content">
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? (
                  <>
                    <Navigate to="/" replace />
                  </>
                ) : (
                  <LoginPage onLoginSuccess={() => checkAuth()} />
                )
              } 
            />
            <Route 
              path="/signup" 
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <SignupPage onSignupSuccess={() => checkAuth()} />
              } 
            />
            <Route 
              path="/" 
              element={
                isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/service/:id" 
              element={
                isAuthenticated ? <DetailPage /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/users" 
              element={
                isAuthenticated ? <UserListPage /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/profile" 
              element={
                isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </main>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
