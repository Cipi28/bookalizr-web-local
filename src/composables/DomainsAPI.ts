import { call } from '@/composables/HTTPClient.js';

export function useDomains() {

  async function getDomains() {
    try {
      const data = await call('get', '/data');
      return data.map((item: { data: { timestampActive: any; }; }) => {
        return {
          ...item.data,
          timestampActive: new Date(item.data.timestampActive).toLocaleString()
        };
      });
    } catch (error) {
      throw new Error(`Error fetching domains: ${error.message}`);
    }
  }

  return {
    getDomains,
  };
}
