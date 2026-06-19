<!--
=============================================================
  DAY 5 ASSIGNMENT — TodoListView.vue
  Uses useFetch() to load and display todos from JSONPlaceholder
=============================================================
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFetch } from '@/composables/useFetch'

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

type Filter = 'all' | 'done' | 'pending'

const filter = ref<Filter>('done') // 'all' | 'done' | 'pending'

// TODO 1: Call useFetch with the JSONPlaceholder todos endpoint
// Rename 'data' to 'todos' using destructuring alias syntax
const { data: todos, loading, error } = useFetch<Todo[]>('https://jsonplaceholder.typicode.com/todos')


// TODO 2: Create a filteredTodos computed() that:
//  - Returns [] if todos.value is null (still loading)
//  - Filters by filter.value ('all' shows first 20, 'done' shows completed, 'pending' shows incomplete)
const filteredTodos = computed(() => {
  if (!todos.value) return [] // still loading
  if (filter.value === 'all') return todos.value.slice(0, 20)
  if (filter.value === 'done') return todos.value.filter(todo => todo.completed)
  if (filter.value === 'pending') return todos.value.filter(todo => !todo.completed)
  return []
})

function setFilter(selectedFilter: Filter) {
  filter.value = selectedFilter;
}
</script>

<template>
  <div class="todo-view">
    <h1>📋 Todo List</h1>
    <p class="subtitle">Loaded from JSONPlaceholder API</p>

    <!-- TODO 3: Show a loading message/spinner while loading is true -->
    <span v-if="loading" class="loading">Your list is loading...</span>
    <!-- TODO 4: Show an error message if error has a value -->
    <div v-if="error" class="error-box">Error: {{ error }}</div>
    <!-- TODO 5: Show the content block when NOT loading and NO error -->
    <div>
      <!-- Filter buttons -->
      <div v-if="!loading && !error" class="filters">
        <!-- TODO 6: Three buttons — All, Done, Pending -->
        <!-- Each sets filter.value and gets :class="{ active: filter === '...' }" -->
        <button type="button" :class="{ active: filter === 'all'}" @click="setFilter('all')">All</button>
        <button type="button" :class="{ active: filter === 'done'}" @click="setFilter('done')">Done</button>
        <button type="button" :class="{ active: filter === 'pending'}" @click="setFilter('pending')">Pending</button>
      </div>

      <!-- TODO 7: Render filteredTodos using v-for -->
      <ul class="todo-list">
        <!-- li with checkbox (disabled, reflects todo.completed) and title -->
        <li v-for="todo in filteredTodos" :key="todo.id" :class="{ 'done-item': todo.completed }">
          <input :checked="todo.completed" type="checkbox" :id="todo.id.toString()" disabled>
          <span :class="{ 'completed-text': todo.completed }">{{ todo.title }}</span>
        </li>
      </ul>

      <!-- TODO 8: Show count of visible items -->
      <span v-if="!loading && !error" class="count">{{ `Number of visible items: ${filteredTodos.length}` }}</span>
    </div>
  </div>
</template>

<style scoped>
.todo-view { max-width: 560px; margin: 40px auto; padding: 24px; font-family: Arial, sans-serif; }
h1 { color: #1B2A4A; margin-bottom: 4px; }
.subtitle { color: #9ca3af; font-size: 13px; margin-bottom: 20px; }
.loading { text-align: center; padding: 48px; color: #42B883; font-size: 16px; }
.error-box { background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px; color: #dc2626; }
.filters { display: flex; gap: 8px; margin-bottom: 16px; }
.filters button { padding: 6px 16px; border: 1px solid #ddd; border-radius: 20px; background: white; cursor: pointer; font-size: 13px; }
.filters button.active { background: #42B883; color: white; border-color: #42B883; }
.todo-list { list-style: none; padding: 0; margin: 0; }
.todo-list li { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: white; border-radius: 6px; margin-bottom: 6px; border: 1px solid #eee; font-size: 14px; }
.todo-list li.done-item { opacity: 0.6; }
.todo-list li span { flex: 1; }
.completed-text { text-decoration: line-through; color: #9ca3af; }
.count { font-size: 13px; color: #9ca3af; margin-top: 12px; text-align: right; }
</style>
