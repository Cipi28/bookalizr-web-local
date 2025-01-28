<script lang="ts">
import { defineComponent, watch, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { call } from '@/composables/HTTPClient.js';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { Form } from '@primevue/forms';
import Fieldset from 'primevue/fieldset';
import DatePicker from 'primevue/datepicker'
import { useToast } from 'vue-toastification';
import { useDomainDetails } from '@/composables/DomainDetailsAPI';

interface DataField {
  bindingKey: string;
  label: string;
  inputType: string;
  settings?: {
    maxLength?: number;
  };
  type?: string;
}

interface DomainData {
  [key: string]: any;
}

// noinspection TypeScriptValidateTypes
export default defineComponent({
  name: 'DomainEditPage',
  data() {
    return {
      id: null as string | null,
      data: reactive({}) as DomainData,
      dataFields: [] as DataField[],
      error: null as Error | null,
    };
  },
  methods: {
    async fetchData() {
      const {returnedData, dataFields} = await this.getDomainDetailsById(this.id);
      this.data = returnedData;
      this.dataFields = dataFields;
    },
    getComponentType(inputType: string): string {
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
    async onSubmit() {
      await this.updateDomainDetailsById(this.id, this.data, this.toast, this.router);
    },
  },
  mounted() {
    const route = useRoute();
    this.id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    this.fetchData();
  },
  setup() {

    const { getDomainDetailsById, updateDomainDetailsById } = useDomainDetails();

    const toast = useToast();
    const router = useRouter();

    return {
      toast,
      router,
      getDomainDetailsById,
      updateDomainDetailsById
    };
  },
  components: {
    InputText,
    InputNumber,
    Textarea,
    Button,
    Form,
    Fieldset,
    DatePicker,
  },
});
</script>

<template>
    <div class="domain-page">
      <div class="header">
        <h2 class="center-text">Edit Domain Details for ID: {{ id }}</h2>
      </div>
      <br><br>
      <Form @submit="onSubmit">
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
            />
          </div>
        </Fieldset>
        <Button label="Update" type="submit" class="p-button-primary" />
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
