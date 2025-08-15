<template>
  <main>
    <header>
      <img src="/pinialogo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <!-- Task Form -->
    <TaskForm />

    <!-- Filter Buttons -->
    <div class="filter-buttons">
      <v-btn 
        :variant="showFavourites ? 'outlined' : 'elevated'"
        color="primary"
        @click="showAllTasks"
        class="mr-2"
      >
        <v-icon left>mdi-format-list-bulleted</v-icon>
        All Tasks ({{ taskStore.tasks.length }})
      </v-btn>
      <v-btn 
        :variant="showFavourites ? 'elevated' : 'outlined'"
        color="pink"
        @click="showFavouriteTasks"
      >
        <v-icon left>mdi-heart</v-icon>
        Favourites ({{ taskStore.favTasks.length }})
      </v-btn>
    </div>

    <!-- Task List -->
    <v-container class="task-container">
      <div v-if="displayedTasks.length === 0" class="no-tasks">
        <v-card class="pa-8 text-center" variant="outlined">
          <v-icon 
            :color="showFavourites ? 'pink' : 'grey'" 
            size="64" 
            class="mb-4"
          >
            {{ showFavourites ? 'mdi-heart-broken' : 'mdi-clipboard-text-off' }}
          </v-icon>
          <h3 class="mb-2">
            {{ showFavourites ? 'No Favourite Tasks!' : 'No Tasks Yet!' }}
          </h3>
          <p class="text-body-2 mb-0">
            {{ showFavourites 
              ? 'Mark some tasks as favourites to see them here' 
              : 'Add your first task above to get started' 
            }}
          </p>
        </v-card>
      </div>

      <!-- Vuetify Grid System for Tasks -->
      <v-row v-else>
        <TransitionGroup name="task" tag="div" class="task-grid-wrapper">
          <v-col
            v-for="task in displayedTasks"
            :key="task.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="3"
          >
            <TaskDetails :task="task" />
          </v-col>
        </TransitionGroup>
      </v-row>
    </v-container>
  </main>
</template>

<script setup>
import TaskDetails from '~/components/TaskDetails.vue'
import TaskForm from '~/components/TaskForm.vue'
import { useTaskStore } from '~/stores/TaskStore'
import { ref, computed } from 'vue'

const taskStore = useTaskStore()
const showFavourites = ref(false)

// Computed property to show either all tasks or favourite tasks
const displayedTasks = computed(() => {
  return showFavourites.value ? taskStore.favTasks : taskStore.tasks
})

// Function to show all tasks
const showAllTasks = () => {
  showFavourites.value = false
}

// Function to show favourite tasks
const showFavouriteTasks = () => {
  showFavourites.value = true
}
</script>

<style scoped>
body {
  background: #f2f2f2;
  color: #444;
  margin: 0;
}

header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  background: #e7e7e7;
  text-align: center;
}

header img {
  max-width: 60px;
  transform: rotate(-10deg);
}

header h1 {
  margin: 0;
  font-size: 2em;
  padding-top: 25px;
  margin-left: 15px;
  color: #777;
  transform: rotate(2deg);
}

.filter-buttons {
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 10px;
  flex-wrap: wrap;
}

.task-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.task-grid-wrapper {
  width: 100%;
  display: contents;
}

.no-tasks {
  padding: 40px 20px;
  max-width: 400px;
  margin: 0 auto;
}

/* Task transition animations */
.task-enter-active,
.task-leave-active {
  transition: all 0.3s ease;
}

.task-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.task-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.task-move {
  transition: transform 0.3s ease;
}

/* Responsive design */
@media (max-width: 768px) {
  .filter-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .filter-buttons .v-btn {
    width: 200px;
  }
  
  .task-grid {
    grid-template-columns: 1fr;
  }
}
</style>





<!-- <template>
  <main>
    <header>
      <img src="/pinialogo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <div class="task-list">
      <TaskDetails
        v-for="task in taskStore.tasks"
        :key="task.id"
        :task="task"
      />
    </div>
  </main>
</template>

<script setup>
import TaskDetails from '~/components/TaskDetails.vue'
import { useTaskStore } from '~/stores/TaskStore'

const taskStore = useTaskStore()
</script>



<style scoped>
body{
  background: #f2f2f2;
  color: #444;
  margin: 0;

}
header{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  background: #e7e7e7;
  text-align: center;

}
header img{
max-width:60PX;
transform: rotate(-10deg);

}
header h1{
  margin: 0;
  font-size: 2em;
  padding-top: 25px;
  margin-left: 15px;
  color: #777 ;
  transform: rotate(2deg);
}
</style> -->