import { call } from '@/composables/HTTPClient.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

export function useDomainDetails() {
  const router = useRouter();
  const toast = useToast();

  async function getDomainDetailsById(domainId: string) {
    try {
      const data = await call('get', `/domainDetails/${domainId}`);
      return {
        returnedData: data,
        dataFields: data.fields,
      };
    } catch (error) {
      throw new Error(`Error fetching domain details: ${error.message}`);
    }
  }

  async function updateDomainDetailsById(domainId: string, domainData: Record<string, any>) {
    try {
      await call('put', `/domainDetails/${domainId}`, domainData);
      toast.success('Job Updated Successfully');
      router.push(`/`);
    } catch (error) {
      console.error('Error updating domain details', error);
      toast.error('Job Was Not Updated');
    }
  }

  return {
    getDomainDetailsById,
    updateDomainDetailsById,
  };
}
