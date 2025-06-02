import { call } from '@/composables/HTTPClient.js';

export function useAuth() {

  async function login(credentials: { email: string; password: string }, authStore: any) {
    try {
      const response = await call('get', `/login`, credentials);
      authStore.setJwt(response.jwt);
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  async function register(credentials: { name: string; email: string; password: string }, authStore: any) {
    try {
      const response = await call('post', `/register`, credentials);
      authStore.setJwt(response.jwt);
    } catch (error) {
      throw new Error(`Register failed: ${error.message}`);
    }
  }

  return {
    login,
    register
  };
}
