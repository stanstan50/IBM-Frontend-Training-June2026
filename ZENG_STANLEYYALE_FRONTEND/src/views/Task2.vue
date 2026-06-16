<!--
=============================================================
  DAY 2 ASSIGNMENT — TaskListView.vue (Parent Component)
  This file renders a list of TaskCard components.
=============================================================
-->
<script setup lang="ts">
import { ref } from "vue";
import TaskCard from "./TaskCard.vue";
import type { Task } from "./TaskCard.vue";

// TODO 1: Create a ref() tasks array with at least 3 sample tasks
// Each task: { id, name, done, dueDate }
const tasks = ref<Task[]>([]);

tasks.value = [
  {
    id: 1,
    name: "Task 1",
    done: false,
    dueDate: Date.now(),
    priority: 'none'
  },
  {
    id: 2,
    name: "Task 2",
    done: false,
    dueDate: Date.now(),
    priority: 'low'
  },
  {
    id: 3,
    name: "Task 3",
    done: false,
    dueDate: Date.now(),
    priority: 'high'
  },
];

// TODO 2: Write handleComplete(id) — toggle the done state of the task with this id
function handleComplete(id: number) {
  const task = tasks.value.find((task) => task.id === id);
  if (!task) return;

  task.done = !task.done;
}

// TODO 3: Write handleDelete(id) — remove the task with this id from the array
function handleDelete(id: number) {
  tasks.value = tasks.value.filter((task) => task.id !== id);
}

// Extended - Task name editing
function handleUpdate(id: number, name: string) {
  const task = tasks.value.find(task => task.id === id)
  if (!task) return;
  task.name = name;
}

</script>

<template>
  <div class="task-list-view">
    <h1>My Tasks</h1>

    <!-- TODO 4: Render a <TaskCard> for each task using v-for
         - Pass :task="task" as a prop
         - Listen @complete="handleComplete"
         - Listen @delete="handleDelete"
         - Fill the "meta" named slot with the due date
    -->
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @complete="handleComplete"
      @delete="handleDelete"
      @update="handleUpdate"
    >
      <template #meta
        >Due: {{ new Date(task.dueDate).toLocaleDateString() }}
      </template>
    </TaskCard>
    <span v-if="tasks.length === 0"
      >No tasks remaining (all done or deleted)</span
    >
  </div>
</template>

<style scoped>
.task-list-view {
  max-width: 520px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #1b2a4a;
  margin-bottom: 24px;
}
</style>
