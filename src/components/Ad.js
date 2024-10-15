import React, {useState} from 'react';
import api from '../api';

const Ad = ({onAdCompleted}) => {
    const [adWatched, setAdWatched] = useState(false);

    const handleWatchAd = () => {
        setTimeout(() => {
            setAdWatched(true);
            onAdCompleted();
        }, 5000);
    };

    return(
        <div>
            {!adWatched ? (
                <div>
                    <p>Anúncio em exibição...</p>
                    <button onClick={handleWatchAd}>Assistir Anúncio</button>
                </div>
            ) : (
                <p>Obrigado por assistir ao anúncio!</p>
            )}
        </div>
    );
};

export default Ad;