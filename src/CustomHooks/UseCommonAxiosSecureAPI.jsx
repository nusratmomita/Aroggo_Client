import React from 'react';
import axios from 'axios';

const commonAxiosAPI  = axios.create({
    baseURL: `https://aroggo-server.vercel.app`
})
const UseCommonAxiosSecureAPI = () => {
    return commonAxiosAPI;
};

export default UseCommonAxiosSecureAPI;