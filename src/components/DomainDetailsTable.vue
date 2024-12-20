<script>
import { defineComponent } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default defineComponent({
  name: 'DomainDetailsTable',
  props: {
    domainName: {
      type: String,
      required: true,
    },
    domaniTables: {
      type: Array,
      required: true,
    },
  },
  computed: {
    filteredEntries() {
      return this.domaniTables.filter(item => item.domainName === this.domainName);
    }
  },
  components: {
    DataTable,
    Column,
  },
});
</script>


<template>
    <DataTable :value="filteredEntries">
      <Column field="domainName" header="Domain Name"/>
      <Column field="name" header="Name"  />
      <Column field="description" header="Description" />
      <Column field="technicalName" header="Technical Name"/>
      <Column field="timestampActive" header="Time" style="width: 14%" />
    </DataTable>
  </template>