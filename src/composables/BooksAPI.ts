import { call } from '@/composables/HTTPClient.js'

export function BooksAPI() {
  async function getAllBooks() {
    try {
      return await call('get', `/api/book/getAll`)
    } catch (error) {
      throw new Error(`Error fetching domain details: ${error.message}`)
    }
  }

  async function addReading(domainId: string) {
    try {
      const data = await call('post', `/`)
      return {
        returnedData: data,
      }
    } catch (error) {
      throw new Error(`Error fetching domain details: ${error.message}`)
    }
  }

  return {
    getAllBooks,
    addReading,
  }
}
