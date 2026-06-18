import { defineStore } from "pinia";
import { ref, computed } from "vue";

export type Priority = "none" | "low" | "medium" | "high";

export interface Task {
  id: number;
  name: string;
  done: boolean;
  dueDate: number;
  priority: Priority;
}

export const useTaskStore = defineStore("taskStore", () => {
  // State
  const tasks = ref<Task[]>([
    { id: 1, name: "Task 1", done: false, dueDate: Date.now(), priority: "none" },
    { id: 2, name: "Task 2", done: false, dueDate: Date.now(), priority: "low" },
    { id: 3, name: "Task 3", done: false, dueDate: Date.now(), priority: "high" },
  ]);

  // Getters
  const totalTasks = computed(() => tasks.value.length);
  const doneTasks = computed(() => tasks.value.filter((t) => t.done));
  const pendingTasks = computed(() => tasks.value.filter((t) => !t.done));

  // Actions
  function addTask(
    name: string, 
    priority: Priority = "none", 
    dueDate = Date.now()
  ) {
    const id = tasks.value.length
      ? Math.max(...tasks.value.map((t) => t.id)) + 1
      : 1;
    tasks.value.push({ id, name, done: false, dueDate, priority });
  }

  function toggleTask(id: number) {
    const task = tasks.value.find((t) => t.id === id);
    if (task) task.done = !task.done;
  }

  function removeTask(id: number) {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  }

  return {
    tasks,
    totalTasks,
    doneTasks,
    pendingTasks,
    addTask,
    toggleTask,
    removeTask,
  };
});