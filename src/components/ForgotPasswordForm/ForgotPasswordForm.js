import React, {useState} from 'react';
import axios from 'axios';
import './ForgotPasswordForm.css';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, { email });
            setMessage(response.data.message || 'Verifique seu e-mail para as instruções.');
        } catch (error) {
            console.error('Erro ao solicitar recuperação de senha:', error);
            setMessage('Ocorreu um erro. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className='window'>
            <img alt='roducoins-logo' src='/images/logo.png'></img>
            <h2>Esqueceu sua senha?</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    placeholder='E-mail'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <span>Enviaremos instruções para recuperação de senha para esse email</span>
                <button type='submit' disabled={loading}>{loading ? 'Enviando...' : 'Recuperar senha'}</button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;