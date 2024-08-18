import createAxiosInstance from './axiosInstance'

const API_URL = import.meta.env.VITE_API_URL;

export const getPrompt = async (token) => {
    try {
        const axios = await createAxiosInstance(token);
        const response = await axios.get(`${API_URL}/api/protected/prompt`);
        return response.data;
    } catch (error) {
        console.error('Error getting prompt:', error);
        throw error;
    }
};

export const postDrawing = async (token, data) => {
    try {
        const axios = await createAxiosInstance(token);
        const response = await axios.post(`${API_URL}/api/protected/submit`, data);
        return response.data;
    } catch (error) {
        console.error('Error posting message:', error);
        throw error;
    }
};
