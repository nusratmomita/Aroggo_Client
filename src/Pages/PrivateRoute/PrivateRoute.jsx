import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../Authentication/AuthContext';

const PrivateRoute = ({children}) => {
    const {user , loading} = useContext(AuthContext);

    const location = useLocation();

    if(loading){
        return <div className="flex justify-center items-center h-screen">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
                </div>
    }

    if(user && user?.email){
        return children
    }
    
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;