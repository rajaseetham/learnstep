import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const initialStudent = {
  id: 1,
  username: "Aru",
  email: "aru@learnstep.edu",
  role: "ROLE_STUDENT",
  avatar: "🤖",
  joinedDate: "2026-01-15"
};

export const initialAdmin = {
  id: 99,
  username: "Admin Prof. Learn",
  email: "admin@learnstep.edu",
  role: "ROLE_ADMIN",
  avatar: "🧙‍♂️",
  joinedDate: "2025-10-01"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('learnstep_user');
    return savedUser ? JSON.parse(savedUser) : initialStudent;
  });

  useEffect(() => {
    localStorage.setItem('learnstep_user', JSON.stringify(user));
  }, [user]);

  const login = (email, password, role = 'ROLE_STUDENT') => {
    if (role === 'ROLE_ADMIN' || email.includes('admin')) {
      setUser(initialAdmin);
      return initialAdmin;
    }
    const newUser = {
      ...initialStudent,
      email,
      username: email.split('@')[0] || "Explorer"
    };
    setUser(newUser);
    return newUser;
  };

  const register = (username, email, password) => {
    const newUser = {
      id: Date.now(),
      username,
      email,
      role: 'ROLE_STUDENT',
      avatar: '🌟',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('learnstep_user');
  };

  const switchRole = (role) => {
    if (role === 'ROLE_ADMIN') {
      setUser(initialAdmin);
    } else {
      setUser(initialStudent);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
