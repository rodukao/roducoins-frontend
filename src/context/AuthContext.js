import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Novo estado de carregamento

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
      fetchUserData();
    } else {
      setAuthenticated(false);
      setUserData(null);
      setLoading(false); // Autenticação verificada, mas não autenticado
    }
  }, []);

  const fetchUserData = () => {
    api.get('/user/profile')
      .then((res) => {
        setUserData(res.data);
        setLoading(false); // Carregamento concluído
      })
      .catch((err) => {
        console.error('Erro ao obter dados do usuário:', err);
        setAuthenticated(false);
        setUserData(null);
        setLoading(false); // Carregamento concluído, mas ocorreu um erro
      });
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthenticated(true);
    fetchUserData();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, userData, loading, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
