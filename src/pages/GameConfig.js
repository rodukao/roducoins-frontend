import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const GameConfig = () => {
    const [length, setLength] = useState(5);
    const [attempts, setAttempts] = useState(5);
    const [bet, setBet] = useState(10);
    const navigate = useNavigate();

    const handleStartGame = async (e) => {
        e.preventDefault();
        //chamar API para iniciar o jogo
        try{
            const response = await api.post('/game/start', {length, attempts, bet});
            const {gameId, gameData} = response.data;
            // Navegar para a página do jogo, passando os dados necessários
            navigate('/game/play', { state: { gameId, gameData } });
        } catch (error){
            console.error("Erro ao iniciar o jogo: ", error);
        }
    };

    return(
        <div>
            <h2>Configurar jogo</h2>
            <form onSubmit={handleStartGame}>
                <label>
                    Número de Letras:
                    <input
                        type='number'
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                        min="3"
                        max="7"
                    />
                </label>
                <br />
                <label>
                    Número de Tentativas:
                    <input
                        type='number'
                        value={attempts}
                        onChange={(e) => setAttempts(Number(e.target.value))}
                        min="1"
                    />
                </label>
                <br />
                <label>
                    Aposta (Roducoins):
                    <input
                        type='number'
                        value={bet}
                        onChange={(e) => setBet(Number(e.target.value))}
                        min="1"
                    />
                </label>
                <br />
                <button type="submit">Iniciar Jogo</button>
            </form>
        </div>
    );
}

export default GameConfig;