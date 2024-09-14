import axios from 'axios';


const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL+'/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// add token to headers bearer token
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;