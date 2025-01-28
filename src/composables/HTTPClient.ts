import axios, { type AxiosRequestConfig, type Method } from 'axios';
import { useAuthStore } from '@/stores/authStore';

const BASE_URL = 'http://localhost:5000';


export async function call(method: Method, endpoint: string, data?: any, config?: AxiosRequestConfig) {
    const url = `${BASE_URL}${endpoint}`;

  const authStore = useAuthStore();
  const token = authStore.jwt;
  console.log("token", token);

  const headers = {
    'Authorization': `Bearer ${token}`
  };

    try {
      const response = await axios({
        method,
        url,
        data,
        headers,
        ...config,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
}
