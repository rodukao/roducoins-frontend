// src/pages/HomePage/HomePage.js
import React, { useState } from 'react';
import './Home.css';
import Modal from '../../components/Modal/Modal';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import ForgotPasswordForm from '../../components/ForgotPasswordForm/ForgotPasswordForm';

const Home = () => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [ForgotModalIsOpen, setForgotModalIsOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalIsOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalIsOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalIsOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalIsOpen(false);
  };

  const closeForgotModal = () => {
    setForgotModalIsOpen(false);
  }

  const switchToRegisterModal = () => {
    setLoginModalIsOpen(false);
    setForgotModalIsOpen(false);
    setRegisterModalIsOpen(true);
  };

  const switchToLoginModal = () => {
    setRegisterModalIsOpen(false);
    setForgotModalIsOpen(false);
    setLoginModalIsOpen(true);
  };

  const switchToForgotModal = () => {
    setRegisterModalIsOpen(false);
    setLoginModalIsOpen(false);
    setForgotModalIsOpen(true);
  };

  return (
    <>
      <header>
        <img alt='logo-roducoins' src='/images/logo.png' className='logo-roducoins'></img>
        <div className="login-section">
          <span onClick={openLoginModal} style={{ cursor: 'pointer' }}>entrar</span>
          <button className="register-button" onClick={openRegisterModal}>cadastre-se</button>
        </div>
      </header>
      <main className="main">
        <h2>O único lugar onde não dá para perder!</h2>
        <button className="iniciar-button" onClick={openRegisterModal}>SAIBA MAIS</button>
        <div className="main-effect"></div>
      </main>
      <footer className="footer">
        <section>
          <div className="important-links">
            <span>como funciona?</span>
            <span>termos de uso</span>
            <span>política de privacidade</span>
          </div>
          <div className="social">
            <h3>SOCIAL</h3>
          </div>
        </section>
      </footer>

      {/* Modal de Login */}
      <Modal
        isOpen={loginModalIsOpen}
        onRequestClose={closeLoginModal}
        contentLabel="Login Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeLoginModal} className="modal-close-button">&times;</button>
        <LoginForm onSwitchToRegister={switchToRegisterModal} onSwitchToForgot={switchToForgotModal}/>
      </Modal>

      {/* Modal de Registro */}
      <Modal
        isOpen={registerModalIsOpen}
        onRequestClose={closeRegisterModal}
        contentLabel="Register Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeRegisterModal} className="modal-close-button">&times;</button>
        <RegisterForm onSwitchToLogin={switchToLoginModal} />
      </Modal>

      {/* Modal de Esqueceu senha */}
      <Modal
        isOpen={ForgotModalIsOpen}
        onRequestClose={closeForgotModal}
        contentLabel="Forgot Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeForgotModal} className="modal-close-button">&times;</button>
        <ForgotPasswordForm />
      </Modal>
    </>
  );
};

export default Home;
