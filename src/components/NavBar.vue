<script lang="ts">
import { defineComponent } from 'vue';
import Menubar from 'primevue/menubar';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import Button from "primevue/button";

export default defineComponent({
  name: 'NavBar',
  components: {
    Menubar,
    Button,
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const items = [
      { label: 'Home', icon: 'pi pi-home', command: () => router.push('/') },
      { label: 'About', icon: 'pi pi-table', command: () => router.push('/about') },
      { label: 'Contact', icon: 'pi pi-pencil', command: () => router.push('/contact') },
    ];

    const logout = () => {
      authStore.logout();
      router.push('/login');
    };

    return { items, logout };
  },
});
</script>

<template>
  <Menubar :model="items" class="custom-menubar">
    <template #start>
      <div class="logo">Cipi's Domains</div>
    </template>
    <template #end >
      <Button @click="logout" class="logout-button">Logout</Button>
    </template>
  </Menubar>
</template>

<style scoped>
.custom-menubar {
  background-color: lightgreen !important;
  font-size: 1.5rem;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-right: 20px;
}

.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link {
  color: var(--aura-text-color);
}

.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link .pi {
  margin-right: 0.5rem;
}

.logout-button {
  margin-right: 1rem;
  width: 8rem
}
</style>
