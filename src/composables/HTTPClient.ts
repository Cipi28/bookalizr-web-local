import axios, { type AxiosRequestConfig, type Method } from 'axios';

const BASE_URL = 'https://run.mocky.io';

export async function call(method: Method, endpoint: string, data?: any, config?: AxiosRequestConfig) {
    const url = `${BASE_URL}${endpoint}`;
  
    try {
      const response = await axios({
        method,
        url,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }