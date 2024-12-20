import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from "primevue/button"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const app = createApp(App)

app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);

app.use(router)
app.use(axios)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark'
        }
        
    }
});

app.mount('#app')
