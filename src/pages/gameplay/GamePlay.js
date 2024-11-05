import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';
import './GamePlay.css';

const GamePlay = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [gameId, setGameId] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [guessedLetter, setGuessedLetter] = useState('');
  const [message, setMessage] = useState('');

  const { fetchUserData } = useContext(AuthContext);

  useEffect(() => {
    console.log('location.state:', location.state);
    if (location.state && location.state.gameId && location.state.gameData) {
      setGameId(location.state.gameId);
      setGameData(location.state.gameData);
    } else {
      navigate('/game/config');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (gameData && gameData.gameOver) {
      fetchUserData();
    }
  }, [gameData, fetchUserData]);

  const handleGuess = async (e) => {
    e.preventDefault();

    if (!guessedLetter || guessedLetter.length !== 1) {
      setMessage('Por favor, insira uma única letra.');
      return;
    }

    try {
      const response = await api.post('/game/guess', {
        gameId,
        guessedLetter: guessedLetter.toLowerCase(),
      });

      setGameData(response.data.gameData);
      setMessage(response.data.message);
      setGuessedLetter('');
    } catch (error) {
      console.error('Erro ao adivinhar a letra:', error);
      setMessage(error.response?.data?.error || 'Erro ao adivinhar a letra.');
    }
  };

  if (!gameData) {
    return <div>Carregando...</div>;
  }

  // Cálculo das tentativas usadas
  const attemptsUsed = gameData.totalAttempts - gameData.attemptsLeft;

  return (
    <div className='jogo-main'>
      <h2 className='titulo-configurar-partida'>ADIVINHE A PALAVRA</h2>
      <p>{message}</p>

      {/* Renderização dos círculos de tentativas */}
      <div className="attempts-container">
        {console.log(gameData)}
        {Array.from({ length: gameData.totalAttempts }, (_, index) => (
          <span
            key={index}
            className={`attempt-circle ${
              index < attemptsUsed ? 'used' : 'remaining'
            }`}
          ></span>
        ))}
      </div>

      <p>
        Palavra:{' '}
        {gameData.correctLetters.map((letter, index) => (
          <span key={index}>
            {letter ? letter : '_'}{' '}
          </span>
        ))}
      </p>
      <p>
        Letras Adivinhadas:{' '}
        {gameData.guessedLetters && gameData.guessedLetters.length > 0
          ? gameData.guessedLetters.join(', ')
          : 'Nenhuma'}
      </p>

      {!gameData.gameOver && (
        <form onSubmit={handleGuess}>
          <label>
            Adivinhe uma letra:
            <input
              type="text"
              value={guessedLetter}
              onChange={(e) => setGuessedLetter(e.target.value)}
              maxLength="1"
            />
          </label>
          <button type="submit">Enviar</button>
        </form>
      )}

      {gameData.gameOver && (
        <div>
          <p>O jogo terminou!</p>
          {gameData.wordGuessed ? (
            <p>Você ganhou {gameData.reward} Roducoins!</p>
          ) : (
            <p>Você perdeu! Tente novamente.</p>
          )}
          <button onClick={() => navigate('/dashboard')}>Voltar ao Dashboard</button>
          <button onClick={() => navigate('/game/config')}>Jogar Novamente</button>
        </div>
      )}
    </div>
  );
};

export default GamePlay;
