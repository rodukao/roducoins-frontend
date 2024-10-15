import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import Ads from './pages/Ads';
import WatchAd from './pages/WatchAd';
import GameConfig from './pages/GameConfig';
import GamePlay from './pages/GamePlay';

function App(){
  return(
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />} />

        {/* Rotas protegidas */}
        <Route path="/*" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ads" element={<Ads />} />
          <Route path="ads/watch/:adId" element={<WatchAd />} />
          <Route path="game/config" element={<GameConfig />} />
          <Route path="game/play" element={<GamePlay />} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;
