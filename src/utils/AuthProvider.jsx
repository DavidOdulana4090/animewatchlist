import { useState } from 'react';
import { AuthContext } from './AuthContext'; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem('isLoggedIn') === 'true');

  const login = () => {
        localStorage.setItem('isLoggedIn', 'true');
        setUser(true);
    };
    
    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};