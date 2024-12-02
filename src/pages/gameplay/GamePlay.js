import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';
import './GamePlay.css';
import Modal from '../../components/Modal/Modal';

const GamePlay = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [gameId, setGameId] = useState(null);
  const [gameData, setGameData] = useState(null);
  //const [guessedLetter, setGuessedLetter] = useState('');

  const { fetchUserData } = useContext(AuthContext);

  const firstRow = 'qwertyuiop'.split('');
  const secondRow = 'asdfghjkl'.split('');
  const thirdRow = 'zxcvbnm'.split('');

  

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

  if (!gameData) {
    return <div>Carregando...</div>;
  }

  // Cálculo das tentativas usadas
  const attemptsUsed = gameData.totalAttempts - gameData.attemptsLeft;

  const handleLetterClick = async (letter) => {
    try {
      const response = await api.post('/game/guess', {
        gameId,
        guessedLetter: letter,
      });
  
      setGameData(response.data.gameData);
  
      if (response.data.gameData.gameOver) {
        // Se o jogo terminou, você pode implementar lógica adicional aqui
      }
    } catch (error) {
      console.error('Erro ao adivinhar a letra:', error);
    }
  };

  const handleGiveUp = async () => {
    try {
      await api.post('/game/giveup', {
        gameId,
      });
      // Após a resposta do backend, atualize os dados do usuário
      fetchUserData();
      // Navegue para o dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao desistir do jogo:', error);
      // Exiba uma mensagem de erro se necessário
    }
  };

  return (
    <div className='jogo-main'>
      <h2 className='titulo-configurar-partida'>ADIVINHE A PALAVRA</h2>

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

      <p className='palavra-ativa'>
        {' '}
        {gameData.correctLetters.map((letter, index) => (
          <span className='letra-ativa' key={index}>
            {letter ? letter : ''}{''}
          </span>
        ))}
      </p>
      <div className="keyboard">
  <div className="keyboard-row">
    {firstRow.map((letter) => (
      <button
        key={letter}
        className={`keyboard-key ${
          gameData.correctLetters.includes(letter)
            ? 'correct'
            : gameData.guessedLetters.includes(letter)
            ? 'incorrect'
            : ''
        }`}
        onClick={() => handleLetterClick(letter)}
        disabled={
          gameData.gameOver ||
          gameData.correctLetters.includes(letter) ||
          gameData.guessedLetters.includes(letter)
        }
      >
        {letter.toUpperCase()}
      </button>
    ))}
  </div>
  <div className="keyboard-row second-row">
    {secondRow.map((letter) => (
      <button
        key={letter}
        className={`keyboard-key ${
          gameData.correctLetters.includes(letter)
            ? 'correct'
            : gameData.guessedLetters.includes(letter)
            ? 'incorrect'
            : ''
        }`}
        onClick={() => handleLetterClick(letter)}
        disabled={
          gameData.gameOver ||
          gameData.correctLetters.includes(letter) ||
          gameData.guessedLetters.includes(letter)
        }
      >
        {letter.toUpperCase()}
      </button>
    ))}
  </div>
  <div className="keyboard-row third-row">
    {thirdRow.map((letter) => (
      <button
        key={letter}
        className={`keyboard-key ${
          gameData.correctLetters.includes(letter)
            ? 'correct'
            : gameData.guessedLetters.includes(letter)
            ? 'incorrect'
            : ''
        }`}
        onClick={() => handleLetterClick(letter)}
        disabled={
          gameData.gameOver ||
          gameData.correctLetters.includes(letter) ||
          gameData.guessedLetters.includes(letter)
        }
      >
        {letter.toUpperCase()}
        </button>
        ))}
      </div>
    </div>

    <button onClick={handleGiveUp} className="iniciar-button" disabled={gameData.gameOver}>
      Desistir
    </button>

    <Modal isOpen={gameData.gameOver}>
          {gameData.wordGuessed ? (
            <div className='janela-vitoria'>
              <img src='/images/estrelas.png' alt='tres-estrelas-amarelas' />
              <span className='text-vitoria'>PARABÉNS</span>
              <span className='text-vc-ganhou'>você ganhou</span>
              <p className='quantidada-ganha'>{gameData.reward.toFixed(1)} roducoins!</p>
            </div>
          ) : (
            <div className='janela-vitoria'>
              <img src='/images/estrelas-derrota.png' alt='tres-estrelas-cinzas' />
              <span className='text-vitoria'>DERROTA</span>
              <span className='text-vc-ganhou'>você perdeu</span>
              {console.log(gameData)}
              <p className='quantidada-ganha'>{gameData.bet} roducoins!</p>
            </div>
          )}
          <div className='botoes-novamente'>
            <button className='botao-novamente' onClick={() => navigate('/game/config')}>Jogar Novamente</button>
            <button className='botao-dashboard' onClick={() => navigate('/dashboard')}>Voltar ao Dashboard</button> 
          </div>
          
    </Modal>
    </div>
  );
};

export default GamePlay;
