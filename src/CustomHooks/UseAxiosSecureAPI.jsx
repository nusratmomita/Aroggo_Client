import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from "../Authentication/AuthContext";

const axiosAPI = axios.create({
    baseURL: `https://aroggo-server.vercel.app//`
});


const UseAxiosSecureAPI = () => {
    const { user, handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    // console.log(user?.accessToken)

    axiosAPI.interceptors.request.use(
        (config) => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosAPI.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
        console.log("Inside response interceptor", error);
        const errorStatus = error.status;

        if (errorStatus === 403) {
            navigate("/");
        } 
        else if (errorStatus === 401) {
            handleLogout()
            .then(() => {
                navigate("/login");
            })
            .catch(() => {});
        }
        }

    )


    return axiosAPI
};

export default UseAxiosSecureAPI;