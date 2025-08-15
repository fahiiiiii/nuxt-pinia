import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [
      { id: 1, title: "Have a session of learning Pinia", isFav: false },
      { id: 2, title: "Make a project using Pinia", isFav: true }
    ]
  }),

  getters: {
    favTasks(state) {
      return state.tasks.filter(t => t.isFav)
    }
  },

  actions: {
    addTask(title:string) {
      console.log('TaskStore: Adding task with title:', title) // Debug log
      
      // Validate input
      if (!title || !title.trim()) {
        console.error('TaskStore: Invalid title provided')
        return
      }
      
      // Generate new ID based on existing tasks
      const newId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1
      
      // Create new task object
      const newTask = {
        id: newId,
        title: title.trim(),
        isFav: false
      }
      
      // Add new task
      this.tasks.push(newTask)
      
      console.log('TaskStore: Task added successfully. Total tasks:', this.tasks.length) // Debug log
      console.log('TaskStore: Current tasks:', this.tasks) // Debug log
    },
    
    toggleFav(id:number) {
      const task = this.tasks.find(t => t.id === id)
      if (task) task.isFav = !task.isFav
    },
    
    deleteTask(id:number) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    }
  }
})