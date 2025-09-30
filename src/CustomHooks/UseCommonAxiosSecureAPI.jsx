import React from 'react';
import axios from 'axios';

const commonAxiosAPI  = axios.create({
    baseURL: `http://localhost:5000/`
})
const UseCommonAxiosSecureAPI = () => {
    return commonAxiosAPI;
};

export default UseCommonAxiosSecureAPI;

// *http://localhost:3000/
// *https://aroggo-e998e.web.app/