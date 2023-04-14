import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4444'
});

// на каждый запрос делаем в headers authorisation
instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');

    return config;
});

export default instance;
