//  - Add a userStore.js with: currentUser (name), isLoggedIn (bool)
//  - Display the current user's name in the app header
//  - Add a "login" action that sets the user name
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  // State
  const name = ref<string>("");

  // Getters
  const currentUser = computed(() => name.value);
  const isLoggedIn = computed(() => name.value.trim().length !== 0);

  // Actions
  function login(newName: string) {
    if (newName.trim().length === 0) return;
    name.value = newName;
  }

  return {
    currentUser,
    isLoggedIn,
    login,
  };
});
