import { call } from '@/composables/HTTPClient.js';

export function ReadingsAPI() {

  async function getReadings(domainId: string) {
    try {
      const data = await call('get', `/`);
      return {
        returnedData: data,
      };
    } catch (error) {
      throw new Error(`Error fetching domain details: ${error.message}`);
    }
  }

  async function addReading(domainId: string) {
    try {
      const data = await call('post', `/`);
      return {
        returnedData: data,
      };
    } catch (error) {
      throw new Error(`Error fetching domain details: ${error.message}`);
    }
  }

  return {
    getReadings,
    addReading
  };
}
