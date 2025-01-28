<script lang="ts">
import NavBar from "@/components/NavBar.vue";
import { RouterView } from 'vue-router'
export default {
  name: 'PageLayout',
  components: {
    NavBar,
    RouterView,
  },
};

</script>

<template>
  <div>
    <NavBar />
    <RouterView />
  </div>
</template>
