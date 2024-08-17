//chatgpt used for implementing loading state
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './services/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(
    AuthContext
  );
};

export const AuthProvider = ({ children }) => {
  const [curUser, setCurUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    return signOut(auth);
  };


  return (
    <AuthContext.Provider value={{ currentUser: curUser, loginWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
