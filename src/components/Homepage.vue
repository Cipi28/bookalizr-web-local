<script lang="ts">
import { defineComponent } from 'vue';
import Button from "primevue/button"
import DomainsTable from './DomainsTable.vue';
import { call } from '@/composables/HTTPClient.js';
import { toggleDarkMode } from '@/composables/ThemeService';
import { useAuthStore } from '@/stores/authStore';
import { useDomains } from '@/composables/DomainsAPI';


// noinspection TypeScriptValidateTypes
export default defineComponent({
  name: 'Homepage',
  data() {
    return {
      domaniTables: [] as Array<{ domainName: string; [key: string]: any }>,
      domainNames: [] as Array<{ domainName: string }>,
      error: null,
    };
  },
  computed: {
    getEntriesByDomainName() {
      return (domainName: any) => {

        return this.domaniTables.filter(item => item.domainName === domainName);
      };
    }
  },
  methods: {
    async fetchData() {
      const { getDomains } = useDomains();
      this.domaniTables = await getDomains();

      const uniqueDomainNames = [...new Set(this.domaniTables.map(item => item.domainName))];
      this.domainNames = uniqueDomainNames.map(domainName => ({ domainName }));
    }
  },
  components: {
    Button,
    DomainsTable,
  },
  mounted() {
    this.fetchData();
  },
  setup() {
    const authStore = useAuthStore();
    const token = authStore.jwt;

    console.log('JWT Token:', token);

    return {
      token,
    };
  },
});
</script>

<template>
  <div>
    <br><h2 class="center-text">Domain Table</h2>
    <DomainsTable :domainNames="domainNames" :domaniTables="domaniTables" />
    <br><Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
  </div>
</template>

<style>
  .center-text {
  text-align: center;
}

</style>

