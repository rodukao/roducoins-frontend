import React, {useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

import './GameConfig.css';

const GameConfig = () => {
    const [length, setLength] = useState(5);
    const [attempts, setAttempts] = useState(5);
    const [bet, setBet] = useState(10);
    const [multiplier, setMultiplier] = useState(1);
    const navigate = useNavigate();

    const handleStartGame = async (e) => {
        e.preventDefault();
        //chamar API para iniciar o jogo
        try{
            const response = await api.post('/game/start', {length, attempts, bet});
            const {gameId, gameData} = response.data;
            // Navegar para a página do jogo, passando os dados necessários
            navigate('/game/play', { state: { gameId, gameData, length, attempts, bet } });
        } catch (error){
            console.error("Erro ao iniciar o jogo: ", error);
        }
    };

    const calculateMultiplier = useCallback(() => {
        let wordDifficulty = 1;
        if (length <= 4) {
          wordDifficulty = 1;
        } else if (length === 5) {
          wordDifficulty = 1.5;
        } else if (length >= 6) {
          wordDifficulty = 2;
        }
      
        const newMultiplier = Math.max(((length * wordDifficulty) / attempts).toFixed(2), 1);
        setMultiplier(newMultiplier);
    }, [length, attempts]);

    // Recalcula o multiplicador sempre que length ou attempts mudarem
    useEffect(() => {
        calculateMultiplier();
    }, [calculateMultiplier]);

    return(
        <div> 
                <form className='form-configurar-jogo' onSubmit={handleStartGame}>
                    <div className='coluna-um'>
                    <h2 className='titulo-configurar-partida'>CONFIGURAR PARTIDA</h2>
                    <label>
                        Quantidade de Letras:<br />
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
                    Número de Tentativas:<br />
                    <input
                        type='number'
                        value={attempts}
                        onChange={(e) => setAttempts(Number(e.target.value))}
                        min="1"
                    />
                </label>
                <br />
                <label>
                    Aposta (Roducoins):<br />
                    <input
                        type='number'
                        value={bet}
                        onChange={(e) => setBet(Number(e.target.value))}
                        min="1"
                    />
                </label>
                <br />
                    </div>
                    <div className='coluna-um'>
                    <div className='multiplicador'>
                        <p className='numero-multiplicador'>{multiplier}x</p>
                        <p className='possivel-recompensa'>Prêmio: { (bet * multiplier).toFixed(2) } Roducoins</p>
                        <span>Como é definido meu multiplicador?</span>
                    </div>
                        <button className='botao-jogar' type="submit">JOGAR!</button>
                    </div>   
            </form>
        </div>
    );
}

export default GameConfig;