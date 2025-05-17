<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { useToast } from "vue-toastification";
import { useAuthStore } from '@/stores/authStore';
import { call } from "@/composables/HTTPClient.ts";
import {useAuth} from "@/composables/AuthentificationAPI.ts";

export default defineComponent({
  name: 'RegisterPage',
  components: {
    Card,
    InputText,
    Password,
    Button,
  },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const authStore = useAuthStore();
    const user = ref({ name: '', email: '', password: '' });

    const onSubmit = async () => {
      try {
        const { register } = useAuth();
        const jwt = await register(user.value, authStore);
        router.push(`/`);

        // Store the JWT token if returned from registration
        // if (response && response.jwt) {
        //   authStore.setJwt(String(response.jwt));
        //   toast.success('Registration successful!');
        //   router.push('/');
        // } else {
        //   toast.success('Registration successful! Please login.');
        //   router.push('/login');
        // }
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
      }
    };

    return {
      onSubmit,
      user,
    };
  },
});
</script>

<template>
  <div class="register-container">
    <Card style="width: 25rem;">
      <template #title>
        <div class="title-container">
          <h2>Register</h2>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="onSubmit">
          <div class="p-field">
            <label for="name">Name</label>
            <InputText id="name" v-model="user.name" required style="margin-bottom: 1rem; width: 100%"/>
          </div>
          <div class="p-field">
            <label for="email">Email</label>
            <InputText id="email" v-model="user.email" type="email" required style="margin-bottom: 1rem; width: 100%"/>
          </div>
          <div class="p-field">
            <label for="password">Password</label>
            <div>
              <Password id="password" v-model="user.password" required style="width: 100%;" />
            </div>
          </div>
          <div class="button-container">
            <Button label="Register" type="submit" />
          </div>
          <div class="login-link">
            Already have an account? <router-link to="/login">Login</router-link>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
``
.title-container {
  display: flex;
  justify-content: center;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
}
</style>
