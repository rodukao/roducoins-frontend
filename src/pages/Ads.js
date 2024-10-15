// src/pages/Ads.js

import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const Ads = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    api.get('/ads')
      .then((res) => setAds(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Anúncios Disponíveis</h2>
      {ads.map((ad) => (
        <div key={ad._id}>
          <h3>{ad.title}</h3>
          <p>{ad.description}</p>
          <Link to={`/ads/watch/${ad._id}`}>Assistir Anúncio</Link>
        </div>
      ))}
    </div>
  );
};

export default Ads;
