<template>
  <div class="task">
    <div class="task-row">
      <!-- Task Title -->
      <span class="task-title">{{ task.title }}</span>

      <!-- Favorite Icon -->
      <i class="material-icons fav-icon" @click="taskStore.toggleFav(task.id)">
        {{ task.isFav ? 'favorite' : 'favorite_border' }}
      </i>

      <!-- Delete Icon -->
      <i class="material-icons delete-icon" @click="taskStore.deleteTask(task.id)">
        delete
      </i>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '~/stores/TaskStore'

const props = defineProps({   
  task: {
    type: Object,
    required: true
  }
})

const taskStore = useTaskStore()
</script>

<style scoped>
.task {
  padding: 10px;
  /* border-bottom: 1px solid #ccc; */
}

.task-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task-title {
  flex-grow: 1;
  font-weight: 500;
}

.fav-icon {
  color: red;
  cursor: pointer;
  margin-left: 10px;
}

.delete-icon {
  color: grey;
  cursor: pointer;
  margin-left: 10px;
}
</style>
