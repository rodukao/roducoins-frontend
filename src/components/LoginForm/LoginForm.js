import React, {useState, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import './LoginForm.css';

const LoginForm = ({ onSwitchToRegister, onSwitchToForgot }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                email,
                password,
            });
            login(res.data.token);
            navigate('/dashboard');
        } catch(err){
            console.log('Usuário não encontrado')
            setMessage(err.response.data.error || 'Erro ao fazer login.');
        } finally{
            setLoading(false);
        }
    };

    return(
        <div className='window'>
            <img alt='roducoins-logo' src='/images/logo.png'></img>
            <h2>Faça login em sua conta</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    placeholder='E-mail'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Senha'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <span><button type='button' className='crie-sua-conta' onClick={onSwitchToForgot}>Esqueci a minha senha</button></span>
                <button type='submit' disabled={loading}>{loading ? 'Conectando...' : 'Entrar'}</button>
                <p className='sem-conta'>Ainda não tem uma conta? <button type="button" className='crie-sua-conta' onClick={onSwitchToRegister}>Crie uma agora!</button></p>
            </form>
        </div>
    );
};

export default LoginForm;