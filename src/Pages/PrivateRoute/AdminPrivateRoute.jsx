import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../../Authentication/AuthContext';
import UseRoleQuery from '../../CustomHooks/UseRoleQuery';

const AdminPrivateRoute = ({children}) => {
    const {user , loading} = useContext(AuthContext);

    const {role , roleLoading} = UseRoleQuery();

    if(loading || roleLoading){
        return <div className="flex justify-center items-center h-screen">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
         </div>
    }

    if(!user || role !== 'admin'){
        return <Navigate state={location.pathname} to='/forbiddenRoute'></Navigate>
    }
    return children
};

export default AdminPrivateRoute;