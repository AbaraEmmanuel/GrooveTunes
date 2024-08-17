import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChangedListener } from '../firebase'; // Ensure this import path is correct
import { loginUser, logoutUser } from '../firebase'; // Ensure this import path is correct

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    await loginUser(email, password);
  };

  const logout = async () => {
    await logoutUser();
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
