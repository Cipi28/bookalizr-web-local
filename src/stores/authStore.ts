import { defineStore } from 'pinia';
import axios from "axios";
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    jwt: Cookies.get('jwt') || '',
  }),
  actions: {
    setJwt(token: string) {
      this.jwt = token;
      Cookies.set('jwt', token);
    },
    logout() {
      this.jwt = null;
      Cookies.remove('jwt');
    },
  },
});
