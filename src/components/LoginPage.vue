<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import {call} from "@/composables/HTTPClient.ts";
import {useToast} from "vue-toastification";
import { useAuthStore } from '@/stores/authStore';
import { useAuth } from '@/composables/AuthentificationAPI.ts';


export default defineComponent({
  name: 'LoginPage',
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
    const credentials = ref({ email: '', password: '' });

    const onSubmit = async () => {
      const { login } = useAuth();
      const jwt = await login(credentials.value, authStore);
      router.push(`/`);
    };

    return {
      onSubmit,
      credentials,
    };
  },
});
</script>

<template>
  <div class="login-container">
    <Card style="width: 25rem;">
      <template #title>
        <div class="title-container">
          <h2>Login</h2>
        </div>
      </template>
      <template #content>
        <Form @submit.prevent="onSubmit">
          <div class="p-field">
            <label for="email">Email</label>
            <InputText id="email" v-model="credentials.email" type="email" required style="margin-bottom: 1rem"/>
          </div>
          <div class="p-field">
            <label for="password">Password</label>
            <div>
              <Password id="password" v-model="credentials.password" required style="width: 100%;"/>
            </div>
          </div>
          <div class="button-container">
            <Button label="Login" type="submit" />
          </div>
          <div class="login-link">
            Dont have an account? <router-link to="/register">Register</router-link>
          </div>
        </Form>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.login-container {
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

.title-container {
  display: flex;
  justify-content: center;
}

.center-card {
  width: 100%;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
}
</style>
