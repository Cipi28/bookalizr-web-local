<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/authStore'
import { useAuth } from '@/composables/AuthentificationAPI.ts'

const user = ref({});
const getUserInfo = async () => {
  const { getUser } = useAuth();
  try {
    user.value = await getUser();
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};

onMounted(async () => {
  await getUserInfo();
});
</script>

<template>
  <div class="login-container">
    <Card
      style="
        width: 35rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        transition: box-shadow 0.3s ease;
      "
    >
      <template #title>
        <div class="title-container">
          <h2>Profile details</h2>
        </div>
      </template>
      <template #content>
        <div class="p-field">
          <label for="name" class="block mb-1">Name</label>
          <div>
            <InputText
              id="name"
              v-model="user.email"
              type="name"
              required
              class="password-full-width"
            />
          </div>
        </div>
        <div class="p-field">
          <label for="email" class="block mb-1">Email</label>
          <div>
            <InputText
              id="email"
              v-model="user.name"
              type="email"
              required
              class="password-full-width"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.password-full-width {
  width: 100%;
  margin-bottom: 1rem;
}

.password-full-width :deep(.p-password),
.password-full-width :deep(.p-inputtext) {
  width: 100% !important;
}

.login-container {
  max-width: 800px;
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
