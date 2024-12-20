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

  useEffect(() => {
    // Adiciona o script do AdSense quando o componente é montado
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2635710182250146";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    return () => {
      // Remove o script ao desmontar o componente para evitar conflitos
      document.body.removeChild(script);
    };
  }, []);

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

      {/* Anúncio AdSense */}
      <div style={{ marginTop: '20px' }}>
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-2635710182250146"
             data-ad-slot="4290771865"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
      <script>
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </script>

      <script async="async" data-cfasync="false" src="//pl25294910.profitablecpmrate.com/de6d5ff83226364af0c66a6bca70b0a8/invoke.js"></script>
      <div id="container-de6d5ff83226364af0c66a6bca70b0a8"></div>

      <p>Teste</p>


      {message && <p>{message}</p>}
    </div>
  );
};

export default WatchAd;
