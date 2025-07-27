import React, { useContext } from 'react';
import UseAxiosSecureAPI from './UseAxiosSecureAPI';
import { AuthContext } from '../Authentication/AuthContext';
import { useQuery } from '@tanstack/react-query';


const UseRoleQuery = () => {
    const {user , loading: authLoading , refetch} = useContext(AuthContext);

    const axiosApi = UseAxiosSecureAPI();

    const { data: role = 'user' , isLoading: roleLoading} = useQuery({
        queryKey: ['userRole' , user?.email],
        queryFn: async () => {
            const res = await axiosApi.get(`users/${user?.email}/role`);
            console.log(res.data.role,res.data);
            return res.data.role;
        }
    });

    return {role , roleLoading: authLoading || roleLoading , refetch}

};

export default UseRoleQuery;