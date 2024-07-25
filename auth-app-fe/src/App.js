import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthCheck from './components/AuthCheck';
import Signup from './components/Signup';
import SignIn from './components/SignIn';
import AppPage from './components/AppPage';
import { AuthContext } from './utils/AuthContext'; // Create this context


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    localStorage.removeItem('auth'); // Clear local storage
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <Router>
        <Routes>
        <Route path="/" element={<AuthCheck />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/app" element={<AppPage logout={logout} />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;