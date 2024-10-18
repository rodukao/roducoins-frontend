import React, { useEffect, useRef } from 'react';

const AdComponent = React.memo(() => {
  const adRef = useRef(null);
  const adLoaded = useRef(false);

  useEffect(() => {
    if (window && window.adsbygoogle && adRef.current && !adLoaded.current) {
      try {
        window.adsbygoogle.push({});
        adLoaded.current = true;
      } catch (e) {
        console.error('Erro ao carregar o anúncio:', e);
      }
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      ref={adRef}
      style={{ display: 'block' }}
      data-ad-client="ca-pub-2635710182250146"
      data-ad-slot="2646602454"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
});

export default AdComponent;
