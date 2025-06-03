<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
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
    // const toast = useToast();
    const authStore = useAuthStore();
    const credentials = ref({ email: '', password: '' });

    const onSubmit = async () => {
      const { login } = useAuth();
      await login(credentials.value, authStore);
      await router.push("/");
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
    <div class="logo">Bookalizr</div>
    <Card style="width: 25rem; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease;">
      <template #title>
        <div class="title-container">
          <h2>Login</h2>
        </div>
      </template>
      <template #content>
        <Form @submit.prevent="onSubmit">
          <div class="p-field">
            <label for="email">Email</label>
            <InputText id="email" v-model="credentials.email" type="email" required class="password-full-width"/>
          </div>
          <div class="p-field">
            <label for="password">Password</label>
            <div>
              <Password id="password" v-model="credentials.password" required class="password-full-width"/>
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
.logo {
  font-size: 4rem;
  font-weight: bold;
  color: lightgreen;
  margin-bottom: 20px;
  text-align: center;
}

.password-full-width {
  width: 100%;
  margin-bottom: 1rem
}

.password-full-width :deep(.p-password),
.password-full-width :deep(.p-inputtext) {
  width: 100% !important;
}

.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  display: flex;
  flex-direction: column; /* Change to column direction */
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
