<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { call } from '@/composables/HTTPClient.js';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { Form } from '@primevue/forms';
import DatePicker from 'primevue/datepicker'
import { ref } from 'vue';
import { useDomainDetails } from '@/composables/DomainDetailsAPI';


  // noinspection TypeScriptValidateTypes
export default defineComponent({
    name: 'DomainPage',
    data() {
    return {
        // id: this.$route.params.id,
        data: {} as Record<string, any>,
        dataFields: [] as Array<{ bindingKey: string; input: string | number; label: string; inputType: string; settings?: { maxLength?: number }; type?: string }>,
        error: null,
        isReadOnly: true,
    };
  },
    methods: {
        async fetchData() {
          const { getDomainDetailsById } = useDomainDetails();
          const {returnedData, dataFields} = await getDomainDetailsById(this.id);
          this.data = returnedData;
          this.dataFields = dataFields;
        },
      getComponentType(inputType: any) {
        switch (inputType) {
          case 'TextField':
            return 'InputText';
          case 'NumberField':
            return 'InputNumber';
          case 'TextAreaField':
            return 'Textarea';
          case 'DateTimeField':
            return 'DatePicker';
          default:
            return 'InputText';
        }
      },
      goToEditPage() {
        this.router.push(`/domain-tables/${this.id}/edit`);
      },
    },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const id = route.params.id;
      const date = ref();

    return {
        router,
        id,
        date,
    };
  },
    mounted() {
        this.fetchData();
    },
    components: {
    InputText,
    InputNumber,
    Textarea,
    Button,
    Form,
    DatePicker,
  },
  });
</script>

<template>
    <div class="domain-page">
      <div class="header">
        <h2 class="center-text">Domain Details for ID: {{ id }}</h2>
        <Button label="Edit" icon="pi pi-pencil" class="p-button-secondary" @click="goToEditPage" />
      </div>
      <br><br>
      <Form>
        <Fieldset legend="Domain Details" class="fieldset">
          <div v-for="field in dataFields" :key="field.bindingKey" class="field-container">
            <label :for="field.bindingKey" class="field-label">{{ field.label }}</label>
            <component
              :is="getComponentType(field.inputType)"
              v-model="field.input"
              :id="field.bindingKey"
              :maxlength="field.settings?.maxLength"
              :type="field.type"
              :class="['p-inputtext', 'p-component', 'field-input']"
              :readonly="isReadOnly"
              :disabled="isReadOnly"
            />
          </div>
        </Fieldset>
      </Form>
    </div>
  </template>

<style>
.domain-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.center-text {
  text-align: center;
}

.fieldset {
  margin-bottom: 20px;
}

.field-container {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.field-label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.field-input {
  width: 100%;
}

.p-inputtext, .p-inputnumber, .p-textarea {
  width: 100%;
}
</style>
