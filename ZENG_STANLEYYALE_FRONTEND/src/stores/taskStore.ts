import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTaskStore = defineStore("taskStore", () => {
  // 1. State
  const tasks = ref([
    {
      id: 1,
      name: "Task 1",
      done: false,
      dueDate: Date.now(),
      priority: "none",
    },
    {
      id: 2,
      name: "Task 2",
      done: false,
      dueDate: Date.now(),
      priority: "low",
    },
    {
      id: 3,
      name: "Task 3",
      done: false,
      dueDate: Date.now(),
      priority: "high",
    },
  ]);

  // 2. Getters
  const totalTasks = computed(() => tasks.value.length);
  const doneTasks = computed(() => tasks.value.filter((t) => t.done));

  // 3. Actions
  // function addTask(taskTitle: string) {
  //   tasks.value.push({
  //     id: ,
  //     name: taskTitle,
  //     done: false,
  //     dueDate: Date.now(),
  //     priority: 'high'
  //   })
  // }

  // function toggleTask(id: number) {
  //   const task = tasks.value.find(t => t.id === id)
  //   if (task) task.isDone = !task.isDone
  // }

  return { tasks, totalTasks, doneTasks /*addTask, toggleTask*/ };
});

// export default useTaskStore
