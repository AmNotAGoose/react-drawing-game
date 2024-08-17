import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const createAxiosInstance = (token) => {
    const instance = axios.create({
        baseURL: API_URL,
    });
    
    instance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};

export default createAxiosInstance;