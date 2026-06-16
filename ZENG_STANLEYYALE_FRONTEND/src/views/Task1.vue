<!--
=============================================================
  DAY 1 ASSIGNMENT — Reactive Task Counter App
  Topic: Vue 3 Composition API (ref, computed, v-model, v-for)
  Time: 60 minutes
=============================================================

OBJECTIVE
---------
Build a reactive task management app that demonstrates Vue 3's
reactivity system. You will use ref(), computed(), v-model, v-for,
and event handling — the core building blocks of every Vue app.

WHAT TO BUILD
-------------
A single-file Vue component (this file) that:

  1. Has a text input + "Add Task" button to create new tasks.
  2. Displays the task list, each item with:
       - A checkbox to mark it as done
       - The task name (strike-through when done)
       - A "Remove" button
  3. Shows a live stats bar:
       Total Tasks | Done: X | Pending: X
  4. Shows an empty state message when there are no tasks.

REQUIREMENTS (Acceptance Criteria)
------------------------------------
  [x] Use ref() for the text input value
  [x] Use ref() for the tasks array
  [x] Use computed() for total, done, and pending counts
  [x] Use v-model on the text input
  [x] Use v-for with :key to render the task list
  [x] Use @keyup.enter on the input to also trigger addTask
  [x] Prevent adding empty/whitespace-only tasks
  [x] Clear the input after adding a task

EXTENSION (if you finish early)
---------------------------------
  - Add a filter bar: All | Done | Pending — filters the visible list
  - Add a "Clear All Done" button that removes all completed tasks
  - Add a task priority: Low / Medium / High (use a <select> dropdown)

HINTS (read only if stuck)
---------------------------
  Hint 1: import { ref, computed } from 'vue'
  Hint 2: tasks.value.push({ id: Date.now(), name: '...', done: false })
  Hint 3: computed(() => tasks.value.filter(t => t.done).length)
  Hint 4: For :class strikethrough — :class="{ done: task.done }"
  Hint 5: v-model on a checkbox binds to a boolean — v-model="task.done"
  Hint 6: To prevent empty tasks — if (!newTaskName.value.trim()) return

FILE STRUCTURE (this is a single-file component)
-------------------------------------------------
  <script setup>  — all your reactive logic goes here
  <template>      — your HTML markup
  <style scoped>  — your CSS (scoped = only applies to this component)
=============================================================
-->

<script setup lang="ts">
import { ref, computed } from 'vue'

// TODO 1: Create a ref for the text input value (initial value: '')
const newTaskName = ref('')

// TODO 2: Create a ref for the tasks array (initial value: [])
type Priority = 'low' | 'medium' | 'high' | 'none'

interface Task {
  id: string
  name: string
  done: boolean
  priority: Priority
}

const tasks = ref<Task[]>([])

// TODO 3: Create computed() values for total, done, and pending counts
const totalCount  = computed(() => {
    return tasks.value.length
})

const doneCount   = computed(() => {
    return getTaskCounts().doneCount
})
const pendingCount = computed(() => {
    return getTaskCounts().pendingCount
})

// === Extended ===
// Filtering
type Filter = 'all' | 'done' | 'pending'

const activeFilter = ref<Filter>('all')

const filteredTasks = computed(() => {
    return getFilteredTasks()
})

// Priority filtering
type PriorityFilter = 'all' | 'low' | 'medium' | 'high' | 'none'

const selectedPriorityFilter = ref<PriorityFilter>('all')

const newTaskPriority = ref<Priority>('none')

// Helper function to get task counts
function getTaskCounts() {
    const totalCount : number = tasks.value.length;
    let doneCnt : number = 0
    for (const task of tasks.value) {
        if (task.done) {
            doneCnt++
        }
    }

    return {
        totalCount: totalCount,
        doneCount: doneCnt,
        pendingCount: (totalCount - doneCnt)
    }
}

// Function to change filter state
function setFilter(filter : Filter) {
    activeFilter.value = filter
}

// Function to filter task, in terms of status and priority
function getFilteredTasks() : Task[] {
    let filtered: Task[] = []

    switch (activeFilter.value) {
      case 'done': 
        filtered = tasks.value.filter(task => task.done)
        break
      case 'pending': 
        filtered = tasks.value.filter(task => !task.done)
        break
      default: 
        filtered = tasks.value
    }

    switch (selectedPriorityFilter.value) {
      case 'low':
        filtered = tasks.value.filter(task => task.priority === 'low')
        break
      case 'medium':
        filtered = tasks.value.filter(task => task.priority === 'medium')
        break
      case 'high':
        filtered = tasks.value.filter(task => task.priority === 'high')
        break
      case 'none':
        filtered = tasks.value.filter(task => task.priority === 'none')
        break
        // default: no filtering needed
    }

    return filtered
}

// TODO 4: Write the addTask() function
// - Prevent empty tasks
// - Push a new task object to tasks.value: { id, name, done }
// - Clear the input
function addTask() {
    // Prevent empty tasks
    if (newTaskName.value.trim().length == 0) {
      // TODO: Warnings
      return
    }

    // Create and push new task
    const newTask = {
      id: crypto.randomUUID(),
      name: newTaskName.value.trim(),
      done: false,
      priority: newTaskPriority.value
    }

    tasks.value.push(newTask)

    // Clear input
    newTaskName.value = '';
}

