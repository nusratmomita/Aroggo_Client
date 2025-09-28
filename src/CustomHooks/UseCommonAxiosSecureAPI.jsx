import React from 'react';
import axios from 'axios';

const commonAxiosAPI  = axios.create({
    baseURL: `http://localhost:3000`
})
const UseCommonAxiosSecureAPI = () => {
    return commonAxiosAPI;
};

export default UseCommonAxiosSecureAPI;

// https://aroggo-server.vercel.app