<script>
import { defineComponent } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import DomainDetailsTable from './DomainDetailsTable.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'DomainsTable',
  props: {
    domainNames: {
      type: Array,
      required: true,
    },
    domaniTables: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      expandedRows: [],
    };
  },
  components: {
    DataTable,
    Column,
    DomainDetailsTable,
    Button,
  },
});
</script>


  <template>
      <DataTable v-model:expandedRows="expandedRows" :value="domainNames" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" class="p-datatable-dark table-margin" dataKey="domainName">
        <Column expander style="width: 5rem" />
        <Column field="domainName" header="Domain" />
        <template #expansion="slotProps">
          <DomainDetailsTable :domainName="slotProps.data.domainName" :domaniTables="domaniTables" />
        </template>
        
      </DataTable>
  </template>

<style>
.table-margin {
  margin: 2%;
}
</style>
