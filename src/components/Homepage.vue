<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'
import { useAuth } from '@/composables/AuthentificationAPI.ts'
import { ReadingsAPI } from '@/composables/ReadingsAPI.ts'
import { useToast } from 'vue-toastification'

const { getUserReadings, deleteReading } = ReadingsAPI();
const toast = useToast();

const selectedBook = ref(null);
const displayDialog = ref(false);

const showBookDetails = (book) => {
  selectedBook.value = book;
  displayDialog.value = true;
};

const getReadings = async (email: string) => {
  books.value = await getUserReadings(email);
};
const finishReading = async (name: string, isbn: string) => {
  try {
    await deleteReading(name, isbn);
    toast.success('Books removed from reading list successfully!');

    // Refresh the reading list
    if (user.value?.email) {
      await getReadings(user.value.email);
    }
  } catch (error) {
    toast.error('Error finishing reading');
    console.error('Error finishing reading:', error);
  }
};

const user = ref({});
const books = ref([]);


const getUserInfo = async () => {
  const { getUser } = useAuth();
  try {
    user.value = await getUser();
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};

onMounted(async () => {
  await getUserInfo();

  if (user.value && user.value.email) {
    console.log('User data:', user.value.email);
    await getReadings(user.value.email);
  } else {
    console.error("User email not available");
  }
});
</script>

<template>
  <div class="book-container">
    <br><h2 class="center-text">My current readings</h2>

    <div class="book-grid">
      <Card v-for="(book, index) in books" :key="index" class="book-card">
        <template #header>
          <div class="image-container">
            <img
              alt="book cover"
              :src="book.coverUrl"
              class="centered-image"
            />
          </div>
        </template>
        <template #title>
          <div class="book-title center-text">{{ book.title }}</div>
        </template>
        <template #subtitle>
          <div class="center-text">{{ book.author }}</div>
        </template>
        <template #content>
          <div class="center-text">{{ book.publisher }}</div>
        </template>
        <template #footer>
          <div class="flex gap-2 mt-1 w-full">
            <Button label="Details" @click="showBookDetails(book)" style="flex-grow: 1; width: 100%; margin-bottom: 1rem"/>
            <Button severity="secondary"  label="Finish reading" class="flex-1"
                    @click="finishReading(user.email, book.isbn)"
                    style="flex-grow: 1; width: 100%;" />
          </div>
        </template>
      </Card>
    </div>

    <Dialog
      v-model:visible="displayDialog"
      :header="selectedBook?.title"
      :style="{ width: '50vw' }"
      :modal="true"
      :closable="true"
      :dismissableMask="true"
    >
      <div v-if="selectedBook" class="book-details">
        <div class="book-details-content">
          <div class="book-image">
            <img :src="selectedBook.coverUrl" alt="Book Cover" class="book-cover" />
          </div>
          <div class="book-info">
            <h3>{{ selectedBook.title }}</h3>
            <p><strong>Author:</strong> {{ selectedBook.author }}</p>
            <p><strong>Publisher:</strong> {{ selectedBook.publisher }}</p>
            <p><strong>ISBN: :</strong> {{ selectedBook.isbn }}</p>
            <p><strong>Description:</strong> {{ selectedBook.description }}</p>
          </div>
        </div>
      </div>
      <template #footer>
        <Button label="Close" @click="displayDialog = false" class="p-button-text" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.book-title {
  height: 3rem; /* Adjust height to accommodate 2 lines */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.5rem;
  text-overflow: ellipsis;
}

strong {
  font-weight: 700;
}

.book-details-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.book-cover {
  max-width: 200px;
  max-height: 300px;
  object-fit: contain;
}

@media (min-width: 768px) {
  .book-details-content {
    flex-direction: row;
  }
}

.book-info {
  flex: 1;
}

.book-info h3 {
  margin-top: 0;
}

.center-text {
  text-align: center;
}

.book-container {
  width: 100%;
  padding: 0 2rem;
  margin-top: 1rem;
  margin-bottom: 6rem;
}

.book-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 0 auto;
  margin-top: 2rem;
  padding: 0 1rem;
  max-width: 90rem;
}

.book-card {
  width: 20rem;
  overflow: hidden;
  flex: 0 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease;
}

/* Optional: Add hover effect to make cards lift slightly when hovered */
.book-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
}

.image-container {
  overflow: hidden;
}

.centered-image {
  width: 100%;
  height: 280px;
  object-fit: contain;
}

@media (max-width: 1400px) {
  .book-grid {
    max-width: 1200px;
  }
}

@media (max-width: 900px) {
  .book-card {
    width: calc(50% - 1rem);
    min-width: 15rem;
  }
}

@media (max-width: 640px) {
  .book-card {
    width: 100%;
    max-width: 20rem;
  }
}

@media (max-width: 768px) {
  .book-container {
    padding: 0 3rem; /* More padding on smaller screens */
  }
}

@media (max-width: 480px) {
  .book-container {
    padding: 0 1.5rem; /* Adjusted for very small screens */
  }
}
</style>

