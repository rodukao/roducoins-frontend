import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPasswordForm.css';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extrair o token da query string
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    if (!token) {
      setMessage('Token inválido ou não fornecido.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!token) {
      setMessage('Token inválido.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, { token, newPassword });
      setMessage(response.data.message || 'Senha redefinida com sucesso! Você pode fazer login agora.');
      // Opcional: redirecionar o usuário após alguns segundos
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      console.error('Erro ao redefinir a senha:', error);
      setMessage(error.response?.data?.error || 'Ocorreu um erro. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='window reset-password-window'>
      <img alt='roducoins-logo' src='/images/logo.png'></img>
      <h2>Redefinir Senha</h2>
      {message && <p>{message}</p>}
      {!token ? (
        <p>Token inválido.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type='password'
            placeholder='Nova Senha'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Confirmar Nova Senha'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type='submit' disabled={loading}>{loading ? 'Enviando...' : 'Redefinir Senha'}</button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordForm;