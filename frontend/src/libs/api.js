import axios from "axios";

const API = axios.create({ baseURL: '/api/v1' });

API.interceptors.request.use(config => {
    if(!config.headers) config.headers = {};
    config.headers.Authorization = localStorage.getItem('token') || '';
    return config;
});

export default API;