import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

const PrivateRoute = ({children}) => {
    const {authenticated} = useContext(AuthContext);

    return authenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;