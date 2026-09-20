import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

// Automatically attach the JWT token to every request
axiosInstance.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  
  if (userInfo) {
    const parsedInfo = JSON.parse(userInfo);
    if (parsedInfo.token) {
      config.headers.Authorization = `Bearer ${parsedInfo.token}`;
    }
  }
  return config;
});

export default axiosInstance;