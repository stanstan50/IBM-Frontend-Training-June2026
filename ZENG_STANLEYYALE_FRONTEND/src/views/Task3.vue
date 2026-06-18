<template>
  <HomeView/>
</template>

<script setup lang="ts">

  import { useRouter } from 'vue-router';
import HomeView from './HomeView.vue';


  const router = useRouter();
  router.push('/task3');
</script>

<style scoped>

</style>