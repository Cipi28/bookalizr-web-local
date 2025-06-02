import { call } from '@/composables/HTTPClient.js';
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export function useAuth() {
  const router = useRouter();
  const toast = useToast();

  async function login(credentials: { email: string; password: string }, authStore: any) {
    try {
      const response = await call('post', `/authentication/login`, credentials);
      authStore.setJwt(response.token);
      router.push("/");
    } catch (error) {
      toast.error(`Credentials are not valid`);
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  async function register(credentials: { name: string; email: string; password: string }, authStore: any) {
    try {
      await call('post', `/authentication/register`, credentials);
      toast.success('Registration successful! Please log in.');
      router.push("/login");
    } catch (error) {
      toast.error(`${error}`)
      throw new Error(`Register failed: ${error.message}`);
    }
  }

  return {
    login,
    register
  };
}
