import './assets/main.css'
import 'primeicons/primeicons.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Toast from 'vue-toastification';
import { createPinia } from 'pinia'
import 'vue-toastification/dist/index.css';
interface ThemeOptions {
  darkModeSelector: string;
}

interface ThemePreset {
  PaletteDesignToken: any;
  SemanticDesignTokens: any;
  PrimitiveDesignTokens: any;
  ColorSchemeDesignToken: any;
}

interface Theme {
  preset: ThemePreset;
  options: ThemeOptions;
}

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(Toast)
app.use(pinia)

app.use(PrimeVue, {
  theme:  {
    preset: Aura as ThemePreset,
    options: {
      darkModeSelector: '.my-app-dark'
    }
  } as Theme
});

app.mount('#app')
