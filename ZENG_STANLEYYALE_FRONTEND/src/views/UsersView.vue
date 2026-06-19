<!--
=============================================================
  DAY 5 ASSIGNMENT Extension — UserView.vue
  Uses useFetch() to load and display user cards from JSONPlaceholder
=============================================================
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFetch } from '@/composables/useFetch'

interface Geo {
  lat: string
  lng: string
}

interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

interface Company {
  name: string
  catchPhrase: string
  bs: string
}

interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

const { data: users, loading, error, refetch } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users')

const nameFilter = ref<string>('');

const filteredUsers = computed(() => {
  if (!users.value) return [];
  if (nameFilter.value.length === 0) return users.value

  return users.value.filter(user => 
    user.name.includes(nameFilter.value) || user.username.includes(nameFilter.value)
  )
})

</script>

<template>
  <div class="user-view">
    <h1>User List</h1>
    <p class="subtitle">Loaded from JSONPlaceholder API</p>

    <span v-if="loading" class="loading">Your list is loading...</span>
    <div v-if="error" class="error-box">Error: {{ error }}</div>
    <button v-if="error" type="button" class="retry-button" @click="refetch">Retry</button>

    <div v-if="!loading && !error" >
      <div class="filters">
        <input type="text" v-model="nameFilter" placeholder="Enter name or username...">
      </div>

      <div class="user-grid">
        <div v-for="user in filteredUsers" :key="user.id" class="user-card">
          <h3 class="user-name">{{ user.name }}</h3>
          <p class="user-username">@{{ user.username }}</p>

          <p class="user-detail">
            <span class="label">Email</span>
            <a :href="`mailto:${user.email}`">{{ user.email }}</a>
          </p>
          <p class="user-detail">
            <span class="label">Phone</span>
            {{ user.phone }}
          </p>
          <p class="user-detail">
            <span class="label">Website</span>
            <a :href="`https://${user.website}`" target="_blank" rel="noopener">{{ user.website }}</a>
          </p>
          <p class="user-detail">
            <span class="label">City</span>
            {{ user.address.city }}
          </p>
          <p class="user-company">{{ user.company.name }}</p>
        </div>
      </div>

      <span class="count">{{ `Number of visible items: ${filteredUsers.length}` }}</span>
    </div>
  </div>
</template>

<style scoped>
.user-view { max-width: 900px; margin: 40px; padding: 24px; font-family: Arial, sans-serif; }
h1 { color: #1B2A4A; margin-bottom: 4px; }
.subtitle { color: #9ca3af; font-size: 13px; margin-bottom: 20px; }
.loading { text-align: center; padding: 48px; color: #42B883; font-size: 16px; }
.error-box { background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px; color: #dc2626; }
.retry-button { padding: 6px 16px; border: 1px solid #ddd; border-radius: 20px; background: white; cursor: pointer; font-size: 13px; }
.filters { display: flex; gap: 8px; margin-bottom: 16px; }
.filters input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}
.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
.user-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
}
.user-name { color: #1B2A4A; margin: 0 0 2px; font-size: 16px; }
.user-username { color: #42B883; margin: 0 0 12px; font-size: 13px; }
.user-detail { margin: 4px 0; font-size: 13px; color: #374151; }
.user-detail .label { display: inline-block; width: 64px; color: #9ca3af; }
.user-company { margin: 12px 0 0; font-size: 12px; color: #9ca3af; font-style: italic; }
.count { font-size: 13px; color: #9ca3af; margin-top: 12px; text-align: right; }
</style>
