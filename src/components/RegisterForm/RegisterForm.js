import React, {useState} from 'react';
import axios from 'axios';

const Register = ({ onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post('https://roducoins-backend.onrender.com/api/auth/register', {
                username,
                email,
                password
            });
            setMessage('Registro realizado com sucesso! Você pode fazer login agora.');
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setMessage(err.response.data.error || 'Erro ao registrar.');
        }
    };

    return(
        <div className='window'>
            <img src='/images/logo.png'></img>
            <h2>Cadastre-se na Roducoins</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Nome de usuário'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
                <button type='submit'>Comece já!</button>
                <p className='sem-conta'>
                    Já tem uma conta? <button type="button" className='crie-sua-conta' onClick={onSwitchToLogin}>Faça login!</button>
                </p>
            </form>
        </div>
    );
};

export default Register;