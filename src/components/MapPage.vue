<script setup lang="ts">
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import L from 'leaflet'
import { ReadingsAPI } from '@/composables/ReadingsAPI.ts'
import { useAuth } from '@/composables/AuthentificationAPI.ts'

// Fix the Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
})

const userLocationIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const map = ref(null)
const userLocation = ref<[number, number]>([45.75, 21.23]) // Default location (Timisoara)
const hasUserLocation = ref(false)
const locationSet = ref(false)
const toast = useToast()

const { getNearbyReadings } = ReadingsAPI();
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

// Get user location on component mount
onMounted(async () => {
  await getUserInfo();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // Success handler
        userLocation.value = [position.coords.latitude, position.coords.longitude]
        hasUserLocation.value = true
        locationSet.value = true

        // Center the map on user location
        if (map.value) {
          map.value.leafletObject.setView(userLocation.value, 13)
        }
        // Get nearby readings AFTER location is determined
        if (user.value?.email) {
          try {
            books.value = await getNearbyReadings(userLocation.value[0], userLocation.value[1], user.value.email);
            console.log('Nearby readings:', books.value);
          } catch (error) {
            console.error('Error fetching nearby readings:', error);
            toast.error('Failed to fetch nearby readings');
          }
        }
      },
      async (error) => {
        // Error handler
        console.error("Error getting location:", error, error.PERMISSION_DENIED);
        if(error.PERMISSION_DENIED) {
          locationSet.value = true
          toast.info("Location not provided, default location set on Timisoara")
          if (user.value?.email) {
            try {
              books.value = await getNearbyReadings(userLocation.value[0], userLocation.value[1], user.value.email);
              console.log('Nearby readings with default location:', books.value);
            } catch (error) {
              console.error('Error fetching nearby readings:', error);
              toast.error('Failed to fetch nearby readings');
            }
          }
        }

      },
      { timeout: 5000, maximumAge: 60000, enableHighAccuracy: true }
    )
  }
})

</script>

<template>
  <div class="map-container">
    <l-map ref="map" :zoom="13" :center="userLocation">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
      <!-- User location marker -->
      <l-marker
        v-if="locationSet"
        :lat-lng="userLocation"
        :icon="userLocationIcon"
      >
        <l-popup>
          <div>
            <h3 v-if="hasUserLocation">Your Location</h3>
            <p v-if="hasUserLocation">Current position</p>
            <p v-else>Default location (Timisoara)</p>
          </div>
        </l-popup>
      </l-marker>
      <l-marker v-for="book in books" :key="book.id" :lat-lng="[Number(book.latitude), Number(book.longitude)]">
        <l-popup>
          <div v-if="book" class="book-details">
            <div class="book-details-content">
              <div class="book-image">
                <img :src="book.coverUrl" alt="Book Cover" class="book-cover" />
              </div>
              <div class="book-info">
                <h3>{{ book.title }}</h3>
                <p><strong>Author:</strong> {{ book.author }}</p>
                <p><strong>ISBN:</strong> {{ book.isbn }}</p>
                <p><strong>Publisher:</strong> {{ book.publisher }}</p>
                <p><strong>Year:</strong> {{ book.year }}</p>
              </div>
            </div>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<style scoped>
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

.map-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 64px); /* Adjust this value based on your navbar height */
}

:deep(.leaflet-container) {
  width: 100%;
  height: 100%;
}
</style>
