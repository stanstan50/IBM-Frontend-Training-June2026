<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'

// Task 4 extension: user state

import { useUserStore } from "@/stores/userStore.ts";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { currentUser, isLoggedIn } = storeToRefs(userStore);

const { login } = userStore;

const newUsername = ref("");

function handleLogin() {
  // client-side guard
  if (newUsername.value.trim().length === 0) return;

  login(newUsername.value);

  newUsername.value = "";
}
</script>

<template>
  <nav>
    <span v-if="isLoggedIn">User: {{ currentUser }}</span>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/task1">Task 1</RouterLink>
    <RouterLink to="/task2">Task 2</RouterLink>
    <RouterLink to="/task3">Task 3</RouterLink>
    <RouterLink to="/task4">Task 4</RouterLink>
  </nav>
  <div v-if="!isLoggedIn" class="input-row">
    <input
      v-model="newUsername"
      placeholder="Input your username..."
      @keyup.enter="handleLogin"
    />
    <button @click="handleLogin">Login</button>
  </div>
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
