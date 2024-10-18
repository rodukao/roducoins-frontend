import axios from 'axios';

console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);


const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Ou de onde você estiver armazenando o token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, 
  (error) => Promise.reject(error)
);

export default api;