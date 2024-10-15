import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importação adicionada

const WatchAd = () => {
  const { adId } = useParams();
  const [ad, setAd] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { fetchUserData } = useContext(AuthContext); // Acesso ao AuthContext

  useEffect(() => {
    api.get(`/ads/${adId}`)
      .then((res) => setAd(res.data))
      .catch((err) => console.error(err));
  }, [adId]);

  const handleVideoEnd = () => {
    api.post(`/ads/watch/${adId}`)
      .then((res) => {
        setMessage(res.data.message);
        fetchUserData(); // Atualiza os dados do usuário
        setTimeout(() => navigate('/dashboard'), 3000); // Redireciona após 3 segundos
      })
      .catch((err) => console.error(err));
  };

  if (!ad) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{ad.title}</h2>
      <video
        width="600"
        controls
        onEnded={handleVideoEnd}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
      >
        <source src={ad.videoUrl} type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>
      {message && <p>{message}</p>}
    </div>
  );
};

export default WatchAd;
