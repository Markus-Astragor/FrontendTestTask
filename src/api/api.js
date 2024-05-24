import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

api.interceptors.request.use(
  config => {
    const token = Cookies.get('token');
    console.log('token', token);
    if (token) {
      config.headers.token = `${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
