import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import GameConfig from '../../components/GameConfig/GameConfig';

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

  if (loading || !userData) {
    return <div>Carregando...</div>;
  }
  
  return (
    <div>
      <header>
        <img alt='logo-roducoins' src='/images/logo.png' className='logo-roducoins logo-dashboard'></img>
        <div className="login-section">
          <span className="saldo-roducoins">{userData.roducoins.toFixed(2)}</span>
          <Link to="/ads" className="mais-roducoins-button">+ Roducoins</Link>
        </div>
      </header>
      <section className='greetings'>
        <p>Olá, {userData.username}!</p>
        <button onClick={handleLogout}>Sair</button>
      </section>
      {userData ? (
        <div className="main-dashboard">
          <div className='coluna-um'>
            <p>Aqui vai ter o ranking</p>
          </div>
          <div className='coluna-dois'>
            <GameConfig />
          </div>          
        </div>
      ) : (
        <div>Carregando dados do usuário...</div>
      )}
    </div>
  );
};

export default Dashboard;
