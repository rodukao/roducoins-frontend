import React, { useEffect  } from 'react';

const AdComponent = (props) => {
    const { dataAdSlot } = props;  

    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
        catch (e) {
        }
    },[]);

    return (
        <>
            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-2635710182250146"
                data-ad-slot={dataAdSlot}
                data-ad-format="auto"
                data-full-width-responsive="true"
                data-adtest="on">
            </ins>
        </>
    );
};

export default AdComponent;