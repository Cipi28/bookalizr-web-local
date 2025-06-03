import { call } from '@/composables/HTTPClient.js'

export function ReadingsAPI() {
  async function getUserReadings(email: string) {
    try {
      return await call('get', `/api/reading/user-books/${email}`)
    } catch (error) {
      throw new Error(`Error fetching domain details: ${error.message}`)
    }
  }

  async function addReading(reading) {
    try {
      return await call('post', `/api/reading`, reading)
    } catch (error) {
      throw new Error(`Error fetching domain details: ${error.message}`)
    }
  }

  async function deleteReading(name, isbn) {
    try {
      return await call('delete', `/api/reading/${name}/${isbn}`)
    } catch (error) {
      throw new Error(`Error fetching domain details: ${error.message}`)
    }
  }

  async function getNearbyReadings(lat, long, name) {
    try {
      return await call('get', `/api/reading/nearby?latitude=${lat}&longitude=${long}&username=${name}`)
    } catch (error) {
      throw new Error(`Error fetching domain details: ${error.message}`)
    }
  }

  return {
    getUserReadings,
    addReading,
    deleteReading,
    getNearbyReadings
  }
}
