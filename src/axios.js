import axios from "axios";

// const instance = axios.create({
//     baseURL: 'http://localhost:4444'
// });

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL
});

// на каждый запрос делаем в headers authorisation
instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');

    return config;
});

export default instance;
