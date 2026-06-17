<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/task1">Task 1</RouterLink>
    <RouterLink to="/task2">Task 2</RouterLink>
    <RouterLink to="/task3">Task 3</RouterLink>
    <!-- <RouterLink :to="{ name: 'tasks', params: { id: 1 } }">Task 1</RouterLink>
    <RouterLink :to="{ name: 'tasks', params: { id: 2 } }">Task 2</RouterLink>
    <RouterLink :to="{ name: 'tasks', params: { id: 3 } }">Task 3</RouterLink> -->
  </nav>
  <RouterView />
  <!-- <HelloWorld /> -->
</template>

<style scoped>
nav {
  background: var(--social-bg);
  padding: 16px;
  display: flex;
  gap: 16px;
}
</style>
