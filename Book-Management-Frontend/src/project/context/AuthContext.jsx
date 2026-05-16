
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Custom hook to use auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('bookManagerUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Error parsing stored user:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    if (email && password) {
      const userData = { email, name: email.split('@')[0] };
      setUser(userData);
      localStorage.setItem('bookManagerUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = (name, email, password) => {
    if (name && email && password) {
      const userData = { name, email };
      setUser(userData);
      localStorage.setItem('bookManagerUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bookManagerUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};