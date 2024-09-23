import React, {useState} from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/api/auth/register', {
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
        <div>
            <h2>Registrar</h2>
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
                <button type='submit'>Registrar</button>
            </form>
        </div>
    );
};

export default Register;