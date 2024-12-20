<script lang="ts">
import { defineComponent } from 'vue';
import Button from "primevue/button"
import DomainsTable from './DomainsTable.vue';
import { call } from '@/composables/HTTPClient.js';
import { toggleDarkMode } from '@/composables/ThemeService';


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
    fetchData() {
      call('get', '/v3/3ccd646a-9f84-4d17-ad51-d66d6218a9e2').then((data: {
        data: any; map: (arg0: (item: { data: { timestampActive: string | number | Date; }; }) => { timestampActive: string; }) => never[]; 
      }) => {

        this.domaniTables = data.data.map((item: { data: { timestampActive: string | number | Date; }; }) => {
          return {
            ...item.data,
            timestampActive: new Date(item.data.timestampActive).toLocaleString()
          };
        });

        const uniqueDomainNames = [...new Set(this.domaniTables.map(item => item.domainName))];
        this.domainNames = uniqueDomainNames.map(domainName => ({ domainName }));

      })
      .catch((error: null) => {
        this.error = error;
      });
    },
  },
  components: {
    Button,
    DomainsTable,
  },
  mounted() {
    this.fetchData();
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

