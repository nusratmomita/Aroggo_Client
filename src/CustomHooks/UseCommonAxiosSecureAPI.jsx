import React from 'react';
import axios from 'axios';

const commonAxiosAPI  = axios.create({
    baseURL: `http://localhost:5000/`
})
const UseCommonAxiosSecureAPI = () => {
    return commonAxiosAPI;
};

export default UseCommonAxiosSecureAPI;

// *http://localhost:5000/iii/
// *https://aroggo-server.vercely.app/