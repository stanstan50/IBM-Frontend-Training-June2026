<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/task1">Task 1</RouterLink>
        <RouterLink to="/task2">Task 2</RouterLink>
    </nav>
    
</template>

<script setup lang="ts">

</script>

<style scoped>
nav {
  background: var(--social-bg);
  padding: 16px;
  display: flex;
  gap: 16px;
}
</style>