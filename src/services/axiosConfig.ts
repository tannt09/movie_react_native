// LIB
import axios from 'axios';

// IMPORT
import {BASE_URL, TOKEN} from '@env';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Optional: Add request interceptor
api.interceptors.request.use(
  async config => {
    if (TOKEN) {
      config.headers.Authorization = `Bearer ${TOKEN}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Optional: Add response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally
    console.error('API Error:', error?.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
