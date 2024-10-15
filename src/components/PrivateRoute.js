import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    // Você pode retornar um componente de carregamento personalizado aqui
    return <div>Carregando...</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
