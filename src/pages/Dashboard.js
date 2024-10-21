import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { authenticated, logout, userData, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !authenticated) {
      navigate('/');
    }
  }, [authenticated, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!authenticated) {
    return null; // Ou você pode retornar um componente indicando que o usuário não está autenticado
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {userData ? (
        <div>
          <p>Bem-vindo, {userData.username}!</p>
          <p>Seu saldo de Roducoins: {userData.roducoins}</p>
          <hr />
          <Link to="/game/config">Jogar e Ganhar Roducoins</Link> <br />
          <Link to="/ads">Assistir Anúncios e Ganhar Roducoins</Link>
          <br />
          <hr />
          <button onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <div>Carregando dados do usuário...</div>
      )}
    </div>
  );
};

export default Dashboard;
