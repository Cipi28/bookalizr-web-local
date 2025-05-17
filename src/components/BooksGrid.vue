<script setup lang="ts">
import { ref } from 'vue'
import DataView from 'primevue/dataview'
import Card from 'primevue/card'

interface Book {
  id: number
  cover: string
  title: string
  location: string
}

// Example data: replace with your actual data or fetch dynamically
const books = ref<Book[]>(
  Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    cover: 'https://via.placeholder.com/150x200?text=Book+' + (i + 1),
    title: `Book Title ${i + 1}`,
    location: `Library ${((i % 5) + 1)}`
  }))
)
</script>

<template>
  <div class="book-grid-container">
    test2
    <p>test</p>
    <p>Debug: {{ books.length }} books available</p>
    <DataView :value="books" layout="grid">
      <template #grid="slotProps">
        <div class="grid">
          <div class="col-12 md:col-4 lg:col-3" v-for="book in slotProps.items" :key="book.id">
            <Card>
              <template #header>
                <img :src="book.cover" alt="Book Cover" class="book-cover" />
              </template>
              <template #title>
                {{ book.title }}
              </template>
              <template #content>
                <p class="location">{{ book.location }}</p>
              </template>
            </Card>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<style scoped>
.book-grid-container {
  padding: 2rem;
}
.book-cover {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.location {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}
</style>
