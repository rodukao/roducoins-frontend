// src/pages/Dashboard.js

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Dashboard = () => {
  const { authenticated, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
    } else {
      api
        .get('/user/profile')
        .then((res) => setUserData(res.data))
        .catch((err) => console.error(err));
    }
  }, [authenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {userData ? (
        <div>
          <p>Bem-vindo, {userData.username}!</p>
          <p>Seu saldo de Roducoins: {userData.roducoins}</p>
          <button onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Dashboard;
