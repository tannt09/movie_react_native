// LIB
import axios, {AxiosInstance} from 'axios';

// IMPORT
import {ACCESS_TOKEN, BASE_URL_DEFAULT, BASE_URL_NEW, TOKEN} from '@env';

const createApiInstance = (
  url: string,
  getToken: () => string | undefined,
): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    async config => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error),
  );

  // Response interceptor
  instance.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error:', error?.response?.data || error.message);
      return Promise.reject(error);
    },
  );

  return instance;
};

export const defaultApi = createApiInstance(BASE_URL_DEFAULT, () => TOKEN);
export const accessApi = createApiInstance(BASE_URL_NEW, () => ACCESS_TOKEN);