// TODO 5: Write toggleTask(id) — flip task.done for the matching task
function toggleTask(id: string) {
    const task = tasks.value.find(task => task.id === id)
    if (!task) {
      // TODO: Warnings / throw
      return
    }

    task.done = !task.done
}

// TODO 6: Write removeTask(id) — filter out the task with this id
function removeTask(id: string) {
    tasks.value = tasks.value.filter(task => task.id !== id)
}

// Clear all done function
function clearAllDone() {
  tasks.value = tasks.value.filter(task => !task.done)
}
</script>

<template>
  <div class="app">
    <h1>Task Counter</h1>

    <!-- TODO 7: Add an input with v-model, @keyup.enter, and placeholder -->
    <!-- TODO 8: Add an "Add Task" button with @click="addTask" -->
    <div class="input-row">
      <!-- your input and button here -->
      <input v-model="newTaskName" @keyup.enter="addTask" placeholder="Enter a new task name">

      <label class="field-label" for="new-priority-select">Priority: </label>
      <select id="new-priority-select" v-model="newTaskPriority">
        <option value="none">None</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="button" @click="addTask">Add Task</button>
    </div>

    <!-- TODO 9: Display the stats bar using your computed values -->
    <!-- Format: Total: X | Done: X | Pending: X -->
    <div class="stats">
      Total: {{ totalCount }} | Done: {{ doneCount }} | Pending: {{ pendingCount }}
    </div>

    <div class="filter-row">
      <button type="button" @click="setFilter('all')" :class="{ active: activeFilter === 'all' }">
        All
      </button>
      <button type="button" @click="setFilter('done')" :class="{ active: activeFilter === 'done' }">
        Done
      </button>
      <button type="button" @click="setFilter('pending')" :class="{ active: activeFilter === 'pending' }">
        Pending
      </button>
    </div>

    <div class="util-row">
      <button type="button" @click="clearAllDone()">
        Clear All Done
      </button>
      <label class="field-label" for="priority-select">Filter Priority: </label>
      <select id="priority-select" v-model="selectedPriorityFilter">
        <option value="all">All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
        <option value="none">None</option>
      </select>
    </div>

    <!-- TODO 10: Show this message only when the task list is empty -->
    <p v-if="tasks.length === 0" class="empty">No tasks yet. Add one above!</p>

    <p v-if="filteredTasks.length === 0" class="empty">No tasks yet for {{ selectedPriorityFilter }} priority.</p>

    <!-- TODO 11: Render the task list using v-for -->
    <!-- Each item needs: checkbox (v-model), task name (:class done), remove button -->
    <ul class="task-list">
      <!-- your v-for loop here -->
      <li v-for="task in filteredTasks" :key="task.id" class="task-item">
        <input type="checkbox" v-model="task.done" />
        <span class="task-name" :class="{ done: task.done }">{{ task.name }}</span>

        <span class="priority-badge" :class="task.priority">
          {{ task.priority }}
        </span>
        <button type="button" @click="removeTask(task.id)">X</button>
      </li>
      
    </ul>
  </div>
</template>

<style scoped>
.app {
  max-width: 480px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

h1 { color: #1B2A4A; margin-bottom: 20px; }

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.input-row input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.input-row button {
  padding: 8px 16px;
  background: #42B883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.input-row select {
  padding: 8px 12px;
  border: 1px solid #42B883;
  border-radius: 10px;
  background: white;
}

.input-row .field-label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.stats {
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #e9f7f0;
  border-radius: 6px;
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.filter-row button {
  width: 100%;
  padding: 8px 16px;
  background: white;
  color: #42B883;
  border: 1px solid #42B883;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background .15s, color .15s, filter .15s;
}

.filter-row button:hover,
.filter-row button:focus {
  background: rgba(66, 184, 131, 0.08);
  outline: none;
}

.filter-row button.active {
  background: #42B883;
  color: white;
  border-color: #42B883;
}

.filter-row button.active:hover,
.filter-row button.active:focus {
  filter: brightness(0.95);
}

.util-row {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.util-row button {
  width: auto;
  padding: 8px 16px;
  background: #42B883;
  color: white;
  border: 1px solid #42B883;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background .15s, color .15s, filter .15s;
}

.util-row button:hover,
.util-row button:focus {
  filter: brightness(0.95);
  outline: none;
}

.util-row .field-label {
  margin-left: auto;
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.util-row select {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #42B883;
  border-radius: 10px;
  background: white;
}

.empty {
  text-align: center;
  color: #aaa;
  font-style: italic;
  margin: 32px 0;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #eee;
}

.task-list li input{
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #eee;
}

.task-list li span {
  flex: 1;
  font-size: 14px;
}

/* TODO: Apply this class to task names when task.done is true */
.done {
  text-decoration: line-through;
  color: #aaa;
}

.task-list li button {
  padding: 4px 10px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.task-name {
  flex: 1;
  font-size: 14px;
}

.task-item .priority-badge {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  width: fit-content;
  white-space: nowrap;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.priority-badge.low {
  background: #e0f2fe;
  color: #0369a1;
}

.priority-badge.medium {
  background: #fef3c7;
  color: #92400e;
}

.priority-badge.high {
  background: #fee2e2;
  color: #b91c1c;
}

.priority-badge.none {
  background: #efefef;
  color: #373737;
}

</style>
